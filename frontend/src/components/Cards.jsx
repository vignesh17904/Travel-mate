import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import AxiosInstance from "@/utils/ApiConfig.js";


const TravelCard = ({ imageurl, name, description, placeid, user, navigate }) => {
  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/SignIn");
    }
  };

  return (
    <Link
      to={`/${encodeURIComponent(name.toLowerCase())}`}
      onClick={handleClick}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={imageurl}
        alt={name}
        className="w-full h-48 object-cover object-center md:h-56 lg:h-64"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{name}</h2>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
    </Link>
  );
};

// 👇 Main Cards Component
export default function Cards() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await AxiosInstance.get('/cities/get-all-cities');
        setCities(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setLoading(false);
      }
    };

    if (cities.length === 0) {
      fetchCities();
    }
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading cities...</div>;
  }

  return (
    <section className="max-w-full mx-auto px-4 py-10 bg-gradient-to-br from-blue-100 to-white rounded-lg shadow-lg">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
        }}
        className="relative"
      >
        {cities.map((place) => (
          <SwiperSlide key={place.placeid}>
            <TravelCard {...place} user={user} navigate={navigate} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
