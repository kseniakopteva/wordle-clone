import { useContext } from "react";
import { SolutionContext } from "../contexts";

export default function GameOverMessage({ currentAttemptID, attempts }) {
  const [currentSolution] = useContext(SolutionContext);

  return (
    <>
      {currentAttemptID >= 6 &&
      attempts
        .find((elem) => elem.id === 5)
        .word.map((elem) => elem.letter)
        .join("") != currentSolution.join("") ? (
        <p className="my-3 w-full text-center">No more attempts left!</p>
      ) : (
        <p className="my-3 w-full text-center">You won!</p>
      )}
      <p className="my-3 w-full text-center text-2xl text-black dark:text-white">
        The solution is:{" "}
        <span className="inline-block rounded-lg border-[#8a9f4f] bg-[#aac562] px-2 py-1 text-[#375812]">
          {currentSolution.join("")}
        </span>
      </p>
    </>
  );
}
