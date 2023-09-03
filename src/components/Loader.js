import React from "react";
import loaderGif from "../assets/loader.gif";

function Loader() {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex flex-col items-center justify-center bg-black bg-opacity-80">
      <img
        src={loaderGif}
        alt="Backup in progress"
        className="max-w-md w-[95%]"
      />
      <p className="mt-4 text-xl font-semibold text-gray-200">Loading...</p>
    </div>
  );
}

export default Loader;
