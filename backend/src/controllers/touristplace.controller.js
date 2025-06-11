//import { apiresponse } from "../utils/ApiResponse.js";
import { fetchphoto } from "../utils/fetchphoto.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { geminiresponse } from "../utils/geminiresponse.js";
import axios from "axios";
const touristCache = new Map();
const gettouristplaces = asyncHandler(async (req, res) => {
  const { placeid } = req.params;
  if (!placeid) {
    throw new ApiError(400, "Place ID is required");
  }
  if (touristCache.has(placeid)) {
    console.log("Cache hit for place ID:", placeid);
    return res.status(200).json(
      new ApiResponse(200, { touritems: touristCache.get(placeid) }, "Tourist places fetched from cache")
    );
  }
  const config = {
    method: "get",
    url: `https://api.geoapify.com/v2/places?categories=tourism&filter=place:${placeid}&limit=10&apiKey=${process.env.GEOAPIFY_API_KEY}`,
    headers: {},
  };
  try {
    const responsefromgeoapify = await axios(config);
    const tour = responsefromgeoapify.data.features;
    if (tour.length === 0) {
      throw new ApiError(404, "No hotels found for this place");
    }
    const touritems = await Promise.all(
      tour
      .filter((item) => item.properties.name)
      .filter((item) => item.properties.formatted)
      .map(async (item) => (
                {
                name: item.properties.name || null,
                address: item.properties.formatted || null,
                imageurl: await fetchphoto(`tourist place ${item.properties.name} in ${item.properties.city}`) || null,
                description : await geminiresponse({placename:item.properties.name, question: "Tell me about this tourist place?",words:20}) || null,
                }
            )
        )
    );
    console.log(touritems)
    touristCache.set(placeid, touritems);
    res.
    status(200).json(
    new ApiResponse(200, {touritems}, "Tourist places fetched successfully")
  );
  } catch (error) {
    throw new ApiError(400, "Error fetching tourist places from Geoapify");
  }
  
});


export { gettouristplaces };