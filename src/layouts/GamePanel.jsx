export default function GamePanel({ children }) {
  return (
    <div className="md:min-h-187.5g mx-auto my-8 w-[30%] min-w-125 rounded-none border border-white bg-[rgba(255,255,255,0.6)] p-8 text-sm shadow-lg backdrop-blur-sm sm:rounded-lg md:my-10 xl:text-base dark:border-zinc-500 dark:bg-[rgba(80,80,80,0.65)] dark:shadow-2xl dark:shadow-zinc-800">
      <main className="flex h-full grow flex-col items-center justify-between gap-5">
        {children}
      </main>
    </div>
  );
}
