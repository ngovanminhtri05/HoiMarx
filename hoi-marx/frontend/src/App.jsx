import { useState, useCallback, useRef } from "react";
import Header from "./components/Header.jsx";
import MessageList from "./components/MessageList.jsx";
import InputBar from "./components/InputBar.jsx";
import NavBar from "./components/NavBar.jsx";
import QuizBankPage from "./pages/QuizBankPage.jsx";
import MindmapPage from "./pages/MindmapPage.jsx";
import FlashcardPage from "./pages/FlashcardPage.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function ChatPage({ onNewQuestion }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const finalContentRef = useRef("");
  const lastUserMsgRef  = useRef("");

  const sendMessage = useCallback(
    async (userInput) => {
      if (!userInput.trim() || isStreaming) return;

      const userMsg = { role: "user", content: userInput.trim(), id: Date.now() };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setIsStreaming(true);
      lastUserMsgRef.current  = userInput.trim();
      finalContentRef.current = "";

      const botMsgId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", id: botMsgId, ragChunks: 0, ragTexts: [] },
      ]);

      try {
        const res = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages.map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let currentEvent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (line.startsWith("event: ")) {
              currentEvent = line.slice(7).trim();
            } else if (line.startsWith("data: ")) {
              if (currentEvent === "content_block_delta") {
                try {
                  const parsed = JSON.parse(line.slice(6));
                  const text = parsed?.delta?.text ?? "";
                  if (text) {
                    finalContentRef.current += text;
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === botMsgId
                          ? { ...m, content: m.content + text }
                          : m
                      )
                    );
                  }
                } catch {
                  // malformed SSE chunk, skip
                }
              } else if (currentEvent === "rag_context") {
                try {
                  const parsed = JSON.parse(line.slice(6));
                  if (parsed.chunks > 0) {
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === botMsgId
                          ? { ...m, ragChunks: parsed.chunks, ragTexts: parsed.texts ?? [] }
                          : m
                      )
                    );
                  }
                } catch {}
              } else if (currentEvent === "error") {
                try {
                  const parsed = JSON.parse(line.slice(6));
                  const msg = parsed?.error ?? "Lỗi không xác định từ AI.";
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === botMsgId
                        ? { ...m, content: `❌ ${msg}` }
                        : m
                    )
                  );
                } catch {}
              }
              currentEvent = "";
            }
          }
        }
      } catch (err) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId
              ? { ...m, content: `❌ Lỗi kết nối: ${err.message}. Vui lòng thử lại.` }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
        // Auto-generate quiz question in background (silent fail)
        if (finalContentRef.current && onNewQuestion) {
          fetch(`${API_URL}/api/generate-quiz`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userMessage: lastUserMsgRef.current,
              botMessage: finalContentRef.current,
            }),
          })
            .then((r) => r.json())
            .then(({ quiz }) => { if (quiz?.q) onNewQuestion(quiz); })
            .catch(() => {});
        }
      }
    },
    [messages, isStreaming, onNewQuestion]
  );

  const handleQuickAction = useCallback(
    (text) => { if (!isStreaming) sendMessage(text); },
    [sendMessage, isStreaming]
  );

  return (
    <div className="chat-page">
      <Header onQuickAction={handleQuickAction} isStreaming={isStreaming} />
      <MessageList messages={messages} isStreaming={isStreaming} />
      <InputBar
        input={input}
        setInput={setInput}
        onSend={sendMessage}
        isStreaming={isStreaming}
      />
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("chat");

  const [dynamicQuestions, setDynamicQuestions] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hm-dq") ?? "[]"); }
    catch { return []; }
  });

  const addDynamicQuestion = useCallback((q) => {
    setDynamicQuestions((prev) => {
      const updated = [{ ...q, id: `dyn-${Date.now()}` }, ...prev].slice(0, 30);
      localStorage.setItem("hm-dq", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <div className="app-shell">
      <div className="app-content">
        {page === "chat"      && <ChatPage onNewQuestion={addDynamicQuestion} />}
        {page === "quiz"      && <QuizBankPage dynamicQuestions={dynamicQuestions} />}
        {page === "flashcard" && <FlashcardPage />}
        {page === "mindmap"   && <MindmapPage />}
      </div>
      <NavBar activePage={page} onNavigate={setPage} dynamicCount={dynamicQuestions.length} />
    </div>
  );
}
