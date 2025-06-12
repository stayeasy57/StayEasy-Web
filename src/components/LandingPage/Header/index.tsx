'use client';

import React, { useState } from 'react';
import { Search, Menu, X, Home, Users, Building, Smartphone, MapPin, Star, Shield, Clock } from 'lucide-react';

import { useDispatch, useSelector, UseSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';



const Header = () => {

  const router = useRouter();

    const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleLogout = async () => {
    dispatch(logout({ reason: "User logged out" } as any));
    router.push("/login");
  };


  const handleLogo = ()=>{
    router.push('/');
  }

  const handleLogin = () => {
    router.push("/login");
  }

  const handleSignup = () => {
    router.push("/signup");
  }

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogo}>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg">
              <img src="/navbar-logo.png" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-white">
                StayEasy
              </h1>
              <p className="text-xs text-white -mt-1">Find your perfect stay</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-white/80 font-medium transition-colors duration-200 flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Find Deals</span>
            </a>
            <a href="#" className="text-white hover:text-white/80 font-medium transition-colors duration-200 flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Premium Places</span>
            </a>
            <a href="#" className="text-white hover:text-white/80 font-medium transition-colors duration-200 flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Hostel / PG</span>
            </a>
            <a href="#" className="text-white hover:text-white/80 font-medium transition-colors duration-200 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>For Business</span>
            </a>
            <a href="#" className="text-white hover:text-white/80 font-medium transition-colors duration-200 flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span>Mobile Apps</span>
            </a>
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#003B95] to-[#0056D6] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.fullName?.charAt(0)}
                    </span>
                  </div>
                  <span className="text-white font-medium">{user?.fullName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white hover:text-white/80 font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-white hover:text-white/80 font-medium transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="px-6 py-2 bg-gradient-to-r from-[#003B95] to-[#0056D6] text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <a href="#" className="block py-2 text-gray-700 hover:text-[#003B95] font-medium">Find Deals</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-[#003B95] font-medium">Premium Places</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-[#003B95] font-medium">Hostel / PG</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-[#003B95] font-medium">For Business</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-[#003B95] font-medium">Mobile Apps</a>
              
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#003B95] to-[#0056D6] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user?.fullName?.charAt(0)}
                        </span>
                      </div>
                      <span className="text-white font-medium">{user?.fullName}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleLogin}
                      className="block w-full text-left py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleSignup}
                      className="block w-full px-4 py-2 bg-gradient-to-r from-[#003B95] to-[#0056D6] text-white rounded-lg font-medium text-center"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;