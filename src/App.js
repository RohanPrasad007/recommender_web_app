import "./App.css";
import { useState } from "react";
import { getMovieImage, getRecommendationsAPI } from "./agent";
import MoviesInput from "./components/MoviesInput";
import MoviesList from "./components/MoviesList";
import Loader from "./components/Loader";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import Recommendation from "./components/Recommendation";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (mes) => {
    setErrorMessage(mes);
    setError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const addMovie = (recommendtionInput) => {
    if (recommendtionInput.trim(" ") === "") {
      showError("Please add some movies");
      return;
    }
    const newMovieList = [recommendtionInput, ...movieList];
    setMovieList(newMovieList);
  };

  const getRecommendations = async () => {
    if (movieList.length === 0) {
      showError("Please add some movies");
      return;
    }
    setLoading(true);
    const recommendations = await getRecommendationsAPI(movieList);
    for (let i = 0; i < recommendations.length; i++) {
      const movie = recommendations[i];
      const imageUrl = await getMovieImage(movie.title);
      recommendations[i].imageUrl = imageUrl;
    }
    console.log(recommendations);
    setRecommendations(recommendations);
    setLoading(false);
  };

  const removeMovie = (index) => {
    const newMovieList = [...movieList];
    newMovieList.splice(index, 1);
    setMovieList(newMovieList);
  };

  const reset = () => {
    setMovieList([]);
    setRecommendations([]);
  };

  return (
    <div className="App">
      {/* <h1>Movie Recommendation Bot</h1>
      <input
        type="text"
        value={recommendtionInput}
        onChange={(e) => setRecommendtionInput(e.target.value)}
      />
      <button onClick={addmovie}>add</button>
      {movieList.map((movie, index) => (
        <p key={index}>{movie}</p>
      ))}
      <button onClick={getRecommendations}>recommend</button>
      {recommendations.map((recommendation) => (
        <div>
          <img src={recommendation.imageUrl} alt="movie" />
          <p>
            {recommendation.title}({recommendation.year}):
          </p>
          <p>{recommendation.plot}</p>
        </div>
      ))} */}
      <div className="w-[95%] mx-auto my-10 flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl font-bold">Movie Recommendation Bot</h1>
        <MoviesInput
          addMovie={addMovie}
          getRecommendations={getRecommendations}
          reset={reset}
        />
        <div className="w-full flex gap-6">
          <div className="flex-1 flex flex-col gap-4">
            {recommendations.map((recommendation, i) => (
              <Recommendation movie={recommendation} id={i} />
            ))}
          </div>
          <MoviesList movieList={movieList} removeMovie={removeMovie} />
        </div>
      </div>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
      {loading && <Loader />}
    </div>
  );
}

export default App;
