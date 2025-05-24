import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";

import 'swiper/css';
import 'swiper/css/navigation';

const cities = [
  { name: 'Karachi', image: img1, schools: 425, rating: 4.2 },
  { name: 'Lahore', image: img2, schools: 385, rating: 4.4 },
  { name: 'Islamabad', image: img3, schools: 245, rating: 4.6 },
  { name: 'Rawalpindi', image: img4, schools: 198, rating: 4.3 },
  { name: 'Faisalabad', image: img5, schools: 168, rating: 4.1 },
  { name: 'Multan', image: img6, schools: 142, rating: 4.0 },
];

const PopularSearches = () => {
  return (
    <section className="py-12 md:py-17 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">
          Popular School Searches
        </h2>

        {/* Swiper Section */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={15}
            slidesPerView={1.2}
            breakpoints={{
              400: { slidesPerView: 3, spaceBetween: 15 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 25 },
              1280: { slidesPerView: 3, spaceBetween: 30 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {cities.map((city, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col">
                  {/* Image at top */}
                  <div className="relative h-40 sm:h-48 md:h-56">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content below image in vertical layout */}
                  <div className="p-4 flex flex-col items-start space-y-2">
                    <h3 className="text-base font-semibold text-gray-800">
                      papolar Schools in {city.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">🏫</span>
                      <span>{city.schools} Schools</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">⭐</span>
                      <span>{city.rating} Rating</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;
