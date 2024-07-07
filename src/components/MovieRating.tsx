import { useState } from "react";
import StarRating from "./StarRating";

const MovieRating = () => {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <>
      <StarRating max={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars.</p>
    </>
  );
};

export default MovieRating;
