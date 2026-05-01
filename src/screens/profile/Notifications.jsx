import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Scroll from "../../components/Scroll.jsx";
import SubHeader from "./SubHeader.jsx";

const KEYS = {
  master: "qs_notif_master",
  reminder: "qs_notif_reminder",
  streak: "qs_notif_streak",
  achievements: "qs_notif_achievements",
  weekly: "qs_notif_weekly",
  reminderTime: "qs_notif_reminder_time",
};

const DEFAULTS = {
  master: true,
  reminder: true,
  streak: true,
  achievements: true,
  weekly: false,
  reminderTime: "19:00",
};

function readBool(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return v === "1";
  } catch {
    return fallback;
  }
}
function writeBool(key, val) {
  try {
    localStorage.setItem(key, val ? "1" : "0");
  } catch {}
}
function readStr(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
function writeStr(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch {}
}

function Toggle({ T, value, onChange, accent = "#6C5CE7" }) {
  return (
    <motion.div
      onClick={() => onChange(!value)}
      animate={{ background: value ? accent : "rgba(128,128,160,0.3)" }}
      style={{
        width: 44,
        height: 26,
        borderRadius: 100,
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ left: value ? 22 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        style={{
          position: "absolute",
          top: 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </motion.div>
  );
}

function Row({ T, icon, title, desc, value, onChange, disabled }) {
  return (
    <motion.div
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      style={{
        background: T.card,
        borderRadius: 16,
        padding: "13px 16px",
        marginBottom: 10,
        border: `1px solid ${T.border}`,
        display: "flex",
        alignItems: "center",
        gap: 13,
        opacity: disabled ? 0.45 : 1,
        transition: "opacity 0.2s",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          background: T.card2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            color: T.text,
            fontSize: 14,
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
        {desc && (
          <p
            style={{
              color: T.text2,
              fontSize: 11,
              margin: "2px 0 0",
              lineHeight: 1.35,
            }}
          >
            {desc}
          </p>
        )}
      </div>
      <Toggle T={T} value={value} onChange={onChange} />
    </motion.div>
  );
}

export default function Notifications({ T, onBack }) {
  const [master, setMaster] = useState(() => readBool(KEYS.master, DEFAULTS.master));
  const [reminder, setReminder] = useState(() => readBool(KEYS.reminder, DEFAULTS.reminder));
  const [streak, setStreak] = useState(() => readBool(KEYS.streak, DEFAULTS.streak));
  const [achievements, setAchievements] = useState(() =>
    readBool(KEYS.achievements, DEFAULTS.achievements),
  );
  const [weekly, setWeekly] = useState(() => readBool(KEYS.weekly, DEFAULTS.weekly));
  const [time, setTime] = useState(() => readStr(KEYS.reminderTime, DEFAULTS.reminderTime));

  useEffect(() => writeBool(KEYS.master, master), [master]);
  useEffect(() => writeBool(KEYS.reminder, reminder), [reminder]);
  useEffect(() => writeBool(KEYS.streak, streak), [streak]);
  useEffect(() => writeBool(KEYS.achievements, achievements), [achievements]);
  useEffect(() => writeBool(KEYS.weekly, weekly), [weekly]);
  useEffect(() => writeStr(KEYS.reminderTime, time), [time]);

  return (
    <Scroll T={T}>
      <SubHeader
        T={T}
        title="Уведомления"
        subtitle="Bildirişler"
        onBack={onBack}
      />

      <div style={{ padding: "0 18px" }}>
        {/* Master switch hero */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: master
              ? "linear-gradient(135deg,#6C5CE7,#A29BFE)"
              : T.card,
            borderRadius: 20,
            padding: "16px 18px",
            marginBottom: 14,
            border: master ? "none" : `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: master ? "0 8px 24px rgba(108,92,231,0.35)" : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: master ? "rgba(255,255,255,0.18)" : T.card2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              flexShrink: 0,
            }}
          >
            🔔
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                color: master ? "#fff" : T.text,
                fontSize: 15,
                fontWeight: 900,
                margin: 0,
              }}
            >
              Все уведомления
            </p>
            <p
              style={{
                color: master ? "rgba(255,255,255,0.8)" : T.text2,
                fontSize: 11,
                margin: "2px 0 0",
              }}
            >
              {master ? "Включены — будем держать тебя в курсе" : "Полностью отключены"}
            </p>
          </div>
          <Toggle
            T={T}
            value={master}
            onChange={setMaster}
            accent="rgba(255,255,255,0.4)"
          />
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
          Типы напоминаний
        </p>

        <Row
          T={T}
          icon="📚"
          title="Ежедневное напоминание"
          desc="Не забыть позаниматься"
          value={reminder}
          onChange={setReminder}
          disabled={!master}
        />
        <Row
          T={T}
          icon="🔥"
          title="Серия в опасности"
          desc="Если близок к потере streak"
          value={streak}
          onChange={setStreak}
          disabled={!master}
        />
        <Row
          T={T}
          icon="🏆"
          title="Достижения"
          desc="Когда открываешь новый уровень"
          value={achievements}
          onChange={setAchievements}
          disabled={!master}
        />
        <Row
          T={T}
          icon="📊"
          title="Еженедельный отчёт"
          desc="Каждое воскресенье вечером"
          value={weekly}
          onChange={setWeekly}
          disabled={!master}
        />

        <p
          style={{
            color: T.text2,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            margin: "16px 0 8px",
          }}
        >
          Время напоминания
        </p>

        <div
          style={{
            background: T.card,
            borderRadius: 16,
            padding: "13px 16px",
            border: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 13,
            opacity: master && reminder ? 1 : 0.45,
            transition: "opacity 0.2s",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: T.card2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            ⏰
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                color: T.text,
                fontSize: 14,
                fontWeight: 800,
                margin: 0,
              }}
            >
              Когда напоминать
            </p>
            <p
              style={{
                color: T.text2,
                fontSize: 11,
                margin: "2px 0 0",
              }}
            >
              Каждый день в это время
            </p>
          </div>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!master || !reminder}
            style={{
              background: T.card2,
              border: `1px solid ${T.border}`,
              borderRadius: 10,
              padding: "8px 10px",
              color: T.text,
              fontFamily: "'Nunito',sans-serif",
              fontSize: 14,
              fontWeight: 700,
              colorScheme: T.isDark ? "dark" : "light",
              cursor: master && reminder ? "pointer" : "not-allowed",
            }}
          />
        </div>
      </div>
    </Scroll>
  );
}
