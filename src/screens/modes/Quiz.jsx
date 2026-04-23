import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scroll from "../../components/Scroll.jsx";
import { shuffle } from "../../utils.js";
import { WORDS } from "../../data/words.js";
import { baseButton as s } from "../../theme.js";

export default function Quiz({ T, onBack, words: wProp = WORDS }) {
  const [words] = useState(() => shuffle(wProp));
  const allW = wProp.length >= 4 ? wProp : WORDS;
  const [opts] = useState(() =>
    words.map((w) =>
      shuffle(allW.filter((x) => x.ru !== w.ru))
        .slice(0, 3)
        .map((x) => x.ru)
        .concat(w.ru)
        .sort(() => Math.random() - 0.5)
    )
  );
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState([]);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);

  function answer(opt) {
    if (sel) return;
    setSel(opt);
    if (opt === words[qi].ru) setScore((v) => v + 1);
    else {
      setWrong((w) => [...w, qi]);
      setShake(true);
      setTimeout(() => setShake(false), 420);
    }
    setTimeout(() => {
      if (qi + 1 >= words.length) setDone(true);
      else {
        setQi((i) => i + 1);
        setSel(null);
      }
    }, 900);
  }

  if (done) {
    const pct = Math.round((score / words.length) * 100);
    return (
      <Scroll T={T}>
        <div style={{ textAlign: "center", padding: "48px 18px 0" }}>
          <motion.div
            initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 15 }}
            style={{ fontSize: 60, marginBottom: 12 }}
          >
            {pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📖"}
          </motion.div>
          <h2 style={{ color: T.text, fontSize: 24, fontWeight: 900, margin: "0 0 6px" }}>
            {pct >= 80 ? "Отлично!" : pct >= 50 ? "Хорошо!" : "Продолжай!"}
          </h2>
          <p style={{ color: T.text2, fontSize: 14, margin: "0 0 24px" }}>
            {score} из {words.length} · {pct}%
          </p>
          {wrong.length > 0 && (
            <div style={{ textAlign: "left", marginBottom: 20 }}>
              <p
                style={{
                  color: T.red,
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  margin: "0 0 8px",
                }}
              >
                Повтори:
              </p>
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
              >
                {wrong.map((i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                    style={{
                      background: "rgba(255,118,117,0.1)",
                      border: "1px solid rgba(255,118,117,0.3)",
                      borderRadius: 12,
                      padding: "10px 12px",
                    }}
                  >
                    <p
                      style={{
                        color: "#A29BFE",
                        fontSize: 13,
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {words[i].qr}
                    </p>
                    <p style={{ color: T.text2, fontSize: 11, margin: 0 }}>
                      {words[i].ru}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onBack}
            style={{
              ...s,
              background: "#6C5CE7",
              color: "#fff",
              padding: "15px 0",
              fontWeight: 800,
              fontSize: 15,
              width: "100%",
            }}
          >
            ← К модулю
          </motion.button>
        </div>
      </Scroll>
    );
  }

  const qw = words[qi];
  return (
    <Scroll T={T}>
      <div style={{ padding: "14px 18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={onBack}
            style={{
              ...s,
              background: T.card2,
              border: `1px solid ${T.border}`,
              color: T.text,
              padding: "8px 13px",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            ← Назад
          </motion.button>
          <span style={{ color: T.text, fontSize: 15, fontWeight: 800, flex: 1 }}>Тест</span>
          <motion.span
            key={score}
            initial={{ scale: 1.4, color: "#00B894" }}
            animate={{ scale: 1, color: T.gold }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
            style={{ fontSize: 13, fontWeight: 800 }}
          >
            ⭐ {score}
          </motion.span>
        </div>

        <div style={{ background: T.card2, borderRadius: 100, height: 5, marginBottom: 16, overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${(qi / words.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            style={{
              height: "100%",
              borderRadius: 100,
              background: "linear-gradient(90deg,#FD79A8,#F953C6)",
            }}
          />
        </div>

        <p style={{ color: T.text2, fontSize: 12, margin: "0 0 14px", fontWeight: 700 }}>
          {qi + 1} / {words.length}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 18 }}
            animate={{
              opacity: 1,
              y: 0,
              x: shake ? [0, -6, 6, -4, 4, 0] : 0,
            }}
            exit={{ opacity: 0, y: -18 }}
            transition={{
              opacity: { duration: 0.25 },
              y: { type: "spring", stiffness: 260, damping: 24 },
              x: { duration: 0.42 },
            }}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 24,
              padding: "26px 24px",
              textAlign: "center",
              marginBottom: 18,
            }}
          >
            <p
              style={{
                color: T.text2,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                margin: "0 0 12px",
              }}
            >
              Выберите ответ
            </p>
            <p
              style={{
                color: T.text,
                fontSize: 38,
                fontWeight: 900,
                margin: 0,
                lineHeight: 1,
              }}
            >
              {qw.qr}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          key={qi + "-opts"}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
          }}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          {opts[qi].map((opt, i) => {
            const isC = opt === qw.ru;
            const isS = opt === sel;
            let bg = T.card2;
            let brd = `1px solid ${T.border}`;
            let col = T.text;
            if (sel) {
              if (isC) {
                bg = "rgba(0,184,148,0.15)";
                brd = "1px solid #00B894";
                col = "#00B894";
              } else if (isS) {
                bg = "rgba(255,118,117,0.15)";
                brd = "1px solid #FF7675";
                col = "#FF7675";
              }
            }
            return (
              <motion.button
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 26 } },
                }}
                whileTap={sel ? {} : { scale: 0.97 }}
                animate={
                  sel && isC
                    ? { scale: [1, 1.04, 1], transition: { duration: 0.4 } }
                    : {}
                }
                onClick={() => answer(opt)}
                style={{
                  ...s,
                  background: bg,
                  border: brd,
                  color: col,
                  padding: "15px 18px",
                  textAlign: "left",
                  fontSize: 15,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: T.card,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 800,
                    flexShrink: 0,
                    color: T.text2,
                  }}
                >
                  {sel ? (isC ? "✓" : isS ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                </span>
                {opt}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </Scroll>
  );
}
