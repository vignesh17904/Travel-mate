import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination,Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';

const places = [
  {
    placeid: "51e54526e0d710564059563f8056aa093b40f00103f90110d950cb00000000c002079203093733343130312b696e" ,
    name: "Darjeeling",
    image:
      "https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Darjeeling is renowned for its stunning landscapes, world-class tea, and rich cultural heritage, earning it the title of 'Queen of the Hills'",
  },
  {
    placeid: "5127f33405579e5340591f4c8a8f4f5c3140f00101f9017710780000000000c00208",
    name: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1570795876989-bcec725b8e72?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Hyderabad is renowned for its rich history, iconic landmarks like Charminar and Golconda Fort, and its diverse culinary scene, particularly its Hyderabadi biryani.",
  },
  {
    placeid: "51d87d6c3766ba514059b685e7a562e93a40f00103f901c6dbb31500000000c002079203093334353030312b696e",
    name: "Jaisalmer",
    image:
      "https://plus.unsplash.com/premium_photo-1661963200491-c9e52f12de89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Jaisalmer is a former medieval trading center and a princely state in the western Indian state of Rajasthan, in the heart of the Thar Desert. Known as the 'Golden City'",
  },
  {
    placeid: "515a1eb5d3a0805340598972b389dd2c3b40f00103f90167d2cf2100000000c00208" ,
    name: "Agra",
    image:
      "https://plus.unsplash.com/premium_photo-1661902184762-49c2c8ebb787?q=80&w=2016&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Agra is renowned for its rich history and cultural heritage,famously known for the Taj Mahal,  its Mughlai cuisine, and the sweet Petha, a traditional Indian dessert made from ash gourd",
  },
];


const TravelCard = ({ placeid,name,image,description }) => (
  <Link
  to={`/${encodeURIComponent(name.toLowerCase())}`}
  state={{ placeid }}
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