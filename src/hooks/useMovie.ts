import { useState, useEffect } from "react";
import { IMovie } from "../utils/types";

export const useMovie = (query: string) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_APIKEY}&s=${query}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
        setError("");
      } catch (e) {
        const error = e as Error;
        console.error(error.message);

        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
