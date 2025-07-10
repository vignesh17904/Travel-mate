import TouristCard from "../../components/Touristcard.jsx";
import AxiosInstance from "../../utils/ApiConfig.js";
import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";

import ChatbotLauncherT from "../Chatbot/ChatbotlauncerT.jsx"; 
function TouristSpots() {
  const { placeid } = useOutletContext();
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { CityName } = useParams();

  useEffect(() => {
    if (placeid) {
      setLoading(true);
      setError(null);
      AxiosInstance.get(`/tourist/${placeid}`)
        .then((response) => {
          setTouristPlaces(response.data.data.touritems);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching tourist places:", err);
          setError(err.message || "Failed to fetch tourist places");
          setLoading(false);
        });
    } else {
      setTouristPlaces([]);
      setLoading(false);
    }
  }, [placeid]);

  console.log("tourist places for placeid:", placeid, "are:", touristPlaces);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 py-8 w-full">
        <h1 className="text-2xl font-bold mb-6">Tourist Spots</h1>
        {loading ? (
          <p>Loading tourist spots...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : touristPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {touristPlaces.map((place) => (
              <TouristCard key={place.name} place={place} cityname={CityName} />
            ))}
          </div>
        ) : (
          <p>No tourist places found for this location.</p>
        )}
      </div>
      <div className="bg-gray-100 py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Explore More</h2>
          <p className="text-gray-700">
            Dive into the culture, history, and natural beauty of the city.
          </p>
        </div>
      </div>
       <div>
        <ChatbotLauncherT />
      </div> 
    </>
  );
}

export default TouristSpots;
