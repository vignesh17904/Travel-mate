import { jwt } from 'jsonwebtoken';
import User from '../models/user.model.js';
import { apierror } from '../utils/apierror.js';
import { asynchandler } from '../utils/asynchandler.js';


export const verifyjwt = asynchandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            throw new apierror(401,"Unauthorised request");
        }
    
        const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedtoken?._id).select("-password -refreshtoken");
        if(!user){
            throw new apierror(401,"Invalid access token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new apierror(401,error?.message || "Invalid access token")
    }
})