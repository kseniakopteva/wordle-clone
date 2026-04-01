import { useContext } from "react";
import { SolutionContext } from "../contexts";
import { checkGuess } from "../gameLogic";

export default function Input({
  isGameOver,
  attempts,
  setAttempts,
  currentAttemptID,
  setCurrentAttemptID,
  setIsGameOver,
  gameStats,
  setGameStats,
}) {
  const [currentSolution] = useContext(SolutionContext);

  function handleSubmit(formData) {
    const wordInput = formData.get("word");

    if (wordInput.length < 5 || wordInput.length > 5) {
      alert("The word should be 5 letters long.");
      return;
    } else if (/^[a-zA-Z]*$/.test(wordInput) != true) {
      alert("The word should consist only of English alphabet letters.");
      return;
    } else if (isGameOver) {
      alert("You can't enter a word when the game is over!");
      return;
    }

    let final = checkGuess(wordInput, currentSolution);

    setAttempts(
      attempts.map((item) => {
        if (item.id === currentAttemptID) {
          return { ...item, word: final };
        } else {
          return item;
        }
      }),
    );

    const newCurrentAttemptID = currentAttemptID + 1;
    let newWon = gameStats.won;

    setCurrentAttemptID(newCurrentAttemptID);

    if (
      newCurrentAttemptID >= 6 ||
      currentSolution.join("") === wordInput.toUpperCase()
    ) {
      setIsGameOver(true);
      if (currentSolution.join("") === wordInput.toUpperCase()) {
        newWon += 1;
      }

      setGameStats({
        played: gameStats.played + 1,
        won: newWon,
      });
    }
  }

  return (
    <form action={handleSubmit} className="flex w-full items-stretch gap-2">
      <input
        type="text"
        name="word"
        className="w-50 rounded-xs border border-gray-500 bg-white px-4 py-2 text-2xl text-(--text) uppercase shadow disabled:border-gray-400 disabled:bg-gray-200 dark:border-zinc-300 dark:bg-neutral-600 dark:text-white dark:disabled:border-zinc-700 dark:disabled:bg-zinc-800"
      />
      <button
        type="submit"
        className="cursor-pointer rounded border border-gray-600 bg-gray-600 p-2 text-white disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400 dark:border-zinc-800 dark:bg-zinc-900 dark:disabled:border-zinc-800 dark:disabled:bg-zinc-900"
      >
        Submit
      </button>
    </form>
  );
}
