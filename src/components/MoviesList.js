import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

function MoviesList({ movieList, removeMovie }) {
  return (
    <>
      {movieList.length !== 0 ? (
        <div className="border-2 border-[#F5FDED] bg-[#B177EE] p-2 rounded-md max-w-xs text-xl">
          <h1 className="text-white font-bold text-2xl mb-2 text-center">
            Movies List
          </h1>
          <ul>
            {movieList.map((movie, i) => (
              <li className="flex justify-between items-center" key={i}>
                <p>{movie}</p>
                <IconButton
                  style={{ color: "#fff" }}
                  onClick={() => {
                    removeMovie(i);
                  }}
                >
                  <CloseIcon className="text-[#d8ff9e] hover:text-[#bcf369]" />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

// DONE:add delete button to remove the movie from the list
// DONE:add addmovie fucntion in moviesinput to add the movie to the list
// DONE:show that movie in movies list
// DONE:when the user click on the delte button remove that movie from the list

export default MoviesList;
