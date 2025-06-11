import jwt  from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js';


export const verifyjwt = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            throw new ApiError(401,"Unauthorised Request");
        }
    
        const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedtoken?._id).select("-password -refreshtoken");
        if(!user){
            throw new ApiError(401, `Invalid access token. User ID: ${decodedtoken?._id.toString()}`);
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})