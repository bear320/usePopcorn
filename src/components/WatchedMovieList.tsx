import { IWatchedMovie } from "../utils/types";
import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({
  watched,
  onRemoveFromWatched,
}: {
  watched: IWatchedMovie[];
  onRemoveFromWatched: (id: string) => void;
}) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onRemoveFromWatched={onRemoveFromWatched} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
