import mongoose, { Schema } from "mongoose";

const CitySchema = new Schema({
    name: { 
        type: String,
        required: true,
        unique: true,
    },
    imageurl: { 
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true,
    },
    placeid: { 
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

export const City = mongoose.model("City", CitySchema);