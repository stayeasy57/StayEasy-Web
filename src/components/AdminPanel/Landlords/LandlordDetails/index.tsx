"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetLandlordByIdQuery } from "@/store/api/apiSlice";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Crown,
  Building2,
  Home,
  Users,
  Eye,
  FileText,
  Loader2,
  AlertCircle,
  RefreshCw,
  Edit,
  MoreHorizontal,
  MessageSquare,
  TrendingUp,
  Star,
  DollarSign,
  Clock,
  Shield,
  Zap,
} from "lucide-react";

const LandlordDetails: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const landlordId = params?.id as string;

  const {
    data: landlordResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetLandlordByIdQuery(landlordId);

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

  // Format short date helper
  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status badge component
  const StatusBadge = ({
    isActive,
    isVerified,
  }: {
    isActive: boolean;
    isVerified: boolean;
  }) => (
    <div className="flex flex-wrap gap-2">
      <span
        className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
          isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isActive ? (
          <CheckCircle className="w-4 h-4 mr-2" />
        ) : (
          <XCircle className="w-4 h-4 mr-2" />
        )}
        {isActive ? "Active" : "Inactive"}
      </span>
      <span
        className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
          isVerified
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {isVerified ? (
          <CheckCircle className="w-4 h-4 mr-2" />
        ) : (
          <XCircle className="w-4 h-4 mr-2" />
        )}
        {isVerified ? "Verified" : "Pending"}
      </span>
    </div>
  );

  // Property status badge
  const PropertyStatusBadge = ({ property }: { property: any }) => (
    <div className="flex flex-wrap gap-1">
      {property.isPublished && (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          Published
        </span>
      )}
      {property.isDraft && (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          Draft
        </span>
      )}
      {property.isCompleted && (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          Completed
        </span>
      )}
    </div>
  );

  // Navigate back to landlords list
  const handleBackClick = () => {
    router.push("/admin/landlords");
  };

  // Loading component
  const LoadingState = () => (
    <div className="min-h-screen bg-gray-50 ">
      <div className="p-6">
        {/* Loading Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={handleBackClick}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading landlord details...</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Error component
  const ErrorState = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Error Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackClick}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Landlord Details
              </h1>
              <p className="text-gray-600">
                Error loading landlord information
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <p className="text-gray-900 font-semibold mb-2">
              Failed to load landlord details
            </p>
            <p className="text-gray-600 mb-4">
              {(error as any)?.data?.message ||
                (error as any)?.message ||
                "Something went wrong"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => refetch()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
              <button
                onClick={handleBackClick}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Landlords
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Show error state
  if (isError) {
    return <ErrorState />;
  }

  const landlord = landlordResponse?.data;

  if (!landlord) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackClick}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Back to Landlords"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Landlord Details
                </h1>
                <p className="text-gray-600">
                  View and manage landlord information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md hover:bg-gray-50">
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md hover:bg-gray-50">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xl">
                        {landlord.user.fullName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                        {landlord.user.fullName}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Landlord ID: {landlord.id}
                      </p>
                      <p className="text-gray-600 text-sm">
                        User ID: {landlord.userId}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <StatusBadge
                      isActive={landlord.user.isActive}
                      isVerified={landlord.user.isVerified}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900 break-all">
                          {landlord.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">
                          {landlord.user.phoneNumber}
                        </p>
                      </div>
                    </div>
                    {landlord.user.gender && (
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-600">Gender</p>
                          <p className="font-medium text-gray-900 capitalize">
                            {landlord.user.gender}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {landlord.user.address && (
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium text-gray-900">
                            {landlord.user.address}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-medium text-gray-900">
                          {formatShortDate(landlord.user.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                  Properties ({landlord.properties.length})
                </h3>

                {landlord.properties.length > 0 ? (
                  <div className="space-y-4">
                    {landlord.properties.map((property) => (
                      <div
                        key={property.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Home className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-gray-900">
                                  {property.hostelName}
                                </h4>
                                <p className="text-sm text-gray-600 flex items-center mt-1">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {property.hostelAddress},{" "}
                                  {property.hostelCity}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                                    {property.accommodationType}
                                  </span>
                                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                                    {property.propertyGender}
                                  </span>
                                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                    {property.idealFor}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <PropertyStatusBadge property={property} />
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {property.totalViews} views
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {property._count.bookings} bookings
                              </span>
                            </div>
                          </div>
                        </div>

                        {property.description && (
                          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                            {property.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                          <span>Beds: {property.totalBeds}</span>
                          <span>Available: {property.availableBeds}</span>
                          {property.noticePeriodDays && (
                            <span>
                              Notice: {property.noticePeriodDays} days
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No properties added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-sm">
                      Total Properties
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {landlord.properties.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Published</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {landlord.properties.filter((p) => p.isPublished).length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <FileText className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Drafts</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {landlord.properties.filter((p) => p.isDraft).length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700 text-sm">
                      Total Bookings
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {landlord.bookings?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Property Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Property Performance
              </h3>

              {landlord.properties.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Views</span>
                    <span className="font-semibold text-gray-900">
                      {landlord.properties.reduce(
                        (sum, p) => sum + p.totalViews,
                        0
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Unique Views</span>
                    <span className="font-semibold text-gray-900">
                      {landlord.properties.reduce(
                        (sum, p) => sum + p.uniqueViews,
                        0
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Beds</span>
                    <span className="font-semibold text-gray-900">
                      {landlord.properties.reduce(
                        (sum, p) => sum + p.totalBeds,
                        0
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Available Beds
                    </span>
                    <span className="font-semibold text-gray-900">
                      {landlord.properties.reduce(
                        (sum, p) => sum + p.availableBeds,
                        0
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    No performance data available
                  </p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>

              <div className="space-y-4">
                {landlord.properties.slice(0, 3).map((property, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Home className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Property Added
                      </p>
                      <p className="text-xs text-gray-500">
                        {property.hostelName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatShortDate(property.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}

                {landlord.bookings?.slice(0, 2).map((booking, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        New Booking
                      </p>
                      <p className="text-xs text-gray-500">
                        Property booking received
                      </p>
                    </div>
                  </div>
                ))}

                {landlord.properties.length === 0 &&
                  (!landlord.bookings || landlord.bookings.length === 0) && (
                    <div className="text-center py-6">
                      <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">
                        No recent activity
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Account Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Account Created
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(landlord.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Last Updated
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(landlord.updatedAt)}
                    </p>
                  </div>
                </div>

                {landlord.user.isVerified && (
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Account Verified
                      </p>
                      <p className="text-xs text-gray-500">
                        Email verification completed
                      </p>
                    </div>
                  </div>
                )}

                {landlord.properties.length > 0 && (
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-purple-600 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        First Property Added
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(landlord.properties[0].createdAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Call Landlord</span>
                </button>

                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDetails;
