import { useState, useEffect, useRef } from "react";
import { AlertTriangle, Bot, BookOpen, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import TypingIndicator from "./TypingIndicator.jsx";

function cleanSectionText(text) {
  return text
    .replaceAll("🔍", "")
    .replaceAll("📖", "")
    .replaceAll("🌏", "")
    .replaceAll("📚", "")
    .trim();
}

function renderText(text) {
  const parts = cleanSectionText(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

function parseIntoSections(text) {
  if (!text.includes("🔍") && !text.includes("🌏") && !text.includes("📖")) return null;
  const buckets = { concept: [], theory: [], practice: [], source: [] };
  let current = null;

  for (const line of text.split("\n")) {
    if (line.includes("🔍")) current = "concept";
    else if (line.includes("📖")) current = "theory";
    else if (line.includes("🌏")) current = "practice";
    else if (line.includes("📚")) current = "source";
    if (current) buckets[current].push(line);
  }

  const concept = buckets.concept.join("\n").trim();
  const theory = buckets.theory.join("\n").trim();
  const practice = buckets.practice.join("\n").trim();
  const source = buckets.source.join("\n").trim();
  if (!concept && !theory && !practice) return null;
  return { concept, theory, practice, source };
}

function AccordionSection({ title, content, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="acc-section">
      <button className="acc-header" onClick={() => setOpen((o) => !o)}>
        <span className="acc-header-title">{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="acc-body">{renderText(content)}</div>}
    </div>
  );
}

function RagSourcePanel({ chunks, texts }) {
  const [open, setOpen] = useState(false);
  const badgeCls =
    chunks >= 3
      ? "rag-chip rag-chip--green"
      : chunks >= 1
        ? "rag-chip rag-chip--yellow"
        : "rag-chip";

  return (
    <div className="rag-source-wrap">
      <button className={badgeCls} onClick={() => setOpen((o) => !o)}>
        <BookOpen size={15} strokeWidth={2.1} />
        {chunks} đoạn giáo trình
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && (
        <div className="rag-source-panel">
          <div className="rag-source-header">
            Đoạn trích giáo trình MLN111 AI đã dùng để trả lời
          </div>
          {texts.map((t, i) => (
            <div key={i} className="rag-source-chunk">
              <span className="rag-chunk-num">#{i + 1}</span>
              <p className="rag-chunk-text">{t}</p>
            </div>
          ))}
          <div className="rag-source-note">
            Hãy đối chiếu câu trả lời với các đoạn trích này trước khi dùng cho bài thi.
          </div>
        </div>
      )}
    </div>
  );
}

function BotMessage({ content, isLastAndStreaming, ragChunks, ragTexts }) {
  const isEmpty = content === "" && isLastAndStreaming;

  if (isLastAndStreaming) {
    return (
      <div className="message-row bot-row">
        <div className="bot-avatar" aria-hidden="true">
          <Bot size={18} strokeWidth={2.2} />
        </div>
        <div className="bot-message-body">
          <div className="bubble bot-bubble">
            {isEmpty ? <span className="stream-placeholder">Đang soạn câu trả lời...</span> : renderText(content)}
          </div>
        </div>
      </div>
    );
  }

  const sections = parseIntoSections(content);

  return (
    <div className="message-row bot-row">
      <div className="bot-avatar" aria-hidden="true">
        <Bot size={18} strokeWidth={2.2} />
      </div>
      <div className="bot-message-body">
        {sections ? (
          <div className="msg-accordion">
            {sections.concept && (
              <AccordionSection title="Khái niệm cốt lõi" content={sections.concept} defaultOpen={true} />
            )}
            {sections.theory && (
              <AccordionSection title="Góc nhìn Marx-Lenin" content={sections.theory} defaultOpen={true} />
            )}
            {sections.practice && (
              <AccordionSection title="Ví dụ thực tiễn" content={sections.practice} defaultOpen={true} />
            )}
            {sections.source && <div className="acc-source">{renderText(sections.source)}</div>}
          </div>
        ) : (
          <div className="bubble bot-bubble">{renderText(content)}</div>
        )}
        {ragChunks > 0 && <RagSourcePanel chunks={ragChunks} texts={ragTexts ?? []} />}
        {ragChunks === 0 && content && !isLastAndStreaming && (
          <div className="rag-chip rag-chip--none">
            <AlertTriangle size={14} strokeWidth={2.1} />
            Chưa tìm thấy đoạn giáo trình liên quan, câu trả lời dựa trên kiến thức chung
          </div>
        )}
      </div>
    </div>
  );
}

function UserMessage({ content }) {
  return (
    <div className="message-row user-row">
      <div className="bubble user-bubble">{content}</div>
    </div>
  );
}

export default function MessageList({ messages, isStreaming }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const showTyping =
    isStreaming &&
    (messages.length === 0 || messages[messages.length - 1]?.role !== "assistant");

  return (
    <main className="message-list">
      {messages.length === 0 && !isStreaming && (
        <div className="empty-state">
          <div className="empty-emblem" aria-hidden="true">
            <GraduationCap size={42} strokeWidth={1.9} />
          </div>
          <p className="empty-kicker">Bắt đầu buổi học</p>
          <h1 className="empty-title">Mở rộng thế giới quan của bạn qua từng câu hỏi.</h1>
          <p className="empty-hint">
            Bạn có thể hỏi định nghĩa, so sánh khái niệm, xin ví dụ đời sống, hoặc gõ "quiz" để luyện nhanh.
          </p>
        </div>
      )}

      {messages.map((msg, idx) => {
        const isLastMsg = idx === messages.length - 1;
        if (msg.role === "user") {
          return <UserMessage key={msg.id} content={msg.content} />;
        }
        return (
          <BotMessage
            key={msg.id}
            content={msg.content}
            isLastAndStreaming={isLastMsg && isStreaming}
            ragChunks={msg.ragChunks ?? 0}
            ragTexts={msg.ragTexts ?? []}
          />
        );
      })}

      {showTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </main>
  );
}
