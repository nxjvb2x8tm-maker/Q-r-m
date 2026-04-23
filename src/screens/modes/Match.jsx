import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scroll from "../../components/Scroll.jsx";
import { shuffle } from "../../utils.js";
import { WORDS } from "../../data/words.js";
import { baseButton as s } from "../../theme.js";

export default function Match({ T, onBack, words: wProp = WORDS }) {
  const SIZE = Math.min(8, Math.floor(wProp.length / 2));

  function newRound() {
    const p = shuffle(wProp).slice(0, SIZE);
    const lefts = shuffle(p).map((w, i) => ({
      id: `l${i}-${Date.now()}`,
      text: w.qr,
      pair: w.ru,
      side: "left",
    }));
    const rights = shuffle(p).map((w, i) => ({
      id: `r${i}-${Date.now()}`,
      text: w.ru,
      pair: w.qr,
      side: "right",
    }));
    return { lefts, rights };
  }

  const [round, setRound] = useState(() => newRound());
  const [sel, setSel] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [matched, setMatched] = useState([]);
  const [done, setDone] = useState(false);

  function tap(item) {
    if (matched.includes(item.id) || wrong.includes(item.id)) return;
    if (!sel) {
      setSel(item);
      return;
    }
    if (sel.id === item.id) {
      setSel(null);
      return;
    }
    const ok = sel.pair === item.text && sel.side !== item.side;
    if (ok) {
      setMatched((m) => [...m, sel.id, item.id]);
      setSel(null);
      if (matched.length + 2 >= SIZE * 2) setTimeout(() => setDone(true), 300);
    } else {
      setWrong([sel.id, item.id]);
      setTimeout(() => {
        setWrong([]);
        setSel(null);
      }, 550);
    }
  }

  function restart() {
    setRound(newRound());
    setMatched([]);
    setWrong([]);
    setSel(null);
    setDone(false);
  }

  const grid = [];
  for (let i = 0; i < SIZE; i++) {
    grid.push(round.lefts[i]);
    grid.push(round.rights[i]);
  }

  return (
    <Scroll T={T}>
      <div style={{ padding: "14px 14px 0" }}>
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
          <span style={{ color: T.text, fontSize: 15, fontWeight: 800, flex: 1 }}>Подбор</span>
          <motion.span
            key={matched.length}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
            style={{ color: T.text2, fontSize: 12 }}
          >
            {matched.length / 2}/{SIZE}
          </motion.span>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: 18,
                padding: 18,
                marginBottom: 14,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: T.text,
                  fontSize: 18,
                  fontWeight: 900,
                  margin: "0 0 4px",
                }}
              >
                ✓ Готово!
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={restart}
                style={{
                  ...s,
                  background: "#6C5CE7",
                  color: "#fff",
                  padding: "11px 24px",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                🔄 Ещё раз
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04 } },
          }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          {grid.map((item) => {
            const isM = matched.includes(item.id);
            const isW = wrong.includes(item.id);
            const isS = sel?.id === item.id;
            let bg = T.card2;
            let brd = `1px solid ${T.border}`;
            let col = T.text;
            if (isM) {
              bg = "rgba(0,184,148,0.12)";
              brd = "1px solid #00B894";
              col = "#00B894";
            }
            if (isW) {
              bg = "rgba(255,118,117,0.12)";
              brd = "1px solid #FF7675";
              col = "#FF7675";
            }
            if (isS) {
              bg = "rgba(108,92,231,0.18)";
              brd = "1px solid #6C5CE7";
              col = "#A29BFE";
            }
            return (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: "spring", stiffness: 400, damping: 26 },
                  },
                }}
                animate={{
                  x: isW ? [0, -5, 5, -3, 3, 0] : 0,
                  scale: isS ? 1.05 : isM ? 0.96 : 1,
                }}
                transition={{
                  x: { duration: 0.4 },
                  scale: { type: "spring", stiffness: 400, damping: 20 },
                }}
                onClick={() => !done && tap(item)}
                style={{
                  background: bg,
                  border: brd,
                  color: col,
                  borderRadius: 14,
                  padding: "18px 10px",
                  textAlign: "center",
                  cursor: isM || done ? "default" : "pointer",
                  fontWeight: 700,
                  fontSize: 13,
                  opacity: isM ? 0.5 : 1,
                }}
              >
                {item.text}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Scroll>
  );
}
