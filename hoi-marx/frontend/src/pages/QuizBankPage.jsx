import { useState, useMemo, useCallback } from "react";
import { CheckCircle2, RotateCcw, Shuffle, XCircle } from "lucide-react";
import { questions, SECTIONS } from "../data/questions.js";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizBankPage({ dynamicQuestions = [] }) {
  const [section, setSection] = useState("all");
  const [localQueue, setLocalQueue] = useState(() => shuffle([...dynamicQuestions, ...questions]));
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showExp, setShowExp] = useState(false);

  const computedSections = useMemo(() => {
    if (!dynamicQuestions.length) return SECTIONS;
    return [SECTIONS[0], { id: "dynamic", label: "Từ chat" }, ...SECTIONS.slice(1)];
  }, [dynamicQuestions.length]);

  const getPool = useCallback(
    (s) => {
      if (s === "all") return [...dynamicQuestions, ...questions];
      if (s === "dynamic") return dynamicQuestions;
      return questions.filter((q) => q.section === s);
    },
    [dynamicQuestions]
  );

  const handleSection = useCallback(
    (s) => {
      setSection(s);
      setLocalQueue(shuffle(getPool(s)));
      setIdx(0);
      setChosen(null);
      setShowExp(false);
    },
    [getPool]
  );

  const activeQueue = localQueue.length ? localQueue : shuffle(getPool("all"));
  const q = activeQueue[idx % activeQueue.length];
  const position = (idx % activeQueue.length) + 1;
  const total = activeQueue.length;
  const isDynamic = String(q?.id ?? "").startsWith("dyn-");

  const handleChoose = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    setShowExp(true);
    setScore((prev) => ({
      correct: prev.correct + (i === q.answer ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    setIdx((prev) => prev + 1);
    setChosen(null);
    setShowExp(false);
  };

  const handleShuffle = () => {
    setLocalQueue(shuffle(getPool(section)));
    setIdx(0);
    setChosen(null);
    setShowExp(false);
  };

  if (!q) return null;

  return (
    <div className="qb-page">
      <div className="page-header qb-header">
        <div className="page-heading">
          <p className="page-kicker">Luyện trắc nghiệm</p>
          <h2 className="page-title">Bộ đề ôn thi</h2>
          <p className="page-subtitle">
            {total} câu trong bộ hiện tại, đã đúng {score.correct}/{score.total || 0}
          </p>
        </div>
        <button className="icon-text-btn qb-shuffle-btn" onClick={handleShuffle} title="Xáo bộ câu hỏi">
          <Shuffle size={17} strokeWidth={2.2} />
          Xáo câu
        </button>

        <div className="qb-progress-wrap" aria-label={`Câu ${position} / ${total}`}>
          <div className="qb-progress-fill" style={{ width: `${(position / total) * 100}%` }} />
        </div>

        <div className="qb-filters">
          {computedSections.map((s) => (
            <button
              key={s.id}
              className={`qb-filter-btn ${section === s.id ? "qb-filter-btn--active" : ""}`}
              onClick={() => handleSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="qb-body">
        <article className="qb-card" key={`${q.id}-${idx}`}>
          <div className="qb-meta">
            <span className="qb-num">Câu {position}/{total}</span>
            <span className="qb-topic">{q.topic}</span>
            {isDynamic && <span className="qb-dynamic-badge">Từ chat</span>}
            <span className="qb-source">{q.source}</span>
          </div>

          <p className="qb-question">{q.q}</p>

          <ul className="qb-choices">
            {q.choices.map((choice, i) => {
              let cls = "qb-choice";
              if (chosen !== null) {
                if (i === q.answer) cls += " qb-choice--correct";
                else if (i === chosen) cls += " qb-choice--wrong";
              }
              return (
                <li key={i}>
                  <button className={cls} onClick={() => handleChoose(i)} disabled={chosen !== null}>
                    <span className="qb-choice-label">{String.fromCharCode(65 + i)}</span>
                    <span className="qb-choice-text">{choice}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {showExp && (
            <div className="qb-explanation">
              <p className="qb-exp-verdict">
                {chosen === q.answer ? (
                  <>
                    <CheckCircle2 size={18} strokeWidth={2.2} />
                    Chính xác
                  </>
                ) : (
                  <>
                    <XCircle size={18} strokeWidth={2.2} />
                    Đáp án đúng: {String.fromCharCode(65 + q.answer)}
                  </>
                )}
              </p>
              <p className="qb-exp-text">{q.explanation}</p>
              <p className="qb-exp-source">{q.source}</p>
            </div>
          )}
        </article>
      </div>

      {chosen !== null && (
        <div className="qb-footer">
          <button className="qb-next-btn" onClick={handleNext}>
            <RotateCcw size={17} strokeWidth={2.2} />
            Câu tiếp theo
          </button>
        </div>
      )}
    </div>
  );
}
