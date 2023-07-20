import React from "react";

import { differenceInCalendarDays, format } from "date-fns";
import calender from "./assets/icons/calender.svg";
import moon from "./assets/icons/moon.svg";
import creditcard from "./assets/icons/creditcard.svg";

const BookingInfo = ({booking}) => {
  return (
    <div className="p-1 grow pr-2 ">
      <h2 className="text-xl font-bold">{booking.place.title}</h2>
      <div className="mt-2 pt-1 border-t border-gray-300 flex gap-2 ">
        <div className="flex items-center gap-1">
          <img src={calender} className="w-5 h-5" />
          {format(new Date(booking.checkIn), "yyyy-MM-dd")}
        </div>
        &rarr;{" "}
        <div className="flex items-center gap-1">
          <img src={calender} className="w-5 h-5" />
          {format(new Date(booking.checkOut), "yyyy-MM-dd")}
        </div>
      </div>
      <div className="mt-2 flex gap-1 items-center">
        <img src={moon} className="w-5 h-5" />

        <p>
          Number of nights:{" "}
          <span className="font-bold">
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}
          </span>
        </p>
      </div>
      <div className="mt-2 flex gap-1 items-center">
        <img src={creditcard} className="w-5 h-5" />
        <p>
          Total Price: <span className="font-bold">${booking.price}</span>
        </p>
      </div>
    </div>
  );
};

export default BookingInfo;
