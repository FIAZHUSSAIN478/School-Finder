// components/SchoolCard.jsx
import { Link } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import RatingBadge from './RatingBadge';

const SchoolCard = ({ school }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48">
        <img 
          src={school.image} 
          alt={school.name}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
          <FaHeart className="text-red-500" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{school.name}</h3>
          <RatingBadge rating={school.rating} />
        </div>

        <div className="flex flex-col gap-2 text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{school.distance} km away</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGraduationCap />
            <span>{school.grade}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {school.features.map((feature, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {feature}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">₹{school.fee}</span>
            <span className="text-gray-600">/month</span>
          </div>
          <Link 
            to={`/schools/${school.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;