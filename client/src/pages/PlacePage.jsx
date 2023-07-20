import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>
      <AddressLink place={place} />

      <PlaceGallery place={place} />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-4 bg-gray-300/[0.5] rounded-xl">
        <div>
          <div className="mt-4 p-2">
            <h2 className="font-bold text-2xl ">Description </h2>
            {place.description}
          </div>
          <div className="mt-2 p-2">
            <p className="text-lg mt-2 uppercase">
              Check In: <span className="font-bold">{place.checkIn}:00</span>{" "}
              Hrs
            </p>
            <p className="text-lg mt-2 uppercase">
              Check Out: <span className="font-bold">{place.checkOut}:00</span>{" "}
              Hrs
            </p>
            <p className="text-lg mt-2 uppercase">
              Max Guests: <span className="font-bold">{place.maxGuests}</span>
            </p>
          </div>
        </div>

        <BookingWidget
          place={place}
          showAllPhotos={showAllPhotos}
          setShowAllPhotos={setShowAllPhotos}
        />
      </div>
      <div className="border-t">
        <div className="mt-2 p-2">
          <h2 className="font-bold">Extra Information:</h2>
          <p className="leading-6">{place.extraInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
