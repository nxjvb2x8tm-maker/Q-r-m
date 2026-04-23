import { motion, AnimatePresence } from "framer-motion";
import { rn } from "../../utils.js";
import { SKINS, STARS, Ship } from "./BlastParts.jsx";

export function Lobby({ skinIdx, setSkinIdx, onStart, onRules }) {
  const skin = SKINS[skinIdx];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 50% 30%,#1a1a4e,#07071a)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Nunito',sans-serif",
        padding: "20px",
      }}
    >
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.o,
            animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.11) % 2}s`,
          }}
        />
      ))}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: 18 }}>
        <motion.h1
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{
            color: "#fff",
            fontSize: 34,
            fontWeight: 900,
            margin: "0 0 4px",
            textShadow: `0 0 28px ${skin.glow}`,
            letterSpacing: 2,
          }}
        >
          💫 BLAST
        </motion.h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>
          Словарь 1 · 18 слов
        </p>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "relative", zIndex: 2, marginBottom: 22 }}
      >
        <Ship skin={skin} />
      </motion.div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 30,
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSkinIdx((i) => (i - 1 + SKINS.length) % SKINS.length)}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ‹
        </motion.button>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 4 }}>
            {SKINS.map((s, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.85 }}
                onClick={() => setSkinIdx(i)}
                animate={{ scale: i === skinIdx ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: s.hull,
                  cursor: "pointer",
                  outline: i === skinIdx ? "3px solid rgba(255,255,255,0.9)" : "none",
                  outlineOffset: "2px",
                  boxShadow: i === skinIdx ? `0 0 10px ${s.glow}` : "none",
                }}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={skin.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, display: "inline-block" }}
            >
              {skin.name}
            </motion.span>
          </AnimatePresence>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSkinIdx((i) => (i + 1) % SKINS.length)}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ›
        </motion.button>
      </div>

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 280 }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ y: -2 }}
          onClick={onStart}
          style={{
            width: "100%",
            padding: "15px 0",
            marginBottom: 10,
            background: `linear-gradient(135deg,${skin.hull},${skin.ring})`,
            border: "none",
            borderRadius: 16,
            color: "#fff",
            fontSize: 18,
            fontWeight: 900,
            cursor: "pointer",
            fontFamily: "'Nunito',sans-serif",
            boxShadow: `0 6px 28px ${skin.glow}`,
          }}
        >
          Başla 🚀
        </motion.button>
        <button
          onClick={onRules}
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Nunito',sans-serif",
          }}
        >
          Qaideler | Правила
        </button>
      </div>
    </motion.div>
  );
}

export function Rules({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Nunito',sans-serif",
      }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        style={{
          background: "#13132e",
          border: "1px solid rgba(120,130,255,0.3)",
          borderRadius: 22,
          padding: "24px 20px",
          maxWidth: 320,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <h2 style={{ color: "#fff", fontSize: 17, fontWeight: 900, margin: 0 }}>
            🚀 Правила Blast
          </h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: 8,
              width: 30,
              height: 30,
              color: "#fff",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ✕
          </motion.button>
        </div>
        {[
          ["🎯", "Цель", "Найди перевод слова на астероиде и нажми на него!"],
          ["⚡", "Стрельба", "Нажми на астероид — корабль выстрелит лазером."],
          ["⭐", "Очки", "+1 за правильный ответ, −1 за ошибку."],
          ["⏱", "Время", "30 секунд. Успей набрать максимум!"],
        ].map(([ico, t, d], i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 12,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: "10px",
            }}
          >
            <span style={{ fontSize: 20 }}>{ico}</span>
            <div>
              <p
                style={{
                  color: "#A29BFE",
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  margin: "0 0 2px",
                }}
              >
                {t}
              </p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                {d}
              </p>
            </div>
          </motion.div>
        ))}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onClose}
          style={{
            width: "100%",
            marginTop: 4,
            padding: "12px 0",
            background: "linear-gradient(135deg,#6C5CE7,#A29BFE)",
            border: "none",
            borderRadius: 12,
            color: "#fff",
            fontSize: 14,
            fontWeight: 900,
            cursor: "pointer",
            fontFamily: "'Nunito',sans-serif",
          }}
        >
          Anladım! 👍
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export function Results({ score, total, skin, onReplay, onBack }) {
  const pct = Math.round((score / Math.max(total, 1)) * 100);
  const conf = Array.from({ length: 24 }, (_, i) => ({
    x: rn(5, 95),
    c: ["#FFD700", "#FF6B6B", "#48CAE4", "#00C9A7", "#A29BFE"][i % 5],
    s: rn(6, 13),
    delay: rn(0, 0.8),
    dur: rn(1.5, 2.8),
  }));
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 0%,#1a1a4e,#060614)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Nunito',sans-serif",
        padding: "24px",
      }}
    >
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.o,
          }}
        />
      ))}
      {conf.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: "-5%",
            width: c.s,
            height: c.s,
            background: c.c,
            borderRadius: c.s > 10 ? "50%" : "2px",
            animation: `fall ${c.dur}s ${c.delay}s linear infinite`,
            zIndex: 5,
          }}
        />
      ))}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 300, width: "100%" }}>
        <motion.div
          initial={{ scale: 0.3, rotate: -30, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 14 }}
          style={{ fontSize: 66, marginBottom: 8 }}
        >
          {pct >= 80 ? "🏆" : pct >= 50 ? "🎖️" : "📚"}
        </motion.div>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}>
          {pct >= 80 ? "Harika! Отлично!" : pct >= 50 ? "Yaxşı! Хорошо!" : "Tekrar dene!"}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "0 0 20px" }}>
          Вот твой результат
        </p>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              flex: 1,
              background: "rgba(100,130,255,0.15)",
              border: "1px solid rgba(100,130,255,0.3)",
              borderRadius: 14,
              padding: "14px",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                margin: "0 0 5px",
              }}
            >
              Результат
            </p>
            <p style={{ color: "#fff", fontSize: 34, fontWeight: 900, margin: 0 }}>{score}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              flex: 1,
              background: "rgba(255,215,0,0.1)",
              border: "1px solid rgba(255,215,0,0.3)",
              borderRadius: 14,
              padding: "14px",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                margin: "0 0 5px",
              }}
            >
              Рекорд
            </p>
            <p style={{ color: "#FFD700", fontSize: 34, fontWeight: 900, margin: 0 }}>{score}</p>
          </motion.div>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onReplay}
          style={{
            width: "100%",
            padding: "14px 0",
            marginBottom: 10,
            background: `linear-gradient(135deg,${skin.hull},${skin.ring})`,
            border: "none",
            borderRadius: 14,
            color: "#fff",
            fontSize: 15,
            fontWeight: 900,
            cursor: "pointer",
            fontFamily: "'Nunito',sans-serif",
            boxShadow: `0 6px 22px ${skin.glow}`,
          }}
        >
          🔄 Играть снова
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onBack}
          style={{
            width: "100%",
            padding: "12px 0",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 14,
            color: "rgba(255,255,255,0.6)",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Nunito',sans-serif",
          }}
        >
          ← К модулю
        </motion.button>
      </div>
    </motion.div>
  );
}
