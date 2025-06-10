import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

export const fetchphoto = async (query) => {
    const url = "https://www.googleapis.com/customsearch/v1";
  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        searchType: "image",
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.CUSTOM_SEARCH_ENGINE_ID,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].link; 
    } else {
      return "/locationplaceholder.jpg"; 
    }
  } catch (error) {
    console.error("Error fetching photo:", error);
    return "/locationplaceholder.jpg"; 
  }
}
