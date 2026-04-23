import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { G1_EXERCISES } from "../../data/grammar.js";
import Grammar1Section2 from "./Grammar1Section2.jsx";

const OPTS1 = ["Bu", "Şu", "O"];
const OPTS2 = ["Bunlar", "Şunlar", "Olar"];

export default function Grammar1({ T, onBack }) {
  const [section, setSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({});

  if (section === 2)
    return (
      <AnimatePresence mode="wait">
        <Grammar1Section2 key="s2" T={T} onBack={onBack} backToS1={() => setSection(1)} />
      </AnimatePresence>
    );

  function choose(exId, word) {
    if (checked) {
      setChecked(false);
      setResults({});
    }
    setAnswers((a) => ({ ...a, [exId]: word }));
  }
  function check() {
    const res = {};
    G1_EXERCISES.forEach((ex) => {
      res[ex.id] = answers[ex.id] === ex.answer;
    });
    setResults(res);
    setChecked(true);
  }
  function reset() {
    setAnswers({});
    setChecked(false);
    setResults({});
  }

  const allAnswered = G1_EXERCISES.every((ex) => answers[ex.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
            onClick={onBack}
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
              TIL BİLGİSİ 1
            </p>
            <p style={{ color: T.text, fontSize: 16, fontWeight: 900, margin: 0 }}>
              Указательные местоимения
            </p>
          </div>
        </div>

        {/* Pronoun cards */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
          style={{
            background: T.card,
            borderRadius: 20,
            border: `1px solid ${T.isDark ? "rgba(253,121,168,0.25)" : "#FD79A844"}`,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <div style={{ background: "#2A8070", padding: "10px 16px" }}>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>
              TIL BİLGİSİ 1 · УКАЗАТЕЛЬНЫЕ МЕСТОИМЕНИЯ
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: 14 }}>
            {[
              { label: "YAQIN · БЛИЗКО",    word: "Bu", sub: "Это / рядом",       bg: T.isDark ? "rgba(42,128,112,0.18)" : "#E8F8F5", border: "#3AAA8A", color: T.isDark ? "#4ECBA8" : "#2A8070" },
              { label: "UZAQ · ДАЛЬШЕ",     word: "Şu", sub: "Вот / чуть дальше", bg: T.isDark ? "rgba(200,165,0,0.15)" : "#FFFBE8",  border: "#D4AE00", color: T.isDark ? "#F0CA30" : "#B8930A" },
              { label: "PEK UZAQ · ДАЛЕКО", word: "O",  sub: "О",                  bg: T.isDark ? "rgba(230,100,80,0.18)" : "#FEF0EE", border: "#E07060", color: T.isDark ? "#FF8870" : "#D04030" },
            ].map((p, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 24 } },
                }}
                whileHover={{ y: -3, scale: 1.02 }}
                style={{
                  background: p.bg,
                  borderRadius: 14,
                  border: `1.5px solid ${p.border}55`,
                  padding: "12px 8px",
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <p style={{ color: T.text2, fontSize: 8, fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase", margin: "0 0 6px", lineHeight: 1.3 }}>
                  {p.label}
                </p>
                <p style={{ color: p.color, fontSize: 28, fontWeight: 900, margin: "0 0 4px", lineHeight: 1 }}>
                  {p.word}
                </p>
                <p style={{ color: T.text2, fontSize: 10, margin: 0 }}>{p.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Exercise */}
        <div
          style={{
            background: T.card,
            borderRadius: 20,
            border: `1px solid ${T.isDark ? "rgba(253,121,168,0.25)" : "#FD79A844"}`,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <div style={{ background: T.isDark ? "#B85A28" : "#E87040", padding: "10px 16px" }}>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>
              VAZIFE 1 · ВСТАВЬТЕ BU / ŞU / O / BUNLAR / OLAR
            </span>
          </div>

          <div style={{ padding: "4px 14px 14px" }}>
            {G1_EXERCISES.map((ex, i) => {
              const chosen = answers[ex.id];
              const isCorrect = results[ex.id];
              const isWrong = checked && chosen && !isCorrect;
              const isRight = checked && chosen && isCorrect;
              return (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{
                    opacity: 1,
                    x: isWrong ? [0, -6, 6, -3, 3, 0] : 0,
                  }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.4 }}
                  style={{ marginBottom: 14 }}
                >
                  <p style={{ color: T.text2, fontSize: 10, fontWeight: 600, margin: "0 0 4px" }}>
                    {i + 1}.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                    <motion.div
                      animate={{
                        borderColor: isWrong
                          ? "#FF5B5B"
                          : isRight
                          ? "#00B894"
                          : chosen
                          ? T.accent
                          : T.border,
                      }}
                      style={{
                        minWidth: 60,
                        padding: "4px 12px",
                        borderRadius: 8,
                        textAlign: "center",
                        border: "2px solid",
                        background: isWrong
                          ? "rgba(255,91,91,0.1)"
                          : isRight
                          ? "rgba(0,184,148,0.1)"
                          : chosen
                          ? T.accentGlow
                          : "transparent",
                      }}
                    >
                      <span
                        style={{
                          color: isWrong ? "#FF5B5B" : isRight ? "#00B894" : chosen ? T.accent : T.text2,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {chosen || "___"}
                      </span>
                    </motion.div>
                    <span style={{ color: T.text2, fontSize: 12 }}>{ex.hint}</span>
                    <span style={{ color: T.text2, fontSize: 12 }}>—</span>
                    <span style={{ color: T.text, fontSize: 13, fontWeight: 700 }}>{ex.after}</span>
                    {isWrong && (
                      <span style={{ color: "#FF5B5B", fontSize: 10, fontWeight: 700 }}>
                        ✗ → {ex.answer}
                      </span>
                    )}
                    {isRight && <span style={{ color: "#00B894", fontSize: 12 }}>✓</span>}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[OPTS1, OPTS2].map((row, ri) => (
                      <div key={ri} style={{ display: "flex", gap: 8 }}>
                        {row.map((opt) => {
                          const sel = answers[ex.id] === opt;
                          return (
                            <motion.button
                              key={opt}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => choose(ex.id, opt)}
                              animate={{
                                background: sel ? T.accent : T.card2,
                                borderColor: sel ? T.accent : T.border,
                                color: sel ? "#fff" : T.text,
                              }}
                              transition={{ duration: 0.18 }}
                              style={{
                                flex: 1,
                                padding: "8px 4px",
                                borderRadius: 10,
                                cursor: "pointer",
                                fontFamily: "'Nunito',sans-serif",
                                fontSize: 13,
                                fontWeight: sel ? 800 : 600,
                                border: "1.5px solid",
                              }}
                            >
                              {opt}
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {!checked ? (
          <motion.button
            whileTap={allAnswered ? { scale: 0.97 } : {}}
            onClick={check}
            disabled={!allAnswered}
            style={{
              width: "100%",
              padding: "16px 0",
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
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <div
              style={{
                background: T.card2,
                borderRadius: 16,
                padding: "14px 18px",
                border: `1px solid ${T.border}`,
                textAlign: "center",
              }}
            >
              <p style={{ color: T.text, fontSize: 16, fontWeight: 900, margin: "0 0 4px" }}>
                {Object.values(results).filter(Boolean).length} / {G1_EXERCISES.length} правильно
              </p>
              <p style={{ color: T.text2, fontSize: 12, margin: 0 }}>
                {Object.values(results).every(Boolean)
                  ? "Отлично! Все верно 🎉"
                  : "Повтори ошибки и попробуй снова"}
              </p>
            </div>
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
              🔄 Попробовать снова
            </motion.button>
          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setSection(2)}
          style={{
            width: "100%",
            marginTop: 14,
            padding: "16px 0",
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
          Devam et <span style={{ fontSize: 18 }}>→</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
