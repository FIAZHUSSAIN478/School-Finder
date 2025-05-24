import React from 'react';
// Make sure to include Font Awesome in your index.html or use the npm package

const BenefitsSection = () => {
  return (
    <section className="py-16 px-[5%] bg-[#f8f9fa]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1200px] mx-auto">
        {/* Card 1 */}
        <div className="text-center p-8 group">
          <div className="mb-6 flex justify-center items-center">
            <i className="fas fa-graduation-cap text-4xl text-indigo-500"></i>
          </div>
          <h3 className="text-[1.4rem] text-[#333] font-semibold mb-4">Quality Education</h3>
          <p className="text-[#666] leading-relaxed text-[1.1rem]">
            Find schools that meet the highest educational standards and provide excellent learning opportunities.
          </p>
        </div>

        {/* Card 2 */}
        <div className="text-center p-8 group">
          <div className="mb-6 flex justify-center items-center">
            <i className="fas fa-info-circle text-4xl text-indigo-500"></i>
          </div>
          <h3 className="text-[1.4rem] text-[#333] font-semibold mb-4">Detailed Information</h3>
          <p className="text-[#666] leading-relaxed text-[1.1rem]">
            Access comprehensive details about facilities, faculty, and academic programs to make informed decisions.
          </p>
        </div>

        {/* Card 3 */}
        <div className="text-center p-8 group">
          <div className="mb-6 flex justify-center items-center">
            <i className="fas fa-exchange-alt text-4xl text-indigo-500"></i>
          </div>
          <h3 className="text-[1.4rem] text-[#333] font-semibold mb-4">Easy Comparison</h3>
          <p className="text-[#666] leading-relaxed text-[1.1rem]">
            Compare different schools side by side to find the perfect match for your child's needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
