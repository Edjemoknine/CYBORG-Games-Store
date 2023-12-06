import { useQuery } from "react-query";
import { MostPopilair } from "../sections";
import { GameNews, Games, Platforms } from "../api/FetchGames";
import { useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { Card } from "../components";
import NewSkeleton from "../Skeleton/NewSkeleton";
import HeroSkeleton from "../Skeleton/HeroSekelton";
import CardSkeleton from "../Skeleton/CardSkeleton";
const SortData = [
  "score",
  "date",
  "name",
  "num-reviews",
  "percent-recommended",
];
const Hero = () => {
  const [load, setLoad] = useState(10);
  const [page, setPage] = useState(0);
  const [platform, setPlatform] = useState("ps4");
  const [sort, setSort] = useState("score");

  const { data: PlatformData } = useQuery({
    queryKey: ["platforms"],
    queryFn: Platforms,
    keepPreviousData: true,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["store", platform, page, sort],
    queryFn: () => Games({ platform, page, sort }),
    keepPreviousData: true,
  });

  const { data: News, isLoading: newsLoad } = useQuery({
    queryKey: ["news"],
    queryFn: GameNews,
    staleTime: 300000,
    keepPreviousData: true,
  });

  return (
    <div className="min-h-screen">
      <MostPopilair
        title={""}
        cards={
          <div
            className="h-96 grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            }}
          >
            {isLoading && <HeroSkeleton />}
            {data?.map((img) => (
              <img
                className=" flex-auto   object-cover"
                key={img.id}
                src={`https://img.opencritic.com/${img.images?.banner?.og}`}
                alt="complex banner"
              />
            ))}
          </div>
        }
      />
      <MostPopilair
        title={"Welocome To Our Store"}
        cards={
          <div className="">
            {/* {isLoading && "Loading..."} */}
            <div className="flex ml-3 md:flex-row flex-col items-center mb-2 gap-4">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="bg-transparent border-gray-900 outline-none rounded px-3 py-1 border"
              >
                <option value="" className="bg-gray-600">
                  Platform
                </option>
                {PlatformData?.map((pl) => (
                  <option className="bg-gray-600" value={pl.shortName}>
                    <img
                      className="w-10 h-10 object-cover"
                      src={`https://img.opencritic.com/platforms/xbxs.png`}
                      alt="icons"
                    />{" "}
                    {pl.name}
                  </option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent w-36 border-gray-900 outline-none rounded px-3 py-1 border"
              >
                <option className="bg-gray-600" value="">
                  Sort
                </option>
                {SortData?.map((s) => (
                  <option key={s} className="bg-gray-600" value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                className="bg-transparent border-gray-900 outline-none rounded px-3 py-1 border"
                onClick={() => {
                  setPage(0);
                  setPlatform("ps4");
                  setSort("score");
                }}
              >
                Clear
              </button>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 justify-center gap-3">
              {isLoading && (
                <>
                  {Array(20)
                    .fill(0)
                    ?.map((card, i) => (
                      <CardSkeleton key={i} />
                    ))}
                </>
              )}

              {data?.map((card) => (
                <Card
                  key={card.id}
                  title={card.name}
                  img={card.images?.banner?.og}
                  rate={card.topCriticScore}
                  download={card.tier}
                  id={card.id}
                />
              ))}
            </div>
            <div className="flex py-3 gap-3">
              <button
                disabled={page === 0 || isFetching}
                className="dark:bg-gray-600 bg-zinc-100 cursor-pointer hover:bg-zinc-200 p-2 rounded dark:hover:bg-gray-900 duration-300"
                onClick={() => setPage((prev) => prev - 20)}
              >
                Prev
              </button>
              <button className="dark:bg-gray-800 bg-zinc-100 p-2 rounded px-3 font-semibold">
                {page + 1}
              </button>
              <button
                disabled={isFetching}
                className="dark:bg-gray-600 bg-zinc-100 hover:bg-zinc-200 p-2 rounded dark:hover:bg-gray-900 duration-300"
                onClick={() => setPage((prev) => prev + 20)}
              >
                Next
              </button>
            </div>
          </div>
        }
      />

      <MostPopilair
        title={"Last News"}
        cards={
          <div>
            {newsLoad && (
              <>
                <NewSkeleton />
              </>
            )}
            {News?.slice(0, load)?.map((news, index) => (
              <div
                className="grid md:grid-cols-2 grid-cols-1  borde my-3 border-gray-400  shadow overflow-hidden"
                key={news._id}
              >
                <a
                  className="h-80"
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={news.trendingImage}
                    alt={news.title}
                    loading="lazy"
                  />
                </a>
                <div
                  className={`${
                    index % 2 === 0 ? "order-1" : "md:-order-1 "
                  } p-6 pb-10 relative  `}
                >
                  <span className="flex items-center font-semibold mb-3 text-green-500">
                    <FaRegNewspaper size={20} className="mr-2" /> News
                  </span>
                  <a href={news.url} target="_blank" rel="noreferrer">
                    <h1 className="md:text-2xl font-semibold">{news._title}</h1>
                  </a>
                  <div className="flex text-gray-400 md:items-center md:text-base text-xs flex-col md:gap-2 py-1">
                    <span className="md:font-semibold ">by {news.author} </span>{" "}
                    <span>{news.date.substring(0, 10)}</span>
                  </div>
                  <p
                    className="text-sm "
                    dangerouslySetInnerHTML={{
                      __html: news.content.substring(0, 200),
                    }}
                  />
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noreferrer"
                    className="border-gray-600 border  absolute bottom-3 right-3 text-white py-1 text-sm px-2 block w-fit ml-auto shadow-md hover:text-rose-500"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
            <div className="grid place-content-center my-6">
              {load === 30 || load > 30 ? (
                " "
              ) : (
                <button
                  className="bg-zinc-700 px-4 py-2 text-white cursor-pointer"
                  onClick={() => setLoad((prev) => prev + 10)}
                >
                  See More
                </button>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Hero;
