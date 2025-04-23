import React from "react";

// components
import Header from "./Header";
import HeroSection from "./HeroSection";
import CitySection from "./CitySection";
import ReasonSection from "./ReasonSection";
import OurPeopleSection from "./OurPeopleSection";
import FaqsSection from "./FaqsSection";
import MobileAppSection from "./MobileAppSection";
import ContactFormSection from "./ContactFormSection";
import FooterLandingPage from "./FooterLandingPage";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <CitySection />
      <ReasonSection />
      <OurPeopleSection />
      <FaqsSection />
      <MobileAppSection />
      <ContactFormSection />
      <FooterLandingPage />
    </div>
  );
};

export default LandingPage;
