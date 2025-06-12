import { Link, useParams } from 'react-router-dom';
import React from 'react'; 

const HotelCard = ({ hotel,cityname }) => {
  const { _id, name, imageUrl, description, address, pricePerNight,location } = hotel;
  return (
    <Link
      to={{
        pathname: `/${cityname}/Hotels/${location.lon}/${location.lat}`,
      }}
      state={{ hotel }}
      className="block bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden justify-between"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4 flex flex-col justify-between h-70">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 text-sm md:text-base mb-2">{description}</p>
        {pricePerNight && ( 
          <p className="text-green-700 text-lg font-semibold">
            ₹{pricePerNight} / night
          </p>
        )}
      </div>
    </Link>
  );
};

export default HotelCard;