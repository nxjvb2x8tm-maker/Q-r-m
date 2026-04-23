import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NE_KIM_LEFT, NE_KIM_RIGHT } from "../../data/grammar.js";
import PictureQuiz from "./PictureQuiz.jsx";

function NeKimRow({ item, answers, results, checked, onChoose, T }) {
  const chosen = answers[item.word];
  const res = results[item.word];
  const isWrong = checked && chosen && !res;
  const isRight = checked && chosen && res;
  return (
    <motion.div
      animate={{
        background: isRight
          ? "rgba(0,184,148,0.08)"
          : isWrong
          ? "rgba(255,91,91,0.08)"
          : "rgba(0,0,0,0)",
        x: isWrong ? [0, -4, 4, -2, 2, 0] : 0,
      }}
      transition={{ duration: 0.35 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        marginBottom: 7,
        padding: "3px 4px",
        borderRadius: 8,
      }}
    >
      <span style={{ flex: 1, color: T.text, fontSize: 12, fontWeight: 700 }}>{item.word}</span>
      {["ne", "kim"].map((col, idx) => {
        const sel = chosen === col;
        const correctVal = item.answer === col;
        const positive = sel && (isRight ? correctVal : isWrong ? false : false);
        const activeBg = sel
          ? isRight && correctVal
            ? "rgba(0,184,148,0.2)"
            : isWrong
            ? "rgba(255,91,91,0.15)"
            : col === "ne"
            ? "rgba(91,170,238,0.2)"
            : "rgba(78,203,168,0.2)"
          : checked && correctVal
          ? "rgba(0,184,148,0.06)"
          : T.card2;
        const activeBorder = sel
          ? isRight && correctVal
            ? T.green
            : isWrong
            ? T.red
            : col === "ne"
            ? "#5BAAEE"
            : "#4ECBA8"
          : checked && correctVal
          ? T.green + "66"
          : T.border;
        const activeColor = sel
          ? isRight && correctVal
            ? T.green
            : isWrong
            ? T.red
            : col === "ne"
            ? "#5BAAEE"
            : "#4ECBA8"
          : T.text2;
        return (
          <motion.button
            key={col}
            whileTap={{ scale: 0.92 }}
            onClick={() => onChoose(item.word, col)}
            style={{
              padding: "4px 8px",
              borderRadius: idx === 0 ? "7px 0 0 7px" : "0 7px 7px 0",
              cursor: checked ? "default" : "pointer",
              fontFamily: "'Nunito',sans-serif",
              fontSize: 11,
              fontWeight: 800,
              background: activeBg,
              border: `1.5px solid ${activeBorder}`,
              color: activeColor,
              transition: "all 0.15s",
            }}
          >
            {col === "ne" ? "Ne" : "Kim"}
          </motion.button>
        );
      })}
      {checked && chosen && <span style={{ fontSize: 12, minWidth: 14 }}>{res ? "✓" : "✗"}</span>}
    </motion.div>
  );
}

