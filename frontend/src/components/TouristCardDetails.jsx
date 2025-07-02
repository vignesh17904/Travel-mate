import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AxiosInstance from "@/utils/ApiConfig";
import { GeminiResponse } from "@/utils/GeminiResponse.js";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const TouristCardDetails = () => {
  const location = useLocation();
  const { lon, lat, CityName } = useParams();
  const [place, setPlace] = useState(location.state?.place || null);
  const [latt, setLat] = useState(Number(lat));
  const [lonn, setLon] = useState(Number(lon));
  const [locations, setLocations] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);

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
        placename: place.address,
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

  if (!place) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-[#f0fdf4] text-[#1e293b] font-sans overflow-hidden">
      <div className="md:w-1/2 h-[50vh] md:h-full overflow-y-auto px-6 py-6 space-y-6 relative z-10 bg-white">
        <img
          src={place.imageurl}
          alt={place.name}
          className="w-full h-64 object-cover rounded-2xl shadow-md"
        />
        <h2 className="text-3xl font-bold">{place.name}</h2>
        <p className="text-[#334155]">{place.description}</p>
        <p className="text-[#475569]">{place.address}</p>

        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={() => handleFetchPlaces("cafe")}
            className={`${
              buttonLoading === "cafe"
                ? "bg-[#bbf7d0] cursor-not-allowed"
                : "bg-[#34d399] hover:bg-[#10b981]"
            } text-[#1e293b] font-semibold px-4 py-2 rounded-lg shadow transition duration-200`}
            disabled={buttonLoading === "cafe"}
          >
            {buttonLoading === "cafe" ? "Loading Cafes..." : "☕ Show Nearest Cafes"}
          </button>
          <button
            onClick={() => handleFetchPlaces("public-transport")}
            className={`${
              buttonLoading === "public-transport"
                ? "bg-[#bbf7d0] cursor-not-allowed"
                : "bg-[#34d399] hover:bg-[#10b981]"
            } text-[#1e293b] font-semibold px-4 py-2 rounded-lg shadow transition duration-200`}
            disabled={buttonLoading === "public-transport"}
          >
            {buttonLoading === "public-transport"
              ? "Loading Transport..."
              : "🚍 Show Nearest Public Transport"}
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <label className="block font-semibold">Ask something about this place</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Is this spot family-friendly?"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]"
          />
          <button
            onClick={handleAskQuestion}
            className="bg-[#1e293b] text-white px-4 py-2 rounded-lg hover:bg-[#0f172a] transition duration-200"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
          {answer && !loading && (
            <div className="mt-4 p-4 bg-[#d1fae5] border border-[#10b981] rounded-lg text-[#1e293b] shadow-sm">
              <strong>Answer:</strong> <br />
              {answer}
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/2 h-[50vh] md:h-full relative">
        {mapLoading && (
          <div className="absolute inset-0 z-10 bg-[#e0f2fe] animate-pulse flex items-center justify-center text-[#94a3b8]">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
          <Marker position={[latt, lonn]}>
            <Popup>
              <div className="text-center text-sm">
                <strong className="text-base">{place.name}</strong>
                <br />
                📍 {place.address}
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
                      <div className="text-[#10b981] font-semibold">🚍 {loc.type}</div>
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

export default TouristCardDetails;
