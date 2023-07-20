import React from "react";
import location from "./assets/icons/location.svg";

const AddressLink = ({ place }) => {
  return (
    <a
      href={"https://maps.google.com/?q=" + place.address}
      target="_blank"
      className="font-semibold underline my-2 flex gap-1 items-center"
    >
      <img src={location} className="w-5 h-5" />
      {place.address}
    </a>
  );
};

export default AddressLink;
