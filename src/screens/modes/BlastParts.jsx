import { rn } from "../../utils.js";

export const SKINS = [
  { name: "Cosmic", hull: "#00C9A7", ring: "#00A886", glow: "rgba(0,201,167,0.6)",  accent: "#7FFFD4" },
  { name: "Solar",  hull: "#FF8C42", ring: "#E06820", glow: "rgba(255,140,66,0.6)", accent: "#FFD700" },
  { name: "Nebula", hull: "#9B59B6", ring: "#7D3C98", glow: "rgba(155,89,182,0.6)", accent: "#DA70D6" },
  { name: "Arctic", hull: "#48CAE4", ring: "#0096C7", glow: "rgba(72,202,228,0.6)", accent: "#ADE8F4" },
];

export const STARS = Array.from({ length: 50 }, () => ({
  x: rn(0, 100),
  y: rn(0, 100),
  s: rn(1, 3),
  o: rn(0.3, 0.9),
}));

export const DURATION = 30;

export function Ship({ skin }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      style={{ display: "block", filter: `drop-shadow(0 0 12px ${skin.glow})` }}
    >
      <circle cx="40" cy="40" r="37" fill={skin.ring} opacity="0.2" />
      <circle cx="40" cy="40" r="31" fill={skin.hull} />
      <circle cx="40" cy="40" r="29" fill={skin.ring} />
      <circle cx="40" cy="40" r="21" fill={skin.hull} opacity="0.55" />
      {[0, 90, 180, 270].map((ang) => {
        const rad = (ang * Math.PI) / 180;
        const px = 40 + Math.cos(rad) * 29;
        const py = 40 + Math.sin(rad) * 29;
        return (
          <circle key={ang} cx={px} cy={py} r="5" fill="#0a0a1a" stroke={skin.accent} strokeWidth="1.5" />
        );
      })}
      <rect x="37" y="5" width="6" height="13" rx="3" fill="#0a0a1a" stroke={skin.accent} strokeWidth="1.5" />
      <circle cx="40" cy="7" r="2.5" fill={skin.accent} />
      <circle cx="40" cy="40" r="15" fill="#08081a" stroke={skin.accent} strokeWidth="1.5" />
      <text x="40" y="45" textAnchor="middle" fontSize="14" fill={skin.accent}>👤</text>
    </svg>
  );
}

export function Rock({ size, label, flash }) {
  const c0 = flash === "hit" ? "#FFE566" : flash === "wrong" ? "#FF8888" : "#7A85FF";
  const c1 = flash === "hit" ? "#CC8800" : flash === "wrong" ? "#CC2222" : "#3A3FBA";
  const sk = flash === "hit" ? "#FFB800" : flash === "wrong" ? "#EF4444" : "#5560FF";
  const gl = flash === "hit" ? "rgba(255,190,0,.85)" : flash === "wrong" ? "rgba(239,68,68,.7)" : "rgba(70,90,255,.5)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: "block", filter: `drop-shadow(0 0 18px ${gl})` }}
    >
      <defs>
        <radialGradient id="rg" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor={c0} />
          <stop offset="100%" stopColor={c1} />
        </radialGradient>
      </defs>
      <path
        d="M50,4 L70,14 L86,30 L90,52 L78,72 L60,88 L38,90 L18,78 L8,58 L12,34 L28,14 Z"
        fill="url(#rg)"
        stroke={sk}
        strokeWidth="1.5"
      />
      <ellipse cx="33" cy="33" rx="7" ry="5" fill="rgba(0,0,0,0.16)" transform="rotate(-18 33 33)" />
      <ellipse cx="63" cy="60" rx="5" ry="4" fill="rgba(0,0,0,0.14)" transform="rotate(12 63 60)" />
      <text x="50" y="56" textAnchor="middle" fontSize="13" fontWeight="800" fill="white" fontFamily="sans-serif">
        {label.length > 9 ? label.slice(0, 8) + "…" : label}
      </text>
    </svg>
  );
}
