import React, { useEffect, useState } from "react";
import Perks from "../perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesForm = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    if (!id) return;

    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      console.log(data);
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });

    // console.log(addedPhotos) ;
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl font-bold mt-4 ">{text}</h2>;
  }

  function inputDescription(text) {
    return <p type="text">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const savePlace = async (e) => {
    e.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      const response = await axios.put("/places", {
        id,
        ...placeData,
      });

      // console.log(response);
    } else {
      await axios.post("/places", { ...placeData });
    }
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title", "Title for your place")}
        <input
          type="text"
          placeholder="My lovely apartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* ---------------------------------------------- */}

        {preInput("Address", "Address of your place")}
        <input
          type="text"
          placeholder="III/5, Morgan Road, California"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* ---------------------------------------------- */}

        {preInput("Photos", "Add photos of your place")}

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description of your place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {preInput("Perks", "Select all the perks of your Place")}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 ">
          {<Perks selected={perks} onChange={setPerks} />}
        </div>

        {preInput("Extra info", "House rules, dos and donts")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput("Add details", "add check in&out time and number of guests")}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check in time.</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time.</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4"> Save</button>
      </form>
    </div>
  );
};

export default PlacesForm;
