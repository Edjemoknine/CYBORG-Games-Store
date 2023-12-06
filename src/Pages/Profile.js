import { MostPopilair, YourGaming } from "../sections/index";
import profile from "../images/profile.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { MdDelete } from "react-icons/md";

import {
  Buttons,
  SecondaryButtons,
  SectionHeader,
  SectionWrapper,
} from "../components";
import { useContext } from "react";
import { GamesContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "@firebase/auth";
// import Swiper from "swiper";
const Profile = () => {
  const {
    favorites,
    played,
    history,
    DelHistory,
    CleanHistory,
    setStreamID,
    user,
  } = useContext(GamesContext);
  // console.log(user);
  const navigate = useNavigate();
  const LogOut = async () => {
    await signOut(auth);
    // navigate("/");
  };
  return (
    <MostPopilair
      title={""}
      cards={
        <>
          <div className="flex md:flex-row flex-col  gap-3 justify-between">
            <div className="flex-1 h-full">
              <img
                src={user?.photoURL || profile}
                className="w-full rounded-xl h-full object-contain"
                alt="profile"
              />
            </div>
            <div className="flex-1 flex pl-3 justify-center gap-6 flex-col">
              <div className="flex justify-between items-center gap-3">
                <Buttons text={"Offline"} />
                <button className="button primary-btn" onClick={() => LogOut()}>
                  Sign Out
                </button>
              </div>
              <h1 className="text-3xl font-bold">{user.displayName}</h1>
              <h3 className="text-gray-400">{user.email}</h3>
              <p className="my-3 text-xl font-extralight text-gray-400">
                You Haven't Gone Live yet. Go Live By Touching The Button Below.
              </p>
              <SecondaryButtons text={"Show New Trailers"} />
            </div>
            <div className="flex-1 bg-zinc-700 p-3 rounded-xl">
              <SectionWrapper>
                <div className="flex justify-between mb-4 items-center border-b-2 border-gray-400 pb-2 ">
                  <p className="text-gray-400">Games liked</p>
                  <p className="text-rose-500">{favorites.length}</p>
                </div>
                <div className="flex justify-between mb-4 items-center border-b-2 border-gray-400 pb-2 ">
                  <p className="text-gray-400">Games Played</p>
                  <p className="text-rose-500">{played.length}</p>
                </div>
                <div className="flex justify-between mb-4 items-center border-b-2 border-gray-400 pb-2 ">
                  <p className="text-gray-400">Trailes Watched</p>
                  <p className="text-rose-500">{history.length}</p>
                </div>
              </SectionWrapper>
            </div>
          </div>
          <YourGaming games={favorites} title={"Favorites"} />
          <YourGaming games={played} title={"Current"} />
          <SectionWrapper>
            <SectionHeader>
              <div className="text-xl flex justify-between items-center gap-3">
                <p>
                  {" "}
                  Your <span className="text-rose-500">History</span> Watch{" "}
                </p>
                <button
                  onClick={CleanHistory}
                  className="md:px-4 text-xs px-2 font-normal md:text-base md:py-2 py-1 rounded-xl text-rose-500 border-1 border-rose-500 hover:text-white hover:bg-rose-500 duration-300"
                >
                  Clear
                </button>
              </div>
            </SectionHeader>

            <Swiper
              className="pb-3 sm:pb-10"
              spaceBetween={10}
              loop={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {history?.map((game) => (
                <SwiperSlide className="shadow-2xl rounded-xl" key={game.id}>
                  <div
                    onClick={() => {
                      navigate("/stream");
                      setStreamID(game?.trailers[0]?.videoId);
                    }}
                    className="h-56  cursor-pointer hover:scale-105 duration-500 rounded-md overflow-hidden"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={`https://img.opencritic.com/${game?.images?.box?.og}`}
                      alt=""
                    />
                  </div>
                  <div className="flex p-3 items-center gap-3 justify-between">
                    <p>{game?.name?.substring(0, 15)}</p>
                    <MdDelete
                      onClick={() => DelHistory(game.id)}
                      size={25}
                      className="hover:text-rose-500 cursor-pointer duration-300"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </SectionWrapper>
        </>
      }
    />
  );
};

export default Profile;
