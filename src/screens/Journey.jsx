import { motion } from "framer-motion";
import { WAVE_NODES, CHECKPOINTS } from "../data/words.js";

const W = 390;
const NODE_GAP = 82;

function waveX(i) {
  return 50 + 28 * Math.sin(i * 1.15);
}

export default function Journey({ T }) {
  const TOTAL_H = WAVE_NODES.length * NODE_GAP + 120;
  const coords = WAVE_NODES.map((_, i) => ({
    x: (waveX(i) / 100) * W,
    y: 80 + i * NODE_GAP,
  }));

  function buildPath(points) {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const cur = points[i];
      const cy = (prev.y + cur.y) / 2;
      d += ` C ${prev.x} ${cy}, ${cur.x} ${cy}, ${cur.x} ${cur.y}`;
    }
    return d;
  }

  const fullPath = buildPath(coords);
  const curIdx = WAVE_NODES.findIndex((n) => n.cur);
  const donePath = curIdx > 0 ? buildPath(coords.slice(0, curIdx + 1)) : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "absolute",
        inset: 0,
        overflowY: "auto",
        scrollbarWidth: "none",
        background: T.isDark
          ? "linear-gradient(180deg,#0E0F1C 0%,#0A0B14 100%)"
          : "linear-gradient(180deg,#E8EDFF 0%,#F0F1FA 100%)",
        fontFamily: "'Nunito',sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "52px 18px 14px",
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: T.isDark ? "rgba(14,15,28,0.95)" : "rgba(232,237,255,0.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p
              style={{
                color: T.text2,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                margin: "0 0 2px",
              }}
            >
              A1 · Kencetay
            </p>
            <h2 style={{ color: T.text, fontSize: 20, fontWeight: 900, margin: 0 }}>
              Твой путь 🗺️
            </h2>
          </div>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "rgba(255,107,53,0.15)",
              borderRadius: 100,
              padding: "5px 12px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span style={{ fontSize: 15 }}>🔥</span>
            <span style={{ color: "#FF6B35", fontSize: 13, fontWeight: 900 }}>1</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: 12,
            background: "linear-gradient(135deg,#6C5CE7,#A29BFE)",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 20px rgba(108,92,231,0.4)",
            cursor: "pointer",
          }}
        >
          <div>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                margin: "0 0 2px",
              }}
            >
              Сейчас
            </p>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 900, margin: 0 }}>
              Словарь 1 · Подбор на скорость
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.22)",
              borderRadius: 12,
              padding: "8px 14px",
            }}
          >
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>▶ Начать</span>
          </div>
        </motion.div>
      </div>

      {/* Path canvas */}
      <div style={{ position: "relative", width: W, height: TOTAL_H }}>
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <defs>
            <linearGradient id="doneLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#A29BFE" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <motion.path
            d={fullPath}
            fill="none"
            stroke={T.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
            strokeWidth="6"
            strokeDasharray="10 8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {donePath && (
            <motion.path
              d={donePath}
              fill="none"
              stroke="url(#doneLineGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </svg>

        {WAVE_NODES.map((node, i) => {
          const { x, y } = coords[i];
          const isDone = node.done;
          const isCur = node.cur;
          const isLocked = !isDone && !isCur;
          const sz = isCur ? 70 : 62;
          const isCheck = CHECKPOINTS.includes(i + 1);

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.5, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.2 + i * 0.06,
                type: "spring",
                stiffness: 320,
                damping: 22,
              }}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: "translate(-50%,-50%)",
                zIndex: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {isCheck && (
                <div
                  style={{
                    position: "absolute",
                    top: -(sz / 2) - 44,
                    background: T.isDark ? "rgba(40,42,65,0.95)" : "rgba(220,225,255,0.95)",
                    border: `1px solid ${node.color}55`,
                    borderRadius: 12,
                    padding: "5px 14px",
                    whiteSpace: "nowrap",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
                  }}
                >
                  <span style={{ color: node.color, fontSize: 11, fontWeight: 900 }}>
                    🏅 Checkpoint
                  </span>
                </div>
              )}

              {isCur && (
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: -(sz / 2) - 44,
                    background: "#fff",
                    borderRadius: 10,
                    padding: "6px 14px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                  }}
                >
                  <span style={{ color: "#1A1A3E", fontSize: 11, fontWeight: 900 }}>НАЧАТЬ</span>
                  <div
                    style={{
                      position: "absolute",
                      bottom: -6,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "6px solid #fff",
                    }}
                  />
                </motion.div>
              )}

              <motion.div
                whileTap={!isLocked ? { scale: 0.92 } : {}}
                whileHover={!isLocked ? { scale: 1.06 } : {}}
                style={{
                  width: sz,
                  height: sz,
                  borderRadius: "50%",
                  background: isLocked
                    ? T.isDark
                      ? "#1E2038"
                      : "#D4D8F0"
                    : isDone
                    ? `linear-gradient(145deg,${node.color},${node.color}BB)`
                    : `linear-gradient(145deg,${node.color}EE,${node.color}AA)`,
                  border: isCur
                    ? `4px solid ${node.color}`
                    : isDone
                    ? `3px solid ${node.color}CC`
                    : `3px solid ${T.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: sz * 0.34,
                  cursor: isLocked ? "default" : "pointer",
                  animation: isCur ? "curPulse 2.5s ease-in-out infinite" : "none",
                  boxShadow: isDone
                    ? `0 4px 18px ${node.color}66, inset 0 1px 0 rgba(255,255,255,0.25)`
                    : isLocked
                    ? "none"
                    : `0 4px 14px rgba(0,0,0,0.2)`,
                  flexShrink: 0,
                }}
              >
                {isDone ? (
                  <span style={{ color: "#fff", fontSize: sz * 0.32, fontWeight: 900 }}>✓</span>
                ) : isLocked ? (
                  <svg width={sz * 0.32} height={sz * 0.32} viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      stroke={T.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                      strokeWidth="2.2"
                    />
                    <path
                      d="M7 11V7a5 5 0 0110 0v4"
                      stroke={T.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <span>⭐</span>
                )}
              </motion.div>

              {isDone && (
                <div style={{ marginTop: 4, display: "flex", gap: 2 }}>
                  {[1, 2, 3].map((s) => (
                    <span key={s} style={{ fontSize: 9, color: "#FDCB6E", lineHeight: 1 }}>
                      ★
                    </span>
                  ))}
                </div>
              )}

              <div style={{ marginTop: isDone ? 2 : 6, textAlign: "center", maxWidth: 80 }}>
                <p
                  style={{
                    color: isDone ? node.color : isCur ? node.color : T.text2,
                    fontSize: 10,
                    fontWeight: isCur ? 900 : 700,
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {node.sub}
                </p>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
          style={{
            position: "absolute",
            left: "50%",
            top: TOTAL_H - 60,
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 5,
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 4 }}>🏆</div>
          <p style={{ color: T.text2, fontSize: 11, fontWeight: 700, margin: 0 }}>Финал A1</p>
        </motion.div>
      </div>

      <div style={{ height: 60 }} />
    </motion.div>
  );
}
