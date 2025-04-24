"use client";
import React, { useState } from "react";

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
import HostelListing from "./HostelListing";
import HostelDetail from "./HostelDetail";

const LandingPage = () => {

  const renderLandingPageComponents = () => {
    return (
      <>
        <CitySection />
        <ReasonSection />
        <OurPeopleSection />
        <FaqsSection />
        <MobileAppSection />
        <ContactFormSection />
      </>
    );
  };

  return (
    <div>
      <Header />
      <HeroSection />

      {renderLandingPageComponents()}
      <FooterLandingPage />
    </div>
  );
};

export default LandingPage;
