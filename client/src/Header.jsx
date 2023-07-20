import React, { useContext } from "react";
import icon from "./assets/icons/icon.svg";
import search from "./assets/icons/search.svg";
import menu from "./assets/icons/menu.svg";
import userIcon from "./assets/icons/user.svg";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className=" flex justify-between">
      <Link to="/" className="flex items-center gap-1 font-bold">
        <img src={icon} className="w-5 h-5 -rotate-90" />
        <span>AirBNB</span>
      </Link>
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Anywhere</div>
        <div className="border-l border-gray-300" />
        <div>Any week</div>
        <div className="border-l border-gray-300" />
        <div>Add guests</div>
        <button className="bg-primary text-white p-1 rounded-full">
          <img src={search} className="w-5 h-5" />
        </button>
      </div>
      <Link
        to={user ? "/account" : "login"}
        className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 items-center"
      >
        <img src={menu} className="w-5 h-5" />
        <div className="bg-gray-500 text-white rounded-full p-[2px]">
          <img src={userIcon} className="w-5 h-5" />
        </div>
        {user && <div>{user.name}</div>}
      </Link>
    </header>
  );
};

export default Header;
