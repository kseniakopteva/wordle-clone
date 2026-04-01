export default function GamePanel({ children }) {
  return (
    <div className="mx-auto rounded-none border border-white bg-[rgba(255,255,255,0.6)] p-10 shadow-lg backdrop-blur-sm sm:rounded-lg md:my-10 md:min-h-187.5 md:w-125 dark:border-zinc-500 dark:bg-[rgba(80,80,80,0.65)] dark:shadow-2xl dark:shadow-zinc-800">
      <main className="flex h-full grow flex-col items-center justify-between">
        {children}
      </main>
    </div>
  );
}
