import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import { useState } from "react";

function App() {
  const [recommendtionInput, setRecommendtionInput] = useState("");
  const [moiveList, setMoiveList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const addMoive = () => {
    const newMoiveList = [...moiveList, recommendtionInput];
    setMoiveList(newMoiveList);
    setRecommendtionInput("");
  };

  const getReccmmendations = async () => {
    let moives = "";
    moiveList.forEach((moive) => {
      moives += moive + ",";
    });

    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are a movie recommendation bot. Given a list of movies, your task is to provide five similar movie recommendations in JSON format based on genre, plot, actors, director, tone or mood, and critical acclaim. For each recommended movie, please provide the title, year of release, and a plot description (limited to 100 words). The response should be in the following JSON format:{
          "recommendations": [
            {
              "title": "Title of the Movie 1",
              "year": "Year of Release 1",
              "plot": "Plot description of the Movie 1"
            },
            {
              "title": "Title of the Movie 2",
              "year": "Year of Release 2",
              "plot": "Plot description of the Movie 2"
            },
            {
              "title": "Title of the Movie 3",
              "year": "Year of Release 3",
              "plot": "Plot description of the Movie 3"
            },
            {
              "title": "Title of the Movie 4",
              "year": "Year of Release 4",
              "plot": "Plot description of the Movie 4"
            },
            {
              "title": "Title of the Movie 5",
              "year": "Year of Release 5",
              "plot": "Plot description of the Movie 5"
            }
          ]
        }Movies for Recommendation:${moives}`,
      temperature: 1,
      max_tokens: 800,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text);
    console.log(
      JSON.parse(removeUntilFirstBrace(response.data.choices[0].text))
    );
    setRecommendations(
      JSON.parse(removeUntilFirstBrace(response.data.choices[0].text))
        .recommendations
    );
  };

  function removeUntilFirstBrace(str) {
    const index = str.indexOf("{");
    if (index !== -1) {
      return str.slice(index);
    }
    return str;
  }

  return (
    <div className="App">
      <h1>Movie Recommendation Bot</h1>
      <input
        type="text"
        value={recommendtionInput}
        onChange={(e) => setRecommendtionInput(e.target.value)}
      />
      <button onClick={addMoive}>add</button>
      {moiveList.map((movie) => (
        <p>{movie}</p>
      ))}
      <button onClick={getReccmmendations}>recommend</button>
      {recommendations.map((recommendation) => (
        <div>
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
