import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { loadKB, searchKB, isKBLoaded } from "./knowledgeBase.js";

const app = express();
const port = process.env.PORT || 3001;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load textbook in background — server starts immediately
loadKB();

const SYSTEM_PROMPT = `Bạn là "Hỏi Marx" — trợ lý học tập môn Triết học Marx-Lenin (MLN111) dành cho sinh viên đại học. Bạn được xây dựng bởi nhóm sinh viên ngành Software Engineering.

VAI TRÒ & GIỚI HẠN
Chỉ trả lời các câu hỏi liên quan đến: Triết học Marx-Lenin, Kinh tế chính trị Marx-Lenin, Chủ nghĩa xã hội khoa học, ôn thi MLN111. Nếu câu hỏi ngoài phạm vi, lịch sự từ chối.

PHONG CÁCH TRẢ LỜI
Ngôn ngữ: Tiếng Việt, thân thiện, gần gũi sinh viên.

QUY TẮC ƯU TIÊN — đọc kỹ trước khi trả lời:
- Khi câu hỏi có "mấy", "bao nhiêu", "có những gì", "liệt kê", "kể tên": BẮT BUỘC mở đầu bằng con số cụ thể và danh sách đầy đủ (ví dụ: "Có **2 nguồn gốc**:"). KHÔNG được trả lời chung chung mà bỏ qua con số.
- Khi câu hỏi là dạng định nghĩa ("là gì", "khái niệm"): trả lời định nghĩa trước, phân tích sau.
- Khi câu hỏi dạng "điền vào chỗ trống" — nhận biết qua: "quan hệ gì", "hình thành nên gì", "tạo ra gì", "gọi là gì", "đó là gì", "là cái gì", "là lực lượng gì", "là yếu tố gì", "là điều gì": BẮT BUỘC câu đầu tiên trong 🔍 phải là câu trả lời trực tiếp dạng "[chủ ngữ] là **[tên khái niệm cụ thể]**." (ví dụ: "Đó là **quan hệ sản xuất**."). Sau đó mới giải thích thêm. KHÔNG được giải thích khái niệm mà bỏ qua việc nêu tên trực tiếp.
- Với mọi câu hỏi: nếu đoạn trích giáo trình có đủ thông tin, ưu tiên trích dẫn nguyên văn, không tự diễn giải lại làm mất thông tin.

Mỗi câu trả lời PHẢI tuân thủ đúng cấu trúc 4 phần sau, không bỏ phần nào:

🔍 **Khái niệm cốt lõi:** Nếu câu hỏi hỏi số lượng/danh sách → liệt kê đầy đủ với số thứ tự rõ ràng. Nếu câu hỏi hỏi định nghĩa → giải thích chính xác theo giáo trình (2–4 câu).

📖 **Góc nhìn Marx-Lenin:** Phân tích lý luận, nêu quy luật hoặc nguyên lý liên quan, trích dẫn chương giáo trình.

🌏 **Ví dụ thực tiễn:** Bắt buộc đưa ra ÍT NHẤT 2 ví dụ cụ thể, ưu tiên theo thứ tự:
  1. Ví dụ từ thực tiễn Việt Nam giai đoạn 2020–nay (chính sách, sự kiện, số liệu thực tế)
  2. Ví dụ đời sống sinh viên hoặc xã hội hàng ngày để dễ hiểu, dễ nhớ
  → Ví dụ phải cụ thể, có tên/số liệu/sự kiện rõ ràng, không nói chung chung.

📚 **Nguồn tham khảo:** Chương X, Giáo trình MLN111 (NXB Chính trị Quốc gia Sự thật, 2021).

Độ dài: tối đa 400 từ mỗi câu trả lời.

CÁC CHẾ ĐỘ
- Mặc định: hỏi đáp tự do
- Quiz mode (khi người dùng nhắn "quiz" hoặc "ôn thi"): ra 1 câu trắc nghiệm 4 đáp án, chờ người dùng trả lời, sau đó giải thích đáp án đúng kèm nguồn giáo trình
- Mindmap mode (khi người dùng nhắn "sơ đồ" hoặc "mindmap"): liệt kê khái niệm chính dạng cây phân cấp dùng ký tự văn bản

QUY TẮC ĐỘ CHÍNH XÁC
- Không bịa số trang. Nếu không chắc trang cụ thể, ghi "Chương X — xem lại giáo trình để xác nhận trang".
- Luôn nhắc người dùng đối chiếu giáo trình gốc trước khi dùng cho bài thi.
- Ví dụ hóm hỉnh được nhưng định nghĩa phải trung thực với giáo trình.

Bắt đầu bằng lời chào ngắn, thân thiện và hỏi người dùng muốn tìm hiểu chủ đề nào hoặc muốn ôn thi không.`;

app.use(cors());
app.use(express.json());

