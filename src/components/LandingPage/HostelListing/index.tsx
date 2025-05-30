"use client";

import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useGetPropertiesQuery } from "@/store/api/apiSlice";
import { Skeleton } from "primereact/skeleton";
import {
  selectIsAuthenticated,
  selectToken,
  checkTokenExpiration,
} from "@/store/slices/authSlice"; // Adjust import path as needed

// Interfaces
interface FilterOption {
  id: string;
  label: string;
}

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
  const [propertiesList, setPropertiesList] = useState([]);
  const [favorites, setFavorites] = useState<any>([]);

  const router = useRouter();
  const dispatch = useDispatch();

  // Redux selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectToken);

  // API
  const { data: propertiesData, isLoading } = useGetPropertiesQuery();

  // Check authentication and handle property details navigation
  const handleViewDetails = (hostelId: string) => {
    // First check if token is expired
    dispatch(checkTokenExpiration());

    if (isAuthenticated && token) {
      router.push(`/property-details/${hostelId}`);
    } else {
      // Store the intended destination for redirect after login
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "redirectAfterLogin",
          `/property-details/${hostelId}`
        );
      }
      router.push("/login");
    }
  };

  // Toggle filter selection
  const toggleFilter = (categoryId: any, optionId: any) => {
    setSelectedFilters((prev: any) => ({
      ...prev,
      [categoryId]: prev[categoryId] === optionId ? "" : optionId,
    }));
  };

  // Toggle favorites (also require authentication)
  const toggleFavorite = (hostelId: any) => {
    // Check if user is authenticated before allowing favorites
    dispatch(checkTokenExpiration());

    if (!isAuthenticated || !token) {
      // Redirect to login if not authenticated
      if (typeof window !== "undefined") {
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
      }
      router.push("/login");
      return;
    }

    setFavorites((prev: any) =>
      prev.includes(hostelId)
        ? prev.filter((id: any) => id !== hostelId)
        : [...prev, hostelId]
    );
  };

  useEffect(() => {
    if (propertiesData?.data) {
      setPropertiesList(propertiesData?.data);
    }
  }, [propertiesData]);

  // Check token expiration on component mount
  useEffect(() => {
    dispatch(checkTokenExpiration());
  }, [dispatch]);

  return (
    <div className="bg-gray-100">
      <div className="px-8 pt-8">
        <div className=" border-amber-500 border-8 max-w-[1024px] mx-auto rounded-md flex">
          <input
            className="bg-white text-primary w-full py-4 outline-none  px-4 text-sm font-medium"
            placeholder="Search for Hostels, PGs, Hotels"
            type="text"
          />
          <Button label="Search" className="bg-primary rounded-none px-16" />
        </div>
      </div>

      <div className=" min-h-screen pb-16 pt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10">
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
            {propertiesList?.length > 0 && !isLoading ? (
              propertiesList.map((hostel: any) => (
                <div
                  key={hostel.id}
                  className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Hostel image */}
                    <div className="md:w-1/3 relative">
                      <img
                        src={hostel.roomImages[0]}
                        alt={hostel.hostelName}
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
                            favorites.includes(hostel.id)
                              ? "currentColor"
                              : "none"
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
                        {hostel.propertyGender}
                      </div>
                      {/* Property Views */}
                      <div className="absolute top-2 left-2 bg-primary bg-opacity-60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>{hostel.totalViews || 0}</span>
                      </div>
                    </div>

                    {/* Hostel details */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-primary">
                              {hostel.hostelName}
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
                              {hostel.hostelAddress}, {hostel.hostelCity}
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                              {hostel.description}
                            </p>
                            <div className="mt-2">
                              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                Available Beds
                              </h3>
                              <div className="flex flex-wrap gap-3">
                                {hostel.availableBeds}
                              </div>
                            </div>
                            <div className="mt-2">
                              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                Room Types
                              </h3>
                              <div className="flex flex-wrap gap-3">
                                {hostel?.roomTypes.map(
                                  (room: any, index: number) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                                    >
                                      <div className="flex items-center mr-1">
                                        <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                                        <span className="font-medium">
                                          {room.occupancyType}
                                        </span>
                                      </div>
                                      <div className="font-bold text-blue-800">
                                        PKR {room.rentAmount.toLocaleString()}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center mb-1">
                              <div className="bg-blue-100 text-primary font-bold px-2 py-1 rounded text-sm mb-1">
                                {hostel.propertyGender ?? "N/A"}
                              </div>
                            </div>
                            <div className="bg-primary text-white font-bold px-2 py-1 rounded text-sm">
                              {hostel.rating ?? 2}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleViewDetails(hostel.id)}
                          className="bg-white text-primary underline cursor-pointer py-2 px-4 rounded font-medium hover:bg-gray-50 transition-colors"
                        >
                          See Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : isLoading ? (
              <div>
                {[1, 2, 3].map((index) => (
                  <div className="flex gap-2 mb-4" key={index}>
                    <Skeleton
                      className="w-1/4 h-48 mb-4"
                      shape="rectangle"
                      size="large"
                    />
                    <Skeleton
                      className="w-full h-48 mb-4"
                      shape="rectangle"
                      size="large"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No properties found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelListing;
