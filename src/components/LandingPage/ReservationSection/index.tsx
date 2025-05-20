"use client";

import React, { useState } from "react";

import { useSearchParams } from "next/navigation";

const ReservationSection = () => {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    receiveNotifications: false,
    nameOnCard: "",
    cardNumber: "",
    checkInDate: new Date(),
    checkOutDate: new Date(),
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {console.log("searchParams", searchParams?.get("propertyName")) as any}
      <div className="max-w-6xl grid grid-cols-1 xl:grid-cols-12 flex-col  mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 col-span-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Secure your reservation
          </h1>

          {/* Doule Sharing Section */}
          <div className="mb-8 bg-primary rounded-lg p-4 text-white">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">
                {searchParams?.get("roomType")} Sharing
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 rounded-md border-0"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 rounded-md border-0"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile number
            </label>
            <div className="flex">
              <div className="w-1/5 mr-2">
                <div className="relative">
                  <select className="w-full p-3 bg-gray-100 rounded-md border-0 appearance-none pr-8">
                    <option value="+91">+92</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-4/5 p-3 bg-gray-100 rounded-md border-0"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in date
              </label>
              <input
                type="date"
                name="checkInDate"
                defaultValue="2025-02-03"
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 rounded-md border-0"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out date
              </label>
              <input
                type="date"
                name="checkOutDate"
                defaultValue="2025-03-03"
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 rounded-md border-0"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center">
              <button
                type="submit"
                className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md"
                onClick={handleSubmit}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mb-8 bg-primary rounded-lg p-4 text-white">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">Payment Method</h2>
            </div>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-300 pb-2 mb-6">
              <button className="text-blue-800 font-medium pb-2 border-b-2 border-blue-800">
                Debit/Credit Card
              </button>
            </div>

            <div className="flex mb-6">
              <div className="mr-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                  alt="Mastercard"
                  className="h-10"
                />
              </div>
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                  alt="Visa"
                  className="h-10"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name on card
              </label>
              <input
                type="text"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 rounded-md border-0"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Debit/Credit card number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 rounded-md border-0"
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
            </div>

            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Date
                </label>
                <div className="flex">
                  <div className="w-1/2 mr-2">
                    <div className="relative">
                      <select
                        name="expiryMonth"
                        value={formData.expiryMonth}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-100 rounded-md border-0 appearance-none"
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="relative">
                      <select
                        name="expiryYear"
                        value={formData.expiryYear}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-100 rounded-md border-0 appearance-none"
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={2025 + i}>
                            {2025 + i}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 rounded-md border-0"
                  maxLength={3}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <button
                type="submit"
                className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md"
                onClick={handleSubmit}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-white p-4 col-span-4 rounded-lg border border-gray-200">
          <div className="flex flex-col">
            <div className="mb-4">
              <img
                src="https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Stanza Living Hostel"
                className="w-full h-36 object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {searchParams?.get("propertyName")}
            </h3>

            <p className="text-red-500 mb-1">Non refundable</p>
            <p className="text-gray-600 mb-1">
              Check in: {new Date(formData.checkInDate as any).toDateString()}
            </p>
            <p className="text-gray-600 mb-6">
              Check out:
              {new Date(formData.checkOutDate as any).toDateString()}
            </p>

            <h4 className="text-lg font-semibold text-blue-600 mb-4">
              Price Details
            </h4>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Security</span>
                <span className="font-medium">
                  {searchParams.get("securityDeposit")} PKR
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Rent/Month</span>
                <span className="font-medium">
                  {searchParams.get("rentAmount")} PKR
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {searchParams.get("total")} PKR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSection;
