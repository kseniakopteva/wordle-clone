import { useState } from "react";
import { InfoSVG, RepeatSVG, StatsSVG } from "./assets/svg";
import { words } from "./assets/words";

function App() {
  const [currentSolution, setCurrentSolution] = useState(() =>
    words[Math.floor(Math.random() * words.length)].toUpperCase().split(""),
  );
  const [currentAttemptID, setCurrentAttemptID] = useState(0);
  const [attempts, setAttempts] = useState([
    { id: 0, word: [] },
    { id: 1, word: [] },
    { id: 2, word: [] },
    { id: 3, word: [] },
    { id: 4, word: [] },
    { id: 5, word: [] },
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [wonGameCount, setWonGameCount] = useState(0);
  const [playedGameCount, setPlayedGameCount] = useState(0);

  const [areStatsOpen, setAreStatsOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);

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

    let inputLetterObjArr = [];
    [...wordInput.toUpperCase()].forEach((element, index) => {
      inputLetterObjArr.push({ index: index, letter: element });
    });
    let solutionLetterPool = [];
    currentSolution.forEach((element, index) => {
      solutionLetterPool.push({ index: index, letter: element });
    });
    let final = [];

    inputLetterObjArr.forEach(({ letter, index }) => {
      if (
        letter ===
        solutionLetterPool.find((elem) => elem.index === index).letter
      ) {
        final.push({ index, letter, color: "green" });

        solutionLetterPool = solutionLetterPool.filter(
          (elem) => elem.index !== index,
        );
        inputLetterObjArr = inputLetterObjArr.filter(
          (elem) => elem.index !== index,
        );
      }
    });
    inputLetterObjArr.forEach(({ letter, index }) => {
      let found = solutionLetterPool.find((elem) => elem.letter === letter);
      if (found != undefined) {
        final.push({ index, letter, color: "yellow" });

        solutionLetterPool = solutionLetterPool.filter(
          (elem) => elem.index !== found.index,
        );
        inputLetterObjArr = inputLetterObjArr.filter(
          (elem) => elem.index !== index,
        );
      }
    });
    inputLetterObjArr.forEach(({ letter, index }) => {
      final.push({ index, letter, color: "grey" });

      solutionLetterPool = solutionLetterPool.filter(
        (elem) => elem.index !== index,
      );
      inputLetterObjArr = inputLetterObjArr.filter(
        (elem) => elem.index !== index,
      );
    });

    final = final.sort((a, b) => a.index - b.index);

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

    setCurrentAttemptID(newCurrentAttemptID);

    if (
      newCurrentAttemptID >= 6 ||
      currentSolution.join("") === wordInput.toUpperCase()
    ) {
      setIsGameOver(true);
      if (currentSolution.join("") === wordInput.toUpperCase()) {
        setWonGameCount(wonGameCount + 1);
      }
      setPlayedGameCount(playedGameCount + 1);
    }
  }

  function resetGame() {
    {
      setCurrentAttemptID(0);
      setAttempts([
        { id: 0, word: [] },
        { id: 1, word: [] },
        { id: 2, word: [] },
        { id: 3, word: [] },
        { id: 4, word: [] },
        { id: 5, word: [] },
      ]);
      setIsGameOver(false);
      setCurrentSolution(() =>
        words[Math.floor(Math.random() * words.length)].toUpperCase().split(""),
      );
    }
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-between">
      <div className="mx-auto rounded-none border border-white bg-[rgba(255,255,255,0.6)] p-10 shadow-lg backdrop-blur-sm sm:rounded-lg md:my-10 md:min-h-187.5 md:w-125 dark:border-zinc-500 dark:bg-[rgba(80,80,80,0.65)] dark:shadow-2xl dark:shadow-zinc-800">
        <main className="flex h-full grow flex-col items-center justify-between">
          <h1 className="text-5xl text-(--text) dark:text-(--text-dark)">
            Wordle Clone
          </h1>
          <div className="my-10 flex flex-col gap-1.5 text-(--text)">
            {attempts.map((row) => {
              let emptyBoxColor =
                "border-gray-400 bg-gray-300 dark:border-zinc-800 dark:bg-neutral-800 ";

              return (
                <div className="flex gap-1.5">
                  {row.word === undefined || row.word.length != 0
                    ? row.word.map((letter, index) => {
                        let boxColor = "";
                        let textColor = "";
                        if (letter.color === "yellow") {
                          boxColor = "border-[#d4b43f] bg-[#ffe070]";
                          textColor = "text-[#814e06]";
                        } else if (letter.color === "green") {
                          boxColor = "border-[#8a9f4f] bg-[#aac562]";
                          textColor = "text-[#375812]";
                        } else {
                          boxColor =
                            "border-gray-400 bg-gray-100 dark:border-[#2e303a] dark:bg-neutral-600";
                          textColor = "dark:text-white";
                        }

                        const letterAnimation = {
                          opacity: 0,
                          animation: "fadeIn 0.4s forwards",
                          animationDelay: `${index * 100}ms`,
                        };

                        return (
                          <div
                            className={`relative flex min-h-9 min-w-9 items-center justify-center rounded-sm border text-2xl shadow md:min-h-13 md:min-w-13 md:text-[2rem] ${emptyBoxColor}`}
                          >
                            <div
                              style={letterAnimation}
                              className={`absolute -inset-px rounded-sm ${boxColor} border`}
                            />

                            <p
                              style={letterAnimation}
                              className={`relative z-10 ${textColor} `}
                            >
                              {letter.letter}
                            </p>
                          </div>
                        );
                      })
                    : [...Array(5)].map(() => (
                        <div
                          className={`flex min-h-9 min-w-9 items-center justify-center rounded-sm border text-[2rem] shadow md:min-h-13 md:min-w-13 ${emptyBoxColor}`}
                        ></div>
                      ))}
                </div>
              );
            })}
          </div>

          <section className="flex h-full flex-col justify-between">
            <form
              action={handleSubmit}
              className="flex w-full items-stretch gap-2"
            >
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
            {isGameOver && (
              <>
                {currentAttemptID >= 6 &&
                attempts
                  .find((elem) => elem.id === 5)
                  .word.map((elem) => elem.letter)
                  .join("") != currentSolution.join("") ? (
                  <p className="my-3 w-full text-center">
                    No more attempts left!
                  </p>
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
            )}

            <button
              className={`mt-5 flex cursor-pointer items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 p-2 text-xl text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white ${isGameOver ? "border border-white outline-3 outline-(--accent)" : ""}`}
              onClick={() => resetGame()}
            >
              <RepeatSVG /> Repeat with new word
            </button>
          </section>

          <div>
            <button
              onClick={() => {
                areStatsOpen ? setAreStatsOpen(false) : setAreStatsOpen(true);
                setIsLinkOpen(false);
              }}
              className="peer absolute top-3 right-3 cursor-pointer rounded bg-gray-200 p-1 dark:bg-zinc-800"
            >
              <StatsSVG />
            </button>
            <div
              className={`absolute top-5 right-11 z-10 h-0 w-0 border-8 border-gray-200 border-t-transparent border-r-transparent border-b-transparent transition-all duration-300 md:right-0 md:border-r-gray-200 md:border-l-transparent dark:border-neutral-500 dark:border-t-transparent dark:border-r-transparent dark:border-b-transparent md:dark:border-r-neutral-500 md:dark:border-l-transparent ${areStatsOpen ? "opacity-100" : "opacity-0"}`}
            ></div>
            <div
              className={`absolute top-2 right-15 w-60 rounded bg-gray-200 p-3 text-black shadow transition-all duration-300 md:-top-2 md:-right-60 dark:bg-neutral-500 dark:text-white ${areStatsOpen ? "opacity-100" : "opacity-0"}`}
            >
              You have won {wonGameCount} out of {playedGameCount} games played.
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                isLinkOpen ? setIsLinkOpen(false) : setIsLinkOpen(true);
                setAreStatsOpen(false);
              }}
              className="peer absolute top-13 right-3 cursor-pointer rounded bg-gray-200 p-1 dark:bg-zinc-800"
            >
              <InfoSVG />
            </button>
            <div
              className={`absolute top-15 right-11 z-10 h-0 w-0 border-8 border-gray-200 border-t-transparent border-r-transparent border-b-transparent transition-all duration-300 md:right-0 md:border-r-gray-200 md:border-l-transparent dark:border-neutral-500 dark:border-t-transparent dark:border-r-transparent dark:border-b-transparent md:dark:border-r-neutral-500 md:dark:border-l-transparent ${isLinkOpen ? "opacity-100" : "opacity-0"}`}
            ></div>
            <div
              className={`absolute top-11 right-15 w-50 rounded bg-gray-200 p-3 text-black shadow transition-all duration-300 md:-right-50 dark:bg-neutral-500 dark:text-white ${isLinkOpen ? "opacity-100" : "opacity-0"}`}
            >
              Click here for the game rules:{" "}
              <a
                href="https://en.wikipedia.org/wiki/Wordle#Gameplay"
                className="underline hover:text-(--accent)"
              >
                Wikipedia article
              </a>
            </div>
          </div>
        </main>
      </div>
      <div className="mt-auto flex flex-col items-baseline p-3 md:flex-row md:justify-between">
        <div>
          Hey. Here is my github:{" "}
          <a className="underline" href="https://github.com/kseniakopteva">
            Ksenia Kopteva's Github.
          </a>
        </div>
        <div>
          <a
            className="underline"
            href="https://unsplash.com/photos/a-blurry-photo-of-a-white-background-GJKx5lhwU3M?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Photo
          </a>{" "}
          and{" "}
          <a
            className="underline"
            href="https://unsplash.com/photos/a-blurry-photo-of-a-black-and-white-background-aUNaGmOIE64?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            photo
          </a>{" "}
          by{" "}
          <a
            className="underline"
            href="https://unsplash.com/@fakurian?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Milad Fakurian
          </a>{" "}
          on <a href="https://unsplash.com/">Unsplash</a>
        </div>
      </div>
    </div>
  );
}

export default App;
