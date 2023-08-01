import "./App.css";
import { useState } from "react";
import { getMoiveImage, getRecommendationsAPI } from "./agent";

function App() {
  const [recommendtionInput, setRecommendtionInput] = useState("");
  const [moiveList, setMoiveList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const addMoive = () => {
    const newMoiveList = [...moiveList, recommendtionInput];
    setMoiveList(newMoiveList);
    setRecommendtionInput("");
  };

  const getRecommendations = async () => {
    const recommendations = await getRecommendationsAPI(moiveList);
    for (let i = 0; i < recommendations.length; i++) {
      const movie = recommendations[i];
      const imageUrl = await getMoiveImage(movie.title);
      recommendations[i].imageUrl = imageUrl;
    }
    setRecommendations(recommendations);
  };

  return (
    <div className="App">
      <h1>Movie Recommendation Bot</h1>
      <input
        type="text"
        value={recommendtionInput}
        onChange={(e) => setRecommendtionInput(e.target.value)}
      />
      <button onClick={addMoive}>add</button>
      {moiveList.map((movie, index) => (
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
      ))}
    </div>
  );
}

export default App;
