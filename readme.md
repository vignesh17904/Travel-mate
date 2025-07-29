# TravelMate

TravelMate is a full-stack web application that helps users discover, explore, and book hotels and tourist spots across India. It leverages real-time data, interactive maps, AI-powered recommendations, and secure booking features to enhance the travel experience.

---

## Key Features

- **City-wise Tourist Spots & Hotels:** Browse cities and explore top tourist attractions and hotels, powered by Geoapify API.
- **AI Chatbot Assistance:** Get instant answers and travel tips using the Gemini AI chatbot.
- **Booking System:** Secure hotel booking with Stripe payment integration.
- **Interactive Maps:** Geoapify + Leaflet-based maps to show tourist spots, hotels, cafes, and transport facilities in real time.
- **Dual Authentication:** Choose between Google OAuth or manual login using secure JWT (access + refresh tokens).
- **Role-Based Access:** Separate features for travelers and hotel owners, including hotel management and booking history.
- **Image Uploads:** Add hotel images using drag-and-drop and file upload (Multer + Cloudinary).
- **Notifications:** Receive alerts for booking status, payment, and other important events.
- **Caching:** LRU cache for faster API responses and reduced external API calls.
- **Image Enhancements:** Integrated Pixabay API for fetching images of tourist places and hotels.

---

## Tech Stack

- **Frontend:** ReactJS
- **Backend:** NodeJS, ExpressJS
- **Database:** MongoDB
- **Authentication:** JWT, Google OAuth
- **Payments:** Stripe
- **Image Storage:** Cloudinary
- **AI:** Gemini API
- **Maps & Places:** Geoapify, Leaflet
- **Image API:** Pixabay

---

## Free APIs Used

- **Geoapify Places API:** For fetching tourist places, hotels, cafes, and public transport locations.
- **Pixabay API:** For fetching images of tourist places and hotels.
- **Leaflet:** For interactive map rendering.
- **Gemini (Google GenAI):** For AI-powered chat and recommendations.

---

## Use Cases

- Individuals planning trips and looking for hotels and tourist attractions.
- Travelers seeking real-time information about nearby cafes and transport.
- Hotel owners managing listings, bookings, and payments.
- Users wanting AI-powered travel tips and recommendations.
- Anyone interested in exploring cities and tourist spots with interactive maps.

---

## Contributors

**Revanth P**  
Hi, I'm Revanth P, a passionate student from NIT Warangal.  
I built APIs to fetch cafes and transport facilities near tourist places using Leaflet and Geoapify, and displayed them on a real-time map. I contributed to the full-stack development of hotel-related pages with AI-based assistance for enhanced user interaction. I also implemented role-based access, a booking system, and co-developed Stripe payment integration with complete frontend-backend connectivity.

**Vignesh**  
Hey, I'm Vignesh, a tech enthusiast from NIT Warangal.  
I built dual authentication using Google OAuth and JWT, developed an AI chatbot, and implemented LRU caching to improve performance. I worked on displaying tourist places with interactive maps using Geoapify, added Pixabay API integration for image enhancements, built the booking system, and co-developed Stripe payment and full-stack connectivity.

---

## Demo Video

Watch a demo of TravelMate in action:

[TravelMate Demo Video](https://drive.google.com/file/d/1iNEp1Soszs5PUPBVBeTQaKlWwwE3m15_/view?usp=drive_link)

