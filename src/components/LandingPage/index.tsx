import React from "react";

// components
import Header from "./Header";
import HeroSection from "./HeroSection";
import CitySection from "./CitySection";
import ReasonSection from "./ReasonSection";
import OurPeopleSection from "./OurPeopleSection";
import FaqsSection from "./FaqsSection";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <CitySection />
      <ReasonSection />
      <OurPeopleSection />
      <FaqsSection />
    </div>
  );
};

export default LandingPage;
