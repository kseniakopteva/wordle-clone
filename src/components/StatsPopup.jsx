import { StatsSVG } from "../assets/svg";

export default function StatsPopup({
  areStatsOpen,
  setAreStatsOpen,
  setIsLinkOpen,
  gameStats,
}) {
  return (
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
        You have won {gameStats.won} out of {gameStats.played} games played.
      </div>
    </div>
  );
}
