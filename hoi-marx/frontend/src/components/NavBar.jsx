const TABS = [
  { id: "chat",      icon: "💬", label: "Chat" },
  { id: "quiz",      icon: "🎯", label: "Ôn thi" },
  { id: "flashcard", icon: "🃏", label: "Thẻ học" },
  { id: "mindmap",   icon: "🗺️", label: "Mindmap" },
];

export default function NavBar({ activePage, onNavigate, dynamicCount = 0 }) {
  return (
    <nav className="navbar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`navbar-tab ${activePage === tab.id ? "navbar-tab--active" : ""}`}
          onClick={() => onNavigate(tab.id)}
          aria-current={activePage === tab.id ? "page" : undefined}
        >
          <span className="navbar-icon" aria-hidden="true">
            {tab.icon}
            {tab.id === "quiz" && dynamicCount > 0 && (
              <span className="navbar-badge">{dynamicCount > 9 ? "9+" : dynamicCount}</span>
            )}
          </span>
          <span className="navbar-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
