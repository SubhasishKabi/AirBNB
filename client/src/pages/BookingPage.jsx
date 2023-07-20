import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery.jsx";
import BookingInfo from "../BookingInfo";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) return "";
  return (
    <div className="my-8">
      <AddressLink place={booking.place} />
      <BookingInfo booking={booking} />
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default BookingPage;
