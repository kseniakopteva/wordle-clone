import { useState } from "react";
import "./App.css";

function App() {
  const possibleSolutions = [
    "power",
    "whose",
    "every",
    "breed",
    "sized",
    "could",
    "basis",
    "state",
    "calif",
    "chose",
    "until",
    "place",
    "small",
    "heart",
    "watch",
    "strip",
    "fraud",
    "wheel",
    "extra",
    "panel",
    "smith",
    "cross",
    "grade",
    "think",
    "sixth",
    "crash",
    "human",
    "great",
    "track",
    "peace",
    "table",
    "party",
    "flash",
    "waste",
    "three",
    "treat",
    "globe",
    "court",
    "paper",
    "night",
    "house",
    "roman",
    "ready",
    "broke",
    "start",
    "alike",
    "sight",
    "spare",
    "drink",
    "price",
    "stock",
  ];
  const [currentSolution, setCurrentSolution] = useState(() =>
    possibleSolutions[Math.floor(Math.random() * possibleSolutions.length)]
      .toUpperCase()
      .split(""),
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

  function handleSubmit(formData) {
    const newWord = formData.get("word");

    if (
      newWord.length < 5 ||
      newWord.length > 5 ||
      /^[a-zA-Z]*$/.test(newWord) != true ||
      isGameOver
    ) {
      alert(
        "Word should be 5 letters long and consist only of English alphabet letters. And the game shouldn't be over",
      );
      return;
    }

    const newWordArr = [...newWord.toUpperCase()];

    let attCopy = [];
    newWordArr.forEach((element, index) => {
      attCopy.push({ index: index, letter: element });
    });
    let solCopy = [];
    currentSolution.forEach((element, index) => {
      solCopy.push({ index: index, letter: element });
    });
    let final = [];

    attCopy.forEach(({ letter, index }) => {
      if (letter === solCopy.find((elem) => elem.index === index).letter) {
        final.push({ index, letter, color: "green" });

        solCopy = solCopy.filter((elem) => elem.index !== index);
        attCopy = attCopy.filter((elem) => elem.index !== index);
      }
    });
    attCopy.forEach(({ letter, index }) => {
      let found = solCopy.find((elem) => elem.letter === letter);
      if (found != undefined) {
        final.push({ index, letter, color: "yellow" });

        solCopy = solCopy.filter((elem) => elem.index !== found.index);
        attCopy = attCopy.filter((elem) => elem.index !== index);
      }
    });
    attCopy.forEach(({ letter, index }) => {
      final.push({ index, letter, color: "grey" });

      solCopy = solCopy.filter((elem) => elem.index !== index);
      attCopy = attCopy.filter((elem) => elem.index !== index);
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

    setCurrentAttemptID((curr) => curr + 1);

    if (
      currentAttemptID >= 6 ||
      currentSolution.join("") === newWord.toUpperCase()
    ) {
      setIsGameOver(true);
      if (currentSolution.join("") === newWord.toUpperCase()) {
        setWonGameCount(wonGameCount + 1);
      }
      setPlayedGameCount(playedGameCount + 1);
    }
  }

  return (
    <div className="darkl:bg-[url(https://images.unsplash.com/photo-1716143493321-27589d64308b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-full bg-[url(https://images.unsplash.com/photo-1619252584172-a83a949b6efd?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover py-20">
      <div className="darkl:border-black darkl:bg-[rgba(0,0,0,0.6)] darkl:shadow-2xl m-auto h-full w-125 rounded-lg border border-white bg-[rgba(255,255,255,0.6)] p-10 shadow-lg backdrop-blur-sm">
        <main className="flex h-full grow flex-col items-center">
          <header>
            <h1 className="darkl:text-(--text-dark) text-5xl text-(--text)">
              Wordle Clone
            </h1>
          </header>
          <div className="my-10 flex flex-col gap-1.5 text-(--text)">
            {attempts.map((row) => (
              <div className="flex gap-1.5">
                {row.word === undefined || row.word.length != 0
                  ? row.word.map((letter, index) => {
                      let boxColor =
                        "border-gray-400 bg-gray-200 darkl:border-zinc-600 darkl:bg-zinc-700 ";
                      let textColor = "darkl:text-white";

                      if (letter.color === "yellow") {
                        boxColor = "border-[#d4b43f] bg-[#ffe070]";
                        textColor = "text-[#814e06]";
                      } else if (letter.color === "green") {
                        boxColor = "border-[#8a9f4f] bg-[#aac562]";
                        textColor = "text-[#375812]";
                      }

                      return (
                        <div className="darkl:border-[#2e303a] relative flex min-h-13 min-w-13 items-center justify-center rounded-sm border border-gray-400 text-[2rem] shadow">
                          <div
                            style={{
                              opacity: 0,
                              animation: "fadeIn 0.4s forwards",
                              animationDelay: `${index * 100}ms`,
                            }}
                            className={`absolute -inset-px rounded-sm ${boxColor} border`}
                          />

                          <p
                            style={{
                              opacity: 0,
                              animation: "fadeIn 0.3s forwards",
                              animationDelay: `${index * 100}ms`,
                            }}
                            className={`relative z-10 ${textColor} `}
                          >
                            {letter.letter}
                          </p>
                        </div>
                      );
                    })
                  : [...Array(5)].map(() => (
                      <div className="darkl:border-[#2e303a] flex min-h-13 min-w-13 items-center justify-center rounded-sm border border-gray-400 text-[2rem] shadow"></div>
                    ))}
              </div>
            ))}
          </div>

          <section className="flex h-full flex-col">
            <form
              action={handleSubmit}
              className="flex w-full items-stretch gap-2"
            >
              <input
                type="text"
                name="word"
                disabled={isGameOver}
                className="darkl:border-zinc-500 darkl:bg-zinc-950 darkl:text-white darkl:disabled:border-zinc-700 darkl:disabled:bg-zinc-800 w-50 rounded-xs border border-gray-500 bg-white px-4 py-2 text-2xl text-(--text) uppercase shadow disabled:border-gray-400 disabled:bg-gray-200"
              />
              <button
                type="submit"
                disabled={isGameOver}
                className="darkl:border-zinc-700 darkl:bg-zinc-700 darkl:disabled:border-zinc-800 darkl:disabled:bg-zinc-900 cursor-pointer rounded border border-gray-600 bg-gray-600 p-2 text-white disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400"
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
                <p className="darkl:text-white my-3 w-full text-center text-2xl text-black">
                  The solution is:{" "}
                  <span className="inline-block rounded-lg border-[#8a9f4f] bg-[#aac562] px-2 py-1 text-[#375812]">
                    {currentSolution.join("")}
                  </span>
                </p>
              </>
            )}
            <button
              className="darkl:border-zinc-700 darkl:bg-zinc-800 darkl:text-white mt-auto flex cursor-pointer items-center justify-center gap-1 rounded border border-gray-300 bg-gray-200 p-2 text-xl text-zinc-800"
              onClick={() => {
                setCurrentAttemptID(1);
                setAttempts([
                  { id: 1, word: [] },
                  { id: 2, word: [] },
                  { id: 3, word: [] },
                  { id: 4, word: [] },
                  { id: 5, word: [] },
                  { id: 6, word: [] },
                ]);
                setIsGameOver(false);
                setCurrentSolution(() =>
                  possibleSolutions[
                    Math.floor(Math.random() * possibleSolutions.length)
                  ]
                    .toUpperCase()
                    .split(""),
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
              </svg>{" "}
              Repeat with new word
            </button>
          </section>

          <div>
            <p className="peer darkl:bg-zinc-800 absolute top-3 right-3 rounded bg-gray-200 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-bar-chart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
              </svg>
            </p>
            <div className="darkl:border-zinc-700 darkl:border-t-transparent darkl:border-b-transparent darkl:border-l-transparent absolute top-5 right-0 z-10 h-0 w-0 border-8 border-gray-200 border-t-transparent border-b-transparent border-l-transparent opacity-0 transition-all duration-300 peer-hover:opacity-100"></div>
            <div className="darkl:bg-zinc-700 darkl:text-white absolute -top-2 -right-60 w-60 rounded bg-gray-200 p-3 text-black opacity-0 shadow transition-all duration-300 peer-hover:opacity-100">
              You have won {wonGameCount} out of {playedGameCount} games played.
            </div>
          </div>

          <div>
            <p className="peer darkl:bg-zinc-800 absolute top-13 right-3 rounded bg-gray-200 p-1">
              <a href="https://en.wikipedia.org/wiki/Wordle#Gameplay">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </a>
            </p>
            <div className="darkl:border-zinc-700 darkl:border-t-transparent darkl:border-b-transparent darkl:border-l-transparent absolute top-15 right-0 z-10 h-0 w-0 border-8 border-gray-200 border-t-transparent border-b-transparent border-l-transparent opacity-0 transition-all duration-300 peer-hover:opacity-100"></div>
            <div className="darkl:bg-zinc-700 darkl:text-white absolute top-11 -right-50 w-50 rounded bg-gray-200 p-3 text-black opacity-0 shadow transition-all duration-300 peer-hover:opacity-100">
              Click for the game rules!{" "}
              <span className="text-sm">(Wikipedia article)</span>
            </div>
          </div>
        </main>
      </div>
      <div className="absolute right-3 bottom-3">
        Photo by{" "}
        <a
          className="underline"
          href="https://unsplash.com/@fakurian?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Milad Fakurian
        </a>{" "}
        on{" "}
        <a
          className="underline"
          href="https://unsplash.com/photos/a-blurry-photo-of-a-white-background-GJKx5lhwU3M?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Unsplash
        </a>
      </div>
    </div>
  );
}

export default App;
