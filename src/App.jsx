import { useState } from "react";
import { words } from "./assets/words";
import Footer from "./components/Footer";
import GameGrid from "./components/GameGrid";
import StatsPopup from "./components/StatsPopup";
import InfoPopup from "./components/InfoPopup";
import Header from "./components/Header";
import { SolutionContext } from "./contexts";
import GamePanel from "./layouts/GamePanel";
import GameFooter from "./components/GameFooter";

function App() {
  const emptyAttempts = [
    { id: 0, word: [] },
    { id: 1, word: [] },
    { id: 2, word: [] },
    { id: 3, word: [] },
    { id: 4, word: [] },
    { id: 5, word: [] },
  ];

  const solutionHook = useState(() =>
    words[Math.floor(Math.random() * words.length)].toUpperCase().split(""),
  );
  const [attempts, setAttempts] = useState(emptyAttempts);
  const [gameStats, setGameStats] = useState({ played: 0, won: 0 });

  const [areStatsOpen, setAreStatsOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);

  console.log(attempts);

  return (
    <SolutionContext value={solutionHook}>
      <GamePanel>
        <Header>Wordle Clone</Header>
        <GameGrid attempts={attempts} />

        <GameFooter
          attempts={attempts}
          setAttempts={setAttempts}

          gameStats={gameStats}
          setGameStats={setGameStats}
        />

        <StatsPopup
          areStatsOpen={areStatsOpen}
          setAreStatsOpen={setAreStatsOpen}
          setIsLinkOpen={setIsLinkOpen}

          gameStats={gameStats}
        />

        <InfoPopup
          isLinkOpen={isLinkOpen}
          setIsLinkOpen={setIsLinkOpen}
          setAreStatsOpen={setAreStatsOpen}
        />
      </GamePanel>
      <Footer />
    </SolutionContext>
  );
}

export default App;
