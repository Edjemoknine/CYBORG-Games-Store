import React from "react";
import Skeleton from "react-loading-skeleton";
import HeroSekelton from "./HeroSekelton";
import ReviewSkeleton from "./ReviewSkeleton";
import CardSkeleton from "./CardSkeleton";

const HomeSkeleton = () => {
  return (
    <>
      <HeroSekelton />
      <Skeleton className="my-4" width={280} height={25} borderRadius={20} />
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <Skeleton className="my-4" width={280} height={25} borderRadius={20} />
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <Skeleton className="my-4" width={280} height={25} borderRadius={20} />
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <HeroSekelton />
      <div>
        <Skeleton className="my-4" width={280} height={25} borderRadius={20} />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {[1, 2, 3, 4, 5]?.map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
          <div>
            {[1, 2, 3, 4, 5]?.map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSkeleton;
