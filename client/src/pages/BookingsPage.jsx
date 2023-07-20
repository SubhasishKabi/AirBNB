import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

import { Link } from "react-router-dom";
import BookingInfo from "../BookingInfo";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      {bookings.length > 0 &&
        bookings.map((booking) => {
          return (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className="mt-4 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <BookingInfo booking={booking} />
            </Link>
          );
        })}
    </div>
  );
};

export default BookingsPage;
