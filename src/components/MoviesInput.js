import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton } from "@mui/material";

function MoviesInput({ addMovie, getRecommendations, reset }) {
  const [recommendtionInput, setRecommendtionInput] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addMovie(recommendtionInput);
      setRecommendtionInput("");
    }
  };

  return (
    <div className="flex w-full gap-4">
      <div className="flex border-2 border-[#F5FDED] h-10 w-full pl-3 rounded-3xl">
        <input
          type="text"
          placeholder="Enter Movies Name"
          className="bg-transparent outline-none text-white flex-1"
          value={recommendtionInput}
          onChange={(e) => setRecommendtionInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <IconButton
          style={{ color: "#fff" }}
          onClick={() => {
            addMovie(recommendtionInput);
            setRecommendtionInput("");
          }}
        >
          <AddIcon className="text-[#d8ff9e] hover:text-[#bcf369]" />
        </IconButton>
        <IconButton style={{ color: "#fff" }}>
          <ReplayIcon
            className="text-[#d8ff9e] hover:text-[#bcf369]"
            onClick={reset}
          />
        </IconButton>
      </div>
      <button
        className="rounded-lg bg-[#d8ff9e] text-[#0A060E] py-1 px-4 hover:bg-[#bcf369]"
        onClick={getRecommendations}
      >
        Search
      </button>
    </div>
  );
}

export default MoviesInput;
