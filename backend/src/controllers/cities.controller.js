import { City } from '../models/cities.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'

const createcity = asyncHandler(async(req,res)=>{
    const { imageurl,name,description,placeid } = req.body;

  if (
    !imageurl ||!name ||!description ||!placeid
  ) {
    throw new ApiError(400,"all fields are required")
  }
  const existingcity = await City.findOne({placeid})
  if(existingcity){
    throw new ApiError(500,"City already exists")
  }
  const city = await City.create(
    {
    imageurl,
    name,
    description,
    placeid
    }
  );

  return res.status(201).json(
    new ApiResponse(201,city,"City created successfully")
  );
})


const getcities = asyncHandler(async (req, res) => {
    const cities = await City.find({}, 'imageurl name description placeid'); 
    return res.status(200).json(
        new ApiResponse(200, cities, "Cities fetched successfully")
    );
});

const getPlaceIdByCityName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  if (!name) {
    throw new ApiError(400, "City name is required");
  }
  const city = await City.findOne({ name: new RegExp(`^${name}$`, 'i') }, 'placeid');
  if (!city) {
    throw new ApiError(404, "City not found");
  }
  return res.status(200).json(
    new ApiResponse(200, city.placeid, "Place ID fetched successfully")
  );
});

export { createcity, getcities ,getPlaceIdByCityName}