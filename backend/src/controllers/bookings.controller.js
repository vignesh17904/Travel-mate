import Booking from "../models/bookings.model.js";
import Hotel from "../models/hotels.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { hotelId, checkIn, checkOut, roomsBooked } = req.body;
  const userId = req.user._id;

  if (!hotelId || !checkIn || !checkOut || !roomsBooked) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });

  const overlappingBookings = await Booking.find({
    hotel: hotelId,
    checkIn: { $lt: new Date(checkOut) },
    checkOut: { $gt: new Date(checkIn) },
  });

  const roomsAlreadyBooked = overlappingBookings.reduce(
    (sum, b) => sum + b.roomsBooked,
    0
  );

  if (roomsAlreadyBooked + roomsBooked > hotel.totalRooms) {
    return res.status(400).json({ message: "Not enough rooms available" });
  }

  const days = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );

  const totalPrice = hotel.pricePerNight * days * roomsBooked;

  const booking = await Booking.create({
    hotel: hotelId,
    user: userId,
    checkIn,
    checkOut,
    roomsBooked,
    totalPrice,
  });

  res.status(201).json({ message: "Booking successful", booking });
});

export const getBookingsByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const bookings = await Booking.find({ user: userId })
    .populate("hotel", "name address pricePerNight")
    .populate("user", "name email");

  res.status(200).json({ message: "Bookings fetched successfully", bookings });
});

export const getBookingsByOwner = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  const hotelsOwned = await Hotel.find({ owner: ownerId }).select("_id");

  const hotelIds = hotelsOwned.map(h => h._id);

  const bookings = await Booking.find({ hotel: { $in: hotelIds } })
    .populate("hotel", "name address")
    .populate("user", "name email");

  res.status(200).json({ message: "Bookings fetched for owner", bookings });
});
