import Booking from "../models/bookings.model.js";
import Hotel from "../models/hotels.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { hotelId, checkIn, checkOut, roomsBooked } = req.body;
  const userId = req.user._id;

  if (!hotelId || !checkIn || !checkOut || !roomsBooked) {
    throw new ApiError(400, "Missing required fields");
  }

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }

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
    throw new ApiError(400, "Not enough rooms available");
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

  return res
    .status(201)
    .json(new ApiResponse(201, { bookingId: booking._id, totalPrice }, "Booking successful"));
});

export const getBookingsByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const bookings = await Booking.find({ user: userId })
    .populate("hotel", "name address pricePerNight")
    .populate("user", "name email");

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "Bookings fetched successfully"));
});

export const getBookingsByOwner = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  const hotelsOwned = await Hotel.find({ owner: ownerId }).select("_id");
  const hotelIds = hotelsOwned.map((h) => h._id);

  const bookings = await Booking.find({ hotel: { $in: hotelIds } })
    .populate("hotel", "name address")
    .populate("user", "name email");

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "Bookings fetched for owner"));
});

export const updateBookingPaymentStatus = asyncHandler(async (req, res) => {
  const { bookingId, status } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, "Booking not found");

  booking.paymentStatus = status;
  await booking.save();

  return res.status(200).json(new ApiResponse(200, booking, "Payment status updated"));
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  await Booking.findByIdAndDelete(bookingId);
  return res.status(200).json(new ApiResponse(200, null, "Booking cancelled"));
});
