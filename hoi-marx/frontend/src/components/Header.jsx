import { Map, Target } from "lucide-react";

export default function Header({ onQuickAction, isStreaming }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <img
            className="header-logo"
            src="/logo.png"
            alt="Hỏi Marx"
            width="52"
            height="52"
          />
          <div className="header-titles">
            <span className="header-title">Hỏi Marx</span>
            <span className="header-subtitle">Chạm vào tri thức, đánh thức tư duy.</span>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="quick-btn"
            onClick={() => onQuickAction("quiz")}
            disabled={isStreaming}
            title="Bắt đầu ôn thi"
          >
            <Target size={16} strokeWidth={2.2} />
            Ôn nhanh
          </button>
          <button
            className="quick-btn"
            onClick={() => onQuickAction("sơ đồ")}
            disabled={isStreaming}
            title="Hỏi về sơ đồ khái niệm"
          >
            <Map size={16} strokeWidth={2.2} />
            Sơ đồ
          </button>
        </div>
      </div>
    </header>
  );
}
