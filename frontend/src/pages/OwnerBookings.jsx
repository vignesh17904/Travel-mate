import React, { useEffect, useState } from "react";
import AxiosInstance from "../utils/ApiConfig";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await AxiosInstance.get("/bookings/owner");
        setBookings(res.data.data);
      } catch (err) {
        console.error("Error fetching owner bookings", err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bookings in Your Hotels</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-lg font-semibold">{booking.hotel.name}</h2>
            <p><strong>Booked by:</strong> {booking.user.name} ({booking.user.email})</p>
            <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p><strong>Rooms Booked:</strong> {booking.roomsBooked}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerBookings;
