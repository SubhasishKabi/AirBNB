import React from "react";
import swim from "./assets/icons/swimming-pool-11286.svg";
import wifi from "./assets/icons/wi-fi.svg";
import tv from "./assets/icons/tv.svg";
import vehicle from "./assets/icons/vehicle.svg";
import smileface from "./assets/icons/smileface.svg";
import entrance from "./assets/icons/entrance.svg";

const Perks = ({ selected, onChange }) => {
  const handleCheckBoxClick = (e) => {
    const { checked, name } = e.target;
    // console.log(name)

    if (checked) {
      onChange([...selected, name]);
      console.log(selected);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  };
  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          checked={selected.includes("Wifi")}
          name="Wifi"
          onChange={handleCheckBoxClick}
        />
        <img src={wifi} className="w-5 h-5" />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          checked={selected.includes("TV")}
          name="TV"
          onChange={handleCheckBoxClick}
        />
        <img src={tv} className="w-5 h-5" />
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          name="Free parking"
          onChange={handleCheckBoxClick}
          checked={selected.includes("Free parking")}
        />
        <img src={vehicle} className="w-5 h-5" />
        <span>Free parking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          checked={selected.includes("Pets")}
          name="Pets"
          onChange={handleCheckBoxClick}
        />
        <img src={smileface} className="w-5 h-5" />
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          name="Private entrance"
          onChange={handleCheckBoxClick}
          checked={selected.includes("Private entrance")}
        />
        <img src={entrance} className="w-5 h-5" />
        <span>Private entrance</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center">
        <input
          type="checkbox"
          name="Swimming Pool"
          onChange={handleCheckBoxClick}
          checked={selected.includes("Swimming Pool")}
        />
        <img src={swim} className="w-5 h-5" />
        <span>Swimming Pool</span>
      </label>
    </>
  );
};

export default Perks;
