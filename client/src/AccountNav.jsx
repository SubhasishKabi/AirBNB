import React from "react";
import { Link, useLocation } from "react-router-dom";
import userIcon from "./assets/icons/user2.svg";
import list from "./assets/icons/list.svg";
import house from "./assets/icons/house.svg";

const AccountNav = () => {
  const { pathname } = useLocation();

  let subpage = pathname.split("/")?.[2];
  // console.log({ subpage });
  if (subpage === undefined) {
    subpage = "profile";
  }
  //   console.log(location);
  function linkClasses(type = null) {
    let classes = "py-2 px-4 inline-flex gap-1 items-center";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  return (
    <nav className="w-full flex justify-center mt-8 gap-6 -mx-[50px]">
      {/* <nav className="w-full flex justify-center mt-8 gap-6"> */}
      <Link to="/account" className={linkClasses("profile")}>
        <img src={userIcon} className="w-5 h-5" />
        My Profile
      </Link>
      <Link to="/account/bookings" className={linkClasses("bookings")}>
        <img src={list} className="w-5 h-5" />
        My Bookings
      </Link>
      <Link to="/account/places" className={linkClasses("places")}>
        <img src={house} className="w-5 h-5" />
        My Accomodation
      </Link>
    </nav>
  );
};

export default AccountNav;
