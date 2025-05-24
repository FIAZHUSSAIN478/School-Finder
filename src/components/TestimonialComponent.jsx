import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const defaultTestimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director, TechCorp',
    content: 'This product completely transformed our workflow. The team is more productive and collaboration has never been easier.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CEO, Startup Inc.',
    content: 'Incredible service and support. They went above and beyond to ensure our success with their platform.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Product Manager, DesignCo',
    content: 'The perfect solution we were looking for. It has all the features we need with an intuitive interface.',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'CTO, Enterprise Solutions',
    content: 'Reliable, scalable, and easy to implement. Our engineering team loves working with this technology.',
    avatar: 'https://randomuser.me/api/portraits/men/71.jpg'
  }
];

const TestimonialComponent = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [inputValue, setInputValue] = useState('');
  const swiperRef = useRef(null);

  const handleAddTestimonial = () => {
    if (inputValue.trim()) {
      const newTestimonial = {
        id: testimonials.length + 1,
        name: 'Anonymous User',
        role: 'Customer',
        content: inputValue.trim(),
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
      };
      const updatedTestimonials = [...testimonials, newTestimonial];
      setTestimonials(updatedTestimonials);
      setInputValue('');
      setTimeout(() => {
        swiperRef.current?.slideToLoop(updatedTestimonials.length - 1);
      }, 100);
    }
  };
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Trusted by businesses worldwide
          </p>
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2 mb-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Write your testimonial..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 rounded p-2 flex-1"
          />
          <button
            onClick={handleAddTestimonial}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="pb-12 h-[300px]"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col">
                <div className="flex-grow">
                  <p className="text-lg text-gray-600 italic mb-6">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialComponent;
