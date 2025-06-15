import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, 
});


const uploadoncloudinary = async (localfilepath) => {
    try {
        if(!localfilepath)return null;
        const result = await cloudinary.uploader.upload(localfilepath,{
            resource_type: "auto"
        });
        console.log("file is upoaded on cloudinary:",result.url);
        fs.unlinkSync(localfilepath);
        return result;
    } catch (error) {
        fs.unlinkSync(localfilepath);
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
}




export {uploadoncloudinary};