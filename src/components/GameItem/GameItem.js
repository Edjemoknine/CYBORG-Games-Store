import { useContext } from "react";
import "../Buttons/Buttons.css";
import "./GameItem.css";
import Progress from "../Progress";
import { GamesContext } from "../../utils/Context";
import { Link } from "react-router-dom";

const GameItem = ({ card }) => {
  // console.log(card);
  const { RemovePlayed, RemoveGames } = useContext(GamesContext);
  const handleRemove = () => {
    if (card.fav) {
      RemoveGames(card.id);
    } else {
      RemovePlayed(card.id);
    }
  };

  return (
    <div className="">
      <div className="game-library-item">
        <div className="dark:bg-[#27292a] bg-zinc-200 rounded-xl hover:shadow-rose-500  cursor-pointer hover:shadow p-3 flex justify-between items-center md:flex-row flex-col gap-3">
          <Link to={`/game/${card.id}`}>
            <img
              src={`https://img.opencritic.com/${card.img}`}
              alt="popular"
              className="md:w-28 md:h-32 bg-red-300 object-cover rounded-lg  mb-2 md:mb-0 game-library-item-img"
            />
          </Link>
          <div className="flex  w-full md:justify-between md:flex-row flex-col md:items-center gap-2 md:gap-6">
            <h4 className="most-popular-item-title md:mr-6 ">
              <b className="text-xl md:text-base ">{card.title}</b> <br />
              <span className="text-xs md:text-base">Sandbox</span>
            </h4>
            <div className="flex w-full md:items-center justify-between   md:gap-6 gap-3">
              <ul className="text-xs md:text-base">
                <li>
                  <span style={{ color: "yellow" }}></span>
                  <b>Date Added</b>
                </li>
                <li>
                  <span style={{ color: "steelblue" }}></span>
                  <span>{card.date}</span>
                </li>
              </ul>
              <ul className="text-xs md:text-base">
                <li>
                  <span style={{ color: "yellow" }}></span>
                  <b>Hours Played</b>
                </li>
                <li>
                  <span style={{ color: "steelblue" }}></span>
                  <span>{Math.floor(Math.random() * 1000)}</span>
                </li>
              </ul>
              <Progress rate={card.rate} />
            </div>

            <div className="flex items-center gap-3 mx-auto">
              <button
                onClick={handleRemove}
                className=" text-rose-500 hover:bg-rose-500 hover:text-white secondary  md:px-6 md:py-2 px-2 py-1 text-sm secondary-btn"
              >
                Remove
              </button>
              <button className="btn btn-outline-primary md:px-6 md:py-2 px-2 py-1 text-sm">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
