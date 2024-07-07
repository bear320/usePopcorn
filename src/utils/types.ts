export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface IWatchedMovie extends IMovie {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export interface IMovieDetail {
  title: string;
  year: string;
  poster: string;
  runtime: string;
  imdbRating: string;
  plot: string;
  released: string;
  actors: string;
  director: string;
  genre: string;
}
