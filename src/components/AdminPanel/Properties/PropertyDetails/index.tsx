"use client";
import React, { useState } from "react";
import {
  Building2,
  MapPin,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Bed,
  UtensilsCrossed,
  Home,
  Utensils,
  Shield,
  Star,
  MessageSquare,
  Edit,
  ArrowLeft,
  Check,
  X,
  Eye,
  ImageIcon,
  Wifi,
  Car,
  Coffee,
  Tv,
  AirVent,
  Bath,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
} from "lucide-react";

interface Property {
  id: number;
  landlordId: number;
  ownerName: string;
  ownerContact: string;
  ownerEmail: string;
  hostelName: string;
  hostelAddress: string;
  landmark: string;
  hostelCity: string;
  latLong: any[];
  step: number;
  accommodationType: string;
  propertyGender: string;
  idealFor: string;
  description: string | null;
  isProvidedFood: boolean;
  mealProvided: string[];
  foodType: string[];
  roomFacilities: string[];
  basicFacilities: string[];
  otherFacilities: string[];
  roomImages: any[];
  messImages: any[];
  washroomImages: any[];
  otherImages: any[];
  noticePeriodDays: number | null;
  isDraft: boolean;
  isCompleted: boolean;
  isPublished: boolean;
  totalBeds: number;
  availableBeds: number;
  createdAt: string;
  updatedAt: string;
  landlord: {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    user: {
      fullName: string;
      email: string;
      phoneNumber: string;
    };
  };
  _count: {
    roomTypes: number;
    bookings: number;
    reviews: number;
  };
}

