import { useState, useEffect } from "react";
import { IWatchedMovie, IMovieDetail } from "../utils/types";
import Loader from "./Loader";
import StarRating from "./StarRating";

const MovieDetail = ({
  id,
  watched,
  onCloseMovie,
  onAddToWatched,
}: {
  id: string;
  watched: IWatchedMovie[];
  onCloseMovie: () => void;
  onAddToWatched: (movie: IWatchedMovie) => void;
}) => {
  const [movie, setMovie] = useState<IMovieDetail>({} as IMovieDetail);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched: boolean = watched.some((movie) => movie.imdbID === id);

  const watchedRating = watched.find((movie) => movie.imdbID === id)?.userRating;

  const { title, year, poster, runtime, imdbRating, plot, released, actors, director, genre } = movie;

  useEffect(() => {
    handleGetDetails(id);
  }, [id]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.code === "Escape") onCloseMovie();
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  const handleGetDetails = async (id: string) => {
    setIsLoading(true);
    const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_APIKEY}&i=${id}`);
    const data = await res.json();
    setMovie({
      title: data.Title,
      year: data.year,
      poster: data.Poster,
      runtime: data.Runtime,
      imdbRating: data.imdbRating,
      plot: data.Plot,
      released: data.Released,
      actors: data.Actors,
      director: data.Director,
      genre: data.Genre,
    });
    setIsLoading(false);
  };

  const handleAddToList = () => {
    const newWatchedMovie: IWatchedMovie = {
      imdbID: id,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: +runtime.split(" ")[0],
      imdbRating: +imdbRating,
      userRating: userRating,
    };
    onAddToWatched(newWatchedMovie);
    onCloseMovie();
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated with movie {watchedRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating max={10} size={24} onSetRating={setUserRating} />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddToList}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
