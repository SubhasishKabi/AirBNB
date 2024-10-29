import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      console.log(response);
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8 mt-8">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <Link to={"/place/" + place._id} key={place._id}>
              <div className="bg-gray-500 rounded-2xl flex mb-2">
                {place.photos?.[0] && (
                  <img
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                    className="object-cover rounded-2xl aspect-square"
                  /> 
                )}
              </div>
              <h3 className="text-sm font-bold">{place.address}</h3>
              <h2 className="text-sm text-gray-500">{place.title}</h2>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> /night
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default IndexPage;
