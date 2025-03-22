import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb"; // Ensure this function exists
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    }

    getMovieDetails();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="movie-details">
      <button className="go-back" onClick={() => navigate(-1)}>⬅ Go Back</button>
      {movie ? (
        <div>
          <h1>{movie.title || movie.name}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date || "N/A"}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        </div>
      ) : (
        <h2>Movie not found</h2>
      )}
    </div>
  );
}

export default MovieDetails;

