import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scroll from "../components/Scroll.jsx";
import Notifications from "./profile/Notifications.jsx";
import DailyGoal from "./profile/DailyGoal.jsx";
import Statistics from "./profile/Statistics.jsx";
import Help from "./profile/Help.jsx";
import PhotoPicker from "./profile/PhotoPicker.jsx";

const KEYS = {
  avatar: "qs_avatar",
  notifMaster: "qs_notif_master",
  dailyGoal: "qs_daily_goal",
  name: "qs_user_name",
};

function readStr(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function readBool(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    return v === "1";
  } catch {
    return fallback;
  }
}

function readNum(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? parseInt(v, 10) : fallback;
  } catch {
    return fallback;
  }
}

export default function Profile({ T, theme, setTheme }) {
  const [screen, setScreen] = useState("main"); // main | notifications | goal | stats | help
  const [pickerOpen, setPickerOpen] = useState(false);

  const [avatar, setAvatar] = useState(() => readStr(KEYS.avatar, ""));
  const [name, setName] = useState(() => readStr(KEYS.name, ""));
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(name);

  // re-read summary values when returning to the main screen
  const [notifOn, setNotifOn] = useState(() => readBool(KEYS.notifMaster, true));
  const [goalMin, setGoalMin] = useState(() => readNum(KEYS.dailyGoal, 15));
  useEffect(() => {
    if (screen === "main") {
      setNotifOn(readBool(KEYS.notifMaster, true));
      setGoalMin(readNum(KEYS.dailyGoal, 15));
    }
  }, [screen]);

  function saveAvatar(dataUrl) {
    setAvatar(dataUrl);
    try {
      localStorage.setItem(KEYS.avatar, dataUrl);
    } catch {}
  }
  function removeAvatar() {
    setAvatar("");
    try {
      localStorage.removeItem(KEYS.avatar);
    } catch {}
  }
  function saveName(v) {
    const trimmed = (v || "").trim().slice(0, 24);
    setName(trimmed);
    try {
      if (trimmed) localStorage.setItem(KEYS.name, trimmed);
      else localStorage.removeItem(KEYS.name);
    } catch {}
  }

  // ── Sub-screens ───────────────────────────────────────────────
  if (screen === "notifications")
    return (
      <Notifications
        T={T}
        onBack={() => setScreen("main")}
      />
    );
  if (screen === "goal")
    return <DailyGoal T={T} onBack={() => setScreen("main")} />;
  if (screen === "stats")
    return <Statistics T={T} onBack={() => setScreen("main")} />;
  if (screen === "help")
    return <Help T={T} onBack={() => setScreen("main")} />;

  // ── Main profile ──────────────────────────────────────────────
  const settingItems = [
    {
      key: "notifications",
      icon: "🔔",
      label: "Уведомления",
      v: notifOn ? "Включены" : "Отключены",
      vColor: notifOn ? "#00B894" : T.text2,
      go: () => setScreen("notifications"),
    },
    {
      key: "goal",
      icon: "🎯",
      label: "Цель в день",
      v: `${goalMin} мин`,
      go: () => setScreen("goal"),
    },
    {
      key: "stats",
      icon: "📊",
      label: "Статистика",
      v: "",
      go: () => setScreen("stats"),
    },
    {
      key: "help",
      icon: "❓",
      label: "Помощь",
      v: "",
      go: () => setScreen("help"),
    },
  ];

  return (
    <>
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
          {/* Avatar + name */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            style={{ textAlign: "center", marginBottom: 22 }}
          >
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setPickerOpen(true)}
              initial={{ scale: 0.6, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              style={{
                position: "relative",
                width: 88,
                height: 88,
                borderRadius: "50%",
                margin: "0 auto 12px",
                background: avatar
                  ? `url(${avatar}) center/cover no-repeat`
                  : "linear-gradient(135deg,#6C5CE7,#FD79A8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                boxShadow: "0 8px 28px rgba(108,92,231,0.4)",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Nunito',sans-serif",
                padding: 0,
              }}
            >
              {!avatar && "👤"}
              {/* edit badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: T.accent,
                  border: `3px solid ${T.bg}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  color: "#fff",
                }}
              >
                ✎
              </div>
            </motion.button>

            {!editingName ? (
              <h2
                onClick={() => {
                  setDraftName(name);
                  setEditingName(true);
                }}
                style={{
                  color: T.text,
                  fontSize: 20,
                  fontWeight: 900,
                  margin: "0 0 4px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {name || "Мой профиль"}
                <span style={{ color: T.text3, fontSize: 14 }}>✎</span>
              </h2>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  justifyContent: "center",
                  marginBottom: 6,
                }}
              >
                <input
                  autoFocus
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveName(draftName);
                      setEditingName(false);
                    }
                    if (e.key === "Escape") setEditingName(false);
                  }}
                  placeholder="Твоё имя"
                  maxLength={24}
                  style={{
                    background: T.card,
                    border: `1.5px solid ${T.accent}`,
                    borderRadius: 10,
                    color: T.text,
                    fontFamily: "'Nunito',sans-serif",
                    fontSize: 16,
                    fontWeight: 800,
                    padding: "8px 12px",
                    outline: "none",
                    textAlign: "center",
                    maxWidth: 200,
                  }}
                />
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => {
                    saveName(draftName);
                    setEditingName(false);
                  }}
                  style={{
                    background: T.accent,
                    border: "none",
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 900,
                    padding: "0 14px",
                    cursor: "pointer",
                    fontFamily: "'Nunito',sans-serif",
                  }}
                >
                  ✓
                </motion.button>
              </div>
            )}

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(108,92,231,0.18)",
                borderRadius: 100,
                padding: "3px 12px",
                marginTop: 2,
              }}
            >
              <span style={{ color: "#6C5CE7", fontSize: 12, fontWeight: 800 }}>
                A1 · Kencetay
              </span>
            </div>
          </motion.div>

          {/* Theme picker */}
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
                    <div style={{ fontSize: 22, marginBottom: 4 }}>
                      {t === "dark" ? "🌙" : "☀️"}
                    </div>
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

          {/* Setting rows → sub-screens */}
          {settingItems.map((item) => (
            <motion.div
              key={item.key}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={item.go}
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
              {item.v && (
                <span
                  style={{
                    color: item.vColor || T.text2,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {item.v}
                </span>
              )}
              <span style={{ color: T.text2, fontSize: 16 }}>›</span>
            </motion.div>
          ))}

          <p
            style={{
              color: T.text3,
              fontSize: 11,
              textAlign: "center",
              margin: "20px 0 0",
              lineHeight: 1.5,
            }}
          >
            Laf et · v0.1
          </p>
        </motion.div>
      </Scroll>

      <PhotoPicker
        T={T}
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPick={saveAvatar}
        hasPhoto={!!avatar}
        onRemove={removeAvatar}
      />
    </>
  );
}
