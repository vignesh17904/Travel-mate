import { mongoose } from 'mongoose';
import { Schema } from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userschema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
        lowercase: true,
    },
    avatar: {
        type: String,
        required: true,
        default: 'tourist/backend/public/user-profile-icon-placeholder.jpg',
    },
    password: {
        type: String,
    },
    refreshtoken: {
        type: String,
    },
} , { timestamps: true });





export default mongoose.model('User', userschema);