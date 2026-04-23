import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS } from "../../components/Scenes.jsx";

export default function PictureQuiz({ T, onBack }) {
  const [qi, setQi] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[qi];
  const Scene = q.SceneComp;
  const isCorrect = chosen === q.answer;

  function pick(opt) {
    if (!checked) setChosen(opt);
  }
  function confirm() {
    if (!chosen) return;
    setChecked(true);
    if (chosen === q.answer) setScore((s) => s + 1);
    else {
      setShake(true);
      setTimeout(() => setShake(false), 420);
    }
  }
  function next() {
    if (qi + 1 >= total) {
      setDone(true);
      return;
    }
    setQi((i) => i + 1);
    setChosen(null);
    setChecked(false);
  }
  function restart() {
    setQi(0);
    setChosen(null);
    setChecked(false);
    setScore(0);
    setDone(false);
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: "absolute",
          inset: 0,
          background: T.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Nunito',sans-serif",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0.4, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 15 }}
          style={{ fontSize: 64, marginBottom: 12 }}
        >
          {pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📖"}
        </motion.div>
        <h2 style={{ color: T.text, fontSize: 24, fontWeight: 900, margin: "0 0 8px" }}>
          {pct >= 80 ? "Harika! Отлично!" : pct >= 50 ? "Yaxşı! Хорошо!" : "Tekrar dene!"}
        </h2>
        <p style={{ color: T.text2, fontSize: 14, margin: "0 0 28px" }}>
          {score} / {total} · {pct}%
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 300 }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={restart}
            style={{
              background: T.accent,
              border: "none",
              borderRadius: 16,
              padding: "15px 0",
              color: "#fff",
              fontSize: 15,
              fontWeight: 900,
              cursor: "pointer",
              fontFamily: "'Nunito',sans-serif",
            }}
          >
            🔄 Tekrar / Снова
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onBack}
            style={{
              background: T.card2,
              border: `1px solid ${T.border}`,
              borderRadius: 16,
              padding: "13px 0",
              color: T.text,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Nunito',sans-serif",
            }}
          >
            ← К грамматике
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        inset: 0,
        overflowY: "auto",
        scrollbarWidth: "none",
        background: T.bg,
        fontFamily: "'Nunito',sans-serif",
      }}
    >
      <div style={{ padding: "16px 16px 40px" }}>
        {/* progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, background: T.card2, borderRadius: 100, height: 6, overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${((qi + 1) / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              style={{ height: "100%", background: "#FD79A8" }}
            />
          </div>
          <span style={{ color: T.text2, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
            {qi + 1}/{total}
          </span>
          <motion.div
            key={"s" + score}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            style={{ background: T.accentGlow, borderRadius: 100, padding: "4px 12px" }}
          >
            <span style={{ color: T.accent, fontSize: 12, fontWeight: 800 }}>⭐ {score}</span>
          </motion.div>
        </div>

        {/* scene */}
        <AnimatePresence mode="wait">
          <motion.div
            key={"scene" + qi}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: shake ? [0, -6, 6, -4, 4, 0] : 0,
            }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            style={{
              borderRadius: 18,
              overflow: "hidden",
              marginBottom: 14,
              boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
            }}
          >
            <Scene />
          </motion.div>
        </AnimatePresence>

        {/* label */}
        <div
          style={{
            background: T.card,
            borderRadius: 16,
            padding: "12px 18px",
            marginBottom: 14,
            border: `1px solid ${T.border}`,
            textAlign: "center",
          }}
        >
          <p style={{ color: T.text, fontSize: 20, fontWeight: 900, margin: "0 0 4px" }}>
            {q.object}{" "}
            <span style={{ color: T.text2, fontSize: 14, fontWeight: 600 }}>
              ({q.hint})
            </span>
          </p>
          <p style={{ color: T.text2, fontSize: 13, fontWeight: 700, margin: 0 }}>Как спросить?</p>
        </div>

        {/* options 2x2 */}
        <motion.div
          key={"opts" + qi}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}
        >
          {q.options.map((opt) => {
            const isSel = chosen === opt;
            const isAns = opt === q.answer;
            let bg = T.card2;
            let brd = `1px solid ${T.border}`;
            let col = T.text;
            if (isSel && !checked) {
              bg = T.accentGlow;
              brd = `2px solid ${T.accent}`;
              col = T.accentL;
            }
            if (checked && isSel && isAns) {
              bg = "rgba(0,184,148,0.18)";
              brd = "2px solid #00B894";
              col = "#00B894";
            }
            if (checked && isSel && !isAns) {
              bg = "rgba(255,91,91,0.18)";
              brd = "2px solid #FF5B5B";
              col = "#FF5B5B";
            }
            if (checked && !isSel && isAns) brd = `2px solid ${T.green}88`;
            return (
              <motion.button
                key={opt}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 360, damping: 24 } },
                }}
                whileTap={checked ? {} : { scale: 0.96 }}
                animate={
                  checked && isSel && isAns
                    ? { scale: [1, 1.06, 1], transition: { duration: 0.4 } }
                    : {}
                }
                onClick={() => pick(opt)}
                style={{
                  background: bg,
                  border: brd,
                  color: col,
                  borderRadius: 14,
                  padding: "16px 8px",
                  fontFamily: "'Nunito',sans-serif",
                  fontSize: 15,
                  fontWeight: 900,
                  cursor: checked ? "default" : "pointer",
                  textAlign: "center",
                }}
              >
                {opt}
                {checked && isSel && isAns && " ✓"}
                {checked && isSel && !isAns && " ✗"}
              </motion.button>
            );
          })}
        </motion.div>

        {/* feedback */}
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              style={{
                background: isCorrect ? "rgba(0,184,148,0.12)" : "rgba(255,91,91,0.12)",
                border: `1px solid ${isCorrect ? "#00B894" : "#FF5B5B"}`,
                borderRadius: 14,
                padding: "12px 16px",
                marginBottom: 14,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: isCorrect ? "#00B894" : "#FF5B5B",
                  fontSize: 15,
                  fontWeight: 900,
                  margin: "0 0 4px",
                }}
              >
                {isCorrect ? "✓ Doğru! Правильно!" : "✗ Yanlış. Неправильно."}
              </p>
              {!isCorrect && (
                <p style={{ color: T.text2, fontSize: 13, margin: 0 }}>
                  Правильный ответ:{" "}
                  <span style={{ fontWeight: 800, color: T.text }}>{q.answer}</span>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* button */}
        <AnimatePresence mode="wait">
          {!checked ? (
            <motion.button
              key="confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileTap={chosen ? { scale: 0.97 } : {}}
              onClick={confirm}
              disabled={!chosen}
              style={{
                width: "100%",
                padding: "16px 0",
                background: chosen ? "#00B894" : T.card2,
                border: "none",
                borderRadius: 16,
                cursor: chosen ? "pointer" : "not-allowed",
                color: chosen ? "#fff" : T.text2,
                fontFamily: "'Nunito',sans-serif",
                fontSize: 16,
                fontWeight: 900,
                boxShadow: chosen ? "0 4px 20px rgba(0,184,148,0.4)" : "none",
              }}
            >
              Teşker ✓
            </motion.button>
          ) : (
            <motion.button
              key="next"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={next}
              style={{
                width: "100%",
                padding: "16px 0",
                background: "linear-gradient(135deg,#FD79A8,#F953C6)",
                border: "none",
                borderRadius: 16,
                cursor: "pointer",
                color: "#fff",
                fontFamily: "'Nunito',sans-serif",
                fontSize: 16,
                fontWeight: 900,
                boxShadow: "0 4px 20px rgba(253,121,168,0.4)",
              }}
            >
              {qi + 1 < total ? "Devam et →" : "Sonuç 🏆"}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
