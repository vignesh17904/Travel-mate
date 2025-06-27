import React, { useEffect, useState } from "react";
import AxiosInstance from "../utils/ApiConfig";
import BookingCard from "../components/BookingCard";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await AxiosInstance.get("/bookings/my");
        setBookings(res.data.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading bookings...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))
      )}
    </div>
  );
};

export default MyBookings;
