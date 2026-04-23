import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rn } from "../../utils.js";
import { SKINS, STARS, DURATION, Ship, Rock } from "./BlastParts.jsx";

function makeRock(label, isCorrect) {
  return {
    id: `${Date.now()}-${Math.random()}`,
    label,
    correct: isCorrect,
    x: rn(10, 75),
    y: rn(15, 72),
    vx: rn(2.6, 5) * (Math.random() > 0.5 ? 1 : -1),
    vy: rn(2.1, 4.2) * (Math.random() > 0.5 ? 1 : -1),
    size: Math.round(rn(120, 140)),
  };
}

function buildRocks(allWords) {
  const picked = [...allWords].sort(() => Math.random() - 0.5).slice(0, 5);
  return picked.map((w, i) => makeRock(w.ru, i === 0));
}

export function Game({ skin, words, onEnd }) {
  const [cdNum, setCdNum] = useState(3);
  const [live, setLive] = useState(false);
  const [time, setTime] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [rocks, setRocks] = useState([]);
  const [laser, setLaser] = useState(null);
  const [particles, setParticles] = useState([]);
  const [hitId, setHitId] = useState(null);
  const [badId, setBadId] = useState(null);
  const [locked, setLocked] = useState(false);

  // Refs for rAF + stale-closure avoidance
  const rocksRef = useRef([]);
  const liveRef = useRef(false);
  const scRef = useRef(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);

  useEffect(() => {
    scRef.current = score;
  }, [score]);
  useEffect(() => {
    liveRef.current = live;
  }, [live]);
  useEffect(() => {
    rocksRef.current = rocks;
  }, [rocks]);

  // Countdown
  useEffect(() => {
    if (live) return;
    if (cdNum <= 0) {
      setLive(true);
      return;
    }
    const t = setTimeout(() => setCdNum((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [cdNum, live]);

  // Spawn rocks on start
  useEffect(() => {
    if (!live) return;
    const initial = buildRocks(words);
    setRocks(initial);
    rocksRef.current = initial;
  }, [live, words]);

  // Timer
  useEffect(() => {
    if (!live) return;
    if (time <= 0) {
      onEnd(scRef.current);
      return;
    }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [live, time]);

  // Movement — requestAnimationFrame with deltaTime for consistent speed
  useEffect(() => {
    if (!live) return;

    function tick(ts) {
      if (!liveRef.current) return;
      const last = lastTsRef.current || ts;
      const dt = Math.min((ts - last) / 1000, 0.05); // seconds, clamped
      lastTsRef.current = ts;

      const next = rocksRef.current.map((rock) => {
        let { x, y, vx, vy } = rock;
        x += vx * dt;
        y += vy * dt;

        if (x < 5)  { x = 5  + (5  - x);  vx =  Math.abs(vx); }
        if (x > 88) { x = 88 - (x - 88); vx = -Math.abs(vx); }
        if (y < 8)  { y = 8  + (8  - y);  vy =  Math.abs(vy); }
        if (y > 84) { y = 84 - (y - 84); vy = -Math.abs(vy); }

        x = Math.max(5, Math.min(88, x));
        y = Math.max(8, Math.min(84, y));

        // avoid word box area (top center)
        if (x > 20 && x < 80 && y < 38) {
          vy = Math.abs(vy);
          y = 38;
        }
        // avoid ship area (bottom center)
        if (x > 36 && x < 64 && y > 72) {
          vy = -Math.abs(vy);
          y = 72;
        }
        return { ...rock, x, y, vx, vy };
      });

      rocksRef.current = next;
      setRocks(next);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = 0;
    };
  }, [live]);

  function spawnParticles(x, y, color) {
    const parts = Array.from({ length: 10 }, (_, i) => ({
      id: `p-${Date.now()}-${i}`,
      x,
      y,
      dx: rn(-30, 30),
      dy: rn(-30, 30),
      color,
    }));
    setParticles((p) => [...p, ...parts]);
    setTimeout(() => {
      setParticles((p) => p.filter((pp) => !parts.find((pa) => pa.id === pp.id)));
    }, 650);
  }

  function tap(rock) {
    if (locked) return;
    setLocked(true);
    setLaser({ x1: 50, y1: 92, x2: rock.x, y2: rock.y });
    setTimeout(() => setLaser(null), 240);

    if (rock.correct) {
      setHitId(rock.id);
      spawnParticles(rock.x, rock.y, skin.accent);
      setScore((s) => {
        const n = s + 1;
        scRef.current = n;
        return n;
      });
      setTimeout(() => setHitId(null), 320);
      setTimeout(() => {
        setRocks((prev) => {
          const kept = prev.filter((r) => r.id !== rock.id);
          const used = new Set(kept.map((r) => r.label));
          const candidate = words
            .filter((w) => !used.has(w.ru))
            .sort(() => Math.random() - 0.5)[0];
          const newRock = candidate
            ? makeRock(candidate.ru, false)
            : makeRock(kept[0]?.label + "?" || "?", false);
          const all = [...kept, newRock];
          const nextIdx = Math.floor(Math.random() * all.length);
          const out = all.map((r, i) => ({ ...r, correct: i === nextIdx }));
          rocksRef.current = out;
          return out;
        });
        setLocked(false);
      }, 380);
    } else {
      setBadId(rock.id);
      spawnParticles(rock.x, rock.y, "#FF6B6B");
      setScore((s) => Math.max(0, s - 1));
      setTimeout(() => {
        setBadId(null);
        setLocked(false);
      }, 380);
    }
  }

  const pct = (time / DURATION) * 100;
  const bar = pct > 50 ? "#00C9A7" : pct > 25 ? "#FFB800" : "#FF4444";
  const curRock = rocks.find((r) => r.correct);
  const curQ = words.find((w) => w.ru === curRock?.label)?.qr ?? "...";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 10%,#1a1a4e,#060614)",
        fontFamily: "'Nunito',sans-serif",
        userSelect: "none",
      }}
    >
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.o,
          }}
        />
      ))}

      <AnimatePresence>
        {!live && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.55)",
            }}
          >
            <motion.span
              key={cdNum}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 1.2, 1], opacity: [0, 1, 1] }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                fontSize: 100,
                fontWeight: 900,
                color: "#fff",
                textShadow: `0 0 50px ${skin.glow}`,
                display: "inline-block",
              }}
            >
              {cdNum > 0 ? cdNum : "GO!"}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* time bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          background: "rgba(255,255,255,0.1)",
          zIndex: 40,
        }}
      >
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "linear" }}
          style={{ height: "100%", background: bar, boxShadow: `0 0 6px ${bar}` }}
        />
      </div>

      {/* HUD */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 0,
          right: 0,
          zIndex: 40,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 12px",
        }}
      >
        <motion.div
          key={"s" + score}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 18 }}
          style={{
            background: "rgba(255,215,0,.15)",
            border: "1px solid rgba(255,215,0,.35)",
            borderRadius: 100,
            padding: "5px 14px",
          }}
        >
          <span style={{ color: "#FFD700", fontSize: 14, fontWeight: 900 }}>⭐ {score}</span>
        </motion.div>
        <div
          style={{
            background: "rgba(255,255,255,.1)",
            border: "1px solid rgba(255,255,255,.2)",
            borderRadius: 100,
            padding: "5px 14px",
          }}
        >
          <span style={{ color: time <= 10 ? "#FF4444" : "#fff", fontSize: 14, fontWeight: 900 }}>
            ⏱ {time}s
          </span>
        </div>
      </div>

      {/* word prompt */}
      {live && (
        <div
          style={{
            position: "absolute",
            top: 44,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 40,
            whiteSpace: "nowrap",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `${skin.hull}22`,
              border: `2px solid ${skin.hull}88`,
              borderRadius: 14,
              padding: "8px 24px",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: `0 4px 18px ${skin.glow}`,
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,.5)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                margin: "0 0 2px",
                textAlign: "center",
              }}
            >
              НАЙДИ ПЕРЕВОД
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={curQ}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: 900,
                  margin: 0,
                  textShadow: `0 0 14px ${skin.glow}`,
                }}
              >
                {curQ}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* laser */}
      <AnimatePresence>
        {laser && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 35,
              pointerEvents: "none",
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line
              x1={laser.x1}
              y1={laser.y1}
              x2={laser.x2}
              y2={laser.y2}
              stroke={skin.accent}
              strokeWidth="0.7"
              opacity="0.9"
            />
            <line
              x1={laser.x1}
              y1={laser.y1}
              x2={laser.x2}
              y2={laser.y2}
              stroke="white"
              strokeWidth="0.25"
              opacity="0.6"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            zIndex: 34,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* rocks */}
      {live &&
        rocks.map((rock) => (
          <div
            key={rock.id}
            onClick={() => tap(rock)}
            style={{
              position: "absolute",
              left: `${rock.x}%`,
              top: `${rock.y}%`,
              transform: "translate(-50%,-50%)",
              cursor: "pointer",
              zIndex: 30,
              willChange: "transform",
            }}
          >
            <motion.div
              animate={{
                scale: hitId === rock.id ? [1, 1.3, 0.6] : badId === rock.id ? [1, 0.92, 1] : 1,
                rotate: hitId === rock.id ? [0, 15, -10, 0] : 0,
                opacity: hitId === rock.id ? [1, 1, 0] : 1,
              }}
              transition={{ duration: 0.38 }}
            >
              <Rock
                size={rock.size}
                label={rock.label}
                flash={hitId === rock.id ? "hit" : badId === rock.id ? "wrong" : null}
              />
            </motion.div>
          </div>
        ))}

      {/* ship */}
      <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
        <Ship skin={skin} />
      </div>
    </div>
  );
}