export default function Grammar1Section2({ T, onBack, backToS1 }) {
  const [showPicQuiz, setShowPicQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({});

  if (showPicQuiz) return <PictureQuiz T={T} onBack={() => setShowPicQuiz(false)} />;

  const ALL = [...NE_KIM_LEFT, ...NE_KIM_RIGHT];

  function choose(word, col) {
    if (checked) {
      setChecked(false);
      setResults({});
    }
    setAnswers((a) => ({ ...a, [word]: col }));
  }
  function checkAll() {
    const res = {};
    ALL.forEach((item) => {
      if (answers[item.word]) res[item.word] = answers[item.word] === item.answer;
    });
    setResults(res);
    setChecked(true);
  }
  function reset() {
    setAnswers({});
    setChecked(false);
    setResults({});
  }

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === ALL.length;
  const correctCount = Object.values(results).filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
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
      <div style={{ padding: "14px 16px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={backToS1}
            style={{
              background: T.card2,
              border: `1px solid ${T.border}`,
              color: T.text,
              borderRadius: 12,
              padding: "8px 14px",
              cursor: "pointer",
              fontFamily: "'Nunito',sans-serif",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            ← Назад
          </motion.button>
          <div>
            <p style={{ color: "#FD79A8", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", margin: 0 }}>
              TIL BİLGİSİ 1 · РАЗДЕЛ 2
            </p>
            <p style={{ color: T.text, fontSize: 16, fontWeight: 900, margin: 0 }}>
              Вопросы Ne? · Kim?
            </p>
          </div>
        </div>

        {/* explanation card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: T.card,
            borderRadius: 20,
            border: `1px solid ${T.isDark ? "rgba(42,128,200,0.25)" : "#BDD8F0"}`,
            overflow: "hidden",
            marginBottom: 14,
            boxShadow: `0 4px 20px ${T.isDark ? "rgba(42,128,200,0.1)" : "rgba(42,128,200,0.08)"}`,
          }}
        >
          <div style={{ background: T.isDark ? "#1A4A7A" : "#2A7AB0", padding: "10px 16px" }}>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>
              TIL BİLGİSİ 2 · ВОПРОСЫ NE? · KIM?
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 14 }}>
            <div
              style={{
                background: T.isDark ? "rgba(42,128,200,0.12)" : "#EEF6FF",
                borderRadius: 14,
                border: `1.5px solid ${T.isDark ? "rgba(42,128,200,0.35)" : "#A8D4F0"}`,
                padding: 14,
              }}
            >
              <p style={{ color: T.isDark ? "#5BAAEE" : "#2A7AB0", fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}>
                Ne?
              </p>
              <p style={{ color: T.text2, fontSize: 11, margin: "0 0 10px" }}>Что? — о неодушевлённых</p>
              {["Bu ne? — Bu defter.", "Şu ne? — Şu bilgisayar.", "Olar ne? — Olar kitap.", "Bu ne? — Bu mektep."].map((ex, i) => (
                <p key={i} style={{ color: T.text, fontSize: 11, margin: "0 0 4px", lineHeight: 1.4 }}>
                  —{" "}
                  <span style={{ color: T.isDark ? "#5BAAEE" : "#2A7AB0", fontWeight: 700 }}>
                    {ex.split("—")[0].trim()}
                  </span>{" "}
                  — {ex.split("—")[1]?.trim()}
                </p>
              ))}
            </div>
            <div
              style={{
                background: T.isDark ? "rgba(42,128,112,0.12)" : "#EEF8F5",
                borderRadius: 14,
                border: `1.5px solid ${T.isDark ? "rgba(42,128,112,0.35)" : "#A8DDD0"}`,
                padding: 14,
              }}
            >
              <p style={{ color: T.isDark ? "#4ECBA8" : "#2A8070", fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}>
                Kim?
              </p>
              <p style={{ color: T.text2, fontSize: 11, margin: "0 0 10px" }}>Кто? — об одушевлённых</p>
              {["Bu kim? — Bu oca.", "O kim? — O talebe.", "Bunlar kim? — Bunlar ekim.", "Olar kim? — Olar advokat."].map((ex, i) => (
                <p key={i} style={{ color: T.text, fontSize: 11, margin: "0 0 4px", lineHeight: 1.4 }}>
                  —{" "}
                  <span style={{ color: T.isDark ? "#4ECBA8" : "#2A8070", fontWeight: 700 }}>
                    {ex.split("—")[0].trim()}
                  </span>{" "}
                  — {ex.split("—")[1]?.trim()}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* VAZIFE 2 */}
        <div
          style={{
            background: T.card,
            borderRadius: 20,
            border: `1px solid ${T.isDark ? "rgba(232,112,64,0.25)" : "#F0C098"}`,
            overflow: "hidden",
            marginBottom: 14,
          }}
        >
          <div style={{ background: T.isDark ? "#B85A28" : "#E87040", padding: "10px 16px" }}>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>
              VAZIFE 2 · РАЗДЕЛИТЕ СЛОВА: NE? · KIM?
            </span>
          </div>
          <div style={{ padding: "10px 14px", color: T.text2, fontSize: 11, fontWeight: 700 }}>
            {answeredCount}/{ALL.length}
          </div>
          <div style={{ margin: "0 14px 10px", background: T.card2, borderRadius: 100, height: 4, overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${(answeredCount / ALL.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              style={{ height: "100%", background: T.accent }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "0 12px 14px" }}>
            <div>
              {NE_KIM_LEFT.map((item) => (
                <NeKimRow key={item.word} item={item} answers={answers} results={results} checked={checked} onChoose={choose} T={T} />
              ))}
            </div>
            <div>
              {NE_KIM_RIGHT.map((item) => (
                <NeKimRow key={item.word} item={item} answers={answers} results={results} checked={checked} onChoose={choose} T={T} />
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: correctCount === ALL.length ? "rgba(0,184,148,0.12)" : T.card2,
                border: `1px solid ${correctCount === ALL.length ? T.green : T.border}`,
                borderRadius: 14,
                padding: "12px 16px",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              <p style={{ color: T.text, fontSize: 15, fontWeight: 900, margin: "0 0 2px" }}>
                {correctCount === ALL.length
                  ? "🎉 Harika! Все верно!"
                  : `${correctCount} / ${ALL.length} правильно`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!checked ? (
          <motion.button
            whileTap={allAnswered ? { scale: 0.97 } : {}}
            onClick={checkAll}
            disabled={!allAnswered}
            style={{
              width: "100%",
              padding: "15px 0",
              background: allAnswered ? "#00B894" : T.card2,
              border: "none",
              borderRadius: 16,
              cursor: allAnswered ? "pointer" : "not-allowed",
              color: allAnswered ? "#fff" : T.text2,
              fontFamily: "'Nunito',sans-serif",
              fontSize: 16,
              fontWeight: 900,
              boxShadow: allAnswered ? "0 4px 20px rgba(0,184,148,0.4)" : "none",
            }}
          >
            Teşker ✓
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={reset}
            style={{
              width: "100%",
              padding: "14px 0",
              background: T.accent,
              border: "none",
              borderRadius: 16,
              cursor: "pointer",
              color: "#fff",
              fontFamily: "'Nunito',sans-serif",
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            🔄 Tekrar / Снова
          </motion.button>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowPicQuiz(true)}
          style={{
            width: "100%",
            marginTop: 10,
            padding: "15px 0",
            background: "linear-gradient(135deg,#FD79A8,#F953C6)",
            border: "none",
            borderRadius: 16,
            cursor: "pointer",
            color: "#fff",
            fontFamily: "'Nunito',sans-serif",
            fontSize: 15,
            fontWeight: 900,
            boxShadow: "0 4px 20px rgba(253,121,168,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          Devam et — картинки <span style={{ fontSize: 18 }}>→</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={backToS1}
          style={{
            width: "100%",
            marginTop: 10,
            padding: "12px 0",
            background: "transparent",
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            cursor: "pointer",
            color: T.text2,
            fontFamily: "'Nunito',sans-serif",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          ← Вернуться к Bu / Şu / O
        </motion.button>
      </div>
    </motion.div>
  );
}
