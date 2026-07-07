import { useState } from "react";
import { motion } from "framer-motion";
import Scroll from "../components/Scroll.jsx";
import { spring } from "../theme.js";

const ITEM = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function Toggle({ on, onChange, T }) {
  return (
    <motion.div
      onClick={onChange}
      animate={{ background: on ? "#6C5CE7" : "rgba(128,128,160,0.3)" }}
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
        animate={{ left: on ? 22 : 3 }}
        transition={spring.tight}
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

function Section({ title, children, T }) {
  return (
    <motion.div variants={ITEM} style={{ marginBottom: 18 }}>
      <p
        style={{
          color: T.text2,
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1,
          textTransform: "uppercase",
          margin: "0 0 8px 4px",
        }}
      >
        {title}
      </p>
      <div
        style={{
          background: T.card,
          borderRadius: 18,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Row({ icon, label, right, onClick, last, T }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 13,
        padding: "13px 15px",
        borderBottom: last ? "none" : `1px solid ${T.border}`,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <span style={{ fontSize: 19 }}>{icon}</span>
      <span style={{ flex: 1, color: T.text, fontWeight: 700, fontSize: 14 }}>{label}</span>
      {right}
    </div>
  );
}

export default function Settings({ T, theme, setTheme }) {
  const [notif, setNotif] = useState(true);
  const [sound, setSound] = useState(true);
  const [widgets, setWidgets] = useState({ streak: true, wordOfDay: true, progress: false });

  const chevron = <span style={{ color: T.text2, fontSize: 16 }}>›</span>;
  const value = (v) => (
    <span style={{ color: T.text2, fontSize: 13, fontWeight: 700 }}>{v} ›</span>
  );

  return (
    <Scroll T={T}>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
        }}
        style={{ padding: "52px 18px 0" }}
      >
        {/* Профиль — шапка */}
        <motion.div variants={ITEM} style={{ textAlign: "center", marginBottom: 22 }}>
          <motion.div
            initial={{ scale: 0.6, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            style={{
              width: 78,
              height: 78,
              borderRadius: "50%",
              margin: "0 auto 10px",
              background: "linear-gradient(135deg,#6C5CE7,#FD79A8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              boxShadow: "0 8px 28px rgba(108,92,231,0.4)",
            }}
          >
            👤
          </motion.div>
          <h2 style={{ color: T.text, fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}>
            Настройки ⚙️
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: `rgba(108,92,231,0.18)`,
              borderRadius: 100,
              padding: "3px 12px",
              marginTop: 2,
            }}
          >
            <span style={{ color: "#6C5CE7", fontSize: 12, fontWeight: 800 }}>A1 · Kencetay</span>
          </div>
        </motion.div>

        {/* Профиль */}
        <Section title="Профиль" T={T}>
          <Row icon="✏️" label="Имя пользователя" right={value("Talebe")} onClick={() => {}} T={T} />
          <Row icon="🌐" label="Язык интерфейса" right={value("Русский")} onClick={() => {}} T={T} />
          <Row icon="🎯" label="Цель в день" right={value("15 мин")} onClick={() => {}} last T={T} />
        </Section>

        {/* Оформление */}
        <Section title="Оформление" T={T}>
          <div style={{ padding: "14px 15px" }}>
            <div style={{ display: "flex", gap: 8 }}>
              {["dark", "light"].map((t) => {
                const on = theme === t;
                return (
                  <motion.button
                    key={t}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTheme(t)}
                    animate={{
                      background: on
                        ? t === "dark"
                          ? "linear-gradient(135deg,#1A1A3E,#2D2D5E)"
                          : "linear-gradient(135deg,#E8F4FF,#F0F1FA)"
                        : T.card2,
                      borderColor: on ? "#6C5CE7" : T.border,
                      borderWidth: on ? 2 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      flex: 1,
                      fontFamily: "'Nunito',sans-serif",
                      cursor: "pointer",
                      borderRadius: 14,
                      padding: "14px 8px",
                      borderStyle: "solid",
                      boxShadow: on ? "0 4px 16px rgba(108,92,231,0.2)" : "none",
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{t === "dark" ? "🌙" : "☀️"}</div>
                    <p
                      style={{
                        color: on ? "#6C5CE7" : T.text2,
                        fontSize: 12,
                        fontWeight: on ? 800 : 600,
                        margin: 0,
                      }}
                    >
                      {t === "dark" ? "Тёмная" : "Светлая"}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Уведомления */}
        <Section title="Уведомления" T={T}>
          <Row
            icon="🔔"
            label="Напоминания"
            right={<Toggle on={notif} onChange={() => setNotif(!notif)} T={T} />}
            T={T}
          />
          <Row
            icon="🔊"
            label="Звук и вибрация"
            right={<Toggle on={sound} onChange={() => setSound(!sound)} T={T} />}
            T={T}
          />
          <Row icon="⏰" label="Время напоминания" right={value("20:00")} onClick={() => {}} last T={T} />
        </Section>

        {/* Виджеты */}
        <Section title="Виджеты" T={T}>
          {[
            { k: "streak", icon: "🔥", label: "Серия дней" },
            { k: "wordOfDay", icon: "📖", label: "Слово дня" },
            { k: "progress", icon: "📊", label: "Прогресс уровня" },
          ].map((w, i, arr) => (
            <Row
              key={w.k}
              icon={w.icon}
              label={w.label}
              last={i === arr.length - 1}
              right={
                <Toggle
                  on={widgets[w.k]}
                  onChange={() => setWidgets((s) => ({ ...s, [w.k]: !s[w.k] }))}
                  T={T}
                />
              }
              T={T}
            />
          ))}
        </Section>

        {/* Помощь */}
        <Section title="Помощь" T={T}>
          <Row icon="❓" label="Вопрос-ответ" right={chevron} onClick={() => {}} T={T} />
          <Row icon="💬" label="Обратная связь" right={chevron} onClick={() => {}} T={T} />
          <Row icon="ℹ️" label="О приложении" right={value("v0.1.0")} onClick={() => {}} last T={T} />
        </Section>
      </motion.div>
    </Scroll>
  );
}
