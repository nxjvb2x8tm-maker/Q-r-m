import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DARK, LIGHT } from "./theme.js";
import Nav from "./components/Nav.jsx";
import Journey from "./screens/Journey.jsx";
import Modules from "./screens/Modules.jsx";
import Results from "./screens/Results.jsx";
import Settings from "./screens/Settings.jsx";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [tab, setTab] = useState("journey");
  const T = theme === "dark" ? DARK : LIGHT;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.isDark ? "#050508" : "#B0B2CC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 40,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 40px 120px rgba(0,0,0,0.65),0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <AnimatePresence mode="wait" initial={false}>
            {tab === "journey" && <Journey key="journey" T={T} />}
            {tab === "modules" && <Modules key="modules" T={T} />}
            {tab === "results" && <Results key="results" T={T} go={setTab} />}
            {tab === "settings" && (
              <Settings key="settings" T={T} theme={theme} setTheme={setTheme} />
            )}
          </AnimatePresence>
        </div>
        <Nav tab={tab} go={setTab} T={T} />
      </div>
    </div>
  );
}
