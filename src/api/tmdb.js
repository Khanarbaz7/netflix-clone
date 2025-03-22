const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (category) => {
  const res = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const fetchTVShows = async () => {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

