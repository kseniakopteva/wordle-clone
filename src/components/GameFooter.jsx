import Input from "./Input";
import GameOverMessage from "./GameOverMessage";
import RepeatGameButton from "./RepeatGameButton";
import { useState } from "react";

export default function GameFooter(props) {
  const [currentAttemptID, setCurrentAttemptID] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  return (
    <section className="flex h-full flex-col justify-between">
      <Input
        isGameOver={props.isGameOver}
        setIsGameOver={setIsGameOver}
        currentAttemptID={currentAttemptID}
        setCurrentAttemptID={setCurrentAttemptID}
        attempts={props.attempts}
        setAttempts={props.setAttempts}
        gameStats={props.gameStats}
        setGameStats={props.setGameStats}
      />
      {isGameOver && (
        <GameOverMessage
          currentAttemptID={props.currentAttemptID}
          attempts={props.attempts}
        />
      )}

      <RepeatGameButton
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
        setCurrentAttemptID={setCurrentAttemptID}
        setAttempts={props.setAttempts}
        emptyAttempts={props.emptyAttempts}
      />
    </section>
  );
}
