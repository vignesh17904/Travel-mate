import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export const fetchphoto = async (query) => {
    const url = "https://pixabay.com/api/";
  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        key: process.env.PIXABAY_API_KEY,
        per_page:3,
      },
    });

    const hits = response.data.hits;
    if (hits && hits.length > 0) {
      return hits[0].webformatURL; 
    }  else {
      return "/locationplaceholder.jpg"; 
    }
  } catch (error) {
    console.error("Error fetching photo:", error);
    return "/locationplaceholder.jpg"; 
  }
}
