export default function GameGrid({ attempts }) {
  return (
    <div className="flex flex-col gap-1.5 text-(--text) 2xl:my-10">
      {attempts.map((row, index) => {
        let emptyBoxColor =
          "border-gray-400 bg-gray-300 dark:border-zinc-800 dark:bg-neutral-800 ";

        return (
          <div className="flex gap-1.5" key={index}>
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
                      key={index}
                      className={`relative flex min-h-9 min-w-9 items-center justify-center rounded-sm border text-2xl shadow md:min-h-11 md:min-w-11 md:text-[1.7rem] 2xl:min-h-13 2xl:min-w-13 2xl:text-[2rem] ${emptyBoxColor}`}
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
              : [...Array(5)].map((elem, index) => (
                  <div
                    key={index}
                    className={`flex min-h-9 min-w-9 items-center justify-center rounded-sm border shadow md:min-h-11 md:min-w-11 md:text-[1.7rem] 2xl:min-h-13 2xl:min-w-13 2xl:text-[2rem] ${emptyBoxColor}`}
                  ></div>
                ))}
          </div>
        );
      })}
    </div>
  );
}
