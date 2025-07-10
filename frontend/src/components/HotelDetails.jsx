import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import AxiosInstance from "@/utils/ApiConfig";
import { GeminiResponse } from "@/utils/GeminiResponse.js";
import { getHotelFromLocalStorage } from "@/utils/placeStorage.js";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const HotelDetailPage = () => {
  const { lon, lat, _id, CityName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(location.state?.hotel || null);
  const [latt, setLat] = useState(Number(lat));
  const [lonn, setLon] = useState(Number(lon));
  const [locations, setLocations] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);

  const hotelIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -35],
  });

  // Try getting hotel from localStorage if state not passed
  useEffect(() => {
    if (!hotel) {
      const stored = getHotelFromLocalStorage(lat, lon, _id);
      if (stored) setHotel(stored);
    }
  }, [hotel, lat, lon, _id]);

  useEffect(() => {
    setLat(Number(lat));
    setLon(Number(lon));
  }, [lat, lon]);

  const handleFetchPlaces = async (type) => {
    if (!latt || !lonn) return;
    try {
      setButtonLoading(type);
      const res = await AxiosInstance.get(`/hotels/${type}/${lonn}/${latt}`);
      setLocations(res.data.data);
    } catch (err) {
      console.error("Error fetching places:", err);
    } finally {
      setButtonLoading(null);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    try {
      setLoading(true);
      const result = await GeminiResponse({
        placename: hotel.address,
        question,
        words: "120",
      });
      setAnswer(result);
    } catch (error) {
      console.error("Gemini API error:", error);
      setAnswer("Failed to get a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate(`/${CityName}/Hotels/book/${_id}`);
  };

  if (!hotel) return <div>Loading hotel details...</div>;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-[#fff7ed] text-[#1e293b] font-sans overflow-hidden">
      <div className="md:w-1/2 h-[50vh] md:h-full overflow-y-auto px-6 py-6 space-y-6 relative z-10 bg-white">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-64 object-cover rounded-2xl shadow-md"
        />
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">{hotel.name}</h2>
          <button
            className="bg-[#f97316] text-white px-4 py-2 rounded-lg shadow hover:bg-[#ea580c] transition duration-200"
            onClick={handleBookNow}
          >
            Book Your Room
          </button>
        </div>
        <p className="text-[#334155]">{hotel.description}</p>
        <p className="text-[#475569]">{hotel.address}</p>
        <p className="font-semibold text-xl">₹{hotel.pricePerNight} / night</p>

        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={() => handleFetchPlaces("cafe")}
            className={`${
              buttonLoading === "cafe"
                ? "bg-[#fdba74] cursor-not-allowed"
                : "bg-[#ffad72] hover:bg-[#ea580c]"
            } text-[#1e293b] font-semibold px-4 py-2 rounded-lg shadow transition duration-200`}
            disabled={buttonLoading === "cafe"}
          >
            {buttonLoading === "cafe" ? "Loading Cafes..." : "☕ Show Nearest Cafes"}
          </button>
          <button
            onClick={() => handleFetchPlaces("public-transport")}
            className={`${
              buttonLoading === "public-transport"
                ? "bg-[#fdba74] cursor-not-allowed"
                : "bg-[#ffad72] hover:bg-[#fb923c]"
            } text-[#1e293b] font-semibold px-4 py-2 rounded-lg shadow transition duration-200`}
            disabled={buttonLoading === "public-transport"}
          >
            {buttonLoading === "public-transport"
              ? "Loading Transport..."
              : "🚍 Show Nearest Public Transport"}
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <label className="block font-semibold">Ask something about this hotel</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Is there free Wi-Fi?"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]"
          />
          <button
            onClick={handleAskQuestion}
            className="bg-[#1e293b] text-white px-4 py-2 rounded-lg hover:bg-[#0f172a] transition duration-200"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
          {answer && !loading && (
            <div className="mt-4 p-4 bg-[#ffedd5] border border-[#f97316] rounded-lg text-[#1e293b] shadow-sm">
              <strong>Answer:</strong> <br />
              {answer}
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/2 h-[50vh] md:h-full relative">
        {mapLoading && (
          <div className="absolute inset-0 z-10 bg-[#f1f5f9] animate-pulse flex items-center justify-center text-[#94a3b8]">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-[#f97316] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              Loading Map...
            </div>
          </div>
        )}

        <MapContainer
          center={[latt, lonn]}
          zoom={14}
          className="w-full h-full z-0"
          whenReady={() => setMapLoading(false)}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latt, lonn]} icon={hotelIcon}>
            <Popup>
              <div className="text-center text-sm">
                <strong className="text-base">{hotel.name}</strong>
                <br />
                🏨 {hotel.address}
              </div>
            </Popup>
          </Marker>
          {locations
            .filter((loc) => loc.name && loc.address && loc.distance)
            .map((loc, index) => (
              <Marker key={index} position={[loc.lat, loc.lon]}>
                <Popup>
                  <div className="space-y-1 text-sm text-[#1e293b]">
                    <div className="font-bold text-base">{loc.name}</div>
                    <div className="text-[13px] text-[#475569]">📍 {loc.address}</div>
                    {loc.type && (
                      <div className="text-[#ea580c] font-semibold">🚍 {loc.type}</div>
                    )}
                    {loc.distance && (
                      <div className="text-[#334155]">📏 {loc.distance}m</div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default HotelDetailPage;
