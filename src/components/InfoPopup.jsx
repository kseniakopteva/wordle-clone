import { InfoSVG } from "../assets/svg";

export default function InfoPopup({
  isLinkOpen,
  setIsLinkOpen,
  setAreStatsOpen,
}) {
  return (
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
  );
}
