import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
export const GamesContext = createContext();

const historyData = JSON.parse(localStorage.getItem("History") || "[]");
const favoritesData = JSON.parse(localStorage.getItem("Favorites") || "[]");
const playedData = JSON.parse(localStorage.getItem("Played") || "[]");

export const GamesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(favoritesData);
  const [played, setPlayed] = useState(playedData);
  const [history, setHistory] = useState(historyData);
  const [streamID, setStreamID] = useState("CHtd3oVt1QE");
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("History", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("Favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("Played", JSON.stringify(played));
  }, [played]);

  useEffect(() => {
    const onsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => onsubscribe();
  }, []);

  const AddHistory = (game) => {
    setHistory([
      ...history,
      { ...game, date: new Date().toLocaleDateString() },
    ]);
  };
  const DelHistory = (id) => {
    setHistory(history.filter((game) => game.id !== id));
  };
  const CleanHistory = () => {
    setHistory([]);
  };
  const AddFavorites = (game) => {
    setFavorites([
      ...favorites,
      { ...game, fav: true, date: new Date().toLocaleDateString() },
    ]);
  };
  const RemoveGames = (id) => {
    setFavorites(favorites.filter((game) => game.id !== id));
  };
  const AddPlayed = (game) => {
    setPlayed([
      ...played,
      { ...game, played: true, date: new Date().toLocaleDateString() },
    ]);
  };
  const RemovePlayed = (id) => {
    setPlayed(played.filter((game) => game.id !== id));
  };
  return (
    <GamesContext.Provider
      value={{
        RemovePlayed,
        AddPlayed,
        AddFavorites,
        RemoveGames,
        favorites,
        played,
        history,
        AddHistory,
        DelHistory,
        user,
        setUser,
        CleanHistory,
        streamID,
        setStreamID,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
