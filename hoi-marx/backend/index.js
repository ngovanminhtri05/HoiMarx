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
Ngôn ngữ: Tiếng Việt, thân thiện, gần gũi sinh viên. Mỗi câu trả lời PHẢI tuân thủ đúng cấu trúc 4 phần sau, không bỏ phần nào:

🔍 **Khái niệm cốt lõi:** Giải thích định nghĩa ngắn gọn, chính xác theo giáo trình (2–4 câu).

📖 **Góc nhìn Marx-Lenin:** Phân tích lý luận, nêu quy luật hoặc nguyên lý liên quan, trích dẫn chương giáo trình.

🌏 **Ví dụ thực tiễn:** Bắt buộc đưa ra ÍT NHẤT 2 ví dụ cụ thể, ưu tiên theo thứ tự:
  1. Ví dụ từ thực tiễn Việt Nam giai đoạn 2020–nay (chính sách, sự kiện, số liệu thực tế)
  2. Ví dụ đời sống sinh viên hoặc xã hội hàng ngày để dễ hiểu, dễ nhớ
  → Ví dụ phải cụ thể, có tên/số liệu/sự kiện rõ ràng, không nói chung chung.

📚 **Nguồn tham khảo:** Chương X, Giáo trình MLN111 (NXB Chính trị Quốc gia Sự thật, 2021).

Độ dài: tối đa 350 từ mỗi câu trả lời.

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

function buildSystemPrompt(kbChunks) {
  if (!kbChunks.length) return SYSTEM_PROMPT;
  const context = kbChunks.join("\n\n---\n\n");
  return `${SYSTEM_PROMPT}

--- ĐOẠN TRÍCH TỪ GIÁO TRÌNH MLN111 (NXB CTQG 2021) ---
${context}
--- HẾT ĐOẠN TRÍCH ---

Ưu tiên dùng nội dung trích dẫn trên để trả lời chính xác. Nếu đoạn trích không đủ, bổ sung từ kiến thức chung nhưng ghi chú rõ phần nào là kiến thức chung.`;
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
      const previews = kbChunks.map((t) => t.slice(0, 300).trim());
      res.write(`event: rag_context\ndata: ${JSON.stringify({ chunks: kbChunks.length, texts: previews })}\n\n`);
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: buildSystemPrompt(kbChunks),
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