const PropertyDetails: React.FC = () => {
  // Sample property data
  const [property] = useState<Property>({
    id: 1,
    landlordId: 1,
    ownerName: "Asim Maqsood ",
    ownerContact: "34578999963",
    ownerEmail: "asimmaqsood57@gmail.com",
    hostelName: "Aayat Boys Hostel ",
    hostelAddress: "h13",
    landmark: "NUST University ",
    hostelCity: "Islamabad ",
    latLong: [],
    step: 3,
    accommodationType: "HOSTEL",
    propertyGender: "BOYS",
    idealFor: "STUDENTS",
    description: null,
    isProvidedFood: true,
    mealProvided: ["Breakfast", "High Tea", "Dinner"],
    foodType: ["All"],
    roomFacilities: ["Bed", "Study Table"],
    basicFacilities: ["Refrigerator", "Hot water"],
    otherFacilities: ["Self Cooking", "Induction"],
    roomImages: [],
    messImages: [],
    washroomImages: [],
    otherImages: [],
    noticePeriodDays: null,
    isDraft: true,
    isCompleted: false,
    isPublished: false,
    totalBeds: 0,
    availableBeds: 0,
    createdAt: "2025-05-24T16:39:40.331Z",
    updatedAt: "2025-05-24T16:40:13.900Z",
    landlord: {
      id: 1,
      userId: 1,
      createdAt: "2025-05-24T16:35:51.530Z",
      updatedAt: "2025-05-24T16:35:51.530Z",
      user: {
        fullName: "landlord",
        email: "landlord@example.com",
        phoneNumber: "3015846975",
      },
    },
    _count: {
      roomTypes: 0,
      bookings: 0,
      reviews: 0,
    },
  });

  const [expandedSections, setExpandedSections] = useState({
    facilities: true,
    meals: true,
    images: true,
    landlord: true,
  });

  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "approve" | "reject" | null
  >(null);
  const [actionReason, setActionReason] = useState("");

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge
  const getStatusBadge = () => {
    if (property.isPublished) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-4 h-4 mr-2" />
          Published
        </span>
      );
    } else if (property.isDraft) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-4 h-4 mr-2" />
          Draft - Pending Review
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <XCircle className="w-4 h-4 mr-2" />
          Rejected
        </span>
      );
    }
  };

  // Get completion badge
  const getCompletionBadge = () => {
    const percentage = (property.step / 5) * 100;
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600">{property.step}/5 Steps</span>
      </div>
    );
  };

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle action button clicks
  const handleAction = (action: "approve" | "reject") => {
    setSelectedAction(action);
    setActionModalOpen(true);
  };

  // Handle action confirmation
  const confirmAction = () => {
    console.log(`${selectedAction} property with reason:`, actionReason);
    setActionModalOpen(false);
    setSelectedAction(null);
    setActionReason("");
    // Here you would make the API call to approve/reject
  };

  // Get facility icon
  const getFacilityIcon = (facility: string) => {
    const lowercaseFacility = facility.toLowerCase();
    if (
      lowercaseFacility.includes("wifi") ||
      lowercaseFacility.includes("internet")
    )
      return <Wifi className="w-4 h-4" />;
    if (
      lowercaseFacility.includes("parking") ||
      lowercaseFacility.includes("car")
    )
      return <Car className="w-4 h-4" />;
    if (
      lowercaseFacility.includes("coffee") ||
      lowercaseFacility.includes("tea")
    )
      return <Coffee className="w-4 h-4" />;
    if (
      lowercaseFacility.includes("tv") ||
      lowercaseFacility.includes("television")
    )
      return <Tv className="w-4 h-4" />;
    if (lowercaseFacility.includes("ac") || lowercaseFacility.includes("air"))
      return <AirVent className="w-4 h-4" />;
    if (
      lowercaseFacility.includes("bath") ||
      lowercaseFacility.includes("shower")
    )
      return <Bath className="w-4 h-4" />;
    return <Home className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Property Review
                </h1>
                <p className="text-sm text-gray-500">ID: {property.id}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {getStatusBadge()}
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {property.hostelName}
                      </h2>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>
                          {property.hostelAddress}, {property.hostelCity}
                        </span>
                      </div>
                      {property.landmark && (
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <span>Near: {property.landmark}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Property Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {property.accommodationType}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {property.propertyGender}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {property.idealFor}
                  </span>
                  {property.isProvidedFood && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      Food Provided
                    </span>
                  )}
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {property.totalBeds || "N/A"}
                    </div>
                    <div className="text-sm text-gray-600">Total Beds</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {property._count.roomTypes}
                    </div>
                    <div className="text-sm text-gray-600">Room Types</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {property._count.bookings}
                    </div>
                    <div className="text-sm text-gray-600">Bookings</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {property._count.reviews}
                    </div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                </div>

                {/* Completion Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Setup Progress
                    </span>
                    <span className="text-sm text-gray-500">
                      {property.isCompleted ? "Complete" : "Incomplete"}
                    </span>
                  </div>
                  {getCompletionBadge()}
                </div>

                {/* Description */}
                {property.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Facilities Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <button
                  onClick={() => toggleSection("facilities")}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Facilities & Amenities
                  </h3>
                  {expandedSections.facilities ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {expandedSections.facilities && (
                  <div className="mt-4 space-y-6">
                    {/* Room Facilities */}
                    <div>
                      <h4 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                        <Bed className="w-4 h-4 mr-2" />
                        Room Facilities
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {property.roomFacilities.map((facility, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-blue-50 rounded-md"
                          >
                            {getFacilityIcon(facility)}
                            <span className="text-sm text-gray-700">
                              {facility}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Basic Facilities */}
                    <div>
                      <h4 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                        <Home className="w-4 h-4 mr-2" />
                        Basic Facilities
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {property.basicFacilities.map((facility, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-green-50 rounded-md"
                          >
                            {getFacilityIcon(facility)}
                            <span className="text-sm text-gray-700">
                              {facility}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Other Facilities */}
                    {property.otherFacilities.length > 0 && (
                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          Additional Facilities
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {property.otherFacilities.map((facility, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 p-2 bg-purple-50 rounded-md"
                            >
                              {getFacilityIcon(facility)}
                              <span className="text-sm text-gray-700">
                                {facility}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Meals Section */}
            {property.isProvidedFood && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <button
                    onClick={() => toggleSection("meals")}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <UtensilsCrossed className="w-5 h-5 mr-2" />
                      Food & Meals
                    </h3>
                    {expandedSections.meals ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedSections.meals && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-2">
                          Meals Provided
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {property.mealProvided.map((meal, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                            >
                              {meal}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-800 mb-2">
                          Food Type
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {property.foodType.map((type, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Images Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <button
                  onClick={() => toggleSection("images")}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Property Images
                  </h3>
                  {expandedSections.images ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {expandedSections.images && (
                  <div className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Placeholder images */}
                      {[
                        "Room Images",
                        "Mess Images",
                        "Washroom Images",
                        "Other Images",
                      ].map((category, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
                        >
                          <div className="text-center">
                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">{category}</p>
                            <p className="text-xs text-gray-400">
                              No images uploaded
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Landlord Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <button
                  onClick={() => toggleSection("landlord")}
                  className="flex items-center justify-between w-full text-left mb-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Landlord Information
                  </h3>
                  {expandedSections.landlord ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {expandedSections.landlord && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {property.ownerName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {property.ownerName}
                        </h4>
                        <p className="text-sm text-gray-500">Property Owner</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {property.ownerEmail}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {property.ownerContact}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-800 mb-2">
                        Account Details
                      </h5>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div>Landlord ID: {property.landlord.id}</div>
                        <div>User ID: {property.landlord.userId}</div>
                        <div>
                          Joined: {formatDate(property.landlord.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Property Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Property Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Created
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(property.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Last Updated
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(property.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Review Actions
                </h3>

                {!property.isCompleted && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                      <p className="text-sm text-yellow-800">
                        Property setup is incomplete
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={() => handleAction("approve")}
                    disabled={!property.isCompleted}
                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                      property.isCompleted
                        ? "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve & Publish
                  </button>

                  <button
                    onClick={() => handleAction("reject")}
                    className="w-full flex items-center justify-center px-4 py-3 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject Property
                  </button>

                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Request Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {actionModalOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedAction === "approve"
                ? "Approve Property"
                : "Reject Property"}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedAction === "approve"
                  ? "Approval Notes (Optional)"
                  : "Rejection Reason"}
              </label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder={
                  selectedAction === "approve"
                    ? "Add any notes..."
                    : "Please specify the reason for rejection..."
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setActionModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  selectedAction === "approve"
                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                }`}
              >
                {selectedAction === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
