import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Scroll from "../components/Scroll.jsx";
import { MODS, MOD_WORDS, WORDS } from "../data/words.js";
import { baseButton as s } from "../theme.js";
import SwipeCards from "./modes/SwipeCards.jsx";
import Quiz from "./modes/Quiz.jsx";
import Match from "./modes/Match.jsx";
import Blast from "./modes/Blast.jsx";
import Grammar1 from "./modes/Grammar1.jsx";

const MODE_CARDS = [
  { k: "swipe", icon: "🃏", label: "Карточки", sub: "Свайп вправо/влево",  c: "#6C5CE7" },
  { k: "match", icon: "🔲", label: "Подбор",   sub: "На скорость · рекорд", c: "#00CEC9" },
  { k: "quiz",  icon: "📋", label: "Тест",     sub: "4 варианта ответа",   c: "#FD79A8" },
  { k: "blast", icon: "🚀", label: "Blast",    sub: "Уничтожь астероид!",  c: "#FDCB6E" },
];

export default function Modules({ T }) {
  const [view, setView] = useState("list");
  const [activeMod, setActiveMod] = useState(MODS[0]);
  const [ci, setCi] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const W = activeMod.data ? MOD_WORDS[activeMod.data] : WORDS;

  function openMod(m) {
    setActiveMod(m);
    setCi(0);
    setFlipped(false);
    setView(m.data === "g1" ? "grammar1" : "detail");
  }
  function backToList() {
    setView("list");
    setCi(0);
    setFlipped(false);
  }

  if (view === "grammar1") return <Grammar1 T={T} onBack={() => setView("list")} />;
  if (view === "swipe") return <SwipeCards T={T} words={W} onBack={() => setView("detail")} />;
  if (view === "quiz") return <Quiz T={T} words={W} onBack={() => setView("detail")} />;
  if (view === "match") return <Match T={T} words={W} onBack={() => setView("detail")} />;
  if (view === "blast") return <Blast T={T} words={W} onBack={() => setView("detail")} />;

  if (view === "detail") {
    const card = W[ci];
    const isDialog = activeMod.type === "dialog";
    return (
      <Scroll T={T}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ padding: "14px 18px 0" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={backToList}
              style={{
                ...s,
                background: T.card2,
                border: `1px solid ${T.border}`,
                color: T.text,
                padding: "8px 14px",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              ← Назад
            </motion.button>
            <div>
              <p style={{ color: T.text, fontSize: 16, fontWeight: 900, margin: 0 }}>
                {activeMod.title}
              </p>
              <p style={{ color: T.text2, fontSize: 11, margin: 0 }}>
                {W.length} слов · A1
              </p>
            </div>
          </div>

          {/* Card preview with flip */}
          <div style={{ position: "relative", marginBottom: 12 }}>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setView("swipe")}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                ...s,
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                padding: "6px 10px",
                fontSize: 12,
                fontWeight: 700,
                borderRadius: 10,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              ⛶ На весь экран
            </motion.button>

            <div
              onClick={() => setFlipped(!flipped)}
              style={{
                borderRadius: 22,
                minHeight: isDialog ? 120 : 160,
                cursor: "pointer",
                perspective: 1200,
              }}
            >
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 250, damping: 24 }}
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: isDialog ? 120 : 160,
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
                    borderRadius: 22,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "22px 24px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: T.text2,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      margin: "0 0 10px",
                    }}
                  >
                    Нажми чтобы перевернуть
                  </p>
                  <p
                    style={{
                      color: T.text,
                      fontSize: isDialog ? 24 : 40,
                      fontWeight: 900,
                      margin: 0,
                      lineHeight: 1.2,
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
                    border: `2px solid ${activeMod.color}`,
                    borderRadius: 22,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "22px 24px",
                    textAlign: "center",
                    boxShadow: `0 8px 36px ${activeMod.color}66`,
                  }}
                >
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      margin: "0 0 10px",
                    }}
                  >
                    Перевод
                  </p>
                  <p
                    style={{
                      color: T.text,
                      fontSize: isDialog ? 24 : 40,
                      fontWeight: 900,
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {card.ru}
                  </p>
                </div>
              </motion.div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setCi((i) => Math.max(0, i - 1));
                  setFlipped(false);
                }}
                disabled={ci === 0}
                style={{
                  ...s,
                  flex: 1,
                  background: T.card2,
                  border: `1px solid ${T.border}`,
                  color: T.text,
                  padding: "10px 0",
                  opacity: ci === 0 ? 0.3 : 1,
                }}
              >
                ←
              </motion.button>
              <span
                style={{
                  flex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: T.text2,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {ci + 1} / {W.length}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setCi((i) => Math.min(W.length - 1, i + 1));
                  setFlipped(false);
                }}
                disabled={ci === W.length - 1}
                style={{
                  ...s,
                  flex: 1,
                  background: T.card2,
                  border: `1px solid ${T.border}`,
                  color: T.text,
                  padding: "10px 0",
                  opacity: ci === W.length - 1 ? 0.3 : 1,
                }}
              >
                →
              </motion.button>
            </div>
          </div>

          {/* Modes */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
            }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 16 }}
          >
            {MODE_CARDS.map((m) => (
              <motion.div
                key={m.k}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 360, damping: 26 } },
                }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setView(m.k)}
                style={{
                  background: T.card,
                  border: `1px solid ${m.c}44`,
                  borderRadius: 17,
                  padding: "15px 13px",
                  cursor: "pointer",
                  boxShadow: `0 4px 14px ${m.c}18`,
                }}
              >
                <div style={{ fontSize: 25, marginBottom: 7 }}>{m.icon}</div>
                <p style={{ color: T.text, fontSize: 13, fontWeight: 800, margin: "0 0 2px" }}>
                  {m.label}
                </p>
                <p style={{ color: T.text2, fontSize: 10, margin: 0 }}>{m.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Word list */}
          <p
            style={{
              color: T.text2,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Все слова
          </p>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.02, delayChildren: 0.25 } },
            }}
            style={{
              display: "grid",
              gridTemplateColumns: isDialog ? "1fr" : "1fr 1fr 1fr",
              gap: 7,
            }}
          >
            {W.map((w, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.94 },
                  show: { opacity: 1, scale: 1 },
                }}
                style={{
                  background: T.card2,
                  borderRadius: 11,
                  border: `1px solid ${T.border}`,
                  padding: "9px 11px",
                }}
              >
                <p
                  style={{
                    color: activeMod.color,
                    fontSize: isDialog ? 12 : 13,
                    fontWeight: 700,
                    margin: "0 0 2px",
                  }}
                >
                  {w.qr}
                </p>
                <p style={{ color: T.text2, fontSize: 10, margin: 0 }}>{w.ru}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Scroll>
    );
  }

  // LIST view
  return (
    <Scroll T={T}>
      <LayoutGroup id="modules">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
          }}
          style={{ padding: "52px 18px 0" }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            style={{ color: T.text, fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}
          >
            Модули
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            style={{ color: T.text2, fontSize: 13, margin: "0 0 16px" }}
          >
            A1 · 6 модулей
          </motion.p>
          {MODS.map((m) => (
            <motion.div
              key={m.id}
              layoutId={`mod-${m.id}`}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 340, damping: 26 } },
              }}
              whileHover={m.open ? { y: -3, scale: 1.01 } : {}}
              whileTap={m.open ? { scale: 0.98 } : {}}
              onClick={() => m.open && openMod(m)}
              style={{
                background: T.card,
                borderRadius: 18,
                padding: "14px 15px",
                marginBottom: 10,
                border: `1px solid ${m.open ? m.color + "44" : T.border}`,
                opacity: m.open ? 1 : 0.5,
                cursor: m.open ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: 13,
                boxShadow: m.open ? `0 4px 18px ${m.color}18` : "none",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  flexShrink: 0,
                  background: `linear-gradient(135deg,${m.color},${m.color}88)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 21,
                  boxShadow: `0 4px 12px ${m.color}44`,
                }}
              >
                {m.open ? (m.type === "vocab" ? "📖" : m.type === "grammar" ? "📝" : "💬") : "🔒"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: T.text, fontWeight: 800, fontSize: 14 }}>{m.title}</span>
                  <span style={{ color: m.open ? m.color : T.text2, fontSize: 11, fontWeight: 700 }}>
                    {m.open ? "Открыт" : "Скоро"}
                  </span>
                </div>
                <p style={{ color: T.text2, fontSize: 11, margin: "0 0 6px" }}>
                  {m.sub} · {m.words} слов
                </p>
                <div style={{ background: T.input, borderRadius: 100, height: 4 }}>
                  <div style={{ width: "0%", height: "100%", borderRadius: 100, background: m.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>
    </Scroll>
  );
}
