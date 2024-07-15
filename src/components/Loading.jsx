import React from "react";
import { CircleLoader } from "react-spinners";

function Loading() {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <CircleLoader color="#FE8C00" />
    </div>
  );
}

export default Loading;
