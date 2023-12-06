import React from "react";

const Progress = ({ rate }) => {
  return (
    <div className=" py-2 flex flex-col text-center items-center gap-2">
      <div
        style={{
          background: `conic-gradient(${
            rate?.toFixed(0) < 50
              ? "#f00"
              : rate?.toFixed(0) === 50
              ? "#0FF"
              : "#0FC"
          } ${rate?.toFixed(0) * 3.6}deg,#22222a 0deg)`,
        }}
        className="relative progress h-10 w-10 md:w-16 md:h-16 text-white rounded-full md:font-semibold text-lg flex justify-center items-center bg-gray-700"
      >
        <p className="z-20 text-xs md:text-base">{rate?.toFixed(0)}</p>
      </div>
      <p className="text-xs md:text-xs ">Top Critic Average</p>
    </div>
  );
};

export default Progress;