// Extract a clean, sentence-aligned excerpt from a KB chunk.
// Problem: PDF→TXT conversion often breaks chunks mid-sentence at para boundaries.
// Fix: (1) skip a leading sentence fragment, (2) end at the last sentence boundary.
function makeChunkPreview(text, maxChars = 480) {
  let excerpt = text.trim();

  // Step 1 — skip leading fragment if the chunk starts mid-sentence.
  //
  // Primary signal: if the first character is a lowercase letter (both ASCII and
  // Unicode/Vietnamese), the chunk is definitely mid-sentence — textbook sentences
  // always start uppercase. Find the first sentence boundary and trim to it.
  //
  // Fallback: even if first char is uppercase, trim short fragments (≤6 words)
  // that appear before the first sentence-end within 120 chars.
  const firstChar = excerpt.charAt(0);
  const startsLowercase =
    firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase();

  if (startsLowercase) {
    // Search up to 600 chars for first ". " / ".\n" / "! " / "? "
    const boundary = excerpt.slice(0, 600).search(/[.!?]['")»\]]?\s/);
    if (boundary >= 0) {
      // Skip past the punctuation and any trailing whitespace
      excerpt = excerpt.slice(boundary + 1).trimStart();
    }
  } else {
    // Short-fragment fallback (≤6 words before early sentence end)
    const earlyEnd = excerpt.search(/[.!?]\s+/);
    if (earlyEnd > 0 && earlyEnd < 120) {
      const fragment = excerpt.slice(0, earlyEnd).trim();
      if (fragment.split(/\s+/).length <= 6) {
        excerpt = excerpt.slice(earlyEnd).replace(/^[.!?]\s*/, "").trim();
      }
    }
  }

  // Step 2 — trim to maxChars at a sentence boundary.
  if (excerpt.length <= maxChars) return excerpt;
  const slice = excerpt.slice(0, maxChars);
  const lastBoundary = Math.max(
    slice.lastIndexOf(". "),
    slice.lastIndexOf(".\n"),
    slice.lastIndexOf("! "),
    slice.lastIndexOf("? "),
  );
  if (lastBoundary > maxChars * 0.4) {
    return slice.slice(0, lastBoundary + 1).trim();
  }
  return slice.trim() + "…";
}

// Detects fill-in-the-blank patterns: "quan hệ gì", "hình thành nên gì", etc.
const FILL_IN_BLANK_RE =
  /(?:quan hệ|mối quan hệ|loại|hình thức|điều|yếu tố|nhân tố|giai cấp|lực lượng|cái|thứ)\s+gì\b|hình thành\s+(?:nên\s+)?gì|tạo ra\s+(?:gì|điều gì)|gọi\s+là\s+gì|đó\s+là\s+gì|đây\s+là\s+gì|là\s+(?:gì|cái gì)\s*\?/i;

function buildSystemPrompt(kbChunks, lastUserMsg = "") {
  const contextSection = kbChunks.length
    ? `\n\n--- ĐOẠN TRÍCH TỪ GIÁO TRÌNH MLN111 (NXB CTQG 2021) ---\n${kbChunks.join("\n\n---\n\n")}\n--- HẾT ĐOẠN TRÍCH ---\n\nƯu tiên dùng nội dung trích dẫn trên để trả lời chính xác. Nếu đoạn trích không đủ, bổ sung từ kiến thức chung nhưng ghi chú rõ phần nào là kiến thức chung.`
    : "";

  const fillInHint = FILL_IN_BLANK_RE.test(lastUserMsg)
    ? `\n\n⚠️ LỆNH BẮT BUỘC — ghi đè mọi quy tắc trên:
Câu hỏi người dùng vừa gửi là dạng ĐIỀN KHUYẾT (hỏi tên một khái niệm).
Phần 🔍 PHẢI mở đầu bằng đúng cấu trúc sau, không được bỏ:
  "[chủ ngữ từ câu hỏi] là **[TÊN KHÁI NIỆM]**."
Ví dụ hợp lệ duy nhất: "Đó là **quan hệ sản xuất**."
SAU ĐÓ mới giải thích thêm. KHÔNG được chỉ giải thích mà không nêu thẳng tên.`
    : "";

  return `${SYSTEM_PROMPT}${contextSection}${fillInHint}`;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", kbLoaded: isKBLoaded() });
});

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const kbChunks = searchKB(lastUserMsg);

    // Tell the frontend how many KB chunks were injected (+ preview text for source panel)
    if (kbChunks.length > 0) {
      const previews = kbChunks.map((t) => makeChunkPreview(t));
      res.write(`event: rag_context\ndata: ${JSON.stringify({ chunks: kbChunks.length, texts: previews })}\n\n`);
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: buildSystemPrompt(kbChunks, lastUserMsg),
    });

    // Convert Anthropic-style messages → Gemini format
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    const lastMsg = messages[messages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMsg);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        res.write(`event: content_block_delta\n`);
        res.write(`data: ${JSON.stringify({ delta: { type: "text_delta", text } })}\n\n`);
      }
    }
    res.write(`event: message_stop\ndata: {}\n\n`);
  } catch (err) {
    res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
  } finally {
    res.end();
  }
});

app.post("/api/generate-quiz", async (req, res) => {
  const { userMessage, botMessage } = req.body;
  if (!userMessage) return res.status(400).json({ error: "userMessage required" });

  const prompt = `Bạn là giáo viên MLN111. Dựa vào cuộc trò chuyện dưới đây, hãy tạo 1 câu hỏi trắc nghiệm chất lượng cao để sinh viên ôn tập.

Câu hỏi của sinh viên: "${userMessage}"
Nội dung giải thích: "${(botMessage ?? "").slice(0, 800)}"

Yêu cầu:
- Câu hỏi phải bám sát nội dung giáo trình MLN111
- 4 đáp án rõ ràng, chỉ có 1 đáp án đúng
- Đáp án sai phải hợp lý (không quá dễ loại trừ)
- section phải là một trong: "triet", "ktct", "cnxhkh"

Trả về JSON hợp lệ (chỉ JSON thuần, không markdown, không giải thích thêm):
{
  "section": "triet",
  "topic": "tên chủ đề ngắn",
  "q": "câu hỏi trắc nghiệm",
  "choices": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
  "answer": 0,
  "explanation": "giải thích tại sao đáp án đúng",
  "source": "Chương X — Giáo trình MLN111 (NXB CTQG, 2021)"
}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim()
      .replace(/^```json?\n?/, "").replace(/\n?```$/, "");
    const quiz = JSON.parse(raw);
    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Hỏi Marx backend running on http://localhost:${port}`);
});
