import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext.js";
import { useNavigate, useParams } from "react-router";
import AxiosInstance from "../utils/ApiConfig.js"; 

const AddHotel = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { CityName } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: { lat: "", lon: "" },
    address: "",
    pricePerNight: 1500,
    place: "",
    userId: user?._id || "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchPlaceId = async () => {
      try {
        const response = await AxiosInstance.get(`/cities/get-placeid/${CityName}`);
        console.log("response placeid:",response)
        const placeId = response.data.data
        setFormData((prev) => ({
          ...prev,
          place: placeId || "",
        }));
      } catch (error) {
        console.error("Failed to fetch place ID:", error);
      }
    };

    fetchPlaceId();
  }, [CityName]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lat" || name === "lon") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: parseFloat(value), // Convert string to number
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("lat", formData.location.lat);
      data.append("lon", formData.location.lon);
      data.append("address", formData.address);
      data.append("pricePerNight", formData.pricePerNight);
      data.append("place", formData.place);
      data.append("userId", formData.userId);
      data.append("hotel-image", imageFile); // Must match multer field name

      // Optional: debug form data
      for (let pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      await AxiosInstance.post("/hotels/add-hotel", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        name: "",
        description: "",
        location: { lat: "", lon: "" },
        address: "",
        pricePerNight: 1500,
        place: "",
        userId: user?._id || "",
      });
      setImageFile(null);
      navigate(`/${CityName}/Hotels`);
    } catch (err) {
      console.error("Error adding hotel:", err);
      alert("Failed to add hotel. Check console for details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Hotel</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          name="name"
          placeholder="Hotel Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-2">
          <input
            name="lat"
            placeholder="Latitude"
            value={formData.location.lat}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            name="lon"
            placeholder="Longitude"
            value={formData.location.lon}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="pricePerNight"
          placeholder="Price per Night"
          value={formData.pricePerNight}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input type="hidden" name="place" value={formData.place} />
        <input type="hidden" name="userId" value={formData.userId} />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
