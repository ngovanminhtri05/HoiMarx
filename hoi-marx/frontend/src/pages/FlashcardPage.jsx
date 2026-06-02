import { useState, useMemo, useCallback } from "react";
import { mindmapData } from "../data/mindmapData.js";

// Flatten mindmap tree into flat card array
function flattenMindmap(node) {
  const cards = [];
  if (node.def) {
    cards.push({
      id: node.id,
      label: node.label,
      sublabel: node.sublabel || "",
      def: node.def,
      color: node.color,
      textColor: node.textColor || "#fff",
    });
  }
  for (const child of node.children || []) {
    cards.push(...flattenMindmap(child));
  }
  return cards;
}

const ALL_CARDS = flattenMindmap(mindmapData);

const FILTERS = [
  { id: "all",      label: "Tất cả" },
  { id: "study",    label: "Đang học" },
  { id: "mastered", label: "Đã thuộc" },
];

export default function FlashcardPage() {
  const [mastered, setMastered] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("hm-mastered") ?? "[]")); }
    catch { return new Set(); }
  });
  const [filter,  setFilter]  = useState("all");
  const [idx,     setIdx]     = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = useMemo(() => {
    if (filter === "mastered") return ALL_CARDS.filter((c) => mastered.has(c.id));
    if (filter === "study")    return ALL_CARDS.filter((c) => !mastered.has(c.id));
    return ALL_CARDS;
  }, [filter, mastered]);

  const total    = cards.length;
  const safeIdx  = total ? idx % total : 0;
  const card     = cards[safeIdx] ?? null;
  const position = total ? safeIdx + 1 : 0;
  const isMastered = card ? mastered.has(card.id) : false;

  const handleFilter = (f) => { setFilter(f); setIdx(0); setFlipped(false); };
  const handleFlip   = ()  => setFlipped((p) => !p);

  const go = (dir) => {
    setIdx((p) => {
      const n = p + dir;
      if (n < 0) return Math.max(0, total - 1);
      return n;
    });
    setFlipped(false);
  };

  const handleMark = useCallback((mark) => {
    if (!card) return;
    setMastered((prev) => {
      const next = new Set(prev);
      mark ? next.add(card.id) : next.delete(card.id);
      localStorage.setItem("hm-mastered", JSON.stringify([...next]));
      return next;
    });
    setIdx((p) => p + 1);
    setFlipped(false);
  }, [card]);

  return (
    <div className="fc-page">
      {/* Header */}
      <div className="fc-header">
        <div>
          <h2 className="fc-title">THẺ HỌC TẬP</h2>
          <p className="fc-subtitle">
            MLN111 · {mastered.size}/{ALL_CARDS.length} đã thuộc
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="fc-filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`fc-filter-btn ${filter === f.id ? "fc-filter-btn--active" : ""}`}
            onClick={() => handleFilter(f.id)}
          >
            {f.label}
            {f.id === "mastered" && mastered.size > 0 && (
              <span className="fc-filter-count">{mastered.size}</span>
            )}
            {f.id === "study" && (
              <span className="fc-filter-count">{ALL_CARDS.length - mastered.size}</span>
            )}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="fc-progress-row">
          <span className="fc-progress-label">{position}/{total}</span>
          <div className="fc-progress-bar">
            <div
              className="fc-progress-fill"
              style={{ width: `${(position / total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Card or empty state */}
      {!card ? (
        <div className="fc-empty">
          {filter === "mastered"
            ? "Chưa có thẻ nào được đánh dấu đã thuộc."
            : "Bạn đã thuộc hết tất cả thẻ! 🎉"}
        </div>
      ) : (
        <>
          <div className="fc-scene" onClick={handleFlip}>
            <div className={`fc-card ${flipped ? "fc-card--flipped" : ""}`}>
              {/* Front — term */}
              <div className="fc-face fc-front" style={{ background: card.color }}>
                {isMastered && (
                  <span className="fc-mastered-ribbon">✓ Đã thuộc</span>
                )}
                {card.sublabel && (
                  <div className="fc-front-sub" style={{ color: card.textColor }}>
                    {card.sublabel}
                  </div>
                )}
                <div className="fc-front-term" style={{ color: card.textColor }}>
                  {card.label}
                </div>
                <div className="fc-flip-hint" style={{ color: card.textColor }}>
                  nhấn để xem định nghĩa
                </div>
              </div>

              {/* Back — definition */}
              <div className="fc-face fc-back">
                <div className="fc-back-term">{card.label}</div>
                <p className="fc-back-def">{card.def}</p>
              </div>
            </div>
          </div>

          {/* Action row */}
          <div className="fc-actions">
            <button className="fc-nav-btn" onClick={() => go(-1)} title="Trước">←</button>

            {flipped ? (
              <>
                <button
                  className="fc-action-btn fc-action-btn--study"
                  onClick={() => handleMark(false)}
                >
                  ↩ Cần ôn
                </button>
                <button
                  className="fc-action-btn fc-action-btn--master"
                  onClick={() => handleMark(true)}
                >
                  ✓ Đã thuộc
                </button>
              </>
            ) : (
              <button
                className="fc-action-btn fc-action-btn--flip"
                onClick={handleFlip}
              >
                Xem định nghĩa
              </button>
            )}

            <button className="fc-nav-btn" onClick={() => go(1)} title="Tiếp">→</button>
          </div>
        </>
      )}
    </div>
  );
}
