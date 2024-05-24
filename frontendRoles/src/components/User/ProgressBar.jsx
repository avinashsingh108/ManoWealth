import React from "react";

const ProgressBar = ({ width }) => {
  return (
    <div className="sm:w-11/12 xl:w-10/12 w-full mx-auto bg-gray-100 rounded-lg sm:rounded-xl border border-gray-700 relative shadow-lg">
      <div
        className={` bg-blue-500 h-5 rounded-lg sm:rounded-xl `}
        style={{ width: `${width}%` }}
      ></div>
      <div className="absolute top-0 left-0 w-full text-center text-sm font-semibold">{width}%</div>
    </div>
  );
};

export default ProgressBar;
