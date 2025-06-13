'use client';

import { Building, Clock, Home, MapPin, Search, Shield, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import LocationSearch from "./LocationSearch";




const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#003B95]/10 to-[#0056D6]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#003B95]/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#003B95]/5 to-blue-300/5 rounded-full blur-3xl"></div>
      </div>

      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Content Section */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Verified Properties</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#003B95]" />
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>5-Star Support</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-[#003B95] to-[#0056D6] bg-clip-text text-transparent">
                  Find your stay,
                </span>
                <br />
                <span className="text-gray-800">
                  Hassle free!
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A seamless platform connecting tenants & landlords effortlessly. 
                Discover your perfect accommodation with confidence.
              </p>
            </div>

            {/* Download App Buttons */}


            {/* Search Bar */}
           <LocationSearch />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#003B95]">50K+</div>
                <div className="text-sm text-gray-600">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#003B95]">100K+</div>
                <div className="text-sm text-gray-600">Happy Tenants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#003B95]">25+</div>
                <div className="text-sm text-gray-600">Cities</div>
              </div>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 lg:p-12 shadow-2xl">
              {/* SVG City Illustration */}
              <div className="relative h-80 w-full">
                <svg 
                  viewBox="0 0 400 300" 
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Sky Background */}
                  <defs>
                    <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#87CEEB', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#E0F6FF', stopOpacity: 0.1 }} />
                    </linearGradient>
                    
                    <linearGradient id="building1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#003B95' }} />
                      <stop offset="100%" style={{ stopColor: '#0056D6' }} />
                    </linearGradient>
                    
                    <linearGradient id="building2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#0056D6' }} />
                      <stop offset="100%" style={{ stopColor: '#1565C0' }} />
                    </linearGradient>
                  </defs>
                  
                  {/* Sky */}
                  <rect width="400" height="300" fill="url(#skyGradient)" />
                  
                  {/* Sun */}
                  <circle cx="350" cy="50" r="25" fill="#FFD700" opacity="0.8">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Clouds */}
                  <g className="animate-float">
                    <ellipse cx="80" cy="60" rx="15" ry="8" fill="white" opacity="0.7" />
                    <ellipse cx="90" cy="55" rx="20" ry="12" fill="white" opacity="0.7" />
                    <ellipse cx="100" cy="60" rx="15" ry="8" fill="white" opacity="0.7" />
                  </g>
                  
                  <g className="animate-float" style={{ animationDelay: '2s' }}>
                    <ellipse cx="280" cy="40" rx="12" ry="6" fill="white" opacity="0.6" />
                    <ellipse cx="290" cy="37" rx="16" ry="9" fill="white" opacity="0.6" />
                  </g>
                  
                  {/* Buildings */}
                  
                  {/* Building 1 */}
                  <rect x="50" y="150" width="40" height="130" fill="url(#building1)" rx="2">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,50; 0,0"
                      dur="1s"
                      begin="0.5s"
                      fill="freeze"
                    />
                  </rect>
                  
                  {/* Building 2 */}
                  <rect x="100" y="120" width="45" height="160" fill="url(#building2)" rx="2">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,60; 0,0"
                      dur="1s"
                      begin="0.8s"
                      fill="freeze"
                    />
                  </rect>
                  
                  {/* Building 3 - Main */}
                  <rect x="160" y="100" width="50" height="180" fill="url(#building1)" rx="2">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,80; 0,0"
                      dur="1s"
                      begin="1.1s"
                      fill="freeze"
                    />
                  </rect>
                  
                  {/* Building 4 */}
                  <rect x="220" y="130" width="42" height="150" fill="url(#building2)" rx="2">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,70; 0,0"
                      dur="1s"
                      begin="1.4s"
                      fill="freeze"
                    />
                  </rect>
                  
                  {/* Building 5 */}
                  <rect x="270" y="140" width="38" height="140" fill="url(#building1)" rx="2">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,60; 0,0"
                      dur="1s"
                      begin="1.7s"
                      fill="freeze"
                    />
                  </rect>
                  
                  {/* Building 6 */}
                  <rect x="320" y="160" width="35" height="120" fill="url(#building2)" rx="2">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,50; 0,0"
                      dur="1s"
                      begin="2s"
                      fill="freeze"
                    />
                  </rect>
                  
                  {/* Windows for Building 1 */}
                  <g>
                    <rect x="55" y="160" width="6" height="8" fill="#FFE066" rx="1">
                      <animate attributeName="fill" values="#FFE066;#FFF;#FFE066" dur="2s" repeatCount="indefinite" begin="2.5s" />
                    </rect>
                    <rect x="65" y="160" width="6" height="8" fill="#87CEEB" rx="1" />
                    <rect x="75" y="160" width="6" height="8" fill="#FFE066" rx="1" />
                    <rect x="55" y="180" width="6" height="8" fill="#87CEEB" rx="1" />
                    <rect x="65" y="180" width="6" height="8" fill="#FFE066" rx="1">
                      <animate attributeName="fill" values="#FFE066;#FFF;#FFE066" dur="3s" repeatCount="indefinite" begin="3s" />
                    </rect>
                    <rect x="75" y="180" width="6" height="8" fill="#87CEEB" rx="1" />
                    <rect x="55" y="200" width="6" height="8" fill="#87CEEB" rx="1" />
                    <rect x="65" y="200" width="6" height="8" fill="#87CEEB" rx="1" />
                    <rect x="75" y="200" width="6" height="8" fill="#FFE066" rx="1" />
                  </g>
                  
                  {/* Windows for Building 2 */}
                  <g>
                    <rect x="110" y="135" width="6" height="8" fill="#FFE066" rx="1" />
                    <rect x="120" y="135" width="6" height="8" fill="#87CEEB" rx="1" />
                    <rect x="130" y="135" width="6" height="8" fill="#FFE066" rx="1">
                      <animate attributeName="fill" values="#FFE066;#FFF;#FFE066" dur="2.5s" repeatCount="indefinite" begin="3.5s" />
                    </rect>
                    <rect x="110" y="155" width="6" height="8" fill="#87CEEB" rx="1" />
                    <rect x="120" y="155" width="6" height="8" fill="#FFE066" rx="1" />
                    <rect x="130" y="155" width="6" height="8" fill="#87CEEB" rx="1" />
                    <rect x="110" y="175" width="6" height="8" fill="#FFE066" rx="1" />
                    <rect x="120" y="175" width="6" height="8" fill="#87CEEB" rx="1" />
                    <rect x="130" y="175" width="6" height="8" fill="#FFE066" rx="1" />
                  </g>
                  
                  {/* Windows for Main Building */}
                  <g>
                    <rect x="170" y="115" width="7" height="9" fill="#FFE066" rx="1">
                      <animate attributeName="fill" values="#FFE066;#FFF;#FFE066" dur="1.8s" repeatCount="indefinite" begin="4s" />
                    </rect>
                    <rect x="182" y="115" width="7" height="9" fill="#87CEEB" rx="1" />
                    <rect x="194" y="115" width="7" height="9" fill="#FFE066" rx="1" />
                    <rect x="170" y="135" width="7" height="9" fill="#87CEEB" rx="1" />
                    <rect x="182" y="135" width="7" height="9" fill="#FFE066" rx="1" />
                    <rect x="194" y="135" width="7" height="9" fill="#87CEEB" rx="1" />
                    <rect x="170" y="155" width="7" height="9" fill="#FFE066" rx="1" />
                    <rect x="182" y="155" width="7" height="9" fill="#87CEEB" rx="1" />
                    <rect x="194" y="155" width="7" height="9" fill="#FFE066" rx="1">
                      <animate attributeName="fill" values="#FFE066;#FFF;#FFE066" dur="2.2s" repeatCount="indefinite" begin="4.5s" />
                    </rect>
                  </g>
                  
                  {/* Ground */}
                  <rect x="0" y="280" width="400" height="20" fill="#4A5D23" opacity="0.3" />
                  
                  {/* Trees */}
                  <g>
                    <rect x="25" y="260" width="4" height="20" fill="#8B4513" />
                    <circle cx="27" cy="255" r="8" fill="#228B22" opacity="0.8" />
                  </g>
                  
                  <g>
                    <rect x="370" y="265" width="3" height="15" fill="#8B4513" />
                    <circle cx="372" cy="260" r="6" fill="#228B22" opacity="0.8" />
                  </g>
                </svg>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 left-4 bg-white rounded-xl shadow-lg p-4 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building className="w-4 h-4 text-[#003B95]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Premium PG</div>
                    <div className="text-xs text-gray-500">₹8,000/month</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Home className="w-4 h-4 text-[#003B95]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Cozy Hostel</div>
                    <div className="text-xs text-gray-500">₹5,500/month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};


export default HeroSection;
