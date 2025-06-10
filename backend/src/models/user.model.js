<<<<<<< HEAD
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
=======
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    username: {
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
      default: '/user-profile-icon-placeholder.jpg',
    },
    password: {
      type: String,
    },
    refreshtoken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, username: this.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

export default mongoose.model('User', userSchema);
>>>>>>> 63e2c67b1db9c86c85dc62ef2ccd928a9c259a76
