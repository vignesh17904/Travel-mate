import React from "react";

const BookingCard = ({ booking }) => {
  const { hotel, checkIn, checkOut, totalPrice,roomsBooked } = booking;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">{hotel?.name}</h2>
      <p className="text-gray-600">{hotel?.address}</p>
      <div className="mt-2">
        <p>
          <strong>Check-in:</strong> {new Date(checkIn).toLocaleDateString()}
        </p>
        <p>
          <strong>Check-out:</strong> {new Date(checkOut).toLocaleDateString()}
        </p>
        <p>
          <strong>Total Price:</strong> ₹{totalPrice}
        </p>
        <p>
          <strong>Rooms Booked:</strong>{" "}
          <span className="text-blue-600 font-medium">{roomsBooked}</span>
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
