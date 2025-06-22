import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    address: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: "/public/hotelplaceholder.jpg",
    },
    pricePerNight: {
        type: Number,
        required: true,
    },
    place:{
        type : String,
        required:true
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref: "User",
        required:true
    },
    totalRooms: {
  type: Number,
  required: true,
  default: 10, 
},

}, { timestamps: true });
const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;