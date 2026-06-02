export default function TypingIndicator() {
  return (
    <div className="message-row bot-row">
      <div className="bot-avatar" aria-hidden="true">M</div>
      <div className="bubble bot-bubble typing-bubble" aria-label="Đang soạn thảo…">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}
