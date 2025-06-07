// import { createClient } from 'pexels';

import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

// // const client = createClient(process.env.PEXELS_API_KEY);
// const client = createClient('tks8JWokGXBsfz7TwMTnpUakILgz9B0yqVOTtydlgEw2FY2F3dSILFRd');

// export const fetchphoto = async (query) => {
//     try {
//         const photos = await client.photos.search({ query, per_page: 1 });
//         if (photos && photos.photos && photos.photos.length > 0) {
//             console.log(photos)
//             return photos.photos[0].src.original;
//         } else {
//             return "/locationplaceholder.jpg";
//         }
//     } catch (error) {
//         console.error("Error fetching photo:", error);
//         return "/locationplaceholder.jpg";
//     }
// };

// // Example usage
// console.log(await fetchphoto("Chowmahallah Palace"))
    
// // console.log(fetchphoto("Eiffel Tower")); // Test the function with a sample query
// // This will log the URL of the photo or the placeholder if an error occurs

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
// const url = "https://www.googleapis.com/customsearch/v1?q=mecca+masjid&searchType=image&key=AIzaSyChyQwHkiWUbLS5QWn6IogKJo8MvF_4EBQ&cx=d59f78445b8424c84"

// console.log(await fetchphoto("Chowmahallah Palace")); // Test the function with a sample query