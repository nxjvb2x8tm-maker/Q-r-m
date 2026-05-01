import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Scroll from "../../components/Scroll.jsx";
import SubHeader from "./SubHeader.jsx";

const KEY = "qs_daily_goal";

const PRESETS = [
  { mins: 5, label: "Лёгкий", emoji: "🌱", desc: "Базовая привычка" },
  { mins: 10, label: "Обычный", emoji: "📚", desc: "Уверенный прогресс" },
  { mins: 15, label: "Серьёзный", emoji: "🚀", desc: "Заметные результаты" },
  { mins: 20, label: "Сильный", emoji: "🔥", desc: "Быстрое обучение" },
  { mins: 30, label: "Интенсив", emoji: "💎", desc: "Максимум за месяц" },
];

export default function DailyGoal({ T, onBack }) {
  const [goal, setGoal] = useState(() => {
    try {
      const v = localStorage.getItem(KEY);
      return v ? parseInt(v, 10) : 15;
    } catch {
      return 15;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, String(goal));
    } catch {}
  }, [goal]);

  const current = PRESETS.find((p) => p.mins === goal) ?? PRESETS[2];

  return (
    <Scroll T={T}>
      <SubHeader T={T} title="Цель в день" subtitle="Künlük maqsat" onBack={onBack} />

      <div style={{ padding: "0 18px" }}>
        {/* Big preview card */}
        <motion.div
          key={goal}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          style={{
            background: "linear-gradient(135deg,#6C5CE7,#A29BFE)",
            borderRadius: 22,
            padding: "22px 22px 24px",
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 32px rgba(108,92,231,0.4)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: 80,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />

          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              margin: "0 0 8px",
              position: "relative",
            }}
          >
            Текущая цель
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              position: "relative",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: 56,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {goal}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              минут / день
            </span>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.18)",
              padding: "6px 12px",
              borderRadius: 100,
              marginTop: 12,
              position: "relative",
            }}
          >
            <span style={{ fontSize: 14 }}>{current.emoji}</span>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>
              {current.label}
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
              · {current.desc}
            </span>
          </div>
        </motion.div>

        <p
          style={{
            color: T.text2,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            margin: "8px 0 8px",
          }}
        >
          Выбери уровень
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PRESETS.map((p) => {
            const on = goal === p.mins;
            return (
              <motion.button
                key={p.mins}
                whileTap={{ scale: 0.98 }}
                onClick={() => setGoal(p.mins)}
                animate={{
                  borderColor: on ? T.accent : T.border,
                  borderWidth: on ? 2 : 1,
                }}
                style={{
                  background: on ? T.accentGlow : T.card,
                  borderStyle: "solid",
                  borderRadius: 16,
                  padding: "13px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  cursor: "pointer",
                  fontFamily: "'Nunito',sans-serif",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: on ? T.accent : T.card2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  {p.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        color: on ? T.accent : T.text,
                        fontSize: 16,
                        fontWeight: 900,
                      }}
                    >
                      {p.mins} мин
                    </span>
                    <span
                      style={{
                        color: T.text2,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      · {p.label}
                    </span>
                  </div>
                  <p style={{ color: T.text2, fontSize: 11, margin: "2px 0 0" }}>
                    {p.desc}
                  </p>
                </div>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `2px solid ${on ? T.accent : T.border}`,
                    background: on ? T.accent : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 900,
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {on ? "✓" : ""}
                </div>
              </motion.button>
            );
          })}
        </div>

        <p
          style={{
            color: T.text3,
            fontSize: 11,
            textAlign: "center",
            margin: "18px 0 0",
            lineHeight: 1.5,
            fontStyle: "italic",
          }}
        >
          Цель помогает выработать привычку.
          <br />
          Ты всегда можешь её изменить.
        </p>
      </div>
    </Scroll>
  );
}
