import { useState, useEffect, useRef } from "react";
import TypingIndicator from "./TypingIndicator.jsx";

function renderText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
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

// Split AI response into theory / practice / source buckets
function parseIntoSections(text) {
  if (!text.includes("🔍") && !text.includes("🌏")) return null;
  const buckets = { theory: [], practice: [], source: [] };
  let current = null;
  for (const line of text.split("\n")) {
    if (line.includes("🔍") || line.includes("📖")) current = "theory";
    else if (line.includes("🌏")) current = "practice";
    else if (line.includes("📚")) current = "source";
    if (current) buckets[current].push(line);
  }
  const t = buckets.theory.join("\n").trim();
  const p = buckets.practice.join("\n").trim();
  const s = buckets.source.join("\n").trim();
  if (!t && !p) return null;
  return { theory: t, practice: p, source: s };
}

function AccordionSection({ title, content, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="acc-section">
      <button className="acc-header" onClick={() => setOpen((o) => !o)}>
        <span className="acc-header-title">{title}</span>
        <span className="acc-chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="acc-body">{renderText(content)}</div>}
    </div>
  );
}

function RagSourcePanel({ chunks, texts }) {
  const [open, setOpen] = useState(false);
  const badgeCls =
    chunks >= 3 ? "rag-chip rag-chip--green"
    : chunks >= 1 ? "rag-chip rag-chip--yellow"
    : "rag-chip";

  return (
    <div className="rag-source-wrap">
      <button className={badgeCls} onClick={() => setOpen((o) => !o)}>
        📚 {chunks} đoạn giáo trình · {open ? "ẩn nguồn ▲" : "xem nguồn ▼"}
      </button>
      {open && (
        <div className="rag-source-panel">
          <div className="rag-source-header">
            Đoạn trích từ giáo trình MLN111 được AI sử dụng để trả lời
          </div>
          {texts.map((t, i) => (
            <div key={i} className="rag-source-chunk">
              <span className="rag-chunk-num">#{i + 1}</span>
              <p className="rag-chunk-text">{t}</p>
            </div>
          ))}
          <div className="rag-source-note">
            So sánh câu trả lời của AI với các đoạn trích trên để kiểm tra độ chính xác.
          </div>
        </div>
      )}
    </div>
  );
}

function BotMessage({ content, isLastAndStreaming, ragChunks, ragTexts }) {
  const isEmpty = content === "" && isLastAndStreaming;

  // Plain bubble while streaming (avoids jumpy partial parsing)
  if (isLastAndStreaming) {
    return (
      <div className="message-row bot-row">
        <div className="bot-avatar" aria-hidden="true">M</div>
        <div className="bot-message-body">
          <div className="bubble bot-bubble">
            {isEmpty
              ? <span className="stream-placeholder">đang soạn thảo…</span>
              : renderText(content)
            }
          </div>
        </div>
      </div>
    );
  }

  const sections = parseIntoSections(content);

  return (
    <div className="message-row bot-row">
      <div className="bot-avatar" aria-hidden="true">M</div>
      <div className="bot-message-body">
        {sections ? (
          <div className="msg-accordion">
            {sections.theory && (
              <AccordionSection title="LÝ THUYẾT" content={sections.theory} defaultOpen={true} />
            )}
            {sections.practice && (
              <AccordionSection title="THỰC HÀNH" content={sections.practice} defaultOpen={true} />
            )}
            {sections.source && (
              <div className="acc-source">{renderText(sections.source)}</div>
            )}
          </div>
        ) : (
          <div className="bubble bot-bubble">{renderText(content)}</div>
        )}
        {ragChunks > 0 && (
          <RagSourcePanel chunks={ragChunks} texts={ragTexts ?? []} />
        )}
        {ragChunks === 0 && content && !isLastAndStreaming && (
          <div className="rag-chip rag-chip--none">⚠ Không tìm thấy đoạn giáo trình liên quan — câu trả lời dựa trên kiến thức chung</div>
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
            <div className="empty-emblem-inner">
              <span className="empty-emblem-letter">M</span>
              <span className="empty-emblem-star">★ ★ ★</span>
            </div>
          </div>
          <div className="empty-rule" />
          <p className="empty-title">Chào đồng chí sinh viên!</p>
          <div className="empty-rule-thin" />
          <p className="empty-hint">
            Tôi là <em>Hỏi Marx</em> — trợ lý học tập MLN111 của bạn.
            Hỏi bất kỳ điều gì về triết học Marx-Lenin, hoặc nhấn{" "}
            <strong>Quiz</strong> để ôn thi ngay.
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
