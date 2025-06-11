import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from './../utils/ApiError.js';
import { asyncHandler } from './../utils/asyncHandler.js';
import  axios  from 'axios';
import { fetchphoto } from '../utils/fetchphoto.js';
import { geminiresponse } from '../utils/geminiresponse.js';
import Hotel from '../models/hotels.model.js';

const hotelcache = new Map()
const gethotelsbyapi = asyncHandler(async (req, res) => {
  const { placeid } = req.params;
  if (!placeid) {
    throw new ApiError(400, "Place ID is required");
  }
  if (hotelcache.has(placeid)) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { hotelitems: hotelcache.get(placeid) },
          "Hotels fetched from cache"
        )
      );
  }
  const config = {
    method: "get",
    url: `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=place:${placeid}&limit=10&apiKey=${process.env.GEOAPIFY_API_KEY}`,
    headers: {},
  };
  try {
    const responsefromgeoapify = await axios(config);
    const hotels = responsefromgeoapify.data.features;
    
    if (hotels.length === 0) {
      throw new ApiError(404, "No hotels found for this place");
    }
    const hotelitems = await Promise.all(
      hotels
        .filter((item) => item.properties.name)
        .filter((item) => item.properties.formatted)
        .filter((item) => item.properties.street)
        .map(async (item) => ({
          name: item.properties.name || null,
          address: item.properties.formatted || null,
          street: item.properties.street || null,
          lat: item.properties.lat || null,
          lon: item.properties.lon || null,
          imageurl:
            (await fetchphoto(
              `Accomodation in ${item.properties.name} in ${item.properties.city} in street ${item.properties.street}`
            )) || null,
          description:
            (await geminiresponse({
              placename: item.properties.name,
              question: `Tell me about this hotel in this city ${item.properties.city}`,
              words: 20,
            })) || null,
        }))
    );
    
    hotelcache.set(placeid, hotelitems);
    res
      .status(200)
      .json(
        new ApiResponse(200, { hotelitems }, "Hotels fetched successfully")
      );
  } catch (error) {
    throw new ApiError(400, "Error fetching Hotels from Geoapify");
  }
});

const addHotels = asyncHandler(async (req, res) => {
  const { image, name, description, place, location, address, pricePerNight } = req.body;
  if (
    !image ||!name ||!description ||!place ||!location ||!address ||!pricePerNight
  ) {
    throw new ApiError(400,"all fields are required")
  }
  const existinghotel = await Hotel.findOne({name})
  if(existinghotel){
    throw new ApiError(500,"Hotel already exists")
  }
  const hotel = await Hotel.create(
    {
    imageUrl:image,
    name,
    description,
    place,
    location: { lat: location.lat, lon: location.lon },
    address,
    pricePerNight,
    }
  );

  return res.status(201).json(
    new ApiResponse(201,hotel,"Hotel created successfully")
  );
});


const gethotelsfromdb = asyncHandler(async (req, res) => {
  const { placeid } = req.params;
  if (!placeid) {
    throw new ApiError(400, "Placeid is required");
  }
  const hotels = await Hotel.find({ place:placeid });
  if (!hotels || hotels.length === 0) {
    throw new ApiError(404, "No hotels found for this place");
  }
  return res.status(200).json(
    new ApiResponse(200, { hotels }, "Hotels fetched successfully")
  );
}
);


export { gethotelsbyapi , addHotels ,gethotelsfromdb};
