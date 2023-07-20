import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import plus from "../assets/icons/plus.svg";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      // console.log(data)
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center mt-5">
        <Link
          to="/account/places/new"
          className="bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-1 "
        >
          {" "}
          <img src={plus} className="w-5 h-5" /> Add new place{" "}
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                to={"/account/places/" + place._id}
                className="flex gap-4 bg-gray-200 rounded-lg mt-4 overflow-hidden"
                key={place._id}
              >
                <div className=" flex w-32 h-32 bg-gray-300 shrink-0">
                  <PlaceImg place={place} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;
