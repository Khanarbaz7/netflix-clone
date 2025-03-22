import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import MovieDetails from "./components/MovieDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { fetchMovies, fetchTVShows } from "./api/tmdb";
import "./App.css";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const trendingData = await fetchMovies("trending");
        const popularData = await fetchMovies("popular");
        const topRatedData = await fetchMovies("top_rated");
        const tvData = await fetchTVShows();

        setPopular(popularData || []);
        setTopRated(topRatedData || []);
        setTVShows(tvData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // **Search Filter Function**
  const filterResults = (list) => {
    return list.filter((item) =>
      (item.title || item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        {user ? (
          <>
            <Route
              path="/"
              element={
                <div>
                  <Banner />
                  <input
                    type="text"
                    placeholder="Search movies or TV shows..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                  />

                  <h2>Popular Movies</h2>
                  <div className="movies-container">
                    {filterResults(popular).map((movie) => (
                      <div key={movie.id} className="movie-card">
                        <Link to={`/movie/${movie.id}`} className="movie-title">
                          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                          <p>{movie.title}</p>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <h2>Top Rated</h2>
                  <div className="movies-container">
                    {filterResults(topRated).map((movie) => (
                      <div key={movie.id} className="movie-card">
                        <Link to={`/movie/${movie.id}`} className="movie-title">
                          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                          <p>{movie.title}</p>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <h2>Popular TV Shows</h2>
                  <div className="movies-container">
                    {filterResults(tvShows).map((show) => (
                      <div key={show.id} className="movie-card">
                        <Link to={`/tv/${show.id}`} className="movie-title">
                          <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                          <p>{show.name}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
