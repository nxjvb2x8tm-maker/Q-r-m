import { motion } from "framer-motion";

export default function Scroll({ children, T, pad = 48 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        inset: 0,
        background: T.bg,
        overflowY: "auto",
        scrollbarWidth: "none",
        fontFamily: "'Nunito',sans-serif",
      }}
    >
      {children}
      <div style={{ height: pad }} />
    </motion.div>
  );
}
