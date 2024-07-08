import { useRef, useEffect } from "react";

const Search = ({ query, setQuery }: { query: string; setQuery: (query: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return;

      if (e.code === "Enter") {
        inputRef.current?.focus();
        setQuery("");
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [setQuery]);

  return (
    <input
      type="text"
      className="search"
      value={query}
      placeholder="Search movies..."
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
};

export default Search;
