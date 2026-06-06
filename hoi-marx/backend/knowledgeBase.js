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
// + head bonus: term in first 200 chars (chunk is about this topic) = +3
// + definition bonus: "X là" pattern when query asks "là gì" / "định nghĩa" = +4
function scoreChunk({ text, tokenSet, bigramSet }, queryTokens, queryBigrams, isDefinitionQuery) {
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

  // Head bonus: if key terms appear in the opening 200 chars the chunk is ON this topic
  const head = text.slice(0, 200).toLowerCase();
  for (const qt of queryTokens) {
    if (head.includes(qt)) score += 3;
  }
  for (const qb of queryBigrams) {
    if (head.includes(qb.replace("§", " "))) score += 3;
  }

  // Definition bonus: when user asks "X là gì" / "định nghĩa X", reward chunks
  // that contain the pattern "X là " (likely a definitional sentence)
  if (isDefinitionQuery) {
    const textLower = text.toLowerCase();
    for (const qt of queryTokens) {
      if (textLower.includes(`${qt} là `)) score += 4;
    }
    for (const qb of queryBigrams) {
      const phrase = qb.replace("§", " ");
      if (textLower.includes(`${phrase} là `)) score += 6;
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

const DEFINITION_TRIGGERS = [
  "là gì", "định nghĩa", "khái niệm", "ý nghĩa", "bản chất", "hiểu như thế nào", "giải thích",
  // fill-in-the-blank patterns — same scoring boost helps find factual chunks
  "quan hệ gì", "hình thành nên gì", "tạo ra gì", "gọi là gì", "là cái gì",
  "là lực lượng gì", "là yếu tố gì", "là điều gì",
];
const ENUMERATION_TRIGGERS = ["mấy", "bao nhiêu", "có những", "liệt kê", "kể tên", "những loại", "các loại", "những gì", "gồm những", "bao gồm"];

// Vietnamese synonym pairs — when query uses word A, also search for word B.
// This bridges the gap between student phrasing and textbook phrasing.
const SYNONYMS = [
  ["xuất hiện", "hình thành"],
  ["xuất hiện", "ra đời"],
  ["nguồn gốc", "nguyên nhân"],
  ["nguồn gốc", "cơ sở"],
  ["đặc điểm", "đặc trưng"],
  ["vai trò", "chức năng"],
  ["ý nghĩa", "tầm quan trọng"],
  ["tác động", "ảnh hưởng"],
  ["phát triển", "tiến bộ"],
  // causal / formative relationships
  ["cơ sở", "nền tảng"],
  ["cơ sở", "tiền đề"],
  ["hình thành", "tạo ra"],
  ["hình thành", "thiết lập"],
  ["sản xuất", "lao động"],
  ["quan hệ sản xuất", "quan hệ giữa người"],
];

function expandWithSynonyms(query) {
  let expanded = query;
  for (const [a, b] of SYNONYMS) {
    if (query.toLowerCase().includes(a)) expanded += ` ${b}`;
    if (query.toLowerCase().includes(b)) expanded += ` ${a}`;
  }
  return expanded;
}

export function searchKB(query, topK = 5) {
  if (!loaded || !chunkData.length) return [];
  const queryLower = query.toLowerCase();

  const isDefinitionQuery = DEFINITION_TRIGGERS.some((t) => queryLower.includes(t));
  const isEnumerationQuery = ENUMERATION_TRIGGERS.some((t) => queryLower.includes(t));

  // Expand query with synonyms and number words
  let expandedQuery = expandWithSynonyms(query);
  if (isEnumerationQuery) {
    const topic = queryLower
      .replace(/có mấy|mấy|bao nhiêu|liệt kê|kể tên|có những|gồm những/g, "")
      .trim();
    expandedQuery += ` một hai ba bốn ${topic}`;
  }

  const queryTokens = tokenize(expandedQuery);
  if (!queryTokens.length) return [];
  const queryBigrams = getBigrams(queryTokens);

  return chunkData
    .map((cd) => ({ cd, score: scoreChunk(cd, queryTokens, queryBigrams, isDefinitionQuery) }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((c) => c.cd.text);
}

export const isKBLoaded = () => loaded;
