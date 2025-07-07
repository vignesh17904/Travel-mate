import HotelCard from "../../components/HotelCard.jsx";
import AxiosInstance from "../../utils/AxiosInstance.js";
import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import ChatbotLauncher from "../Chatbot/Chatbotlauncher.jsx";

function Hotels() {
  const { placeid } = useOutletContext();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {CityName} = useParams()
  useEffect(() => {
    if (placeid) {
      setLoading(true);
      setError(null);
      AxiosInstance.get(`/hotels/db/${placeid}`)
        .then((response) => {
          setHotels(response.data.data.hotels);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching hotels:", err);
          setError(err.message || "Failed to fetch hotels");
          setLoading(false);
        });
    } else {
      setHotels([]);
      setLoading(false);
    }
  }, [placeid]);
  console.log("hotels for placeid:",placeid,"are:",hotels)
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 py-8 w-full">
        <h1 className="text-2xl font-bold mb-6">Hotels</h1>
        {loading ? (
          <p>Loading hotels...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : hotels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hotels.map((hotelitem) => (
              <HotelCard key={hotelitem._id} hotel={hotelitem} cityname={CityName}/>
            ))}
          </div>
        ) : (
          <p>No hotels found for this location.</p>
        )}
      </div>
      <div className="bg-gray-100 py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Explore More</h2>
          <p className="text-gray-700">
            Discover more about the city and its attractions.
          </p>
        </div>
      </div>
      <div>
        <ChatbotLauncher hotels={hotels} />
      </div>
    </>
  );
}

export default Hotels;
