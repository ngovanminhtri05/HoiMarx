import { useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";

export default function InputBar({ input, setInput, onSend, isStreaming }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 132)}px`;
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(input);
    }
  };

  const canSend = input.trim().length > 0 && !isStreaming;

  return (
    <form className="input-bar" onSubmit={(e) => e.preventDefault()}>
      <textarea
        ref={textareaRef}
        className="input-textarea"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Hỏi về Marx-Lenin, một khái niệm khó hiểu, hoặc gõ 'quiz' để ôn thi"
        disabled={isStreaming}
        aria-label="Nhập câu hỏi"
      />
      <button
        className="send-btn"
        onClick={() => onSend(input)}
        disabled={!canSend}
        aria-label="Gửi câu hỏi"
        title="Gửi bằng Enter"
        type="button"
      >
        <SendHorizontal size={21} strokeWidth={2.3} />
      </button>
    </form>
  );
}
