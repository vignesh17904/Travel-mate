import { jwt } from 'jsonwebtoken';
import User from '../models/user.model.js';
<<<<<<< HEAD
import { apierror } from '../utils/apierror.js';
import { asynchandler } from '../utils/asynchandler.js';


export const verifyjwt = asynchandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            throw new apierror(401,"Unauthorised request");
=======
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js';


export const verifyjwt = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            throw new ApiError(401,"Unauthorised request");
>>>>>>> 63e2c67b1db9c86c85dc62ef2ccd928a9c259a76
        }
    
        const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedtoken?._id).select("-password -refreshtoken");
        if(!user){
<<<<<<< HEAD
            throw new apierror(401,"Invalid access token");
=======
            throw new ApiError(401,"Invalid access token");
>>>>>>> 63e2c67b1db9c86c85dc62ef2ccd928a9c259a76
        }
        req.user = user;
        next();
    } catch (error) {
<<<<<<< HEAD
        throw new apierror(401,error?.message || "Invalid access token")
=======
        throw new ApiError(401,error?.message || "Invalid access token")
>>>>>>> 63e2c67b1db9c86c85dc62ef2ccd928a9c259a76
    }
})