import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export const TEXT_PATH = path.join(__dirname, "textbook", "giaotrinh.txt");
export const PDF_PATH  = path.join(__dirname, "textbook", "giaotrinh.pdf");

const STOP_WORDS = new Set([
  "là","và","của","có","được","trong","với","để","này","đó","một","các",
  "những","khi","từ","theo","đến","về","như","hay","hoặc","mà","thì",
  "cũng","đã","sẽ","không","rất","hơn","nhất","vào","ra","lên","xuống",
  "bởi","vì","nên","do","tuy","nhưng","còn","lại","đây","thế","vậy",
  "nào","gì","ai","ở","tại","qua","sau","trước","trên","dưới","giữa",
  "ngoài","cùng","mọi","tất","cả","cho","bằng","mỗi","chỉ","đều","lúc",
]);

// { text, tokenSet, bigramSet }[] — built at load time
let chunkData = [];
let loaded = false;

function tokenize(text) {
  return text
    .toLowerCase()
    .split(/[\s,;:.!?()\[\]{}"'«»\-–—\/\\|]+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

// "biện chứng" → "biện§chứng" — catches Vietnamese compound terms
function getBigrams(tokens) {
  const out = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    out.push(`${tokens[i]}§${tokens[i + 1]}`);
  }
  return out;
}

function chunkText(text, targetWords = 380) {
  const cleaned = text
    .replace(/\f/g, "\n\n")
    .replace(/[ \t]{3,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const paragraphs = cleaned
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter((p) => p.split(/\s+/).length > 8);

  const result = [];
  let current = [];
  let wordCount = 0;

  for (const para of paragraphs) {
    const words = para.split(/\s+/).length;
    if (wordCount > 0 && wordCount + words > targetWords) {
      result.push(current.join("\n\n"));
      current = [para];
      wordCount = words;
    } else {
      current.push(para);
      wordCount += words;
    }
  }
  if (current.length) result.push(current.join("\n\n"));
  return result;
}

function buildIndex(rawChunks) {
  chunkData = rawChunks.map((text) => {
    const tokens = tokenize(text);
    return { text, tokenSet: new Set(tokens), bigramSet: new Set(getBigrams(tokens)) };
  });
  loaded = true;
}

// Bigram match = 4pts, exact unigram = 2pts, partial = 1pt
function scoreChunk({ tokenSet, bigramSet }, queryTokens, queryBigrams) {
  let score = 0;
  for (const qb of queryBigrams) {
    if (bigramSet.has(qb)) score += 4;
  }
  for (const qt of queryTokens) {
    if (tokenSet.has(qt)) {
      score += 2;
    } else {
      for (const ct of tokenSet) {
        if (ct.includes(qt) || qt.includes(ct)) { score += 1; break; }
      }
    }
  }
  return score;
}

export async function loadKB() {
  if (loaded) return;

  // Try plain text first (no dependency needed)
  if (fs.existsSync(TEXT_PATH)) {
    try {
      const text = fs.readFileSync(TEXT_PATH, "utf-8");
      buildIndex(chunkText(text));
      console.log(`[KB] Đã tải ${chunkData.length} đoạn từ file text (${Math.round(text.length / 1000)}k ký tự)`);
      return;
    } catch (err) {
      console.error("[KB] Lỗi tải text file:", err.message);
    }
  }

  // Fall back to PDF
  if (fs.existsSync(PDF_PATH)) {
    try {
      const pdfParse = require("pdf-parse");
      const buffer = fs.readFileSync(PDF_PATH);
      const data = await pdfParse(buffer);
      buildIndex(chunkText(data.text));
      console.log(`[KB] Đã tải ${chunkData.length} đoạn từ PDF (${Math.round(data.text.length / 1000)}k ký tự)`);
      return;
    } catch (err) {
      console.error("[KB] Lỗi tải PDF:", err.message);
    }
  }

  console.log("[KB] Không tìm thấy giáo trình — RAG tắt");
}

export function searchKB(query, topK = 4) {
  if (!loaded || !chunkData.length) return [];
  const queryTokens = tokenize(query);
  if (!queryTokens.length) return [];
  const queryBigrams = getBigrams(queryTokens);

  return chunkData
    .map((cd) => ({ cd, score: scoreChunk(cd, queryTokens, queryBigrams) }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((c) => c.cd.text);
}

export const isKBLoaded = () => loaded;
