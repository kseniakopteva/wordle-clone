export default function Cell({ letter, index, emptyBoxColor }) {
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

      <p style={letterAnimation} className={`relative z-10 ${textColor} `}>
        {letter.letter}
      </p>
    </div>
  );
}
