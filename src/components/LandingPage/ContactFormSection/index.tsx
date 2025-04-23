"use client";
import React, { useState } from "react";

interface ContactFormProps {
  // You can add custom props here if needed
}

const ContactFormSection: React.FC<ContactFormProps> = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 bg-white">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Contact Us
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ex: ABC123@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                What can we help you with?
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Type here your message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 bg-gray-100 rounded focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded font-medium transition duration-200"
            >
              Send
            </button>
          </form>
        </div>

        <div className="md:w-1/2 flex items-center justify-center relative">
          <div className="absolute top-[-18px] left-1/4 bg-white px-4 py-2 rounded-full shadow-md">
            <p className="text-sm">We are always here to help</p>
          </div>

          <div className="absolute top-32 right-0 bg-white px-4 py-2 rounded-full shadow-md">
            <p className="text-sm">Hello There !</p>
          </div>

          <div className="flex justify-center">
            <img
              src="/contact-img.png"
              alt="Customer support representatives"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
