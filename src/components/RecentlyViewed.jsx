import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FaMapMarkerAlt, FaGraduationCap, FaHeart } from 'react-icons/fa';
import { Context } from '../../Context/ContextProvider';
import img7 from "../assets/images/img7.jpg";
import img8 from "../assets/images/img8.jpg";
import img9 from "../assets/images/img9.jpg";
import img10 from "../assets/images/img10.jpg";
import img12 from "../assets/images/img12.jpg";

import 'swiper/css';
import 'swiper/css/autoplay';

const RecentlyViewed = () => {
  const { recentlyViewed,addFavorite } = useContext(Context);

  // Default images mapping
  const defaultImages = [img7, img8, img9, img10, img12];

  const swiperProps = {
    spaceBetween: 15,
    slidesPerView: 1.1,
    breakpoints: {
      400: { slidesPerView: 1.3 },
      640: { slidesPerView: 2 },
      768: { slidesPerView: 2.5 },
      1024: { slidesPerView: 3 }
    },
    autoplay: { delay: 2500, disableOnInteraction: false },
    loop: true,
    modules: [Autoplay]
  };

  return (
    <>
      {recentlyViewed.length > 0 && (
        <section className="pt-12 md:pt-24 pb-12 bg-gray-50" id="recentlyViewed">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">
              Recently Viewed Schools
            </h2>

            <Swiper {...swiperProps} className="swiper-container">
              {recentlyViewed.map((school, index) => (
                <SwiperSlide key={school.id || index}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full mx-1">
                    <div className="relative aspect-video">
                      <img
                        src={defaultImages[index % defaultImages.length]}
                        alt={school.name}
                        className="w-full h-full object-cover"
                      />
                      <button   onClick={() => addFavorite(school)}  className="absolute top-3 right-3 bg-white p-2 rounded-lg shadow-sm hover:scale-110 transition-transform">
                        <FaHeart className="text-blue-600" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                        {school.name}
                      </h3>
                      <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-500" />
                          <span>{school.distance || 'Distance not available'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaGraduationCap className="text-blue-500" />
                          <span>{school.address || 'Level not specified'}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        {/* <div className="flex items-baseline gap-2">
                          <span className="text-lg md:text-xl font-bold text-gray-800">
                            {school.rating || 'N/A'}
                          </span>
                          <span className="text-xs md:text-sm font-medium text-green-600">
                            {school.rating ? 'Rated' : 'Not rated'}
                          </span>
                        </div> */}
                        {/* <span className="text-xs md:text-sm text-gray-500">
                          {school.reviews || '(0)'}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
};

export default RecentlyViewed;