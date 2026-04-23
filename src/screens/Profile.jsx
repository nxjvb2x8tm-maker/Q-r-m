import { useState } from "react";
import { motion } from "framer-motion";
import Scroll from "../components/Scroll.jsx";

const SETTINGS = [
  { key: "target", icon: "🎯", label: "Цель в день", v: "15 мин" },
  { key: "stats", icon: "📊", label: "Статистика", v: "" },
  { key: "help", icon: "❓", label: "Помощь", v: "" },
];

export default function Profile({ T, theme, setTheme }) {
  const [notif, setNotif] = useState(true);

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
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          style={{ textAlign: "center", marginBottom: 22 }}
        >
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
          <h2 style={{ color: T.text, fontSize: 20, fontWeight: 900, margin: "0 0 4px" }}>
            Мой профиль
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

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          style={{
            background: T.card,
            borderRadius: 20,
            padding: "16px",
            marginBottom: 12,
            border: `1px solid ${T.border}`,
          }}
        >
          <p
            style={{
              color: T.text2,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            Оформление
          </p>
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
        </motion.div>

        {/* Notifications row */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          whileHover={{ y: -2 }}
          style={{
            background: T.card,
            borderRadius: 16,
            padding: "14px 18px",
            marginBottom: 10,
            border: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            gap: 14,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 20 }}>🔔</span>
          <span style={{ flex: 1, color: T.text, fontWeight: 700, fontSize: 15 }}>
            Уведомления
          </span>
          <motion.div
            onClick={() => setNotif(!notif)}
            animate={{ background: notif ? "#6C5CE7" : "rgba(128,128,160,0.3)" }}
            style={{
              width: 44,
              height: 26,
              borderRadius: 100,
              position: "relative",
              cursor: "pointer",
            }}
          >
            <motion.div
              animate={{ left: notif ? 22 : 3 }}
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
        </motion.div>

        {SETTINGS.map((item) => (
          <motion.div
            key={item.key}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: T.card,
              borderRadius: 16,
              padding: "14px 18px",
              marginBottom: 10,
              border: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ flex: 1, color: T.text, fontWeight: 700, fontSize: 15 }}>
              {item.label}
            </span>
            <span style={{ color: T.text2, fontSize: 13 }}>{item.v} ›</span>
          </motion.div>
        ))}
      </motion.div>
    </Scroll>
  );
}
