export default function Header({ onQuickAction, isStreaming }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-star" aria-hidden="true">★</span>
          <div className="header-titles">
            <span className="header-title">Hỏi Marx</span>
            <span className="header-subtitle">Triết học Marx-Lenin · MLN111</span>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="quick-btn"
            onClick={() => onQuickAction("quiz")}
            disabled={isStreaming}
            title="Bắt đầu quiz ôn thi"
          >
            🎯 Quiz
          </button>
          <button
            className="quick-btn"
            onClick={() => onQuickAction("sơ đồ")}
            disabled={isStreaming}
            title="Xem sơ đồ khái niệm"
          >
            🗺️ Sơ đồ
          </button>
        </div>
      </div>
    </header>
  );
}
