const NumResults = ({ results }: { results: number }) => {
  return (
    <p className="num-results">
      Found <strong>{results}</strong> results
    </p>
  );
};

export default NumResults;
