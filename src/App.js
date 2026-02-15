import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  // If a movie is selected → show detail page
  if (selectedMovie) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>{selectedMovie.title}</h2>
        <p><strong>Tagline:</strong> {selectedMovie.tagline}</p>
        <p>
          <strong>Release Date:</strong>{" "}
          {new Date(selectedMovie.release_date).toLocaleDateString()}
        </p>
        <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
        <p><strong>Rating:</strong> {selectedMovie.vote_average}/10</p>
        <p><strong>Overview:</strong> {selectedMovie.overview}</p>

        <button onClick={() => setSelectedMovie(null)}>
          Back to List
        </button>
      </div>
    );
  }

  // Default → Movie List Page
  return (
    <div>
    <h1 className="page-title"><center>MOVIE LIBRARY</center></h1>
    <div className="grid">
      {movies.map(movie => (
        <div
          key={movie.id}
          className="card"
          onClick={() => {
            fetch(`/api/movies/${movie.id}`)
              .then(res => res.json())
              .then(data => setSelectedMovie(data));
          }}
        >
          <h3>{movie.title}</h3>
          <p>{movie.tagline}</p>
          <p>Rating: {movie.vote_average}/10</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;