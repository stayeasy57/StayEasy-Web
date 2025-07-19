"use client";

import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useGetPropertiesQuery } from "@/store/api/apiSlice";
import { Skeleton } from "primereact/skeleton";
import {
  selectIsAuthenticated,
  selectToken,
  checkTokenExpiration,
} from "@/store/slices/authSlice";

// Interfaces
interface FilterOption {
  id: string;
  label: string;
  filterKey: string;
  value: string;
}

interface FilterState {
  accommodationType: string[];
  propertyGender: string[];
  idealFor: string[];
  minPrice: string;
  maxPrice: string;
  occupancyType: string[];
  exactRating: string[];
  hasFood: boolean;
  search: string;
}

// Filter data - updated to match API parameters
const filterData = [
  {
    id: "popular",
    title: "Popular filters",
    options: [
      { id: "hostel", label: "Hostel", filterKey: "accommodationType", value: "HOSTEL" },
      { id: "pg", label: "PG", filterKey: "accommodationType", value: "PG" },
      { id: "breakfast", label: "Breakfast", filterKey: "hasFood", value: "true" },
      { id: "5star", label: "5 Star", filterKey: "exactRating", value: "5" },
    ],
  },
  {
    id: "accommodationType",
    title: "Property Type",
    options: [
      { id: "hostel", label: "Hostel", filterKey: "accommodationType", value: "HOSTEL" },
      { id: "pg", label: "PG", filterKey: "accommodationType", value: "PG" },
    ],
  },
  {
    id: "propertyGender",
    title: "Gender",
    options: [
      { id: "girls", label: "Girls", filterKey: "propertyGender", value: "GIRLS" },
      { id: "boys", label: "Boys", filterKey: "propertyGender", value: "BOYS" },
      { id: "other", label: "Other", filterKey: "propertyGender", value: "OTHER" },
    ],
  },
  {
    id: "budget",
    title: "Budget Range",
    options: [
      { id: "15k-20k", label: "15K-20K", filterKey: "priceRange", value: "15000-20000" },
      { id: "20k-30k", label: "20K-30K", filterKey: "priceRange", value: "20000-30000" },
      { id: "30k-40k", label: "30K-40K", filterKey: "priceRange", value: "30000-40000" },
      { id: "40k+", label: ">40K", filterKey: "priceRange", value: "40000-999999" },
    ],
  },
  {
    id: "occupancyType",
    title: "Sharing Type",
    options: [
      { id: "single", label: "Single", filterKey: "occupancyType", value: "1 Seater" },
      { id: "double", label: "Double", filterKey: "occupancyType", value: "2 Seater" },
      { id: "triple", label: "Triple", filterKey: "occupancyType", value: "3 Seater" },
      { id: "quadruple", label: "Quadruple", filterKey: "occupancyType", value: "4 Seater" },
      { id: "quintuple", label: "Quintuple", filterKey: "occupancyType", value: "5 Seater" },
      { id: "sextuplet", label: "Sextuplet", filterKey: "occupancyType", value: "6 Seater" },
    ],
  },
  {
    id: "ratings",
    title: "Ratings",
    options: [
      { id: "5star", label: "★★★★★", filterKey: "exactRating", value: "5" },
      { id: "4star", label: "★★★★", filterKey: "exactRating", value: "4" },
      { id: "3star", label: "★★★", filterKey: "exactRating", value: "3" },
      { id: "2star", label: "★★", filterKey: "exactRating", value: "2" },
    ],
  },
  {
    id: "idealFor",
    title: "Ideal For",
    options: [
      { id: "students", label: "Students", filterKey: "idealFor", value: "STUDENTS" },
      { id: "working", label: "Working Professional", filterKey: "idealFor", value: "PROFESSIONAL" },
    ],
  },
];

