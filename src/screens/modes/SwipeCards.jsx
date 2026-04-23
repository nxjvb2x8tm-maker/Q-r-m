import { useState, useMemo } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { shuffle } from "../../utils.js";
import { WORDS } from "../../data/words.js";
import { baseButton as s } from "../../theme.js";

const SWIPE_THRESHOLD = 100;
const SWIPE_VELOCITY = 600;

export default function SwipeCards({ T, onBack, words = WORDS }) {
  const [deck] = useState(() => shuffle(words));
  const [ci, setCi] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [history, setHistory] = useState([]);
  const [phase, setPhase] = useState("main");

  // motion values for the top card
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-14, 0, 14]);
  const opacity = useTransform(x, [-320, -150, 0, 150, 320], [0.4, 1, 1, 1, 0.4]);
  const knowOp = useTransform(x, [30, 130], [0, 1]);
  const noOp   = useTransform(x, [-130, -30], [1, 0]);

  const card = deck[ci];
  const total = deck.length;

  function commit(dir) {
    setHistory((h) => [...h, { ci, dir }]);
    if (dir === "right") setKnown((k) => [...k, ci]);
    else setUnknown((u) => [...u, ci]);

    setFlipped(false);

    if (ci === total - 1) {
      const u = unknown.concat(dir === "left" ? [ci] : []);
      setPhase(u.length === 0 ? "done" : "review");
    } else {
      setCi((i) => i + 1);
    }
    // reset motion value for next card
    x.set(0);
  }

  function handleDragEnd(_, info) {
    const off = info.offset.x;
    const vel = info.velocity.x;
    if (off > SWIPE_THRESHOLD || vel > SWIPE_VELOCITY) commit("right");
    else if (off < -SWIPE_THRESHOLD || vel < -SWIPE_VELOCITY) commit("left");
    else x.set(0);
  }

  function goBack() {
    if (!history.length) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setKnown((k) => k.filter((xi) => xi !== last.ci));
    setUnknown((u) => u.filter((xi) => xi !== last.ci));
    setCi(last.ci);
    setFlipped(false);
    x.set(0);
  }

  // Upcoming card behind (peek)
  const peek = deck[ci + 1];

  if (phase === "done")
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
        }}
      >
        <motion.div
          initial={{ scale: 0.5, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          style={{ fontSize: 64, marginBottom: 12 }}
        >
          🏆
        </motion.div>
        <h2 style={{ color: T.text, fontSize: 24, fontWeight: 900, margin: "0 0 8px" }}>
          Все слова знаешь!
        </h2>
        <p style={{ color: T.text2, fontSize: 14, margin: "0 0 24px" }}>
          {total} слов пройдено
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          style={{
            ...s,
            background: "#6C5CE7",
            color: "#fff",
            padding: "15px 32px",
            fontWeight: 800,
            fontSize: 15,
          }}
        >
          ← К модулю
        </motion.button>
      </motion.div>
    );

  if (phase === "review")
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
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ fontSize: 56, marginBottom: 12 }}
        >
          🔄
        </motion.div>
        <h2 style={{ color: T.text, fontSize: 22, fontWeight: 900, margin: "0 0 8px" }}>
          Раунд завершён!
        </h2>
        <p style={{ color: T.text2, fontSize: 13, margin: "0 0 4px" }}>
          ✓ <b style={{ color: T.green }}>{known.length}</b> · ✗{" "}
          <b style={{ color: T.red }}>{unknown.length}</b>
        </p>
        <p style={{ color: T.text2, fontSize: 13, margin: "0 0 24px" }}>
          Повторим незнакомые!
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, width: "100%", maxWidth: 300 }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            style={{
              ...s,
              background: "#6C5CE7",
              color: "#fff",
              padding: "15px 0",
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            ← К модулю
          </motion.button>
        </div>
      </motion.div>
    );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: T.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Nunito',sans-serif",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px 18px 0", display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
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
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: T.text2, fontSize: 11 }}>
              {ci + 1} / {total}
            </span>
            <span style={{ color: T.green, fontSize: 11, fontWeight: 800 }}>
              ✓{known.length}{" "}
              <span style={{ color: T.red }}>✗{unknown.length}</span>
            </span>
          </div>
          <div style={{ background: T.card2, borderRadius: 100, height: 5, overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${(ci / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              style={{
                height: "100%",
                borderRadius: 100,
                background: "linear-gradient(90deg,#6C5CE7,#A29BFE)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Card stack */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 18px",
        }}
      >
        {/* Peek card behind */}
        {peek && (
          <motion.div
            initial={false}
            animate={{ scale: 0.94, y: 14, opacity: 0.55 }}
            style={{
              position: "absolute",
              width: "100%",
              maxWidth: 355,
              height: 270,
              background: T.card,
              border: `2px solid ${T.border}`,
              borderRadius: 26,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          />
        )}

        <AnimatePresence mode="popLayout" custom={x.get()}>
          <motion.div
            key={ci}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 355,
              height: 270,
              x,
              rotate,
              opacity,
              cursor: "grab",
              touchAction: "pan-y",
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing", scale: 0.98 }}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              x: x.get() > 0 ? 500 : -500,
              rotate: x.get() > 0 ? 25 : -25,
              opacity: 0,
              transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={() => {
              if (Math.abs(x.get()) < 5) setFlipped((f) => !f);
            }}
          >
            {/* Know/Don't know overlays */}
            <motion.div
              style={{
                position: "absolute",
                top: 28,
                left: 22,
                background: "rgba(0,184,148,0.18)",
                border: "2px solid #00B894",
                borderRadius: 12,
                padding: "7px 14px",
                zIndex: 4,
                transform: "rotate(-10deg)",
                opacity: knowOp,
                pointerEvents: "none",
              }}
            >
              <span style={{ color: "#00B894", fontSize: 16, fontWeight: 900 }}>
                ✓ ЗНАЮ
              </span>
            </motion.div>
            <motion.div
              style={{
                position: "absolute",
                top: 28,
                right: 22,
                background: "rgba(255,118,117,0.18)",
                border: "2px solid #FF7675",
                borderRadius: 12,
                padding: "7px 14px",
                zIndex: 4,
                transform: "rotate(10deg)",
                opacity: noOp,
                pointerEvents: "none",
              }}
            >
              <span style={{ color: "#FF7675", fontSize: 16, fontWeight: 900 }}>
                ✗ НЕ ЗНАЮ
              </span>
            </motion.div>

            {/* Flip container */}
            <div
              style={{
                width: "100%",
                height: "100%",
                perspective: 1200,
              }}
            >
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    background: T.card,
                    border: `2px solid ${T.border}`,
                    borderRadius: 26,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 26px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <p
                    style={{
                      color: T.text2,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      margin: "0 0 14px",
                    }}
                  >
                    Нажми или свайп
                  </p>
                  <p
                    style={{
                      color: T.text,
                      fontSize: card?.qr?.length > 12 ? 28 : 48,
                      fontWeight: 900,
                      margin: 0,
                      lineHeight: 1.2,
                      textAlign: "center",
                    }}
                  >
                    {card.qr}
                  </p>
                </div>
                {/* Back */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "linear-gradient(145deg,#2D1B6B,#3D2080)",
                    border: `2px solid #6C5CE7`,
                    borderRadius: 26,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 26px",
                    boxShadow: "0 8px 40px rgba(108,92,231,0.4)",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(255,255,255,0.38)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      margin: "0 0 14px",
                    }}
                  >
                    Перевод
                  </p>
                  <p
                    style={{
                      color: T.text,
                      fontSize: card?.ru?.length > 12 ? 28 : 40,
                      fontWeight: 900,
                      margin: 0,
                      lineHeight: 1.2,
                      textAlign: "center",
                    }}
                  >
                    {card.ru}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div style={{ padding: "0 18px 26px" }}>
        <div style={{ display: "flex", gap: 9, marginBottom: 9 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
            disabled={!history.length}
            style={{
              ...s,
              flex: 1,
              background: T.card2,
              border: `1px solid ${T.border}`,
              color: T.text,
              padding: "13px 0",
              fontSize: 19,
              opacity: history.length ? 1 : 0.3,
            }}
          >
            ↩
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => commit("left")}
            style={{
              ...s,
              flex: 2,
              background: "rgba(255,118,117,0.14)",
              border: "1px solid #FF7675",
              color: "#FF7675",
              padding: "13px 0",
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            ✗ Не знаю
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => commit("right")}
            style={{
              ...s,
              flex: 2,
              background: "rgba(0,184,148,0.14)",
              border: "1px solid #00B894",
              color: "#00B894",
              padding: "13px 0",
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            ✓ Знаю
          </motion.button>
        </div>
        <p style={{ color: T.text3, fontSize: 11, textAlign: "center", margin: 0 }}>
          ← не знаю · свайп · знаю →
        </p>
      </div>
    </div>
  );
}
