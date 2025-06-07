import React from "react";

export default function PlaceCard({ image, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-2xl mx-auto mb-6 p-4 border border-gray-200">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm mt-2 line-clamp-3">{description}</p>
      <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">
        View More
      </button>
    </div>
  );
}
