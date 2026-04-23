import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scroll from "../components/Scroll.jsx";
import MiniRobot, { useRobotMood, RobotMessage } from "../components/MiniRobot.jsx";

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const ITEM = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 360, damping: 28 } },
};

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function Home({ T, go }) {
  const streakActive = [false, false, false, false, false, false, true];
  const weekBars = [0, 0, 0, 0, 0, 0, 4];
  const maxBar = 4;
  const [robotMsg, setRobotMsg] = useState(false);

  const [studySeconds, setStudySeconds] = useState(() => {
    const saved = localStorage.getItem("qs_studySec");
    const date = localStorage.getItem("qs_studyDate");
    const today = new Date().toDateString();
    return date === today ? parseInt(saved || "0") : 0;
  });
  const [studiedToday, setStudiedToday] = useState(() => {
    const date = localStorage.getItem("qs_studyDate");
    return (
      date === new Date().toDateString() &&
      parseInt(localStorage.getItem("qs_studySec") || "0") >= 60
    );
  });

  useEffect(() => {
    const today = new Date().toDateString();
    const iv = setInterval(() => {
      setStudySeconds((s) => {
        const next = s + 1;
        localStorage.setItem("qs_studySec", next);
        localStorage.setItem("qs_studyDate", today);
        if (next >= 60) setStudiedToday(true);
        return next;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const robotMood = useRobotMood(studiedToday, studySeconds);

  return (
    <Scroll T={T}>
      <AnimatePresence>
        {robotMsg && <RobotMessage mood={robotMood} onClose={() => setRobotMsg(false)} />}
      </AnimatePresence>

      <motion.div
        variants={STAGGER}
        initial="hidden"
        animate="show"
        style={{ padding: "52px 18px 0" }}
      >
        {/* Заголовок */}
        <motion.h2
          variants={ITEM}
          style={{
            color: T.text,
            fontSize: 15,
            fontWeight: 900,
            margin: "0 0 16px",
            letterSpacing: 0.2,
          }}
        >
          Q | Til ile qırımtatarcanı ögren ✨
        </motion.h2>

        {/* Уровень — фиолетовая карточка */}
        <motion.div
          variants={ITEM}
          style={{
            background: "linear-gradient(135deg,#5B4FE8 0%,#7B5FEE 50%,#6A4FD8 100%)",
            borderRadius: 24,
            padding: "24px 24px 22px",
            marginBottom: 14,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(91,79,232,0.45)",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              bottom: -30,
              right: 40,
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />

          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              margin: "0 0 8px",
              fontFamily: "'Nunito',sans-serif",
            }}
          >
            Seviye | Уровень
          </p>
          <p
            style={{
              color: "#fff",
              fontSize: 28,
              fontWeight: 900,
              margin: "0 0 18px",
              fontFamily: "'Nunito',sans-serif",
              letterSpacing: -0.5,
            }}
          >
            A1 — Kencetay
          </p>

          <div
            style={{
              background: "rgba(255,255,255,0.22)",
              borderRadius: 100,
              height: 10,
              marginBottom: 10,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "5%" }}
              transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "100%",
                borderRadius: 100,
                background: "#fff",
                boxShadow: "0 0 14px rgba(255,255,255,0.7)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 34,
              right: -6,
              pointerEvents: "auto",
              zIndex: 15,
            }}
          >
            <MiniRobot onTap={() => setRobotMsg((v) => !v)} mood={robotMood} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", paddingRight: 90 }}>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 700 }}>
              3 Luğat
            </span>
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 700 }}>
              1 Dil bilgisi
            </span>
          </div>
        </motion.div>

        {/* Серия */}
        <motion.div
          variants={ITEM}
          style={{
            background: T.card,
            borderRadius: 20,
            padding: "15px 16px",
            marginBottom: 12,
            border: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 11,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  background: "linear-gradient(135deg,#FF6B35,#FFB800)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  boxShadow: "0 4px 14px rgba(255,107,53,0.4)",
                }}
              >
                🔥
              </motion.div>
              <div>
                <p style={{ color: T.text, fontSize: 14, fontWeight: 800, margin: 0 }}>
                  Серия 1 день
                </p>
                <p style={{ color: T.text2, fontSize: 10, margin: 0 }}>Не прерывай!</p>
              </div>
            </div>
            <span style={{ color: T.gold, fontSize: 22, fontWeight: 900 }}>1</span>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {DAYS.map((d, i) => (
              <div key={d} style={{ flex: 1, textAlign: "center" }}>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.04, type: "spring", stiffness: 400, damping: 22 }}
                  style={{
                    height: 30,
                    borderRadius: 8,
                    marginBottom: 3,
                    background: streakActive[i]
                      ? "linear-gradient(135deg,#FF6B35,#FFB800)"
                      : T.card2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    boxShadow: streakActive[i] ? "0 3px 10px rgba(255,107,53,0.35)" : "none",
                    border: `1px solid ${streakActive[i] ? "transparent" : T.border}`,
                  }}
                >
                  {streakActive[i] ? "🔥" : ""}
                </motion.div>
                <p
                  style={{
                    color: streakActive[i] ? T.gold : T.text3,
                    fontSize: 9,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {d}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Продолжить */}
        <motion.p
          variants={ITEM}
          style={{
            color: T.text2,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          Продолжить
        </motion.p>
        <motion.div
          variants={ITEM}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => go("modules")}
          style={{
            background: T.card,
            borderRadius: 18,
            padding: "13px 15px",
            marginBottom: 14,
            border: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 13,
            cursor: "pointer",
            boxShadow: T.isDark ? "none" : "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              flexShrink: 0,
              background: "linear-gradient(135deg,#6C5CE7,#A29BFE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              boxShadow: "0 4px 14px rgba(108,92,231,0.35)",
            }}
          >
            📖
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: T.text, fontWeight: 700, fontSize: 14, margin: "0 0 2px" }}>
              Словарь 1 — Базовые слова
            </p>
            <div style={{ background: T.input, borderRadius: 100, height: 4, marginBottom: 3 }} />
            <p style={{ color: T.text2, fontSize: 11, margin: 0 }}>0 / 24 слов · только начали</p>
          </div>
          <span style={{ color: T.text2, fontSize: 18 }}>›</span>
        </motion.div>

        {/* KPI */}
        <motion.p
          variants={ITEM}
          style={{
            color: T.text2,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          Ключевые показатели
        </motion.p>
        <motion.div variants={ITEM} style={{ display: "flex", gap: 9, marginBottom: 12 }}>
          {[
            { e: "🎯", v: "—", l: "Точность", c: "#FD79A8" },
            { e: "⏱", v: "0 мин", l: "Время", c: "#00CEC9" },
            { e: "📚", v: "0", l: "Слов выучено", c: "#FDCB6E" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              style={{
                flex: 1,
                background: T.card,
                borderRadius: 17,
                padding: "13px 6px",
                border: `1px solid ${T.border}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 4 }}>{item.e}</div>
              <p style={{ color: item.c, fontSize: 15, fontWeight: 900, margin: "0 0 2px" }}>
                {item.v}
              </p>
              <p
                style={{
                  color: T.text2,
                  fontSize: 9,
                  margin: 0,
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {item.l}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* График */}
        <motion.div
          variants={ITEM}
          style={{
            background: T.card,
            borderRadius: 20,
            padding: "15px 16px",
            marginBottom: 12,
            border: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <p style={{ color: T.text, fontSize: 13, fontWeight: 800, margin: 0 }}>
              Прогресс за неделю
            </p>
            <span style={{ color: T.text2, fontSize: 10 }}>слов/день</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 56 }}>
            {weekBars.map((v, i) => {
              const h = v > 0 ? Math.max((v / maxBar) * 50, 4) : 4;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: h }}
                    transition={{
                      delay: 0.5 + i * 0.06,
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }}
                    style={{
                      width: "100%",
                      borderRadius: 6,
                      background:
                        v > 0 ? "linear-gradient(180deg,#6C5CE7,#A29BFE)" : T.card2,
                    }}
                  />
                  <span
                    style={{
                      color: v > 0 ? "#6C5CE7" : T.text3,
                      fontSize: 9,
                      fontWeight: 700,
                    }}
                  >
                    {DAYS[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Категории */}
        <motion.div
          variants={ITEM}
          style={{
            background: T.card,
            borderRadius: 20,
            padding: "15px 16px",
            border: `1px solid ${T.border}`,
          }}
        >
          <p style={{ color: T.text, fontSize: 13, fontWeight: 800, margin: "0 0 13px" }}>
            Прогресс по категориям
          </p>
          {[
            { l: "Слова", p: 2, c: "#6C5CE7" },
            { l: "Грамматика", p: 0, c: "#FD79A8" },
            { l: "Диалог", p: 0, c: "#00CEC9" },
          ].map((cat, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 13 : 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <span style={{ color: T.text, fontSize: 12, fontWeight: 700 }}>{cat.l}</span>
                <span style={{ color: cat.c, fontSize: 12, fontWeight: 800 }}>{cat.p}%</span>
              </div>
              <div style={{ background: T.card2, borderRadius: 100, height: 7 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.p}%` }}
                  transition={{
                    delay: 0.6 + i * 0.12,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    height: "100%",
                    borderRadius: 100,
                    background: cat.c,
                    minWidth: cat.p > 0 ? "8px" : "0",
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Scroll>
  );
}
