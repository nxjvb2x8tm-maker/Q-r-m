import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function useRobotMood(studiedToday, studySeconds) {
  const hourOfDay = new Date().getHours();
  if (studiedToday && studySeconds >= 60) return "alive";
  if (hourOfDay < 12) return "tired";
  return "dead";
}

export default function MiniRobot({ onTap, mood = "alive" }) {
  const [blink, setBlink] = useState(false);
  const [wave, setWave] = useState(false);
  const [bob, setBob] = useState(false);
  const [zzzPhase, setZzz] = useState(0);

  useEffect(() => {
    if (mood !== "alive") return;
    const bi = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 110);
    }, 2800 + Math.random() * 1500);
    return () => clearInterval(bi);
  }, [mood]);

  useEffect(() => {
    if (mood !== "alive") return;
    const wi = setInterval(() => {
      setBob(true);
      setTimeout(() => setBob(false), 600);
      setTimeout(() => {
        setWave(true);
        setTimeout(() => setWave(false), 2200);
      }, 1400);
    }, 5000);
    return () => clearInterval(wi);
  }, [mood]);

  useEffect(() => {
    if (mood !== "tired") return;
    const id = setInterval(() => setZzz((p) => (p + 1) % 4), 900);
    return () => clearInterval(id);
  }, [mood]);

  function handleTap() {
    if (mood === "alive") {
      setBob(true);
      setTimeout(() => setBob(false), 500);
    }
    onTap?.();
  }

  const headTilt = mood === "tired" ? 22 : mood === "dead" ? 30 : wave ? -8 : 0;
  const tint =
    mood === "dead"
      ? "grayscale(0.85) brightness(0.7)"
      : mood === "tired"
      ? "saturate(0.55) brightness(0.85)"
      : "none";

  return (
    <motion.div
      whileTap={{ scale: 0.92 }}
      animate={{ y: bob ? -8 : 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 14 }}
      style={{ position: "relative", cursor: "pointer" }}
      onClick={handleTap}
    >
      <svg
        width="100"
        height="130"
        viewBox="0 80 300 300"
        fill="none"
        style={{
          display: "block",
          filter: `drop-shadow(0 8px 24px rgba(120,90,255,0.5)) ${tint}`,
        }}
      >
        <defs>
          <radialGradient id="rHead" cx="36%" cy="26%" r="72%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#eee8ff" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </radialGradient>
          <radialGradient id="rBody" cx="34%" cy="22%" r="76%">
            <stop offset="0%" stopColor="#f6f1ff" />
            <stop offset="55%" stopColor="#ddd4f8" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </radialGradient>
          <radialGradient id="rLimb" cx="30%" cy="24%" r="72%">
            <stop offset="0%" stopColor="#f2edff" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </radialGradient>
          <radialGradient id="rEye" cx="28%" cy="24%" r="66%">
            <stop offset="0%" stopColor="#7c6fcf" />
            <stop offset="100%" stopColor="#17102e" />
          </radialGradient>
        </defs>

        {/* Legs */}
        <rect x="100" y="266" width="34" height="52" rx="17" fill="url(#rLimb)" />
        <rect x="166" y="266" width="34" height="52" rx="17" fill="url(#rLimb)" />
        <rect x="83" y="306" width="56" height="22" rx="11" fill="url(#rLimb)" />
        <rect x="159" y="306" width="56" height="22" rx="11" fill="url(#rLimb)" />
        <rect x="90" y="309" width="20" height="7" rx="3.5" fill="white" opacity="0.3" />
        <rect x="166" y="309" width="20" height="7" rx="3.5" fill="white" opacity="0.3" />

        {/* Body */}
        <rect x="70" y="174" width="160" height="106" rx="34" fill="url(#rBody)" />
        <ellipse cx="114" cy="192" rx="44" ry="17" fill="white" opacity="0.35" />
        <rect
          x="90"
          y="196"
          width="120"
          height="62"
          rx="18"
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.2"
        />
        <circle cx="118" cy="218" r="5.5" fill={mood === "alive" ? "#7c3aed" : "#444"} opacity={mood === "alive" ? 0.9 : 0.3} />
        <circle cx="118" cy="218" r="3" fill="white" opacity={mood === "alive" ? 0.95 : 0.2} />
        <circle cx="150" cy="218" r="3" fill="white" opacity={mood === "alive" ? 0.35 : 0.1} />
        <circle cx="182" cy="218" r="3" fill="white" opacity={mood === "alive" ? 0.2 : 0.05} />
        <rect x="106" y="236" width="88" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
        <rect
          x="106"
          y="236"
          width={mood === "dead" ? 6 : mood === "tired" ? 26 : 55}
          height="5"
          rx="2.5"
          fill={mood === "alive" ? "rgba(167,139,250,0.7)" : "rgba(80,80,80,0.4)"}
        />
        <rect x="106" y="246" width="88" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect
          x="106"
          y="246"
          width={mood === "dead" ? 0 : mood === "tired" ? 14 : 33}
          height="4"
          rx="2"
          fill={mood === "alive" ? "rgba(110,231,183,0.6)" : "rgba(80,80,80,0.3)"}
        />

        {/* Left arm */}
        <g
          style={{
            transformOrigin: "70px 190px",
            transform:
              mood === "dead"
                ? "rotate(38deg)"
                : mood === "tired"
                ? "rotate(16deg)"
                : "rotate(-8deg)",
            transition: "transform 0.6s ease",
          }}
        >
          <rect x="32" y="174" width="38" height="88" rx="19" fill="url(#rLimb)" />
          <rect x="39" y="180" width="12" height="32" rx="6" fill="white" opacity="0.25" />
          <ellipse cx="51" cy="266" rx="21" ry="15" fill="url(#rLimb)" />
          <ellipse cx="57" cy="262" rx="7" ry="5" fill="white" opacity="0.25" />
        </g>

        {/* Right arm */}
        <g
          style={{
            transformOrigin: "228px 190px",
            transform:
              mood === "dead"
                ? "rotate(-28deg)"
                : mood === "tired"
                ? "rotate(-12deg)"
                : "rotate(8deg)",
            transition: "transform 0.6s ease",
          }}
        >
          <rect x="230" y="174" width="38" height="88" rx="19" fill="url(#rLimb)" />
          <rect x="237" y="180" width="12" height="32" rx="6" fill="white" opacity="0.25" />
          <ellipse cx="249" cy="266" rx="21" ry="15" fill="url(#rLimb)" />
          <ellipse cx="243" cy="262" rx="7" ry="5" fill="white" opacity="0.25" />
        </g>

        {/* Neck */}
        <rect x="124" y="154" width="52" height="26" rx="13" fill="url(#rLimb)" />

        {/* Head */}
        <g
          style={{
            transformOrigin: "150px 108px",
            transform: `rotate(${headTilt}deg)`,
            transition: "transform 0.6s ease",
          }}
        >
          <rect x="56" y="50" width="188" height="114" rx="36" fill="url(#rHead)" />
          <ellipse cx="106" cy="72" rx="50" ry="20" fill="white" opacity="0.38" />
          <ellipse cx="90" cy="65" rx="20" ry="9" fill="white" opacity="0.26" />

          {mood === "alive" && (
            <>
              <ellipse cx="84" cy="128" rx="22" ry="13" fill="rgba(253,164,175,0.45)" />
              <ellipse cx="216" cy="128" rx="22" ry="13" fill="rgba(253,164,175,0.45)" />
            </>
          )}

          {mood === "alive" && (
            <>
              <ellipse
                cx="108"
                cy="100"
                rx="20"
                ry={blink ? 2.5 : 20}
                fill="url(#rEye)"
                style={{ transition: "ry 0.06s" }}
              />
              {!blink && (
                <>
                  <ellipse cx="101" cy="92" rx="7" ry="7" fill="white" opacity="0.6" />
                  <ellipse
                    cx="108"
                    cy="100"
                    rx="11"
                    ry="11"
                    stroke="rgba(167,139,250,0.3)"
                    strokeWidth="2"
                    fill="none"
                  />
                </>
              )}
              <ellipse
                cx="192"
                cy="100"
                rx="20"
                ry={blink ? 2.5 : 20}
                fill="url(#rEye)"
                style={{ transition: "ry 0.06s" }}
              />
              {!blink && (
                <>
                  <ellipse cx="185" cy="92" rx="7" ry="7" fill="white" opacity="0.6" />
                  <ellipse
                    cx="192"
                    cy="100"
                    rx="11"
                    ry="11"
                    stroke="rgba(167,139,250,0.3)"
                    strokeWidth="2"
                    fill="none"
                  />
                </>
              )}
            </>
          )}

          {mood === "tired" && (
            <>
              <ellipse cx="108" cy="100" rx="20" ry="20" fill="url(#rEye)" />
              <rect x="87" y="82" width="42" height="20" rx="4" fill="#eee8ff" />
              <ellipse cx="101" cy="94" rx="5" ry="3" fill="white" opacity="0.4" />
              <ellipse cx="192" cy="100" rx="20" ry="20" fill="url(#rEye)" />
              <rect x="171" y="82" width="42" height="20" rx="4" fill="#eee8ff" />
              <ellipse cx="185" cy="94" rx="5" ry="3" fill="white" opacity="0.4" />
            </>
          )}

          {mood === "dead" && (
            <>
              <line x1="92" y1="86" x2="124" y2="118" stroke="#5a4a8a" strokeWidth="5" strokeLinecap="round" />
              <line x1="124" y1="86" x2="92" y2="118" stroke="#5a4a8a" strokeWidth="5" strokeLinecap="round" />
              <line x1="176" y1="86" x2="208" y2="118" stroke="#5a4a8a" strokeWidth="5" strokeLinecap="round" />
              <line x1="208" y1="86" x2="176" y2="118" stroke="#5a4a8a" strokeWidth="5" strokeLinecap="round" />
            </>
          )}

          {mood === "alive" && (
            <path
              d={wave ? "M116 134 Q150 152 184 134" : "M122 138 Q150 148 178 138"}
              stroke="#9b88de"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
              style={{ transition: "d 0.3s" }}
            />
          )}
          {mood === "tired" && (
            <path
              d="M122 144 Q150 140 178 144"
              stroke="#7a6aaa"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
          )}
          {mood === "dead" && (
            <path
              d="M118 142 Q130 148 142 142 Q154 136 166 142 Q178 148 182 142"
              stroke="#5a4a8a"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
          )}

          <circle cx="56" cy="107" r="12" fill="url(#rLimb)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          <circle cx="56" cy="107" r="5.5" fill={mood === "alive" ? "rgba(109,40,217,0.5)" : "rgba(60,60,60,0.4)"} />
          <circle cx="56" cy="107" r="2.5" fill="white" opacity="0.7" />
          <circle cx="244" cy="107" r="12" fill="url(#rLimb)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          <circle cx="244" cy="107" r="5.5" fill={mood === "alive" ? "rgba(109,40,217,0.5)" : "rgba(60,60,60,0.4)"} />
          <circle cx="244" cy="107" r="2.5" fill="white" opacity="0.7" />

          {mood === "tired" &&
            [
              { x: 230, y: 52, s: 14, op: zzzPhase >= 1 ? 1 : 0.1 },
              { x: 248, y: 36, s: 18, op: zzzPhase >= 2 ? 1 : 0.1 },
              { x: 268, y: 16, s: 22, op: zzzPhase >= 3 ? 1 : 0.1 },
            ].map(({ x, y, s, op }, i) => (
              <text
                key={i}
                x={x}
                y={y}
                fontSize={s}
                fill="#a5b4fc"
                opacity={op}
                style={{ transition: "opacity 0.4s", fontWeight: "bold", fontFamily: "sans-serif" }}
              >
                z
              </text>
            ))}

          {mood === "dead" && (
            <>
              <path d="M150 60 L145 75 L155 80 L148 96" stroke="rgba(90,74,138,0.55)" strokeWidth="1.5" fill="none" />
              <path d="M130 65 L125 78 L133 82" stroke="rgba(90,74,138,0.4)" strokeWidth="1.2" fill="none" />
            </>
          )}
        </g>
      </svg>
    </motion.div>
  );
}

export function RobotMessage({ mood, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 50,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          background: "rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 120,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 22,
            padding: "18px 24px",
            maxWidth: 300,
            boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Nunito',sans-serif",
              fontSize: 15,
              fontWeight: 800,
              color: "#1A1A3E",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {mood === "tired"
              ? "💤 Robot uyuqlay… Bir dersni ögren, onat!"
              : mood === "dead"
              ? "😵 Robot öldü! Bir dersni ögren — tirildir!"
              : "Selâm, anatilini ögrenmege azırsıñmı? ☺️"}
          </p>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={onClose}
            style={{
              marginTop: 14,
              background: "#6C5CE7",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "9px 28px",
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Ebet! ✨
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
