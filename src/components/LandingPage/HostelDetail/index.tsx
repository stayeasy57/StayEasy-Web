"use client";

import React, { useState } from "react";
import ReviewsCarousel from "./ReviewsCarousel";
import HostelRules from "./HostelRules";

const HostelDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  // Dummy data for the hostel
  const hostelName = "Stanza Living Hostel";
  const hostelLocation = "G-Block Islamabad, 123 Street, House 4";
  const hostelRating = 4.8;
  const reviewCount = 148;

  // Dummy images from Unsplash
  const hostelImages = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Hostel Building",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Bedroom",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Single Room",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Bedroom",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Single Room",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Bathroom",
    },
  ];

  // Dummy amenities
  const amenities = [
    {
      id: "1",
      name: "Lift",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10h14v8H5v-8zM5 6h14"
          />
        </svg>
      ),
    },
    {
      id: "2",
      name: "WiFi",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.246-3.905 14.15 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      ),
    },
    {
      id: "3",
      name: "Breakfast",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18v18H3V3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9h18M9 21V9"
          />
        </svg>
      ),
    },
    {
      id: "4",
      name: "Gym",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      ),
    },
    {
      id: "5",
      name: "TV",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "6",
      name: "24/7 Light",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      id: "7",
      name: "Laundry",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18v18H3V3z"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "8",
      name: "Parking space",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      ),
    },
  ];

  // Dummy review data
  const review = {
    id: "1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodi",
    author: "Maria",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  };

  const staffRating = 8.5;
  const superb = "Superb";
  const superRating = 9.4;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 ">
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto mb-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "overview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "info"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Info & Prices
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "facilities"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("facilities")}
        >
          Facilities
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "rules"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("rules")}
        >
          Hostel Rules
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "reviews"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center mb-2">
        <div className="flex text-yellow-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <button className="ml-2 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Hostel Title */}
      <h1 className="text-3xl font-bold text-blue-800 mb-4">{hostelName}</h1>

      {/* Location with actions */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center text-sm text-gray-600 mb-2 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{hostelLocation}</span>
          <span className="mx-2">-</span>
          <a href="#" className="text-blue-600 font-medium">
            Excellent Location
          </a>
          <span className="mx-2">-</span>
          <a href="#" className="text-blue-600 font-medium">
            Show Map
          </a>
        </div>
        <div className="flex items-center">
          <button className="mr-4 text-gray-600" onClick={toggleFavorite}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="mr-4 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium">
            Reserve
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-8">
        {/* Main Image - Large */}
        <div className="md:col-span-4 row-span-2 relative">
          <img
            src={hostelImages[0].src}
            alt={hostelImages[0].alt}
            className="w-full h-64 md:h-full object-cover rounded-lg"
          />
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            Hotel
          </div>
        </div>

        {/* Small Images - Right Top */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-2 gap-2">
            <img
              src={hostelImages[1].src}
              alt={hostelImages[1].alt}
              className="w-full h-32 object-cover rounded-lg"
            />
            <img
              src={hostelImages[2].src}
              alt={hostelImages[2].alt}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Review Card */}
        <div className="md:col-span-3 bg-white rounded-lg p-4 shadow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">{superb}</h3>
            <div className="bg-blue-600 text-white font-bold px-2 py-1 rounded text-sm">
              {superRating}
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <p className="mb-2">Tenants Who Stayed Here Loved</p>
            <p className="mb-4">{review.text}</p>
          </div>
          <div className="flex items-center">
            <img
              src={review.avatar}
              alt={review.author}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-medium">{review.author}</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold">Staff</span>
            <div className="bg-white border border-gray-300 rounded px-2 py-1 font-bold text-sm">
              {staffRating}
            </div>
          </div>
        </div>

        {/* Small Images - Bottom Row */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-3 gap-2">
            <img
              src={hostelImages[3].src}
              alt={hostelImages[3].alt}
              className="w-full h-24 object-cover rounded-lg"
            />
            <img
              src={hostelImages[4].src}
              alt={hostelImages[4].alt}
              className="w-full h-24 object-cover rounded-lg"
            />
            <div className="relative">
              <img
                src={hostelImages[5].src}
                alt={hostelImages[5].alt}
                className="w-full h-24 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white font-bold">+24 More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="md:col-span-4 md:row-span-1">
          <div className="bg-gray-200 rounded-lg w-full h-24 md:h-full relative">
            <img
              src="/api/placeholder/600/200"
              alt="Map"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-2 right-2 bg-white py-1 px-2 rounded-full shadow text-xs">
              4.6 PKR 3,519
            </div>
            <button className="absolute bottom-2 left-2 bg-white py-1 px-3 rounded-full shadow-md text-xs text-blue-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <span>Show full map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow"
          >
            {amenity.icon}
            <span className="mt-2 text-sm text-center">{amenity.name}</span>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <span className="text-green-500 font-medium mr-2">—</span>
          <span className="text-green-500 font-medium">Reliable Info</span>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-3">
          Guests say the description and photos for this property are very
          accurate.
        </h2>

        <p className="text-sm text-gray-700 mb-4">
          We provide accurate details about every hostel so you can book with
          confidence.Finding the perfect place to stay has never been easier.
          Our platform ensures that all hostel listings include verified
          reviews, updated amenities, and real photos. No hidden surprises—just
          the right information to help you make the best choice for your stay.
        </p>

        <p className="text-sm text-gray-700 mb-8">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat."
        </p>

        {/* Property Highlights Card */}
        <div className="bg-blue-100 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-medium mb-4">Property Highlights</h3>
          <p className="text-sm text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim ven.
          </p>

          <div className="flex items-start mb-2">
            <div className="flex-shrink-0 mt-1">
              <svg
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-2">
              <h4 className="text-base font-medium">Loyal Customers</h4>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Availability</h2>

        <div className="flex items-center text-red-500 mb-4">
          <svg
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm">
            Select date to see this property's availability and price
          </p>
        </div>

        {/* Search Form */}
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <div className="border-2 border-yellow-500 rounded-md flex items-center p-2 flex-1">
            <svg
              className="h-6 w-6 text-gray-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <input
              type="text"
              placeholder="Islamabad"
              className="flex-1 outline-none"
              //   value="Islamabad"
            />
            <button className="text-gray-600">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="border-2 border-gray-300 rounded-md flex items-center p-2 flex-1">
            <svg
              className="h-6 w-6 text-gray-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-gray-600">Check-in— Check-out</span>
          </div>

          <div className="border-2 border-gray-300 rounded-md flex items-center p-2 flex-1">
            <svg
              className="h-6 w-6 text-gray-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm text-gray-600 flex-1">
              2 Seater, 1 room
            </span>
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <button className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium">
            Search
          </button>
        </div>

        {/* Availability Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 px-4 text-left">Occupancy Type</th>
                <th className="py-3 px-4 text-center">Available seat</th>
                <th className="py-3 px-4 text-center">Price(Security+Rent)</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-800">Single Sharing</td>
                <td className="py-3 px-4 text-center text-green-600 font-medium">
                  3
                </td>
                <td className="py-3 px-4 text-center">3000+9000=12000</td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-md font-medium">
                    Reserve
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-800">Double Sharing</td>
                <td className="py-3 px-4 text-center text-green-600 font-medium">
                  4
                </td>
                <td className="py-3 px-4 text-center">3000+7000=10000</td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-md font-medium">
                    Reserve
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-800">Triple Sharing</td>
                <td className="py-3 px-4 text-center text-green-600 font-medium">
                  6
                </td>
                <td className="py-3 px-4 text-center">3000+6000=9000</td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-md font-medium">
                    Reserve
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-800">Quadruple Sharing</td>
                <td className="py-3 px-4 text-center text-green-600 font-medium">
                  2
                </td>
                <td className="py-3 px-4 text-center">3000+5000=8000</td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-md font-medium">
                    Reserve
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-800">Quintuple Sharing</td>
                <td className="py-3 px-4 text-center text-green-600 font-medium">
                  1
                </td>
                <td className="py-3 px-4 text-center">3000+4000=7000</td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-md font-medium">
                    Reserve
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-800">Sextuplet Sharing</td>
                <td className="py-3 px-4 text-center text-green-600 font-medium">
                  5
                </td>
                <td className="py-3 px-4 text-center">3000+3000=6000</td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-600 text-white py-1 px-4 rounded-md font-medium">
                    Reserve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="my-12">
          <ReviewsCarousel />
        </div>
        <div>
          <HostelRules />
        </div>
      </div>
    </div>
  );
};

export default HostelDetail;
