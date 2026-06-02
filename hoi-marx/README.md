# Hỏi Marx 🔴

Chatbot học tập môn **Triết học Marx-Lenin (MLN111)** dành cho sinh viên đại học.

- Chat hỏi đáp với AI về triết học Marx-Lenin
- RAG: AI đọc thẳng từ giáo trình MLN111 để trả lời, hiển thị đoạn trích nguồn
- Bộ đề ôn thi + tự động sinh câu hỏi từ chat
- Thẻ học flashcard 45 khái niệm với theo dõi tiến độ
- Sơ đồ mindmap tương tác

**Stack:** React 18 + Vite · Node.js + Express · Google Gemini API · RAG keyword search

---

## Yêu cầu

- [Node.js](https://nodejs.org/) v18 trở lên
- Tài khoản Google để lấy Gemini API key (miễn phí)

---

## 1. Clone repo

```bash
git clone https://github.com/ngovanminhtri05/HoiMarx.git
cd HoiMarx/hoi-marx
```

---

## 2. Lấy Gemini API key

1. Vào [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Đăng nhập Google → nhấn **Create API key**
3. Chọn project bất kỳ → copy key

---

## 3. Cấu hình backend

```bash
cd backend
```

Tạo file `.env`:

```
GEMINI_API_KEY=your_api_key_here
PORT=3001
```

Cài dependencies:

```bash
npm install
```

### (Tuỳ chọn) Thêm giáo trình để bật RAG

Nếu có file giáo trình MLN111 dạng text (`.txt`), tạo thư mục và đặt vào:

```
backend/
└── textbook/
    └── giaotrinh.txt
```

Nếu không có, AI vẫn hoạt động nhưng trả lời từ kiến thức chung (không có nguồn trích dẫn).

---

## 4. Cài frontend

```bash
cd ../frontend
npm install
```

---

## 5. Chạy dự án

Mở **2 terminal**:

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

Thấy dòng sau là backend đã sẵn sàng:

```
Hỏi Marx backend running on http://localhost:3001
[KB] Đã tải 285 đoạn từ file text  ← nếu có giáo trình
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

Mở trình duyệt: [http://localhost:5173](http://localhost:5173)

---

## Cấu trúc thư mục

```
hoi-marx/
├── backend/
│   ├── index.js          # Express server, Gemini API, SSE streaming
│   ├── knowledgeBase.js  # RAG: load + search giáo trình
│   ├── textbook/         # ← đặt giaotrinh.txt vào đây (không có trong repo)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/   # Header, MessageList, InputBar, NavBar
    │   ├── pages/        # ChatPage, QuizBankPage, FlashcardPage, MindmapPage
    │   └── data/         # questions.js, mindmapData.js
    └── package.json
```

---

## Lỗi thường gặp

**`EADDRINUSE: address already in use :::3001`**

Port 3001 đang bị chiếm. Kill process cũ:

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <pid> /F

# macOS / Linux
lsof -ti:3001 | xargs kill -9
```

**`❌ Lỗi kết nối: network error`**

Backend chưa chạy hoặc sai port. Kiểm tra terminal backend còn sống và `.env` đúng.

**AI trả lời nhưng không có đoạn trích giáo trình**

File `backend/textbook/giaotrinh.txt` chưa có hoặc đặt sai đường dẫn.
