import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api/tmdb";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovies("popular").then((movies) => setMovie(movies[0]));
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner-content">
        <h1>{movie?.title}</h1>
        <p>{movie?.overview}</p>
        <button className="play-button">Play</button>
      </div>
    </div>
  );
};

export default Banner;
