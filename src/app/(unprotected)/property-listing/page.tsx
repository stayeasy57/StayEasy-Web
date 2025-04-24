import FooterLandingPage from "@/components/LandingPage/FooterLandingPage";
import Header from "@/components/LandingPage/Header";
import HeroSection from "@/components/LandingPage/HeroSection";
import HostelListing from "@/components/LandingPage/HostelListing";
import React from "react";

const PropertyListingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <HostelListing />
      <FooterLandingPage />
    </div>
  );
};

export default PropertyListingPage;
