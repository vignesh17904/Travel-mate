import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const { id, name, image, description } = hotel;

  return (
    <Link
      to={{
        pathname: `/hotel/${id}`,  // or you can use name if needed
      }}
      state={{ hotelId: id }}
      className="block bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      </div>
    </Link>
  );
};

export default HotelCard;
