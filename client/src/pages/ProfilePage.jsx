import React, { useContext, useState } from "react";
import UserContext from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

import AccountNav from "../AccountNav";

const ProfilePage = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  // let { subpage } = useParams();
  // if (subpage === undefined) {
  //   subpage = "profile";
  //   // console.log(subpage);
  // }

  if (!ready) return "loading...";

  if (!user && ready && !redirect) {
    return <Navigate to="/login" />;
  }

  const logout = async () => {
    const response = await axios.post("/logout");
    setUser(null);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AccountNav />
      {/* {subpage === "profile" && ( */}
      <div className="text-center max-w-lg mx-[450px] mt-10">
        <p>
          Logged in as {user.name} ({user.email})
        </p>
        <button
          className="primary max-w-sm mt-2"
          type="button"
          onClick={logout}
        >
          LOGOUT
        </button>
      </div>
      {/* // )} */}

      {/* {subpage === "places" && <PlacesPage />} */}
    </div>
  );
};

export default ProfilePage;
