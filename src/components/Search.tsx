const Search = ({ query, setQuery }: { query: string; setQuery: (query: string) => void }) => {
  return (
    <input
      type="text"
      className="search"
      value={query}
      placeholder="Search movies..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
