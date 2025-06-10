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
    role: {
    type: String,
    enum: ["user", "hotelowner"],
    default: "user"
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

export const User =  mongoose.model('User', userSchema);
