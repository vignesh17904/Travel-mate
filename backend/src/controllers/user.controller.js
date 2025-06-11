import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js";
import axios from "axios";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import path from "path"

const generateAccessandRefreshtokens = async(email)=>{
try{
const user = await User.findOne({email})
     if (!user) {
      throw new ApiError(404, "User not found");
    }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
}
catch(error){
    throw new ApiError(500,"something went wrong in generation of accsess and refresh token")
}

}
const signUp = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  if ([email, username, password, role].some(field => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!["user", "hotelowner"].includes(role)) {
    throw new ApiError(400, "Invalid role selected");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const createdUser = await User.create({
    username,
    email,
    password,
    role,
  });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshtokens(email);

  const loggedInUser = await User.findById(createdUser._id).select("-password -refreshToken");

  const options = { httpOnly: true, secure: true };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User registered and logged in")
    );
});

const gsignUp = asyncHandler(async (req, res) => {
  const { code, role = "user" } = req.body;

  if (!code) {
    throw new ApiError(400, "Authorization code is required");
  }

  const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: "postmessage",
    grant_type: "authorization_code",
  });

  const { access_token } = tokenRes.data;

  if (!access_token) {
    throw new ApiError(401, "Failed to get access token from Google");
  }

  const googleUserRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const { email, name, picture } = googleUserRes.data;

  if (!email) {
    throw new ApiError(400, "Google account did not return an email");
  }

  let user = await User.findOne({ email });

  if (!user) {
    const username = email.split("@")[0];

    user = await User.create({
      email,
      username,
      fullName: name,
      avatar: picture,
      password: null,
      isGoogleUser: true,
      role,
    });

    if (!user) {
      throw new ApiError(500, "Failed to create user from Google data");
    }
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshtokens(email);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User authenticated via Google")
    );
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some(field => field?.trim() === "")) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Skip for Google users
  if (user.isGoogleUser) {
    throw new ApiError(400, "Use Google Sign-In for this account");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshtokens(email);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "Login successful")
    );
});


const glogin = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    throw new ApiError(400, "Authorization code is required");
  }

  const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: 'postmessage',
    grant_type: 'authorization_code'
  });

  const { access_token } = tokenRes.data;

  if (!access_token) {
    throw new ApiError(401, "Failed to get access token from Google");
  }

  const googleUserRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  const { email } = googleUserRes.data;

  if (!email) {
    throw new ApiError(400, "Google account did not return an email");
  }

  const user = await User.findOne({ email });

  if (!user || !user.isGoogleUser) {
    throw new ApiError(404, "Google user not registered. Use Google Sign-Up first.");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshtokens(email);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "Google login successful")
    );
});

const getUser= asyncHandler(async (req, res) => {
  return res
  .status(200)
  .json(new ApiResponse(200, req.user, "User fetched successfully"));
  
});
const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

export{signUp, generateAccessandRefreshtokens,gsignUp,login,glogin,logoutUser,getUser}