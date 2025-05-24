import React from 'react';
// Make sure to include Font Awesome in your index.html or use the npm package

const FeaturesSection = () => {
  return (
    <section className="flex flex-wrap justify-center gap-5 p-16 px-[5%] bg-gray-100">
      <div className="w-[300px] text-center p-8 bg-white rounded-lg shadow-md transition-transform hover:-translate-y-1">
        <i className="fas fa-map-marked-alt text-4xl text-indigo-500 mb-4"></i>
        <h3 className="mb-2 text-lg font-semibold">Location-Based Search</h3>
        <p>Find schools near you with our advanced location-based search system</p>
      </div>
      <div className="w-[300px] text-center p-8 bg-white rounded-lg shadow-md transition-transform hover:-translate-y-1">
        <i className="fas fa-star text-4xl text-indigo-500 mb-4"></i>
        <h3 className="mb-2 text-lg font-semibold">Verified Reviews</h3>
        <p>Read authentic reviews from parents and make informed decisions</p>
      </div>
      <div className="w-[300px] text-center p-8 bg-white rounded-lg shadow-md transition-transform hover:-translate-y-1">
        <i className="fas fa-info-circle text-4xl text-indigo-500 mb-4"></i>
        <h3 className="mb-2 text-lg font-semibold">Comprehensive Information</h3>
        <p>Get detailed information about facilities, fees, and academic programs</p>
      </div>
      <div className="w-[300px] text-center p-8 bg-white rounded-lg shadow-md transition-transform hover:-translate-y-1">
        <i className="fas fa-exchange-alt text-4xl text-indigo-500 mb-4"></i>
        <h3 className="mb-2 text-lg font-semibold">Easy Comparison</h3>
        <p>Compare schools easily based on features, fees, and ratings to find the best fit</p>
      </div>
    </section>
  );
};

export default FeaturesSection;
