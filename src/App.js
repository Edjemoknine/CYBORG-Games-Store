import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import { Container } from "./components/index";
import { Header, Footer } from "./sections/index";
import { Home, Profile, Hero, Stream, GameDetail, Search } from "./Pages/index";
import { GamesContext } from "./utils/Context";
import Loging from "./Pages/Loging";
import { SkeletonTheme } from "react-loading-skeleton";
const App = () => {
  const { user } = useContext(GamesContext);
  const OldMode = localStorage.getItem("mode");
  const [darkMode, setDarkMode] = useState(OldMode);
  useEffect(() => {
    localStorage.setItem("mode", darkMode);
  }, [darkMode]);

  return (
    <>
      <Router>
        <div
          className={`${
            darkMode
              ? "dark duration-300 min-h-screen bg-[#1f2122]  text-white"
              : "  bg-zinc-300 min-h-screen text-[#27292a] "
          }  `}
        >
          <Container>
            <Header user={user} setDarkMode={setDarkMode} />
            <ToastContainer />
            <SkeletonTheme baseColor="#ccc" highlightColor="#fff">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Hero />} />
                <Route path="/stream" element={<Stream />} />
                <Route
                  path="/profile"
                  element={user ? <Profile /> : <Loging />}
                />
                <Route path="/game/:id" element={<GameDetail />} />
                <Route path="/search/:term" element={<Search />} />
              </Routes>
            </SkeletonTheme>
            <Footer />
          </Container>
        </div>
      </Router>
    </>
  );
};

export default App;
