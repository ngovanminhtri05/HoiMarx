import { Brain, Library, MessageCircle, Network } from "lucide-react";

const TABS = [
  { id: "chat", icon: MessageCircle, label: "Chat" },
  { id: "quiz", icon: Brain, label: "Ôn thi" },
  { id: "flashcard", icon: Library, label: "Thẻ học" },
  { id: "mindmap", icon: Network, label: "Mindmap" },
];

export default function NavBar({ activePage, onNavigate, dynamicCount = 0 }) {
  return (
    <nav className="navbar" aria-label="Điều hướng chính">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`navbar-tab ${activePage === tab.id ? "navbar-tab--active" : ""}`}
            onClick={() => onNavigate(tab.id)}
            aria-current={activePage === tab.id ? "page" : undefined}
          >
            <span className="navbar-icon" aria-hidden="true">
              <Icon size={21} strokeWidth={2.1} />
              {tab.id === "quiz" && dynamicCount > 0 && (
                <span className="navbar-badge">{dynamicCount > 9 ? "9+" : dynamicCount}</span>
              )}
            </span>
            <span className="navbar-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
