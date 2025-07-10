import { Link } from "react-router-dom";
import React from "react";
import { savePlaceToLocalStorage } from "@/utils/placeStorage";

const TouristCard = ({ place, cityname }) => {
  const { name, imageurl, description, address, location } = place;

  const handleClick = () => {
    savePlaceToLocalStorage(place); // Save with cleanup
  };

  return (
    <Link
      to={{
        pathname: `/${cityname}/${location.lon}/${location.lat}`,
      }}
      state={{ place }}
      className="block bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden justify-between"
      onClick={handleClick}
    >
      <img
        src={imageurl}
        alt={name}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4 flex flex-col justify-between h-70">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-blue-700 text-sm">{address}</p>
      </div>
    </Link>
  );
};

export default TouristCard;
