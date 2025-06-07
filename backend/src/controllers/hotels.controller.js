import { apiresponse } from '../utils/apiresponse.js';
import { apierror } from './../utils/apierror.js';
import { asynchandler } from './../utils/asynchandler.js';
import  axios  from 'axios';
import { fetchphoto } from '../utils/fetchphoto.js';
import { geminiresponse } from '../utils/geminiresponse.js';

const hotelcache = new Map()
const gethotelsbyapi = asynchandler(async (req, res) => {
  const { placeid } = req.params;
  if (!placeid) {
    throw new apierror(400, "Place ID is required");
  }
  if (hotelcache.has(placeid)) {
    console.log("Cache hit for place ID:", placeid);
    return res.status(200).json(
      new apiresponse(200, { hotelitems: hotelcache.get(placeid) }, "Hotels fetched from cache")
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
    console.log("hotels", hotels);
    if (hotels.length === 0) {
      throw new apierror(404, "No hotels found for this place");
    }
    const hotelitems = await Promise.all(
      hotels
      .filter((item) => item.properties.name)
      .filter((item) => item.properties.formatted)
      .filter((item) => item.properties.street)
      .map(async (item) => (
                {
                name: item.properties.name || null,
                address: item.properties.formatted || null,
                street: item.properties.street || null,
                imageurl: await fetchphoto(`Accomodation in ${item.properties.name} in ${item.properties.city} in street ${item.properties.street}`) || null,
                description : await geminiresponse({placename:item.properties.name, question: `Tell me about this hotel in this city ${item.properties.city}`,words:20}) || null,
                }
            )
        )
    );
    console.log(hotelitems)
    hotelcache.set(placeid, hotelitems);
    res.
    status(200).json(
    new apiresponse(200, {hotelitems}, "Hotels fetched successfully")
  );
  } catch (error) {
    throw new apierror(400, "Error fetching Hotels from Geoapify");
  }
  
});

export { gethotelsbyapi };