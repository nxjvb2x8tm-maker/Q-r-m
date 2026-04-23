export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export const rn = (a, b) => Math.random() * (b - a) + a;

export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
