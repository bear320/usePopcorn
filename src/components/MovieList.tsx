import { IMovie } from "../utils/types";
import Movie from "./Movie";

const MovieList = ({ movies, onSelectMovie }: { movies: IMovie[]; onSelectMovie: (id: string) => void }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

export default MovieList;
