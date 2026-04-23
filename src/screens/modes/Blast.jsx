import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WORDS } from "../../data/words.js";
import { SKINS } from "./BlastParts.jsx";
import { Lobby, Rules, Results } from "./BlastLobby.jsx";
import { Game } from "./BlastGame.jsx";

export default function Blast({ T, onBack, words: wProp = WORDS }) {
  const [screen, setScreen] = useState("lobby");
  const [skinIdx, setSkinIdx] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const skin = SKINS[skinIdx];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        {screen === "lobby" && (
          <Lobby
            key="lobby"
            skinIdx={skinIdx}
            setSkinIdx={setSkinIdx}
            onStart={() => setScreen("game")}
            onRules={() => setShowRules(true)}
          />
        )}
        {screen === "game" && (
          <Game
            key={"game-" + Date.now()}
            skin={skin}
            words={wProp}
            onEnd={(s) => {
              setFinalScore(s);
              setScreen("results");
            }}
          />
        )}
        {screen === "results" && (
          <Results
            key="results"
            score={finalScore}
            total={wProp.length}
            skin={skin}
            onReplay={() => setScreen("game")}
            onBack={onBack}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showRules && <Rules onClose={() => setShowRules(false)} />}
      </AnimatePresence>
    </div>
  );
}
