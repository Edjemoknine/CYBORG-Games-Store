import React from "react";
import Skeleton from "react-loading-skeleton";

const NewSkeleton = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5]?.map((news, index) => (
        <div
          className="grid md:grid-cols-2 grid-cols-1  borde my-3 border-gray-400  shadow overflow-hidden"
          key={news._id}
        >
          <Skeleton height={280} />
          <div
            className={`${
              index % 2 === 0 ? "order-1" : "md:-order-1 "
            } p-6 pb-10 relative  `}
          >
            <span className="flex items-end gap-2 font-semibold mb-3 text-green-500">
              <Skeleton width={50} height={30} />
              <Skeleton width={100} height={15} />
            </span>
            <Skeleton width={300} height={20} />
            <div className="py-1">
              <Skeleton width={150} />{" "}
            </div>
            <Skeleton height={15} />
            <Skeleton height={15} />
            <Skeleton height={15} />
            <div className="  absolute bottom-2 right-3 text-white py-1 text-sm px-2 block w-fit ml-auto shadow-md hover:text-rose-500">
              <Skeleton width={80} height={35} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewSkeleton;
