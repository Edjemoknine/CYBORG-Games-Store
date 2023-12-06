import React from "react";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <div>
      <div className="card-wrapper dark:bg-[#494949] bg-zinc-100">
        <div className="h-60 w-full  rounded-md overflow-hidden ">
          <Skeleton height={250} borderRadius={15} />
        </div>

        <div className="most-popular-item-info">
          <h4 className="most-popular-item-title">
            <Skeleton width={100} />
            <Skeleton width={30} />
          </h4>
          <ul className="ml-1">
            <Skeleton width={50} />
            <Skeleton width={50} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
