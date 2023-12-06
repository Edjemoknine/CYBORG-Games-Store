import { useParams } from "react-router-dom";
import { gameDetails, gameReviews } from "../api/FetchGames";
import { useQuery } from "react-query";
import {
  FaFaceGrinStars,
  FaFaceGrin,
  FaFaceSadTear,
  FaFaceGrinWink,
} from "react-icons/fa6";
import { FaWindows, FaXbox, FaPlaystation, FaApple } from "react-icons/fa";
import { useState } from "react";
import DetailSkeleton from "../Skeleton/DetailSkeleton";

const GameDetail = () => {
  const [more, setMore] = useState(6);
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["gameDetail", id],
    queryFn: () => gameDetails(id),
    staleTime: 3000000,
  });
  const { data: reviews, isLoading: Rloading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => gameReviews(id),
    staleTime: 3000000,
  });

  const [videoId, setVideoId] = useState(0);
  if (isLoading)
    return (
      <>
        <DetailSkeleton />
      </>
    );
  return (
    <div>
      <div
        className="hero-main w-full h-[400px] relative"
        style={{
          backgroundImage: `url(https://img.opencritic.com/${data?.images.square?.og})`,
          backgroundSize: "cover",
          backgroundPosition: "center ",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="flex  gap-8 text-gray-600 text-2xl">
        <h1 className="text-xl md:text-4xl dark:text-white text-zinc-700 font-semibold  my-3">
          {data?.name}
        </h1>
        <div className="flex items-center mt-4 flex-col md:flex-row gap-3 text-gray-600 text-2xl">
          {data?.Platforms.map(
            (pl) => pl.shortName === "PC" && <FaWindows key={pl.id} />
          )}
          {data?.Platforms.map(
            (pl) => pl.shortName === "XBXS" && <FaXbox key={pl.id} />
          )}
          {data?.Platforms.map(
            (pl) => pl.shortName === "PS5" && <FaPlaystation key={pl.id} />
          )}
          {data?.Platforms.map(
            (pl) => pl.shortName === "Stadia" && <FaApple key={pl.id} />
          )}
          {data?.Platforms.map(
            (pl) => pl.shortName === "Switch" && <FaApple key={pl.id} />
          )}
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <p className="text-sm ">{data?.firstReleaseDate?.substring(0, 10)}</p>
        <div>
          {data?.Genres.map((gen) => (
            <span key={gen.id} className="text-gray-400 text-sm ml-2">
              {gen.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-6 py-3">
        <div className="flex flex-col items-center">
          {data?.tier === "Mighty" && (
            <FaFaceGrinStars size={50} className="text-red-500" />
          )}
          {data?.tier === "Strong" && (
            <FaFaceGrinWink size={50} className="text-purple-500" />
          )}
          {data?.tier === "Fair" && (
            <FaFaceGrin size={50} className="text-blue-500" />
          )}
          {data?.tier === "Weak" && (
            <FaFaceSadTear size={50} className="text-green-500" />
          )}
          <p className="mt-2 font-semibold ">
            <span className=" text-rose-400">{data?.tier}</span> Rating{" "}
          </p>
        </div>

        <div className=" flex flex-col items-center gap-2">
          <div
            style={{
              background: `conic-gradient(${
                data?.topCriticScore.toFixed(0) < 50
                  ? "#f00"
                  : data?.topCriticScore.toFixed(0) === 50
                  ? "#0FF"
                  : "#0FC"
              } ${data?.topCriticScore.toFixed(0) * 3.6}deg,#22222a 0deg)`,
            }}
            className="relative progress w-16 h-16 text-white rounded-full font-semibold text-lg flex justify-center items-center bg-gray-700"
          >
            <p className="z-20">{data?.topCriticScore.toFixed(0)}</p>
          </div>
          <p className="font-semibold">Top Critic Average</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div
            style={{
              background: `conic-gradient(${
                data?.percentRecommended.toFixed(0) < 50
                  ? "#f00"
                  : data?.percentRecommended.toFixed(0) === 50
                  ? "#0FF"
                  : "#0FC"
              } ${data?.percentRecommended.toFixed(0) * 3.6}deg,#22222a 0deg)`,
            }}
            className="relative progress text-white w-16 h-16 rounded-full font-semibold text-lg flex justify-center items-center bg-gray-700"
          >
            <p className="z-20"> {data?.percentRecommended.toFixed(0)}</p>
          </div>
          <p className="font-semibold">Critics Recommended</p>
        </div>
      </div>
      <div>
        <p>{data?.description}</p>
      </div>
      <h1 className="mt-6 mb-0 text-3xl font-semibold">
        <span className="text-rose-500 ">{data?.name}</span> Trailers
      </h1>
      <div className="w-full mb-4 h-[400px] relative">
        <iframe
          title="Games banner"
          width={"100%"}
          height={"100%"}
          src={`https://www.youtube.com/embed/${data?.trailers[videoId]?.videoId}`}
          className=" w-full rounded-lg h-full object-cover absolute top-0 left-0"
          allow="accelerometer;reapet;meted ; autoplay;clopboard-write; encrypted-media;gyroscope;picture-in-picture"
        />
      </div>
      <div className="flex items-center gap-3">
        {data?.trailers.map((trailer, id) => (
          <img
            key={id}
            onClick={() => setVideoId(id)}
            src={`https://img.opencritic.com/${data?.images.screenshots[id]?.og}`}
            alt="trailer"
            className={`${
              videoId === id ? "border-red-500 border-4" : ""
            } h-40 cursor-pointer hover:scale-105 rounded hover:border-red-300 hover:border-4 duration-300 shadow-xl object-cover w-36`}
          />
        ))}
      </div>
      <div>
        {Rloading && <div>Loading ....</div>}
        <h1 className="text-3xl font-semibold my-6">
          Critic Reviews for <span className="text-rose-500">{data?.name}</span>
        </h1>
        <div className="flex flex-wrap justify-around gap-3">
          {reviews?.slice(0, more)?.map((review) => (
            <div
              className="w-60 flex-grow flex-auto flex flex-col gap-2 justify-between dark:bg-gray-700 bg-zinc-300 rounded p-3"
              key={review._id}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="mb-1">
                  <h2 className="text-lg font-semibold">
                    {review.Outlet.name}
                  </h2>
                  <p className="dark:text-gray-300 text-zinc-500">
                    {review.Authors[0]?.name}
                  </p>
                  <p className="font-semibold pt-1">{review.score / 10} / 10</p>
                </div>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={`https://img.opencritic.com/${review.Outlet.imageSrc.og}`}
                  alt="outlet"
                />
              </div>

              <p>{review.snippet.substring(0, 100)} ...</p>
              <div className="flex justify-between items-center">
                <span className="dark:text-gray-300">
                  {review.publishedDate.substring(0, 10)}
                </span>
                <a
                  className="py-1 px-2 text-white bg-zinc-800 text-sm"
                  href={review.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  See More
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="grid place-content-center my-3">
          {more === 20 || more > 20 ? (
            " "
          ) : (
            <button
              className="bg-zinc-700 px-4 py-2 text-white cursor-pointer"
              onClick={() => setMore((prev) => prev + 6)}
            >
              See More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
