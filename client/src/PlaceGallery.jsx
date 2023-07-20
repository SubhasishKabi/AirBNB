import React from "react";
import photo from "./assets/icons/photo.svg";
import close from "./assets/icons/close.svg";

import { useState } from "react";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black min-h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <h2 className="font-bold text-xl text-white mr-36">
              Photos of {place.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-1  px-2 rounded-2xl bg-gray-500 shadow-md text-white items-center"
            >
              <img src={close} className="w-5 h-5 " />
              Close
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => {
              return (
                <div key={photo}>
                  <img
                    src={"http://localhost:4000/uploads/" + photo}
                    className="w-full h-full object-cover "
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] mt-4 rounded-lg overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div
              className="relative group"
              onClick={() => setShowAllPhotos(true)}
            >
              <img
                className="aspect-square object-cover "
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
              />
              <div className="group-hover:flex flex-col hidden absolute inset-0  w-full h-full bg-[#10101f]/[0.1]" />
            </div>
          )}
        </div>
        <div className="grid ">
          {place.photos?.[1] && (
            <div
              className="relative group"
              onClick={() => setShowAllPhotos(true)}
            >
              <img
                src={`http://localhost:4000/uploads/${place.photos[1]}`}
                className="aspect-square object-cover "
              />
              <div className="group-hover:flex flex-col hidden absolute inset-0  w-full h-full bg-[#10101f]/[0.1]" />
            </div>
          )}
          {place.photos?.[2] && (
            <div
              className="overflow-hidden relative group"
              onClick={() => setShowAllPhotos(true)}
            >
              <img
                src={`http://localhost:4000/uploads/${place.photos[2]}`}
                className="aspect-square object-cover relative top-2"
              />
              <div className="group-hover:flex flex-col hidden absolute inset-0  w-full h-full bg-[#10131f]/[0.1]" />
            </div>
          )}
        </div>
      </div>
      <button
        className=" flex gap-1 items-center absolute bottom-2 right-2 py-2 px-4  border  rounded-2xl bg-white font-bold hover:bg-[#10131f]/[0.5] hover:text-white"
        onClick={() => setShowAllPhotos(true)}
      >
        <img src={photo} className="w-5 h-5" />
        Show more photos
      </button>
    </div>
  );
};

export default PlaceGallery;
