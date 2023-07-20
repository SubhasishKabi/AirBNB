import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState();
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async (e) => {
    e.preventDefault();

    const response = await axios.post("/bookings", {
      place: place._id,
      price: numberOfNights * place.price,
      checkIn,
      checkOut,
      numberOfGuests,
      phone,
      name,
    });

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div>
          <p className="text-lg">
            Price: <span className="font-bold">${place.price}</span>/night
          </p>
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex ">
            <div className="py-3 px-4 flex flex-col w-[50%]">
              <label>Check In:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l flex flex-col w-[50%]">
              <label>Check Out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 flex flex-col">
            <label>Max Guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 flex flex-col">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Phone No:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>
        <button
          className="primary disabled:cursor-not-allowed"
          disabled={numberOfNights < 0}
          onClick={bookThisPlace}
        >
          Book this Place
          {/* {numberOfNights > 0 && <span>{numberOfNights}</span>} */}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
