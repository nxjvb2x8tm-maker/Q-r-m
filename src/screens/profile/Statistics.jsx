import { motion } from "framer-motion";
import Scroll from "../../components/Scroll.jsx";
import SubHeader from "./SubHeader.jsx";

function readNum(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? parseInt(v, 10) : fallback;
  } catch {
    return fallback;
  }
}

function readDate(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function StatCard({ T, value, label, icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 320, damping: 24 }}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: "13px 14px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -10,
          right: -10,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: `${color}22`,
          filter: "blur(10px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: 36,
          height: 36,
          borderRadius: 10,
          background: `${color}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          marginBottom: 8,
        }}
      >
        {icon}
      </div>
      <p
        style={{
          color,
          fontSize: 24,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1,
          position: "relative",
        }}
      >
        {value}
      </p>
      <p
        style={{
          color: T.text2,
          fontSize: 11,
          fontWeight: 700,
          margin: "4px 0 0",
          position: "relative",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

function ChartBar({ T, day, value, max, isToday }) {
  const heightPct = max > 0 ? Math.max(6, (value / max) * 100) : 6;
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          minHeight: 80,
        }}
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${heightPct}%` }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 25 }}
          style={{
            width: "100%",
            background: isToday
              ? "linear-gradient(180deg,#6C5CE7,#A29BFE)"
              : `linear-gradient(180deg,${T.accent}88,${T.accent}44)`,
            borderRadius: 6,
            boxShadow: isToday
              ? "0 4px 14px rgba(108,92,231,0.4)"
              : "none",
          }}
        />
      </div>
      <p
        style={{
          color: isToday ? T.accent : T.text2,
          fontSize: 10,
          fontWeight: isToday ? 900 : 700,
          margin: 0,
        }}
      >
        {day}
      </p>
    </div>
  );
}

export default function Statistics({ T, onBack }) {
  // Live data from localStorage where available
  const studySec = readNum("qs_studySec", 0);
  const studyDate = readDate("qs_studyDate");
  const today = new Date().toDateString();
  const todayMin = studyDate === today ? Math.round(studySec / 60) : 0;

  // Demo / placeholder weekly data — last bar = today
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0 .. Sun=6
  const weekData = [0, 0, 0, 0, 0, 0, 0];
  weekData[todayIdx] = todayMin;
  const maxBar = Math.max(...weekData, 1);
  const totalWeek = weekData.reduce((a, b) => a + b, 0);

  // Other stats (read-only / placeholders for now)
  const streak = todayMin >= 1 ? 1 : 0;
  const wordsLearned = 0;
  const accuracy = 0;
  const modulesDone = 0;

  return (
    <Scroll T={T}>
      <SubHeader T={T} title="Статистика" subtitle="Statistika" onBack={onBack} />

      <div style={{ padding: "0 18px" }}>
        {/* Hero card — total time */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(135deg,#5B4FE8,#8B5FEE)",
            borderRadius: 22,
            padding: "20px 22px",
            marginBottom: 14,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(91,79,232,0.4)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -20,
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              margin: 0,
              position: "relative",
            }}
          >
            Сегодня
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginTop: 4,
              position: "relative",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: 48,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: -1.5,
              }}
            >
              {todayMin}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              мин
            </span>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 14, position: "relative" }}>
            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 10,
                  margin: 0,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Серия
              </p>
              <p
                style={{
                  color: "#FFB800",
                  fontSize: 20,
                  fontWeight: 900,
                  margin: "2px 0 0",
                }}
              >
                🔥 {streak}
              </p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.18)" }} />
            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 10,
                  margin: 0,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                За неделю
              </p>
              <p
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: 900,
                  margin: "2px 0 0",
                }}
              >
                {totalWeek} мин
              </p>
            </div>
          </div>
        </motion.div>

        {/* KPI grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <StatCard
            T={T}
            value={wordsLearned}
            label="Слов выучено"
            icon="📚"
            color="#00CEC9"
            delay={0.05}
          />
          <StatCard
            T={T}
            value={`${accuracy}%`}
            label="Точность"
            icon="🎯"
            color="#A29BFE"
            delay={0.1}
          />
          <StatCard
            T={T}
            value={modulesDone}
            label="Модулей пройдено"
            icon="✓"
            color="#00B894"
            delay={0.15}
          />
          <StatCard
            T={T}
            value={`${todayMin} мин`}
            label="Сегодня учился"
            icon="⏱"
            color="#FD79A8"
            delay={0.2}
          />
        </div>

        {/* Weekly chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          style={{
            background: T.card,
            borderRadius: 18,
            padding: "16px 16px 14px",
            border: `1px solid ${T.border}`,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <p style={{ color: T.text, fontSize: 14, fontWeight: 900, margin: 0 }}>
              Активность за неделю
            </p>
            <span
              style={{
                color: T.text2,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              мин/день
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              height: 110,
            }}
          >
            {days.map((d, i) => (
              <ChartBar
                key={d}
                T={T}
                day={d}
                value={weekData[i]}
                max={maxBar}
                isToday={i === todayIdx}
              />
            ))}
          </div>
        </motion.div>

        {/* Categories progress */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          style={{
            background: T.card,
            borderRadius: 18,
            padding: "16px",
            border: `1px solid ${T.border}`,
            marginBottom: 14,
          }}
        >
          <p style={{ color: T.text, fontSize: 14, fontWeight: 900, margin: "0 0 14px" }}>
            Прогресс по разделам
          </p>
          {[
            { l: "Слова", p: 2, c: "#6C5CE7" },
            { l: "Grammatika", p: 0, c: "#FD79A8" },
            { l: "Dialog", p: 0, c: "#00CEC9" },
            { l: "Чтение", p: 0, c: "#FDCB6E" },
          ].map((cat, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <span style={{ color: T.text, fontSize: 12, fontWeight: 700 }}>
                  {cat.l}
                </span>
                <span style={{ color: cat.c, fontSize: 12, fontWeight: 800 }}>
                  {cat.p}%
                </span>
              </div>
              <div style={{ background: T.card2, borderRadius: 100, height: 7 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.p}%` }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    borderRadius: 100,
                    background: cat.c,
                    minWidth: cat.p > 0 ? 8 : 0,
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Achievements teaser */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          style={{
            background: T.card,
            borderRadius: 18,
            padding: "14px 16px",
            border: `1px solid ${T.border}`,
          }}
        >
          <p
            style={{
              color: T.text,
              fontSize: 14,
              fontWeight: 900,
              margin: "0 0 12px",
            }}
          >
            Достижения
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { e: "🌱", t: "Первый шаг", got: streak >= 1 },
              { e: "🔥", t: "7 дней", got: false },
              { e: "📚", t: "100 слов", got: false },
              { e: "🏆", t: "A1 пройден", got: false },
            ].map((a, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: "center",
                  opacity: a.got ? 1 : 0.4,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: a.got ? T.accentGlow : T.card2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    margin: "0 auto 4px",
                    border: a.got ? `1px solid ${T.accent}` : `1px solid ${T.border}`,
                    filter: a.got ? "none" : "grayscale(0.6)",
                  }}
                >
                  {a.e}
                </div>
                <p
                  style={{
                    color: T.text2,
                    fontSize: 9,
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {a.t}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Scroll>
  );
}
