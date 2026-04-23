import { motion, LayoutGroup } from "framer-motion";
import { spring } from "../theme.js";

const ITEMS = [
  { k: "home",    l: "Главная", icon: "🏠" },
  { k: "modules", l: "Модули",  icon: "📚" },
  { k: "journey", l: "Путь",    icon: "🗺️" },
  { k: "profile", l: "Профиль", icon: "👤" },
];

export default function Nav({ tab, go, T }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: T.nav,
        borderTop: `1px solid ${T.border}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "10px 8px 20px",
        display: "flex",
        gap: 4,
      }}
    >
      <LayoutGroup id="nav">
        {ITEMS.map(({ k, l, icon }) => {
          const on = tab === k;
          return (
            <button
              key={k}
              onClick={() => go(k)}
              style={{
                flex: 1,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                background: "transparent",
                border: "none",
                padding: "8px 4px 6px",
                cursor: "pointer",
              }}
            >
              {on && (
                <motion.div
                  layoutId="nav-pill"
                  transition={spring.soft}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 14,
                    background: "rgba(108,92,231,0.18)",
                    zIndex: 0,
                  }}
                />
              )}
              <motion.span
                animate={{ scale: on ? 1.12 : 1, y: on ? -1 : 0 }}
                transition={spring.bouncy}
                style={{ fontSize: 19, position: "relative", zIndex: 1 }}
              >
                {icon}
              </motion.span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: on ? 800 : 500,
                  color: on ? "#6C5CE7" : T.text2,
                  fontFamily: "'Nunito',sans-serif",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {l}
              </span>
            </button>
          );
        })}
      </LayoutGroup>
    </div>
  );
}
