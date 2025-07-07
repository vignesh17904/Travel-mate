import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import AxiosInstance from "../../utils/ApiConfig.js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const BookingPage = () => {
  const { _id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomsBooked, setRoomsBooked] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await AxiosInstance.get(`/hotels/by-id/${_id}`);
        setHotel(res.data.data);
      } catch (err) {
        console.error("Error fetching hotel:", err);
      }
    };
    fetchHotel();
  }, [_id]);

  useEffect(() => {
    if (checkIn && checkOut && roomsBooked && hotel) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const days = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
      if (days > 0) {
        setTotalPrice(days * hotel.pricePerNight * roomsBooked);
      } else {
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut, roomsBooked, hotel]);

  const handleBooking = async () => {
    if (!checkIn || !checkOut || totalPrice === 0) return;
    setLoading(true);
    setError("");

    try {
     
      const bookingRes = await AxiosInstance.post("/bookings/makebooking", {
        hotelId: _id,
        checkIn,
        checkOut,
        roomsBooked,
      });

      const { bookingId, totalPrice: serverPrice } = bookingRes.data.data;

     
      const paymentRes = await AxiosInstance.post("/payment/create-checkout-session", {
        hotelName: hotel.name,
        totalPrice: serverPrice,
        bookingId,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: paymentRes.data.data.sessionId });
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!hotel)
    return <div className="p-8 text-center text-xl">Loading hotel info...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Book: {hotel.name}</h1>
      <img
        src={hotel.imageUrl}
        alt={hotel.name}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <p className="text-gray-700 mb-2">{hotel.description}</p>
      <p className="text-gray-600 mb-4">Address: {hotel.address}</p>
      <p className="text-lg font-semibold text-green-600">
        ₹{hotel.pricePerNight} / night
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Check-in</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Check-out</label>
          <input
            type="date"
            className="w-full border rounded-lg px-3 py-2"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Rooms</label>
          <input
            type="number"
            min={1}
            className="w-full border rounded-lg px-3 py-2"
            value={roomsBooked}
            onChange={(e) => setRoomsBooked(e.target.value)}
          />
        </div>
      </div>

      {totalPrice > 0 && (
        <p className="text-xl font-semibold text-blue-600 mt-6">
          Total Price: ₹{totalPrice}
        </p>
      )}

      <button
        onClick={handleBooking}
        disabled={loading}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md disabled:opacity-50"
      >
        {loading ? "Processing..." : "Confirm Booking & Pay"}
      </button>

      {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
    </div>
  );
};

export default BookingPage;
