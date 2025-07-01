import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  roomsBooked: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
  type: String,
  enum: ["pending", "paid", "cancelled"],
  default: "pending",
},

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
