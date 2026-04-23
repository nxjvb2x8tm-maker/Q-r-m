export const DARK = {
  bg: "#0D0D18",
  card: "#181828",
  card2: "#20203A",
  border: "rgba(255,255,255,0.08)",
  accent: "#6C5CE7",
  accentL: "#A29BFE",
  green: "#00B894",
  red: "#FF7675",
  gold: "#FDCB6E",
  accentGlow: "rgba(108,92,231,0.18)",
  text: "#F0F0FF",
  text2: "#9090B8",
  text3: "rgba(255,255,255,0.2)",
  nav: "rgba(13,13,24,0.97)",
  input: "#20203A",
  isDark: true,
};

export const LIGHT = {
  bg: "#F0F1FA",
  card: "#FFFFFF",
  card2: "#ECEEFF",
  border: "rgba(0,0,0,0.08)",
  accent: "#6C5CE7",
  accentL: "#6C5CE7",
  accentGlow: "rgba(108,92,231,0.1)",
  green: "#00A878",
  red: "#E17055",
  gold: "#E8A800",
  text: "#1A1A3E",
  text2: "#666699",
  text3: "rgba(0,0,0,0.2)",
  nav: "rgba(240,241,250,0.97)",
  input: "#ECEEFF",
  isDark: false,
};

export const baseButton = {
  fontFamily: "'Nunito',sans-serif",
  border: "none",
  cursor: "pointer",
  borderRadius: 14,
  transition: "all 0.18s",
};

// Shared spring config used across interactive components
export const spring = {
  soft:  { type: "spring", stiffness: 320, damping: 32 },
  tight: { type: "spring", stiffness: 500, damping: 34 },
  bouncy:{ type: "spring", stiffness: 480, damping: 18 },
};
