// components/RatingBadge.jsx
const RatingBadge = ({ rating }) => (
    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
      <span className="font-bold">{rating}</span>
      <span className="text-sm">★</span>
    </div>
  );
  
  export default RatingBadge;