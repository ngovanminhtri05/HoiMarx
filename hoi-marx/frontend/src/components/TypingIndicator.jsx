import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="message-row bot-row">
      <div className="bot-avatar" aria-hidden="true">
        <Bot size={18} strokeWidth={2.2} />
      </div>
      <div className="bubble bot-bubble typing-bubble" aria-label="Đang soạn câu trả lời">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}
