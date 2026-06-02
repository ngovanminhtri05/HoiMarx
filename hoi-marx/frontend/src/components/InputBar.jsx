import { useRef, useEffect } from "react";

export default function InputBar({ input, setInput, onSend, isStreaming }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 130) + "px";
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(input);
    }
  };

  const canSend = input.trim().length > 0 && !isStreaming;

  return (
    <div className="input-bar">
      <textarea
        ref={textareaRef}
        className="input-textarea"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Hỏi về Marx-Lenin... hoặc gõ 'quiz' để ôn thi"
        disabled={isStreaming}
        aria-label="Nhập câu hỏi"
      />
      <button
        className="send-btn"
        onClick={() => onSend(input)}
        disabled={!canSend}
        aria-label="Gửi"
        title="Gửi (Enter)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}
