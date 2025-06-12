import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from './../utils/ApiError.js';
import { asyncHandler } from './../utils/asyncHandler.js';
import axios from 'axios';
import { fetchphoto } from '../utils/fetchphoto.js';
import { geminiresponse } from '../utils/geminiresponse.js';
import Hotel from '../models/hotels.model.js';
import { LRUCache } from 'lru-cache';

const hotelcache = new LRUCache({ max: 100 });
const hotelcachedb = new LRUCache({ max: 100 });
const cafecache = new LRUCache({ max: 100 });
const publiccache = new LRUCache({ max: 100 });

const gethotelsbyapi = asyncHandler(async (req, res) => {
  const { placeid } = req.params;
  if (!placeid) throw new ApiError(400, "Place ID is required");
  if (hotelcache.has(placeid)) {
    return res.status(200).json(
      new ApiResponse(200, { hotelitems: hotelcache.get(placeid) }, "Hotels fetched from cache")
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
    if (hotels.length === 0) throw new ApiError(404, "No hotels found for this place");
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
    res.status(200).json(new ApiResponse(200, { hotelitems }, "Hotels fetched successfully"));
  } catch (error) {
    throw new ApiError(400, "Error fetching Hotels from Geoapify");
  }
});

const addHotels = asyncHandler(async (req, res) => {
  const { image, name, description, place, location, address, pricePerNight } = req.body;
  if (!image || !name || !description || !place || !location || !address || !pricePerNight) {
    throw new ApiError(400, "all fields are required");
  }
  const existinghotel = await Hotel.findOne({ name });
  if (existinghotel) {
    throw new ApiError(500, "Hotel already exists");
  }
  const hotel = await Hotel.create({
    imageUrl: image,
    name,
    description,
    place,
    location: { lat: location.lat, lon: location.lon },
    address,
    pricePerNight,
  });
  return res.status(201).json(new ApiResponse(201, hotel, "Hotel created successfully"));
});

const gethotelsfromdb = asyncHandler(async (req, res) => {
  const { placeid } = req.params;
  if (!placeid) throw new ApiError(400, "Placeid is required");
  if (hotelcachedb.has(placeid)) {
    return res.status(200).json(
      new ApiResponse(200, { hotels: hotelcachedb.get(placeid) }, "Hotels fetched from cache")
    );
  }
  const hotels = await Hotel.find({ place: placeid });
  if (!hotels || hotels.length === 0) {
    throw new ApiError(404, "No hotels found for this place");
  }
  hotelcachedb.set(placeid, hotels);
  return res.status(200).json(new ApiResponse(200, { hotels }, "Hotels fetched successfully"));
});

const getnearestcafes = asyncHandler(async (req, res) => {
  const { lat, lon } = req.params;
  if (!lat || !lon) throw new ApiError(400, "Latitude and Longitude are required");
  const radius = 5000;
  const apiKey = process.env.GEOAPIFY_API_KEY;
  const cacheKey = `${lat}:${lon}`;
  if (cafecache.has(cacheKey)) {
    return res.status(200).json(
      new ApiResponse(200, cafecache.get(cacheKey), "Nearest cafes fetched successfully from cache")
    );
  }
  const url = `https://api.geoapify.com/v2/places?categories=catering.cafe&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=20&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    const cafes = response.data.features;
    const validCafes = cafes
      .filter((cafe) => cafe.properties.name && cafe.properties.formatted && cafe.properties.distance && cafe.geometry?.coordinates?.length === 2)
      .map((cafe) => ({
        name: cafe.properties.name,
        address: cafe.properties.formatted,
        distance: cafe.properties.distance,
        lat: cafe.geometry.coordinates[1],
        lon: cafe.geometry.coordinates[0],
      }));
    cafecache.set(cacheKey, validCafes);
    return res.status(200).json(new ApiResponse(200, validCafes, "Nearest cafes fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch nearest cafes");
  }
});

const getnearestpublictransport = asyncHandler(async (req, res) => {
  const { lat, lon } = req.params;
  if (!lat || !lon) throw new ApiError(400, "Latitude and Longitude are required");
  const radius = 5000;
  const apiKey = process.env.GEOAPIFY_API_KEY;
  const cacheKey = `${lat}:${lon}`;
  if (publiccache.has(cacheKey)) {
    return res.status(200).json(
      new ApiResponse(200, publiccache.get(cacheKey), "Nearest public transport stops fetched successfully from cache")
    );
  }
  const url = `https://api.geoapify.com/v2/places?categories=public_transport.train,public_transport.bus,public_transport.subway&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=20&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    const stops = response.data.features;
    const validstops = stops
      .filter((stop) => stop.properties.name && stop.properties.formatted && stop.properties.categories && stop.properties.distance && stop.geometry?.coordinates?.length === 2)
      .map((stop) => ({
        name: stop.properties.name,
        address: stop.properties.formatted,
        distance: stop.properties.distance,
        type: stop.properties.categories[1].split('.')[1],
        categories: stop.properties.categories,
        lat: stop.geometry.coordinates[1],
        lon: stop.geometry.coordinates[0],
      }));
    publiccache.set(cacheKey, validstops);
    return res.status(200).json(new ApiResponse(200, validstops, "Nearest stops fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Failed to fetch nearest stops");
  }
});

export { gethotelsbyapi, addHotels, gethotelsfromdb, getnearestcafes, getnearestpublictransport };
