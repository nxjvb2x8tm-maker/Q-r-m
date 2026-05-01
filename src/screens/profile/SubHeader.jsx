import { motion } from "framer-motion";

export default function SubHeader({ T, title, subtitle, onBack }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "52px 18px 14px",
      }}
    >
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onBack}
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background: T.card2,
          border: `1px solid ${T.border}`,
          color: T.text,
          fontSize: 18,
          fontFamily: "'Nunito',sans-serif",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        ←
      </motion.button>
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && (
          <p
            style={{
              color: T.accent,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              margin: "0 0 2px",
            }}
          >
            {subtitle}
          </p>
        )}
        <h2
          style={{
            color: T.text,
            fontSize: 22,
            fontWeight: 900,
            margin: 0,
            letterSpacing: -0.3,
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
