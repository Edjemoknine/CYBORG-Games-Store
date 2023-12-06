import { useQueries, useQuery } from "react-query";
import { gameDetails, getPopularGames } from "../api/FetchGames";
import MostPopilair from "../sections/MostPopilair";
import { useContext, useState } from "react";
import { GamesContext } from "../utils/Context";
import HeroSkeleton from "../Skeleton/HeroSekelton";
import CardSkeleton from "../Skeleton/CardSkeleton";
import Skeleton from "react-loading-skeleton";

const Stream = () => {
  const { AddHistory, streamID, setStreamID } = useContext(GamesContext);
  const [more, setMore] = useState(8);

  const { data: Popular, isLoading } = useQuery({
    queryKey: ["PopularIds"],
    queryFn: getPopularGames,
    keepPreviousData: true,
    select: (games) => games.map((game) => game.id),
  });

  const GamesDetails = useQueries(
    Popular
      ? Popular?.map((id) => {
          return {
            queryKey: ["Gd", id],
            queryFn: () => gameDetails(id),
            keepPreviousData: true,
            staleTime: Infinity,
            enabled: !!Popular,
          };
        })
      : []
  );
  // console.log(Popular);
  // console.log(GamesDetails);

  if (isLoading)
    return (
      <>
        <HeroSkeleton />
        <Skeleton width={300} className="mt-3" height={30} borderRadius={20} />
        <div className="grid md:grid-cols-4 mt-6 gap-3">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <CardSkeleton key={i} />
            ))}
        </div>
      </>
    );
  return (
    <MostPopilair
      title={""}
      cards={
        <>
          <div className="w-full h-[500px] relative">
            <iframe
              title="Games banner"
              width={"100%"}
              height={"100%"}
              loading="lazy"
              src={`https://www.youtube.com/embed/${streamID}`}
              className=" w-full rounded-3xl h-full object-cover absolute top-0 left-0"
              allow="accelerometer;reapet;meted ; autoplay;clopboard-write; encrypted-media;gyroscope;picture-in-picture"
            />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl mt-10 mb-6 pb-1 font-semibold border-rose-500 border-b-8 w-fit">
              The Most Populair Games Trailers{" "}
            </h1>
            {/* <select
              className="bg-transparent border rounded-lg px-4 py-2 "
              onChange={(e) => setCategories(e.target.value)}
            >
              <option className="bg-gray-800" key={"1"} value="getPopularGames">
                Popular Games
              </option>
              <option className="bg-gray-800" key={"2"} value="hallOfFame">
                Hall of Fame
              </option>
              <option className="bg-gray-800" key={"3"} value="UpComingGames">
                Up Coming
              </option>
              <option
                className="bg-gray-800"
                key={"4"}
                value="recentlyReleased"
              >
                Recently Released
              </option>
            </select> */}
          </div>
          <div className="grid md:grid-cols-4 mt-6 gap-3">
            {GamesDetails?.slice(0, more)?.map((game) => (
              <div
                key={game?.data?.id}
                className="relative shadow shadow-black p-3 rounded-lg w-full h-80"
              >
                <img
                  alt="Games banner"
                  onClick={() => {
                    AddHistory(game.data);
                    window.scrollTo({ left: 0, top: -100, behavior: "smooth" });
                    setStreamID(game?.data?.trailers[0]?.videoId);
                  }}
                  loading="lazy"
                  src={`https://img.opencritic.com/${game?.data?.images?.box?.og}`}
                  className=" w-full cursor-pointer hover:scale-105 duration-300 rounded-xl h-full object-cover absolute top-0 left-0"
                  // allow="accelerometer;reapet;meted ; autoplay;clopboard-write; encrypted-media;gyroscope;picture-in-picture"
                />
              </div>
            ))}
          </div>
          <div className="grid place-content-center mt-10">
            {more === Popular?.length || more > Popular?.length ? (
              " "
            ) : (
              <button
                className="bg-rose-500 px-4 py-2 text-white cursor-pointer"
                onClick={() => setMore((prev) => prev + 4)}
              >
                Discover More
              </button>
            )}
          </div>
        </>
      }
    />
  );
};

export default Stream;
