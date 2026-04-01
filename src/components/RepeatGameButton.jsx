import { useContext } from "react";
import { RepeatSVG } from "../assets/svg";
import { SolutionContext } from "../contexts";
import { words } from "../assets/words";

export default function RepeatGameButton({
  setCurrentAttemptID,
  setAttempts,
  setIsGameOver,
  emptyAttempts,
  isGameOver,
}) {
  const setCurrentSolution = useContext(SolutionContext)[1];

  function resetGame() {
    {
      setCurrentAttemptID(0);
      setAttempts(emptyAttempts);
      setIsGameOver(false);
      setCurrentSolution(() =>
        words[Math.floor(Math.random() * words.length)].toUpperCase().split(""),
      );
    }
  }

  return (
    <button
      className={`mt-5 flex cursor-pointer items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 p-2 text-xl text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white ${isGameOver ? "border border-white outline-3 outline-(--accent)" : ""}`}
      onClick={() => resetGame()}
    >
      <RepeatSVG /> Repeat with new word
    </button>
  );
}
