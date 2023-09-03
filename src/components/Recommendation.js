import React from "react";

function Recommendation({ movie }) {
  return (
    <div className="border-2 flex gap-4 border-[#F5FDED] bg-[#B177EE] p-7 rounded-md text-xl w-full ">
      <div>
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="rounded-md max-w-none"
        />
      </div>
      <div className="flex flex-col justify-center p-2">
        <h1 className="text-white font-bold text-xl mb-3">
          {movie.title}({movie.year})
        </h1>
        <p className="text-white">{movie.plot}</p>
      </div>
    </div>
  );
}

export default Recommendation;
