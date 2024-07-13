import { useRef } from "react";
import { useKey } from "../hooks/useKey";

const Search = ({ query, setQuery }: { query: string; setQuery: (query: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useKey("Enter", () => {
    if (document.activeElement === inputRef.current) return;
    inputRef.current?.focus();
    setQuery("");
  });

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
