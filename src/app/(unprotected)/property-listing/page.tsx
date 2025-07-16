"use client";

import FooterLandingPage from "@/components/LandingPage/FooterLandingPage";
import Header from "@/components/LandingPage/Header";
import HeroSection from "@/components/LandingPage/HeroSection";
import HostelListing from "@/components/LandingPage/HostelListing";
import React, { Suspense } from "react";

// Loading component for the hostel listing
const HostelListingLoader = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="px-8 pt-8">
        <div className="border-amber-500 border-8 max-w-[1024px] mx-auto rounded-md flex animate-pulse">
          <div className="bg-gray-300 w-full py-4 px-4 h-14 rounded"></div>
          <div className="bg-gray-400 px-16 py-4 h-14 rounded"></div>
        </div>
      </div>

      <div className="min-h-screen pb-16 pt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-10">
          {/* Filters skeleton */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0 animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-18"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Listings skeleton */}
          <div className="md:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <div className="h-5 bg-gray-300 rounded w-48 animate-pulse"></div>
              <div className="flex items-center gap-2 animate-pulse">
                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            </div>

            {/* Property cards skeleton */}
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg shadow-md mb-4 overflow-hidden animate-pulse">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <div className="w-full h-[300px] bg-gray-300"></div>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-16 bg-gray-200 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                        <div className="flex gap-2">
                          <div className="h-8 bg-gray-200 rounded w-24"></div>
                          <div className="h-8 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component that wraps HostelListing in Suspense
const HostelListingWithSuspense = () => {
  return (
    <Suspense fallback={<HostelListingLoader />}>
      <HostelListing />
    </Suspense>
  );
};

const PropertyListingPage = () => {
  return (
    <div>
      <Header />
      <HostelListingWithSuspense />
      <FooterLandingPage />
    </div>
  );
};

export default PropertyListingPage;