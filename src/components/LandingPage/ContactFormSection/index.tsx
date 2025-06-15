"use client";
import React, { useState } from "react";
import { useSubmitContactFormMutation } from "@/store/api/apiSlice";
import MessageBar from "@/components/ui/MessageBar";

interface ContactFormProps {
  // You can add custom props here if needed
}

const ContactFormSection: React.FC<ContactFormProps> = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
    category: "GENERAL_INQUIRY" as const,
    priority: "MEDIUM" as const
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  // RTK Query mutation hook
  const [submitContactForm, { isLoading: isSubmitting }] = useSubmitContactFormMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType(null);

    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setMessage("Please fill in all required fields.");
      setMessageType("error");
      return;
    }

    try {
      const result = await submitContactForm(formData).unwrap();
      
      // Show success message
      setMessage("Message sent successfully! We'll get back to you soon.");
      setMessageType("success");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
        category: "GENERAL_INQUIRY",
        priority: "MEDIUM"
      });

   

    } catch (error: any) {
      // Handle error
      const errorMessage = error?.data?.message || "Something went wrong. Please try again.";
      setMessage(errorMessage);
      setMessageType("error");
      
 
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12 min-h-screen">
      <div className="animate-fadeIn">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2 transform transition-all duration-500 hover:scale-105">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8 animate-slideUp">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side - Contact Form */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl animate-slideInLeft">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={() => handleFocus('firstName')}
                    onBlur={handleBlur}
                    required
                    className={`w-full p-4 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white transform ${
                      focusedField === 'firstName' 
                        ? 'border-blue-500 scale-105 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={() => handleFocus('lastName')}
                    onBlur={handleBlur}
                    required
                    className={`w-full p-4 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white transform ${
                      focusedField === 'lastName' 
                        ? 'border-blue-500 scale-105 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                  className={`w-full p-4 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white transform ${
                    focusedField === 'email' 
                      ? 'border-blue-500 scale-105 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+92 321 1234567"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onFocus={() => handleFocus('phoneNumber')}
                  onBlur={handleBlur}
                  className={`w-full p-4 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white transform ${
                    focusedField === 'phoneNumber' 
                      ? 'border-blue-500 scale-105 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  required
                  className={`w-full p-4 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white transform ${
                    focusedField === 'subject' 
                      ? 'border-blue-500 scale-105 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onFocus={() => handleFocus('category')}
                    onBlur={handleBlur}
                    className={`w-full p-4 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white transform ${
                      focusedField === 'category' 
                        ? 'border-blue-500 scale-105 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <option value="GENERAL_INQUIRY">General Inquiry</option>
                    <option value="TECHNICAL_SUPPORT">Technical Support</option>
                    <option value="BILLING">Billing</option>
                    <option value="PROPERTY_LISTING">Property Listing</option>
                    <option value="TENANT_SUPPORT">Tenant Support</option>
                    <option value="LANDLORD_SUPPORT">Landlord Support</option>
                    <option value="PARTNERSHIP">Partnership</option>
                    <option value="FEEDBACK">Feedback</option>
                    <option value="COMPLAINT">Complaint</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="priority"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    onFocus={() => handleFocus('priority')}
                    onBlur={handleBlur}
                    className={`w-full p-4 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white transform ${
                      focusedField === 'priority' 
                        ? 'border-blue-500 scale-105 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Please describe your inquiry in detail..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  rows={5}
                  className={`w-full p-4 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:bg-white resize-none transform ${
                    focusedField === 'message' 
                      ? 'border-blue-500 scale-105 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
              </div>

              {/* Message Bar for Success/Error */}
              <MessageBar 
                message={message} 
                type={messageType} 
              />

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Support Team Images */}
        <div className="lg:w-1/2 w-full flex items-center pt-[130px] justify-center relative animate-slideInRight">
          <div className="relative w-full max-w-lg">
            {/* Floating Message Bubbles */}
            <div className="absolute -top-6 left-1/4 bg-white px-6 py-3 rounded-full shadow-lg border animate-bounce z-10">
              <p className="text-sm font-medium text-gray-700">We are always here to help 🤝</p>
            </div>

            <div className="absolute top-32 -right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-10">
              <p className="text-sm font-medium">Hello There! 👋</p>
            </div>

            <div className="absolute bottom-16 -left-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce z-10" style={{ animationDelay: '1s' }}>
              <p className="text-sm font-medium">24/7 Support ⭐</p>
            </div>

            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105">
              {/* Animated Background Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-green-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              {/* Customer Support Representative Images */}
              <div className="flex justify-center items-center space-x-4 mb-6">
                {/* Agent 1 */}
                <div className="relative transform transition-all duration-300 hover:scale-110 animate-slideInLeft">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-1 shadow-lg">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">👨‍💼</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>

                {/* Agent 2 */}
                <div className="relative transform transition-all duration-300 hover:scale-110 animate-slideInRight" style={{ animationDelay: '0.3s' }}>
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-1 shadow-xl">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">👩‍💼</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>

                {/* Agent 3 */}
                <div className="relative transform transition-all duration-300 hover:scale-110 animate-slideInLeft" style={{ animationDelay: '0.6s' }}>
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full p-1 shadow-lg">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">👨‍💻</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="text-center animate-fadeIn" style={{ animationDelay: '1s' }}>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 animate-slideUp">Get in Touch</h3>
                <p className="text-gray-600 mb-6 animate-slideUp" style={{ animationDelay: '1.2s' }}>Our team typically responds within 24 hours</p>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2 animate-slideUp" style={{ animationDelay: '1.4s' }}>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">📧</span>
                    </div>
                    <p className="font-medium">stayeasy57@gmail.com</p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 animate-slideUp" style={{ animationDelay: '1.6s' }}>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">📞</span>
                    </div>
                    <p className="font-medium">+92 301 5846975</p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 animate-slideUp" style={{ animationDelay: '1.8s' }}>
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">⏰</span>
                    </div>
                    <p className="font-medium">Mon-Fri 9AM-6PM PKT</p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute top-20 left-8 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center animate-bounce opacity-70" style={{ animationDelay: '3s' }}>
              <span className="text-yellow-800 text-sm">💡</span>
            </div>
            
            <div className="absolute bottom-32 right-8 w-10 h-10 bg-red-300 rounded-full flex items-center justify-center animate-pulse opacity-70" style={{ animationDelay: '4s' }}>
              <span className="text-red-800 text-lg">❤️</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out 0.2s both;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out 0.4s both;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
};

export default ContactFormSection;