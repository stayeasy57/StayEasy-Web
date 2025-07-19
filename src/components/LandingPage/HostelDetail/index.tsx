"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ReviewsCarousel from "./ReviewsCarousel";
import HostelRules from "./HostelRules";
import { useGetPropertyQuery } from "@/store/api/apiSlice";
import { facilitiesIconList } from "@/utils/global/facilitiesIconList";

const HostelDetail = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [propertyData, setPropertyData] = useState<any>(null);

  // Add refs for each section
  const overviewRef = useRef<any>(null);
  const infoRef = useRef<any>(null);
  const facilitiesRef = useRef<any>(null);
  const rulesRef = useRef<any>(null);
  const reviewsRef = useRef<any>(null);

  const { id } = useParams();

  // api
  const { data: property } = useGetPropertyQuery(id ?? "");

  // Add scroll function
  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement>,
    tabName: string
  ) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setActiveTab(tabName);
    }
  };

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

  const handleReserve = (roomType: any) => {
    router.push(
      `/property-details/${id}/property-reserve/?propertyName=${
        propertyData?.hostelName
      }&roomType=${roomType.occupancyType}&roomTypeId=${
        roomType.id
      }&securityDeposit=${roomType.securityDeposit}&rentAmount=${
        roomType.rentAmount
      }&total=${
        roomType.rentAmount + roomType.securityDeposit
      }&propertyId=${id}`
    );
  };

  useEffect(() => {
    if (property?.data) {
      setPropertyData(property?.data);
    }
  }, [property?.data]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 ">
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto mb-4 border-b border-gray-200">
        <button
          className={`px-4 flex-1 py-2 font-medium text-sm ${
            activeTab === "overview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => scrollToSection(overviewRef, "overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 flex-1 py-2 font-medium text-sm ${
            activeTab === "info"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => scrollToSection(infoRef, "info")}
        >
         Availability
        </button>
        <button
          className={`px-4 flex-1 py-2 font-medium text-sm ${
            activeTab === "facilities"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => scrollToSection(facilitiesRef, "facilities")}
        >
          Facilities
        </button>
        <button
          className={`px-4 flex-1 py-2 font-medium text-sm ${
            activeTab === "rules"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => scrollToSection(rulesRef, "rules")}
        >
          Hostel Rules
        </button>
        <button
          className={`px-4 py-2 flex-1 font-medium text-sm ${
            activeTab === "reviews"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => scrollToSection(reviewsRef, "reviews")}
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

      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        {propertyData?.hostelName}
      </h1>

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
          <span>
            {propertyData?.hostelAddress}, {propertyData?.hostelCity}
          </span>
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

      {/* Overview Section */}
      <div ref={overviewRef}>
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-8">
          {/* Main Image - Large */}
          <div className="md:col-span-4 row-span-2 relative">
            <img
              src={propertyData?.roomImages[0]}
              alt={hostelImages[0].alt}
              className="w-full !h-[300px] md:h-full object-fill rounded-lg"
            />
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              Hotel
            </div>
          </div>

          {console.log("property data" , propertyData) as any}

          {/* Small Images - Right Top */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 gap-2">
              <img
                src={propertyData?.messImages[0]}
                alt={hostelImages[1].alt}
                className="w-full h-32 object-cover rounded-lg"
              />
              <img
                src={propertyData?.otherImages[0]}
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
              <p className="mb-4">{propertyData?.description}</p>
            </div>
            <div className="flex items-center">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-medium">{propertyData?.ownerName}</span>
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
                src={propertyData?.washroomImages[0]}
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
                <div className="absolute inset-0 bg-black/5 bg-opacity-50 flex items-center justify-center rounded-lg">
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
            reviews, updated amenities, and real photos. No hidden
            surprises—just the right information to help you make the best
            choice for your stay.
          </p>

        
          {/* Property Highlights Card */}
          <div className="bg-blue-100 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-medium mb-4">Property Highlights</h3>
            <p className="text-sm text-gray-700 mb-4">
             {propertyData?.description || "No highlights available."}
            </p>

   
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div ref={facilitiesRef} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Facilities</h2>
        {/* Amenities */}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {propertyData?.mealProvided?.map((meal: string, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow"
            >
              {facilitiesIconList[meal as keyof typeof facilitiesIconList]}
              <span className="mt-2 text-sm text-center">{meal}</span>
            </div>
          ))}
          {propertyData?.otherFacilities?.map(
            (facility: string, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow"
              >
                {
                  facilitiesIconList[
                    facility as keyof typeof facilitiesIconList
                  ]
                }
                <span className="mt-2 text-sm text-center">{facility}</span>
              </div>
            )
          )}
          {propertyData?.foodType?.map((facility: string, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow"
            >
              {facilitiesIconList[facility as keyof typeof facilitiesIconList]}
              <span className="mt-2 text-sm text-center">{facility}</span>
            </div>
          ))}
          {propertyData?.basicFacilities?.map(
            (facility: string, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow"
              >
                {
                  facilitiesIconList[
                    facility as keyof typeof facilitiesIconList
                  ]
                }
                <span className="mt-2 text-sm text-center">{facility}</span>
              </div>
            )
          )}
          {propertyData?.roomFacilities?.map(
            (facility: string, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow"
              >
                {
                  facilitiesIconList[
                    facility as keyof typeof facilitiesIconList
                  ]
                }
                <span className="mt-2 text-sm text-center">{facility}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Info & Prices Section */}
      <div ref={infoRef} className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Availability</h2>

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
              {propertyData?.roomTypes.map((roomType: any) => (
                <tr key={roomType.id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-gray-800">
                    {roomType.occupancyType}
                  </td>
                  <td className="py-3 px-4 text-center text-green-600 font-medium">
                    {roomType.totalBeds}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {roomType.securityDeposit} + {roomType.rentAmount} PKR
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="bg-blue-600 text-white cursor-pointer py-1 px-4 rounded-md font-medium"
                      onClick={() => handleReserve(roomType)}
                    >
                      Reserve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews Section */}
      <div ref={reviewsRef} className="my-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <ReviewsCarousel />
      </div>

      {/* Hostel Rules Section */}
      <div ref={rulesRef} className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Hostel Rules</h2>
        <HostelRules />
      </div>
    </div>
  );
};

export default HostelDetail;
