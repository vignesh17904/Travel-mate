import mongoose from "mongoose";
import { Schema } from "mongoose";

const touristPlaceSchema = new Schema({
    in:{
        type:String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: "/public/27464847.jpg",
    },
    }, { timestamps: true });       
const TouristPlace = mongoose.model("TouristPlace", touristPlaceSchema);
export default TouristPlace;