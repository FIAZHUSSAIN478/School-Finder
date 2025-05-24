// AboutPage.js
import React from 'react';
import fiaz from "../assets/images/fiaz.png"
import ali from "../assets/images/ali.png"
import HR from "../assets/images/HR.png"
import img14 from "../assets/images/img14.jpg"
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Importing social icons

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">About School Finder</h1>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
            Revolutionizing the Way You Discover Educational Institutions
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                At School Finder, we aim to simplify the school search process for parents, students, and educators. Our platform uses advanced technology to provide accurate, up-to-date information about educational institutions across Pakistan.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={img14}
                alt="Mission Visual"
                className="rounded-lg w-full h-64 object-cover transition-transform transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Comprehensive Database",
                desc: "Access detailed profiles of thousands of schools with verified information",
                icon: "📚"
              },
              {
                title: "Advanced Filters",
                desc: "Filter schools by location, curriculum, facilities, and more",
                icon: "🔍"
              },
              {
                title: "User Reviews",
                desc: "Read genuine reviews from parents and students",
                icon: "⭐"
              }
            ].map((feature, index) => (
              <div key={index} className="p-8 bg-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5000+", label: "Schools Listed" },
              { number: "1M+", label: "Monthly Visitors" },
              { number: "50+", label: "Cities Covered" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to excellence in education technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Fiaz Hussain",
                role: "Tech Lead",
                img: fiaz,
                linkedin: "https://www.linkedin.com/in/fiaz-hussain-671679340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                bio: "Leads our technical vision with 10+ years of experience in full-stack development"
              },
              {
                name: "Sarah Khan",
                role: "Product Manager",
                img: HR,
                linkedin: "https://www.linkedin.com/in/fiaz-hussain-671679340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                bio: "Drives product strategy with focus on user-centered design"
              },
              {
                name: "Ali Hussnain",
                role: "Frontend Specialist",
                img: ali,
                linkedin: "https://www.linkedin.com/in/fiaz-hussain-671679340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                bio: "Creates beautiful, responsive interfaces with modern web technologies"
              }
            ].map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {/* Full-size image container */}
                <div className="h-[420px] ">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Overlay content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-300 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-200 mb-4">{member.bio}</p>

                    <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 text-blue-700 p-2 rounded-full hover:bg-white transition-all"
                        aria-label={`Connect with ${member.name} on LinkedIn`}
                      >
                        <FaLinkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