const HostelListing = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // State for filters - updated to support arrays for multiple selections
  const [filters, setFilters] = useState<FilterState>({
    accommodationType: [],
    propertyGender: [],
    idealFor: [],
    minPrice: "",
    maxPrice: "",
    occupancyType: [],
    exactRating: [],
    hasFood: false,
    search: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [showFilters, setShowFilters] = useState(false);
  const [propertiesList, setPropertiesList] = useState([]);
  const [favorites, setFavorites] = useState<any>([]);
  const [searchInput, setSearchInput] = useState("");

  // Redux selectors
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectToken);

  // Build API query parameters
  const buildAPIParams = () => {
    const params: any = {
      limit: itemsPerPage,
      page: currentPage,
      city: searchParams.get("city") || "",
    };

    // Add filters to params - handle arrays by joining with commas or sending the first value
    if (filters.accommodationType.length > 0) {
      // For API compatibility, you might need to send just the first value or handle multiple values
      params.accommodationType = filters.accommodationType[0]; // or join with comma if API supports it
    }
    if (filters.propertyGender.length > 0) {
      params.gender = filters.propertyGender[0]; // or join with comma if API supports it
    }
    if (filters.idealFor.length > 0) {
      params.idealFor = filters.idealFor[0]; // or join with comma if API supports it
    }
    if (filters.minPrice) params.minPrice = parseInt(filters.minPrice);
    if (filters.maxPrice) params.maxPrice = parseInt(filters.maxPrice);
    if (filters.occupancyType.length > 0) {
      params.occupancyType = filters.occupancyType[0]; // or join with comma if API supports it
    }
    if (filters.exactRating.length > 0) {
      params.exactRating = parseInt(filters.exactRating[0]); // or join with comma if API supports it
    }
    if (filters.hasFood) params.hasFood = filters.hasFood;
    if (filters.search) params.search = filters.search;

    return params;
  };

  // API call with dynamic parameters
  const { data: propertiesData, isLoading, refetch } = useGetPropertiesQuery(buildAPIParams());

  // Handle search
  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchInput }));
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle filter change - updated for checkbox functionality
  const handleFilterChange = (option: FilterOption, isChecked: boolean) => {
    const { filterKey, value } = option;
    
    // Reset to first page when filter changes
    setCurrentPage(1);
    
    if (filterKey === "priceRange") {
      if (isChecked) {
        const [minPrice, maxPrice] = value.split("-");
        setFilters(prev => ({
          ...prev,
          minPrice,
          maxPrice,
        }));
      } else {
        setFilters(prev => ({
          ...prev,
          minPrice: "",
          maxPrice: "",
        }));
      }
    } else if (filterKey === "hasFood") {
      setFilters(prev => ({
        ...prev,
        hasFood: isChecked,
      }));
    } else {
      // Handle array-based filters
      setFilters(prev => {
        const currentValues = prev[filterKey as keyof FilterState] as string[];
        let newValues: string[];
        
        if (isChecked) {
          // Add value if not already present
          newValues = currentValues.includes(value) 
            ? currentValues 
            : [...currentValues, value];
        } else {
          // Remove value
          newValues = currentValues.filter(v => v !== value);
        }
        
        return {
          ...prev,
          [filterKey]: newValues,
        };
      });
    }
  };

  // Toggle filter selection for UI - updated for checkboxes
  const toggleFilter = (categoryId: string, optionId: string) => {
    const isCurrentlySelected = selectedFilters[categoryId]?.includes(optionId);
    
    setSelectedFilters((prev: any) => {
      const currentCategorySelections = prev[categoryId] || [];
      let newCategorySelections;
      
      if (isCurrentlySelected) {
        // Remove from selections
        newCategorySelections = currentCategorySelections.filter((id: string) => id !== optionId);
      } else {
        // Add to selections
        newCategorySelections = [...currentCategorySelections, optionId];
      }
      
      return {
        ...prev,
        [categoryId]: newCategorySelections,
      };
    });

    // Find the option and apply the filter
    const category = filterData.find(cat => cat.id === categoryId);
    const option = category?.options.find(opt => opt.id === optionId);
    
    if (option) {
      handleFilterChange(option, !isCurrentlySelected);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      accommodationType: [],
      propertyGender: [],
      idealFor: [],
      minPrice: "",
      maxPrice: "",
      occupancyType: [],
      exactRating: [],
      hasFood: false,
      search: "",
    });
    setSelectedFilters({});
    setSearchInput("");
    setCurrentPage(1); // Reset to first page
  };

  // Check authentication and handle property details navigation
  const handleViewDetails = (hostelId: string) => {
    dispatch(checkTokenExpiration());

    if (isAuthenticated && token) {
      router.push(`/property-details/${hostelId}`);
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "redirectAfterLogin",
          `/property-details/${hostelId}`
        );
      }
      router.push("/login");
    }
  };

  // Toggle favorites
  const toggleFavorite = (hostelId: any) => {
    dispatch(checkTokenExpiration());

    if (!isAuthenticated || !token) {
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

  // Update properties list when data changes
  useEffect(() => {
    if (propertiesData?.data) {
      setPropertiesList(propertiesData?.data);
    }
  }, [propertiesData]);

  // Check token expiration on component mount
  useEffect(() => {
    dispatch(checkTokenExpiration());
  }, [dispatch]);

  // Get active filters count - updated for array-based filters
  const getActiveFiltersCount = () => {
    let count = 0;
    
    // Count array-based filters
    count += filters.accommodationType.length;
    count += filters.propertyGender.length;
    count += filters.idealFor.length;
    count += filters.occupancyType.length;
    count += filters.exactRating.length;
    
    // Count other filters
    if (filters.minPrice && filters.maxPrice) count += 1;
    if (filters.hasFood) count += 1;
    if (filters.search) count += 1;
    
    return count;
  };

  // Check if a filter option is selected
  const isFilterSelected = (categoryId: string, optionId: string) => {
    return selectedFilters[categoryId]?.includes(optionId) || false;
  };

  // Pagination functions
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const totalPages = propertiesData?.pagination?.totalPages || 1;
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="bg-gray-100">
      <div className="px-8 pt-8">
        <div className="border-amber-500 border-8 max-w-[1024px] mx-auto rounded-md flex">
          <input
            className="bg-white text-primary w-full py-4 outline-none px-4 text-sm font-medium"
            placeholder="Search for Hostels, PGs, Hotels"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            label="Search" 
            className="bg-primary rounded-none px-16" 
            onClick={handleSearch}
          />
        </div>
      </div>

      <div className="min-h-screen pb-16 pt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10">
          {/* Filters section */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  Filter By: {getActiveFiltersCount() > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full ml-2">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </h2>
                <div className="flex gap-2">
                  {getActiveFiltersCount() > 0 && (
                    <button
                      className="text-red-600 text-sm hover:text-red-800"
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    className="md:hidden text-blue-600"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    {showFilters ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className={`${showFilters ? "block" : "hidden"} md:block`}>
                {filterData.map((category) => (
                  <div key={category.id} className="mb-6">
                    <h3 className="font-bold mb-2">{category.title}</h3>
                    {category.options.map((option) => (
                      <div key={option.id} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`${category.id}-${option.id}`}
                          className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          checked={isFilterSelected(category.id, option.id)}
                          onChange={() => toggleFilter(category.id, option.id)}
                        />
                        <label
                          htmlFor={`${category.id}-${option.id}`}
                          className="text-sm cursor-pointer hover:text-primary"
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
            {/* Results summary */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {propertiesData?.pagination?.total || 0} properties found
                {searchParams.get("city") && ` in ${searchParams.get("city")}`}
                {propertiesData?.pagination && (
                  <span className="text-sm text-gray-500 ml-2">
                    (Page {currentPage} of {propertiesData.pagination.totalPages})
                  </span>
                )}
              </p>
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-sm text-gray-600">Loading...</span>
                </div>
              )}
            </div>

            {/* Active filters display */}
            {getActiveFiltersCount() > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {/* Display active filters as chips */}
                {filters.accommodationType.map(filter => (
                  <span key={filter} className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {filter}
                    <button 
                      onClick={() => {
                        const option = filterData.find(cat => cat.id === "accommodationType")?.options.find(opt => opt.value === filter);
                        if (option) handleFilterChange(option, false);
                      }}
                      className="hover:bg-primary-dark rounded-full"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.propertyGender.map(filter => (
                  <span key={filter} className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {filter}
                    <button 
                      onClick={() => {
                        const option = filterData.find(cat => cat.id === "propertyGender")?.options.find(opt => opt.value === filter);
                        if (option) handleFilterChange(option, false);
                      }}
                      className="hover:bg-primary-dark rounded-full"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.idealFor.map(filter => (
                  <span key={filter} className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {filter}
                    <button 
                      onClick={() => {
                        const option = filterData.find(cat => cat.id === "idealFor")?.options.find(opt => opt.value === filter);
                        if (option) handleFilterChange(option, false);
                      }}
                      className="hover:bg-primary-dark rounded-full"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {(filters.minPrice && filters.maxPrice) && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {filters.minPrice}-{filters.maxPrice}
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, minPrice: "", maxPrice: "" }))}
                      className="hover:bg-primary-dark rounded-full"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.occupancyType.map(filter => (
                  <span key={filter} className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {filter}
                    <button 
                      onClick={() => {
                        const option = filterData.find(cat => cat.id === "occupancyType")?.options.find(opt => opt.value === filter);
                        if (option) handleFilterChange(option, false);
                      }}
                      className="hover:bg-primary-dark rounded-full"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.exactRating.map(filter => (
                  <span key={filter} className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {filter} Star
                    <button 
                      onClick={() => {
                        const option = filterData.find(cat => cat.id === "ratings")?.options.find(opt => opt.value === filter);
                        if (option) handleFilterChange(option, false);
                      }}
                      className="hover:bg-primary-dark rounded-full"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.hasFood && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    Has Food
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, hasFood: false }))}
                      className="hover:bg-primary-dark rounded-full"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.search && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    "{filters.search}"
                    <button 
                      onClick={() => {
                        setFilters(prev => ({ ...prev, search: "" }));
                        setSearchInput("");
                      }}
                      className="hover:bg-primary-dark rounded-full"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

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
                        className="w-full !h-[300px] md:h-full object-cover"
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
                      {/* Food indicator */}
                      {hostel.isProvidedFood && (
                        <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Food Available
                        </div>
                      )}
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
                                Available Beds: {hostel.availableBeds}
                              </h3>
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
                              {hostel.reviewStats?.averageRating || 0} ★
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
              <div className="text-center text-gray-500 py-8">
                <p>No properties found matching your criteria.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-2 text-primary hover:underline"
                >
                  Clear filters to see all properties
                </button>
              </div>
            )}

            {/* Pagination */}
            {propertiesData?.pagination && propertiesData.pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-md border ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  Previous
                </button>

                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="px-3 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    >
                      1
                    </button>
                    {currentPage > 4 && (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    )}
                  </>
                )}

                {generatePageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md border ${
                      currentPage === page
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {currentPage < propertiesData.pagination.totalPages - 2 && (
                  <>
                    {currentPage < propertiesData.pagination.totalPages - 3 && (
                      <span className="px-3 py-2 text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(propertiesData.pagination.totalPages)}
                      className="px-3 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    >
                      {propertiesData.pagination.totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === propertiesData.pagination.totalPages}
                  className={`px-3 py-2 rounded-md border ${
                    currentPage === propertiesData.pagination.totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelListing;