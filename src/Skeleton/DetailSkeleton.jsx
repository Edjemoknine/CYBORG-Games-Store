import React from "react";
import HeroSekelton from "./HeroSekelton";
import Skeleton from "react-loading-skeleton";

const DetailSkeleton = () => {
  return (
    <div>
      <HeroSekelton />
      <div className="flex items-start gap-8 text-gray-600 text-2xl">
        <h1 className="text-3xl dark:text-white text-zinc-700 font-semibold  my-1">
          <Skeleton width={300} height={30} />
        </h1>
        <div className="flex items-center mt-1 flex-col md:flex-row md:gap-3 text-gray-600 text-2xl">
          <Skeleton circle width={40} height={40} />
          {/* <Skeleton circle width={40} height={40} />
          <Skeleton circle width={40} height={40} /> */}
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <Skeleton width={200} />
      </div>

      <div className="flex items-center justify-evenly gap-6 py-2">
        <Skeleton width={70} circle height={70} />
        <div className=" flex flex-col items-center gap-2">
          <Skeleton width={70} circle height={70} />
          {/* <p className="font-semibold">Top Critic Average</p> */}
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton width={70} circle height={70} />
          {/* <p className="font-semibold">Critics Recommended</p> */}
        </div>
      </div>
      <div>
        <Skeleton count={10} height={15} />
      </div>
      <h1 className="mt-6 mb-0 text-3xl font-semibold">
        <Skeleton width={300} height={30} />
      </h1>
      <HeroSekelton />
      <div className="flex items-center gap-3">
        {[1, 2, 3]?.map((trailer, id) => (
          <Skeleton height={120} key={id} borderRadius={10} width={80} />
        ))}
      </div>

      <h1 className="text-3xl font-semibold my-6">
        <Skeleton width={300} height={30} />
      </h1>
      <div className="flex flex-wrap justify-around gap-3">
        {Array(10)
          .fill(0)
          ?.map((review) => (
            <div
              className="w-60 flex-grow flex-auto flex flex-col gap-2 justify-between dark:bg-gray-700 bg-zinc-300 rounded p-3"
              key={review._id}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="mb-1">
                  <h2 className="text-lg font-semibold">
                    <Skeleton width={200} height={25} />
                  </h2>
                  <p className="dark:text-gray-300 text-zinc-500">
                    <Skeleton width={150} height={17} />
                  </p>
                </div>
                <Skeleton width={50} height={50} circle />
              </div>

              <Skeleton count={4} height={15} />
              <div className="flex justify-between items-center">
                <Skeleton width={80} height={12} />
                <Skeleton width={100} height={30} borderRadius={10} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetailSkeleton;
