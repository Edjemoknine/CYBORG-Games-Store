import React from "react";
import Skeleton from "react-loading-skeleton";

const ReviewSkeleton = () => {
  return (
    <div>
      {" "}
      <div className="dark:bg-[#494949] bg-zinc-100 flex px-3 items-center gap-3 mb-3  rounded hover:shadow-rose-500 hover:shadow justify-between overflow-hidden">
        <Skeleton width={90} height={90} borderRadius={15} />
        <Skeleton width={200} height={20} />
        <div className=" py-2 flex flex-col items-center gap-2">
          <Skeleton width={60} height={60} borderRadius={50} />
          <Skeleton width={100} height={15} />
        </div>
      </div>
    </div>
  );
};

export default ReviewSkeleton;
