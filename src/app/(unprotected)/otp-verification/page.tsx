// page.tsx - Your OTP verification page component
"use client";

import React, { Suspense } from "react";
import OTPVerification from "@/components/OtpVerification";
import Header from "@/components/LandingPage/Header";
import FooterLandingPage from "@/components/LandingPage/FooterLandingPage";

// Loading component for Suspense
const OTPLoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="max-w-md w-full mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification page...</p>
        </div>
      </div>
    </div>
  </div>
);

// Component that uses useSearchParams
const OTPVerificationContent = () => {
  return (
    <OTPVerification
      title="Verify Your Account"
      subtitle="Enter the 6-digit code sent to your email"
      redirectPath="/dashboard"
    />
  );
};

// Main page component with Suspense boundary
const OTPVerificationPage = () => {
  return (
    <Suspense fallback={<OTPLoadingFallback />}>
      <Header />
      <OTPVerificationContent />
      <FooterLandingPage />
    </Suspense>
  );
};

export default OTPVerificationPage;