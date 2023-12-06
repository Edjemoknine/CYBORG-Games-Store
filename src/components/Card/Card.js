import "./Card.css";
import { FaStar } from "react-icons/fa6";
import { FaFire, FaHeartbeat } from "react-icons/fa";
import { IoGameControllerOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GamesContext } from "../../utils/Context";
import { useContext } from "react";
const Card = ({ id, title, img, rate, download }) => {
  const { AddPlayed, AddFavorites } = useContext(GamesContext);
  return (
    <div className="relative group overflow-hidden">
      <div className="most-popular-item hover:scale-105  duration-500  overflow-hidden">
        <div className="card-wrapper dark:bg-[#27292a] bg-zinc-100">
          <div className=" absolute z-50 top-6 duration-300 -left-full group-hover:left-7 flex flex-col gap-2">
            <div
              onClick={() => AddFavorites({ id, title, img, rate, download })}
              className="bg-black cursor-pointer hover:text-rose-500 duration-300 flex justify-center items-center h-8 w-8 rounded-full"
            >
              <FaHeartbeat size={20} />
            </div>
            <div
              onClick={() => AddPlayed({ id, img, rate, download, title })}
              className="hover:text-rose-500 cursor-pointer duration-300 bg-black flex justify-center items-center h-8 w-8 rounded-full"
            >
              <IoGameControllerOutline size={20} />
            </div>
          </div>
          <Link to={`/game/${id}`}>
            <div className="h-60 w-full  rounded-md overflow-hidden ">
              <img
                loading="lazy"
                src={`https://img.opencritic.com/${img}`}
                alt="popular"
                className=" h-full w-full object-fill "
              />
            </div>
          </Link>

          <div className="most-popular-item-info">
            <h4 className="most-popular-item-title">
              {title.substring(0, 20)} <br />
              <span>${Math.floor(Math.random() * 100).toFixed(0)}</span>
            </h4>
            <ul className="ml-1">
              <li className="flex items-center gap-1">
                <span style={{ color: "yellow" }}>
                  <FaStar size={15} />
                </span>
                <span> {rate.toFixed(2)}</span>
              </li>
              <li className="flex items-center gap-1">
                <span style={{ color: "steelblue" }}>
                  <FaFire
                    size={15}
                    className={
                      download === "Mighty"
                        ? "text-red-500"
                        : download === "Strong"
                        ? "text-purple-500"
                        : download === "Fair"
                        ? "text-sky-500"
                        : "text-green-800"
                    }
                  />
                </span>
                <span>{download}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
