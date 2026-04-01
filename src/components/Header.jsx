export default function Header({ children }) {
  return (
    <h1 className="text-5xl text-(--text) dark:text-(--text-dark)">
      {children}
    </h1>
  );
}
