import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

export const getRecommendationsAPI = async (moiveList) => {
  let moives = "";
  moiveList.forEach((moive) => {
    moives += moive + ",";
  });

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_GPT_KEY,
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
  const recommendations = JSON.parse(
    removeUntilFirstBrace(response.data.choices[0].text)
  ).recommendations;
  return recommendations;
};

export const getMoiveImage = async (moiveName) => {
  moiveName = moiveName.replace(" ", "%20");
  const headersList = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
  };

  const reqOptions = {
    url: `https://api.themoviedb.org/3/search/movie?query=${moiveName}`,
    method: "GET",
    headers: headersList,
  };

  try {
    let response = await axios.request(reqOptions);
    return `https://image.tmdb.org/t/p/w220_and_h330_face/${response.data.results[0].poster_path}`;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const removeUntilFirstBrace = (str) => {
  const index = str.indexOf("{");
  if (index !== -1) {
    return str.slice(index);
  }
  return str;
};
