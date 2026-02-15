const fs = require('fs');
const path = require('path');
const express = require("express");

const app = express();

// Load movies
const moviesPath = path.join(__dirname, 'movies_metadata.json');
const movies = JSON.parse(fs.readFileSync(moviesPath, 'utf-8'));

app.get("/api/ping", (req, res) => {
  res.send("pong!");
});

app.get("/api/movies", (req, res) => {
  const simplifiedMovies = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average
  }));

  res.json(simplifiedMovies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id == req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(movie);
});

// Express port logic
let port;
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
}

app.listen(port, () => {
  console.log("❇️ Express server is running on port", port);
});