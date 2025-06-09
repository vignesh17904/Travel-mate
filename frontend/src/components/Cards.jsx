import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination,Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';

const places = [
  {
    id: 1,
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1528569937393-e336d9a4166a?auto=format&fit=crop&w=800&q=60",
    description:
      "A tropical paradise with forested volcanic mountains, iconic rice terraces, beaches and vibrant coral reefs.",
  },
  {
    id: 2,
    name: "Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60",
    description:
      "The City of Light, famed for its café culture, fashion, exquisite cuisine and the iconic Eiffel Tower.",
  },
  {
    id: 3,
    name: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1508807954782-2e66eb760b49?auto=format&fit=crop&w=800&q=60",
    description:
      "A pulsating metropolis where ancient temples coexist with cutting‑edge technology and neon nightlife.",
  },
  {
    id: 4,
    name: "Santorini",
    image:
      "https://images.unsplash.com/photo-1489512485771-accbcc58026d?auto=format&fit=crop&w=800&q=60",
    description:
      "White‑washed cliff‑side villages, cobalt‑blue domes and world‑class sunsets over the Aegean Sea.",
  },
];


const TravelCard = ({ image, name, description }) => (
  <Link
  to={`/${encodeURIComponent(name.toLowerCase())}`}
  className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
>
  <img
    src={image}
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


export default function Cards() {
  return (
    <section className="max-w-full mx-auto px-4 py-10 bg-gradient-to-br from-blue-100 to-white rounded-lg shadow-lg">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true} // enable navigation arrows
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 3, // 2 cards on screens >= 640px
          },
        }}
        className="relative"
      >
        {places.map((place) => (
          <SwiperSlide key={place.id}>
            <TravelCard {...place} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}