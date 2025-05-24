// pages/Home.jsx
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import RecentlyViewed from '../components/RecentlyViewed';
import PopularSearches from '../components/PopularSearches';
import FeaturesSection from '../components/FeaturesSection';
// import BenefitsSection from '../components/BenefitsSection';
import Footer from '../components/Footer';
import TestimonialComponent from '../components/TestimonialComponent';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <HeroSection />
        <RecentlyViewed />
        <PopularSearches />
        <FeaturesSection />
        {/* { <BenefitsSection /> } */}
        {/* <TestimonialComponent/> */}
      </main>
    </div>
  );
};

export default Home;