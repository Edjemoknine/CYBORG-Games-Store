// https://img.opencritic.com/game/15847/GzsNZQoy.jpg
import axios from "axios";
const headers = {
  "X-RapidAPI-Key": "6c2a704035mshed3f3f412f5f9aap1c236bjsnbaf789e00c56",
  "X-RapidAPI-Host": "opencritic-api.p.rapidapi.com",
};
const FetchGames = axios.create({
  baseURL: "https://opencritic-api.p.rapidapi.com",
  headers,
});

export const getPopularGames = async () => {
  const resp = await FetchGames.get("/game/popular");
  return await resp.data;
};
export const UpComingGames = async () => {
  const resp = await FetchGames.get("/game/upcoming");
  return await resp.data;
};

export const hallOfFame = async () => {
  const resp = await FetchGames.get("/game/hall-of-fame");
  return await resp.data;
};
export const recentlyReleased = async () => {
  const resp = await FetchGames.get("/game/recently-released");
  return await resp.data;
};
export const gameDetails = async (id) => {
  const resp = await FetchGames.get(`/game/${id}`);
  return await resp.data;
};
export const gameReviews = async (id) => {
  const resp = await FetchGames.get(`/reviews/game/${id}`);
  return await resp.data;
};

export const gameSearch = async (term) => {
  const resp = await FetchGames.get(`/game/search?criteria=${term}`);
  return await resp.data;
};
export const ReviewedToday = async () => {
  const resp = await FetchGames.get(`/game/reviewed-today`);
  return await resp.data;
};
export const ReviewedWeek = async () => {
  const resp = await FetchGames.get(`/game/reviewed-this-week`);
  return await resp.data;
};

export const Platforms = async () => {
  const resp = await FetchGames.get(`/platform`);
  return await resp.data;
};
export const Games = async ({ platform, page, sort }) => {
  const resp = await FetchGames.get(
    `/game?platforms=${platform}&sort=${sort}&skip=${page}`
  );
  return await resp.data;
};
export const GameNews = async () => {
  const resp = await axios.get(
    `https://epic-games-store.p.rapidapi.com/getNews/locale/en/limit/30`,
    {
      headers: {
        "X-RapidAPI-Key": "242b73823fmsh0dcd0d4b3800d1bp14cb15jsnb45fdbb4b78e",
        "X-RapidAPI-Host": "epic-games-store.p.rapidapi.com",
      },
    }
  );
  return await resp.data;
};
