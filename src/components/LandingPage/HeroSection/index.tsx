import { Button } from "primereact/button";
import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-[url('/hero-img.jpeg')] bg-cover bg-black/50 bg-blend-overlay flex   flex-col justify-between    bg-center  w-full">
      <div className="max-w-[1600px] flex flex-col justify-between  h-[700px] mx-auto pb-16">
        <div>
          <ul className="flex flex-wrap gap-28 pt-4 justify-center text-white text-xl">
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
        <div>
          <div className=" border-amber-500 border-8 max-w-[1024px] mx-auto rounded-md flex">
            <input
              className="bg-white text-primary w-full py-4 outline-none  px-4 text-sm font-medium"
              placeholder="Search for Hostels, PGs, Hotels"
              type="text"
            />
            <Button label="Search" className="bg-primary rounded-none px-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
