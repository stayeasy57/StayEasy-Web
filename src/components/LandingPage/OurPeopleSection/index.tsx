"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define types for our team members
interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  location: string;
  bio: string;
}

const OurPeopleSection = () => {
  // Dummy data for the carousel
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Muhammad Asim Maqsood",
      title: "Co-Founder & CTO",
      image: "/asim.jpeg",
      location: "Islambad",
      bio: "Software Engineer",
    },
    {
      id: 2,
      name: "Muhammad Essa",
      title: "Co-Founder & CEO",
      image: "/essa.jpg",
      location: "Lahore",
      bio: "GIS Engineer",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === teamMembers.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === 0 ? teamMembers.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setDirection(index > currentSlide ? "right" : "left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-full bg-blue-400 bg-opacity-80 text-white overflow-hidden">
      {/* Background image (blurred city street) */}
      <div
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center transform transition-transform duration-1000 ease-in-out hover:scale-105"
        style={{ backgroundImage: `url('/our-people.jpeg')` }}
      ></div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 animate-fadeIn">Our People</h2>

        {/* Team member profile with animation */}
        <div
          className={`flex flex-col items-center mb-6 transition-all duration-500 ease-in-out transform 
          ${
            isAnimating
              ? direction === "right"
                ? "translate-x-full opacity-0"
                : "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-4 transition-all duration-500 hover:scale-110 hover:shadow-lg">
            <img
              src={teamMembers[currentSlide].image}
              alt={teamMembers[currentSlide].name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <h3 className="text-xl font-semibold transition-all duration-300">
            {teamMembers[currentSlide].name}
          </h3>
          <p className="text-sm mb-2 transition-all duration-300">
            {teamMembers[currentSlide].title}
          </p>
          <p className="text-sm mb-4 transition-all duration-300">
            {teamMembers[currentSlide].location}
          </p>
        </div>

        {/* Bio text with animation */}
        <div
          className={`max-w-2xl text-center mb-8 transition-all duration-500 ease-in-out transform 
          ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <p>{teamMembers[currentSlide].bio}</p>
        </div>

        {/* Navigation buttons with hover effects */}
        <div className="w-full flex justify-between px-4 absolute top-1/2 transform -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-blue-900 cursor-pointer flex items-center justify-center text-white transition-all duration-300 hover:bg-blue-700 hover:scale-110 hover:shadow-lg"
          >
            <ChevronLeft
              size={24}
              className="transition-transform duration-300 hover:-translate-x-1"
            />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-blue-900 flex cursor-pointer items-center justify-center text-white transition-all duration-300 hover:bg-blue-700 hover:scale-110 hover:shadow-lg"
          >
            <ChevronRight
              size={24}
              className="transition-transform duration-300 hover:translate-x-1"
            />
          </button>
        </div>

        {/* Pagination indicators with animations */}
        <div className="flex gap-2 mt-4">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 
                ${
                  currentSlide === index
                    ? "w-6 bg-white"
                    : "w-2 bg-gray-300 hover:bg-gray-100"
                }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPeopleSection;
