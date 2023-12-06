import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { RiMenu4Line } from "react-icons/ri";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import profile from "../../images/profile.jpg";

const Header = ({ setDarkMode, user }) => {
  const navLink = [
    { label: "Home", href: "/" },
    { label: "Hero", href: "/games" },
    { label: "Stream", href: "/stream" },
    { label: user ? "Profile" : "Login", href: "/profile" },
  ];

  const [isOpen, setOpen] = useState(false);
  const [iSearch, setSearch] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const handleSearch = (e) => {
    e.preventDefault();

    if (term) {
      navigate(`/search/${term}`);
    }
    setTerm("");
  };
  return (
    <nav className=" ">
      <div className="container relative  bg-rd-300 gap-3 flex justify-between items-center md:p-6 p-3">
        <Link className="" to="/">
          <img className="md:w-40 w-32 " src={logo} alt="logo" />
        </Link>
        <HiOutlineSearch
          onClick={() => setSearch((prev) => !prev)}
          size={25}
          className="md:hidden text-gray-400"
        />
        <div
          className={`${
            iSearch ? "scale-100" : "scale-0"
          } md:relative absolute top-full z-20 duration-300 left-0 right-0`}
        >
          <form
            className="relative rounded-full dark:bg-zinc-700 bg-zinc-100"
            onSubmit={handleSearch}
          >
            <input
              className=" bg-transparent border-none outline-none h-full py-1 w-full pl-8"
              type="text"
              placeholder="Search Gemes"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">
              {" "}
              <HiOutlineSearch className="text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 " />
            </button>
          </form>
        </div>

        <div className="">
          <ul className="hidden md:flex items-center gap-6">
            {navLink.map((nav) => (
              <Link
                key={nav.label}
                className={` ${
                  pathname === nav.href ? "Link text-rose-500" : "Link"
                } ${
                  nav.label === "Profile" &&
                  "dark:bg-[#202122] bg-zinc-300  p-1.5 px-2  rounded-full"
                }`}
                to={nav.href}
              >
                {nav.label === "Profile" ? (
                  <div className="flex items-center gap-2">
                    {nav.label}
                    <img
                      src={profile}
                      className="w-6 h-6 rounded-full"
                      alt="profile"
                    />{" "}
                  </div>
                ) : (
                  <div>{nav.label}</div>
                )}
              </Link>
            ))}
          </ul>
          <ul
            className={`${
              isOpen ? "w-52 h-64" : " w-0 h-0 opacity-0 select-none"
            } md:hidden absolute right-20 -bottom-[385%] dark:bg-[#1f2122]  flex flex-col items-center gap-6 justify-center   rounded-md p-6 duration-300 bg-slate-200 shadow-xl z-50 `}
          >
            {navLink.map((nav) => (
              <Link
                key={nav.label}
                className={` ${
                  pathname === nav.href ? "Link text-rose-500" : "Link"
                } ${
                  nav.label === "Profile" &&
                  "dark:bg-[#27292A] bg-zinc-300   p-2  rounded-full"
                }`}
                to={nav.href}
              >
                {nav.label === "Profile" ? (
                  <div className="flex items-center gap-2">
                    {nav.label}
                    <img
                      src={profile}
                      className="w-6 h-6 rounded-full"
                      alt="profile"
                    />{" "}
                  </div>
                ) : (
                  <div>{nav.label}</div>
                )}
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <RiMenu4Line
            onClick={() => setOpen(!isOpen)}
            className="Link md:hidden cursor-pointer"
            size={30}
          />
          <div onClick={() => setDarkMode((prev) => !prev)}>
            <BsFillSunFill
              className="hidden dark:flex Link cursor-pointer "
              size={25}
            />
            <BsMoonStarsFill
              className="dark:hidden flex Link cursor-pointer "
              size={25}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
