"use client";

import React, { useState } from "react";

import Link from "next/link";

// Interfaces
interface Hostel {
  id: string;
  name: string;
  location: string;
  rating: number;
  ratingText: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface FilterOption {
  id: string;
  label: string;
}

interface FilterCategory {
  id: string;
  title: string;
  options: FilterOption[];
}

// Mock data for the hostels
const hostelsData = [
  {
    id: "1",
    name: "Stanza Living Hostel",
    location: "G-Block Islamabad",
    rating: 9.1,
    ratingText: "Superb",
    price: 2000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodi.",
    imageUrl:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: "2",
    name: "SunRise Hostel",
    location: "F-Block Islamabad",
    rating: 8.9,
    ratingText: "Fabulous",
    price: 1800,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodi.",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "3",
    name: "SunRise Hostel",
    location: "E-Block Islamabad",
    rating: 8.8,
    ratingText: "Fabulous",
    price: 1700,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodi.",
    imageUrl:
      "https://images.unsplash.com/photo-1623625434462-e5e42318ae49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "4",
    name: "Syeda Hostel",
    location: "D-Block Islamabad",
    rating: 8.7,
    ratingText: "Fabulous",
    price: 1600,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodi.",
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "5",
    name: "Syeda Hostel",
    location: "C-Block Islamabad",
    rating: 8.6,
    ratingText: "Fabulous",
    price: 1500,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodi.",
    imageUrl:
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

// Filter data
const filterData = [
  {
    id: "popular",
    title: "Popular filters",
    options: [
      { id: "hostel", label: "Hostel" },
      { id: "pg", label: "PG" },
      { id: "breakfast", label: "Breakfast" },
      { id: "5star", label: "5 Star" },
    ],
  },
  {
    id: "propertyType",
    title: "Property Type",
    options: [
      { id: "hostel", label: "Hostel" },
      { id: "pg", label: "PG" },
    ],
  },
  {
    id: "gender",
    title: "Gender",
    options: [
      { id: "girls", label: "Girls" },
      { id: "boys", label: "Boys" },
      { id: "other", label: "Other" },
    ],
  },
  {
    id: "budget",
    title: "Budget Range",
    options: [
      { id: "15k-20k", label: "15K-20K" },
      { id: "20k-30k", label: "20K-30K" },
      { id: "30k-40k", label: "30K-40K" },
      { id: "40k+", label: ">40K" },
    ],
  },
  {
    id: "sharingType",
    title: "Sharing Type",
    options: [
      { id: "single", label: "Single" },
      { id: "double", label: "Double" },
      { id: "triple", label: "Triple" },
      { id: "quadruple", label: "Quadruple" },
      { id: "quintuple", label: "Quintuple" },
      { id: "sextuplet", label: "Sextuplet" },
    ],
  },
  {
    id: "ratings",
    title: "Ratings",
    options: [
      { id: "5star", label: "★★★★★" },
      { id: "4star", label: "★★★★" },
      { id: "3star", label: "★★★" },
      { id: "2star", label: "★★" },
    ],
  },
];

const HostelListing = () => {
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<any>([]);

  // Toggle filter selection
  const toggleFilter = (categoryId: any, optionId: any) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [categoryId]: prev[categoryId] === optionId ? "" : optionId,
    }));
  };

  // Toggle favorites
  const toggleFavorite = (hostelId: any) => {
    setFavorites((prev: any) =>
      prev.includes(hostelId)
        ? prev.filter((id: any) => id !== hostelId)
        : [...prev, hostelId]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-16 pt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4">
        {/* Filters section */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filter By:</h2>
              <button
                className="md:hidden text-blue-600"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide" : "Show"}
              </button>
            </div>

            <div className={`${showFilters ? "block" : "hidden"} md:block`}>
              {filterData.map((category) => (
                <div key={category.id} className="mb-6">
                  <h3 className="font-bold mb-2">{category.title}</h3>
                  {category.options.map((option) => (
                    <div key={option.id} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`${category.id}-${option.id}`}
                        name={category.id}
                        className="mr-2 h-4 w-4"
                        checked={selectedFilters[category.id] === option.id}
                        onChange={() => toggleFilter(category.id, option.id)}
                      />
                      <label
                        htmlFor={`${category.id}-${option.id}`}
                        className="text-sm"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hostel listings */}
        <div className="md:w-3/4">
          {hostelsData.map((hostel: any) => (
            <div
              key={hostel.id}
              className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Hostel image */}
                <div className="md:w-1/3 relative">
                  <img
                    src={hostel.imageUrl}
                    alt={hostel.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                    onClick={() => toggleFavorite(hostel.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={
                        favorites.includes(hostel.id) ? "currentColor" : "none"
                      }
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
                  <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                    Featured
                  </div>
                </div>

                {/* Hostel details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-primary">
                          {hostel.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
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
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {hostel.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="bg-blue-100 text-primary font-bold px-2 py-1 rounded text-sm mb-1">
                          {hostel.ratingText}
                        </div>
                        <div className="bg-primary text-white font-bold px-2 py-1 rounded text-sm">
                          {hostel.rating}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {hostel.description}
                    </p>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button className="bg-primary text-white py-2 px-4 rounded font-medium">
                      {hostel.price} PKR
                    </button>
                    <Link href="/property-details/11">
                      <button className="bg-white text-primary underline cursor-pointer py-2 px-4 rounded font-medium">
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostelListing;
