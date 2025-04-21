import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-[url('/hero-img.jpeg')] bg-cover bg-black/50 bg-blend-overlay flex  flex-col justify-between    bg-center h-[700px] w-full">
      <div>
        <ul className="flex gap-28 pt-4 justify-center text-white text-xl">
          <li>Find Deals</li>
          <li>Place Tenants Love</li>
          <li>Hostel / PG</li>
          <li>StayEasy For Business</li>
          <li>StayEasy For iPhone, iPad Android</li>
        </ul>
      </div>
      <div>
        <h1 className="text-8xl text-center font-bold text-white">
          Find your stay, Hassle free!
        </h1>
        <p className="text-white text-center text-4xl mt-5">
          A seamless platform for tenants & landlords to connect effortlessly
        </p>
      </div>
      <div>search</div>
    </div>
  );
};

export default HeroSection;
