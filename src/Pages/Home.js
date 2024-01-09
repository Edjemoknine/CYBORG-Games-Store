import { Hero, MostPopilair } from "../sections/index";
import { IoGameControllerOutline } from "react-icons/io5";
import {
  getPopularGames,
  UpComingGames,
  hallOfFame,
  recentlyReleased,
  ReviewedToday,
  ReviewedWeek,
} from "../api/FetchGames";
import { useQuery } from "react-query";

import Swip from "../components/Swip";
import { Link } from "react-router-dom";
import HomeSkeleton from "../Skeleton/HomeSkeleton";

const Home = () => {
  const { data: Popular, isLoading } = useQuery({
    queryKey: ["Popular"],
    queryFn: getPopularGames,
    staleTime: 3000000,
  });
  const { data: upComing } = useQuery({
    queryKey: ["upComming"],
    queryFn: UpComingGames,
    staleTime: 3000000,
  });
  const { data: hall } = useQuery({
    queryKey: ["hallOfFame"],
    queryFn: hallOfFame,
    staleTime: 3000000,
  });

  // console.log(hall);

  const { data: recentlyR } = useQuery({
    queryKey: ["recentlyRealesed"],
    queryFn: recentlyReleased,
    staleTime: 3000000,
  });
  const { data: TodayReviews } = useQuery({
    queryKey: ["ReviewedToday"],
    queryFn: ReviewedToday,
    staleTime: 3000000,
  });
  const { data: weekReviews } = useQuery({
    queryKey: ["WeekReviews"],
    queryFn: ReviewedWeek,
    staleTime: 3000000,
  });

  if (isLoading) return <HomeSkeleton />;
  return (
    <>
      <Hero images={Popular} isLoading={isLoading} />
      <MostPopilair title={"Most Popular"} cards={<Swip data={Popular} />} />
      <MostPopilair title={"Featured Deals"} cards={<Swip data={upComing} />} />
      {hall && (
        <MostPopilair
          title={"Hall Of Fame 2023"}
          cards={<Swip data={hall} />}
        />
      )}
      <MostPopilair
        title={"Recently Released"}
        cards={<Swip data={recentlyR} />}
      />
      <MostPopilair
        title={"Streaming"}
        cards={
          <div className="w-full my-3 h-[500px] relative">
            <iframe
              title="Games banner"
              width={"100%"}
              height={"100%"}
              src="https://www.youtube.com/embed/CHtd3oVt1QE"
              className=" w-full h-full rounded object-cover absolute top-0 left-0"
              allow="accelerometer;reapet;meted ; autoplay;clopboard-write; encrypted-media;gyroscope;picture-in-picture"
            />
          </div>
        }
      />
      <MostPopilair
        title={"Last Games Reviewed"}
        cards={
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {TodayReviews?.map((review) => (
                <Link to={`/game/${review.id}`} key={review.id}>
                  <div className="dark:bg-[#27292a] bg-zinc-100 flex px-3 items-center gap-3 mb-3  rounded hover:shadow-rose-500 hover:shadow justify-between overflow-hidden">
                    <div>
                      <IoGameControllerOutline className="md:text-5xl text-3xl" />
                    </div>
                    <p className="md:text-sm font-semibold text-xs">
                      {review.name}
                    </p>
                    <div className=" py-2 flex flex-col text-center items-center gap-2">
                      <div
                        style={{
                          background: `conic-gradient(${
                            review.topCriticScore.toFixed(0) < 50
                              ? "#f00"
                              : review.topCriticScore.toFixed(0) === 50
                              ? "#0FF"
                              : "#0FC"
                          } ${
                            review.topCriticScore.toFixed(0) * 3.6
                          }deg,#22222a 0deg)`,
                        }}
                        className="relative progress w-10 h-10 md:w-16 md:h-16 text-white rounded-full md:font-semibold md:text-lg flex justify-center items-center bg-gray-700"
                      >
                        <p className="z-20">
                          {review.topCriticScore.toFixed(0)}
                        </p>
                      </div>
                      <p className="md:text-sm text-xs">Top Critic Average</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div>
              {weekReviews?.map((review) => (
                <Link to={`/game/${review.id}`} key={review.id}>
                  <div className="dark:bg-[#27292a] bg-zinc-100 flex items-center md:gap-3 gap-2 mb-3  rounded hover:shadow-rose-500 hover:shadow justify-between overflow-hidden">
                    <div className="w-28 h-28 ">
                      <img
                        src={`https://img.opencritic.com/${review?.images?.square?.og}`}
                        alt="review"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-semibold md:text-sm">
                      {review.name.substring(0, 20)}
                    </p>
                    <div className="flex-shrink p-2 flex flex-col  text-center items-center gap-2">
                      <div
                        style={{
                          background: `conic-gradient(${
                            review.topCriticScore.toFixed(0) < 50
                              ? "#f00"
                              : review.topCriticScore.toFixed(0) === 50
                              ? "#0FF"
                              : "#0FC"
                          } ${
                            review.topCriticScore.toFixed(0) * 3.6
                          }deg,#22222a 0deg)`,
                        }}
                        className="relative progress w-10 h-10 md:w-16 md:h-16 text-white rounded-full md:font-semibold md:text-lg flex justify-center items-center bg-gray-700"
                      >
                        <p className="z-20">
                          {review.topCriticScore.toFixed(0)}
                        </p>
                      </div>
                      <p className="md:text-sm text-xs">Top Critic Average</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        }
      />
    </>
  );
};

export default Home;
