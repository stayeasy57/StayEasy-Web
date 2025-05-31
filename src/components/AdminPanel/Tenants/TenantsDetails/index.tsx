"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetTenantByIdQuery } from "@/store/api/apiSlice";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  GraduationCap,
  Building2,
  UserCheck,
  Users,
  Heart,
  FileText,
  Loader2,
  AlertCircle,
  RefreshCw,
  Edit,
  MoreHorizontal,
  MessageSquare,
  Home,
  Clock,
  UserPlus,
} from "lucide-react";

const TenantDetails: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const tenantId = params?.id as string;

  const {
    data: tenantResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTenantByIdQuery(tenantId);

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

  // Navigate back to tenants list
  const handleBackClick = () => {
    router.push("/admin/tenants");
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
            <p className="text-gray-600">Loading tenant details...</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Error component
  const ErrorState = () => (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
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
                Tenant Details
              </h1>
              <p className="text-gray-600">Error loading tenant information</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <p className="text-gray-900 font-semibold mb-2">
              Failed to load tenant details
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
                Back to Tenants
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

  const tenant = tenantResponse?.data;

  if (!tenant) {
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
                title="Back to Tenants"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Tenant Details
                </h1>
                <p className="text-gray-600">
                  View and manage tenant information
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
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xl">
                        {tenant.user.fullName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                        {tenant.user.fullName}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Tenant ID: {tenant.id}
                      </p>
                      <p className="text-gray-600 text-sm">
                        User ID: {tenant.userId}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <StatusBadge
                      isActive={tenant.user.isActive}
                      isVerified={tenant.user.isVerified}
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
                          {tenant.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">
                          {tenant.user.phoneNumber}
                        </p>
                      </div>
                    </div>
                    {tenant.user.gender && (
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-600">Gender</p>
                          <p className="font-medium text-gray-900">
                            {tenant.user.gender}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {tenant.user.address && (
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium text-gray-900">
                            {tenant.user.address}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-medium text-gray-900">
                          {formatShortDate(tenant.user.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Professional Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {tenant.instituteOrOfficeName ? (
                      <div>
                        <p className="text-sm text-gray-600">
                          Institute/Office Name
                        </p>
                        <p className="font-medium text-gray-900">
                          {tenant.instituteOrOfficeName}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">
                          Institute/Office Name
                        </p>
                        <p className="text-gray-400 italic">Not specified</p>
                      </div>
                    )}
                    {tenant.universityOrOffice ? (
                      <div>
                        <p className="text-sm text-gray-600">
                          University/Office
                        </p>
                        <p className="font-medium text-gray-900">
                          {tenant.universityOrOffice}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">
                          University/Office
                        </p>
                        <p className="text-gray-400 italic">Not specified</p>
                      </div>
                    )}
                    {tenant.semesterOrDesignation ? (
                      <div>
                        <p className="text-sm text-gray-600">
                          Semester/Designation
                        </p>
                        <p className="font-medium text-gray-900">
                          {tenant.semesterOrDesignation}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">
                          Semester/Designation
                        </p>
                        <p className="text-gray-400 italic">Not specified</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {tenant.instituteOrOfficeAddress ? (
                      <div>
                        <p className="text-sm text-gray-600">
                          Institute/Office Address
                        </p>
                        <p className="font-medium text-gray-900">
                          {tenant.instituteOrOfficeAddress}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">
                          Institute/Office Address
                        </p>
                        <p className="text-gray-400 italic">Not specified</p>
                      </div>
                    )}
                    {tenant.tenantName ? (
                      <div>
                        <p className="text-sm text-gray-600">Tenant Name</p>
                        <p className="font-medium text-gray-900">
                          {tenant.tenantName}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">Tenant Name</p>
                        <p className="text-gray-400 italic">Not specified</p>
                      </div>
                    )}
                    {tenant.tenantEmail ? (
                      <div>
                        <p className="text-sm text-gray-600">Tenant Email</p>
                        <p className="font-medium text-gray-900 break-all">
                          {tenant.tenantEmail}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">Tenant Email</p>
                        <p className="text-gray-400 italic">Not specified</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Family Information Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Family Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Father's Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">
                      Father's Information
                    </h4>
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">
                        {tenant.fatherName || (
                          <span className="text-gray-400 italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-medium text-gray-900">
                        {tenant.fatherContact || (
                          <span className="text-gray-400 italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Occupation</p>
                      <p className="font-medium text-gray-900">
                        {tenant.fatherOccupation || (
                          <span className="text-gray-400 italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Mother's Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">
                      Mother's Information
                    </h4>
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">
                        {tenant.motherName || (
                          <span className="text-gray-400 italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-medium text-gray-900">
                        {tenant.motherContact || (
                          <span className="text-gray-400 italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Occupation</p>
                      <p className="font-medium text-gray-900">
                        {tenant.motherOccupation || (
                          <span className="text-gray-400 italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
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
                      Total Bookings
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {tenant.bookings?.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Heart className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Reviews Given</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {tenant.reviews?.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">Documents</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {tenant.documents?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>

              {tenant.bookings?.length > 0 || tenant.reviews?.length > 0 ? (
                <div className="space-y-4">
                  {tenant.bookings?.slice(0, 3).map((booking, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Home className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          New Booking
                        </p>
                        <p className="text-xs text-gray-500">
                          Property booking created
                        </p>
                      </div>
                    </div>
                  ))}

                  {tenant.reviews?.slice(0, 2).map((review, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Heart className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Review Posted
                        </p>
                        <p className="text-xs text-gray-500">
                          Left a property review
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No recent activity</p>
                </div>
              )}
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
                      {formatDate(tenant.createdAt)}
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
                      {formatDate(tenant.updatedAt)}
                    </p>
                  </div>
                </div>

                {tenant.user.isVerified && (
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDetails;
