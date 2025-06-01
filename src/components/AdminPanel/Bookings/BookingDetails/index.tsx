"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetBookingByIdQuery,
  useUpdateBookingStatusMutation,
} from "@/store/api/apiSlice";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Loader2,
  AlertCircle,
  RefreshCw,
  Home,
  Building2,
  UserCheck,
  BookOpen,
  DollarSign,
  MapPin,
  User,
  Phone,
  Mail,
  CalendarDays,
  Badge,
  Clock3,
  Ban,
  CheckCheck,
  Users,
  Bed,
  Download,
  Utensils,
  FileText,
  Eye,
} from "lucide-react";

interface BookingDetailsProps {
  params: {
    id: any;
  };
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ params }) => {
  const router = useRouter();
  const bookingId = params.id;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    bookingStatus: "",
    paymentStatus: "",
    isBookingAccepted: false,
    cancellationReason: "",
  });

  // Fetch booking details
  const {
    data: bookingResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetBookingByIdQuery(bookingId);

  // Update booking status mutation
  const [updateBookingStatus, { isLoading: isUpdating }] =
    useUpdateBookingStatusMutation();

  const booking: any = bookingResponse?.data;

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

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate booking duration
  const calculateDuration = (checkIn: string, checkOut: string) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Status badge component
  const StatusBadge = ({
    status,
    type,
  }: {
    status: string;
    type: "booking" | "payment";
  }) => {
    const getStatusConfig = (status: string, type: string) => {
      if (type === "booking") {
        switch (status) {
          case "PENDING":
            return { color: "bg-yellow-100 text-yellow-800", icon: Clock3 };
          case "CONFIRMED":
            return { color: "bg-green-100 text-green-800", icon: CheckCircle };
          case "CANCELLED":
            return { color: "bg-red-100 text-red-800", icon: Ban };
          case "COMPLETED":
            return { color: "bg-blue-100 text-blue-800", icon: CheckCheck };
          default:
            return { color: "bg-gray-100 text-gray-800", icon: Clock3 };
        }
      } else {
        switch (status) {
          case "PENDING":
            return { color: "bg-yellow-100 text-yellow-800", icon: Clock };
          case "PAID":
            return { color: "bg-green-100 text-green-800", icon: CheckCircle };
          case "REFUNDED":
            return { color: "bg-blue-100 text-blue-800", icon: RefreshCw };
          case "FAILED":
            return { color: "bg-red-100 text-red-800", icon: XCircle };
          default:
            return { color: "bg-gray-100 text-gray-800", icon: Clock };
        }
      }
    };

    const config = getStatusConfig(status, type);
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${config.color}`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {status}
      </span>
    );
  };

  // Handle status update
  // const handleStatusUpdate = async () => {
  //   try {
  //     await updateBookingStatus({
  //       id: bookingId,
  //       ...updateData,
  //     }).unwrap();
  //     setShowUpdateModal(false);
  //     refetch();
  //   } catch (error) {
  //     console.error("Failed to update booking status:", error);
  //   }
  // };

  // Loading component
  const LoadingState = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Error component
  const ErrorState = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <p className="text-gray-900 font-semibold mb-2">
              Failed to load booking details
            </p>
            <p className="text-gray-600 mb-4">
              {(error as any)?.data?.message ||
                (error as any)?.message ||
                "Something went wrong"}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) return <LoadingState />;

  // Show error state
  if (isError || !booking) return <ErrorState />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-md border border-gray-300 hover:bg-gray-50"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Booking Details
                </h1>
                <p className="text-gray-600">
                  Booking #{booking.id} • {booking.property.hostelName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setUpdateData({
                    bookingStatus: booking.bookingStatus,
                    paymentStatus: booking.paymentStatus,
                    isBookingAccepted: booking.isBookingAccepted,
                    cancellationReason: booking.cancellationReason || "",
                  });
                  setShowUpdateModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Update Status</span>
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Booking Status
                </p>
                <StatusBadge status={booking.bookingStatus} type="booking" />
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Payment Status
                </p>
                <StatusBadge status={booking.paymentStatus} type="payment" />
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Acceptance
                </p>
                <span
                  className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                    booking.isBookingAccepted
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {booking.isBookingAccepted ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <Clock className="w-4 h-4 mr-2" />
                  )}
                  {booking.isBookingAccepted ? "Accepted" : "Pending"}
                </span>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(booking.totalBill)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Booking Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Date
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                      {formatShortDate(booking.checkInDate)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out Date
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                      {formatShortDate(booking.checkOutDate)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {calculateDuration(
                        booking.checkInDate,
                        booking.checkOutDate
                      )}{" "}
                      days
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Beds
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <Bed className="w-4 h-4 mr-2 text-gray-400" />
                      {booking.numberOfBeds}{" "}
                      {booking.numberOfBeds === 1 ? "bed" : "beds"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type
                    </label>
                    <span className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
                      {booking.roomType.occupancyType}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Created
                    </label>
                    <p className="text-sm text-gray-900">
                      {formatDate(booking.createdAt)}
                    </p>
                  </div>
                </div>

                {booking.cancelledAt && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <h4 className="text-sm font-medium text-red-800 mb-2">
                      Cancellation Details
                    </h4>
                    <p className="text-sm text-red-700">
                      Cancelled on: {formatDate(booking.cancelledAt)}
                    </p>
                    {booking.cancellationReason && (
                      <p className="text-sm text-red-700 mt-1">
                        Reason: {booking.cancellationReason}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Property Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Property Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {booking.property.hostelName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {booking.property.hostelAddress}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <p className="text-sm text-gray-900">
                      {booking.property.hostelCity}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landmark
                    </label>
                    <p className="text-sm text-gray-900">
                      {booking.property.landmark}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Owner
                    </label>
                    <p className="text-sm text-gray-900">
                      {booking.property.ownerName}
                    </p>
                    <p className="text-xs text-gray-600">
                      {booking.property.ownerContact}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <div className="flex space-x-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {booking.property.accommodationType}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {booking.property.propertyGender}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ideal For
                    </label>
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {booking.property.idealFor}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Beds
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      {booking.property.totalBeds} total (
                      {booking.property.availableBeds} available)
                    </p>
                  </div>
                </div>

                {booking.property.description && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                      {booking.property.description}
                    </p>
                  </div>
                )}

                {/* Facilities */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Facilities
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {booking.property.roomFacilities.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-2">
                          Room Facilities
                        </p>
                        <div className="space-y-1">
                          {booking.property.roomFacilities.map(
                            (facility: any, index: number) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded mr-1 mb-1"
                              >
                                {facility}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {booking.property.basicFacilities.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-2">
                          Basic Facilities
                        </p>
                        <div className="space-y-1">
                          {booking.property.basicFacilities.map(
                            (facility: any, index: number) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 text-xs bg-green-50 text-green-700 rounded mr-1 mb-1"
                              >
                                {facility}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {booking.property.otherFacilities.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-2">
                          Other Facilities
                        </p>
                        <div className="space-y-1">
                          {booking.property.otherFacilities.map(
                            (facility: any, index: number) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded mr-1 mb-1"
                              >
                                {facility}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Food Service */}
                {booking.property.isProvidedFood && (
                  <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-md">
                    <div className="flex items-center mb-3">
                      <Utensils className="w-5 h-5 mr-2 text-orange-600" />
                      <h4 className="text-sm font-medium text-orange-800">
                        Food Service Available
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-orange-700 mb-1">
                          Meals Provided
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {booking.property.mealProvided.map(
                            (meal: any, index: number) => (
                              <span
                                key={index}
                                className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded"
                              >
                                {meal}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-orange-700 mb-1">
                          Food Types
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {booking.property.foodType.map(
                            (type: any, index: number) => (
                              <span
                                key={index}
                                className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded"
                              >
                                {type}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Payment */}
          <div className="space-y-8">
            {/* Tenant Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Tenant Information
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {booking.tenant.user.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {booking.tenant.user.fullName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ID: {booking.tenant.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Email Addresses
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">
                      {booking.tenant.user.email}
                    </p>
                    {booking.tenant.tenantEmail &&
                      booking.tenant.tenantEmail !==
                        booking.tenant.user.email && (
                        <p className="text-sm text-gray-900 ml-6">
                          {booking.tenant.tenantEmail}
                        </p>
                      )}
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Phone
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">
                      {booking.tenant.user.phoneNumber}
                    </p>
                  </div>

                  {booking.tenant.universityOrOffice && (
                    <div>
                      <div className="flex items-center mb-1">
                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          University/Office
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 ml-6">
                        {booking.tenant.universityOrOffice}
                      </p>
                    </div>
                  )}

                  {booking.tenant.semesterOrDesignation && (
                    <div>
                      <div className="flex items-center mb-1">
                        <Badge className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          Position/Semester
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 ml-6">
                        {booking.tenant.semesterOrDesignation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Landlord Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Landlord Information
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {booking.landlord.user.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {booking.landlord.user.fullName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ID: {booking.landlord.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Email
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">
                      {booking.landlord.user.email}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Phone
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">
                      {booking.landlord.user.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Payment Breakdown
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Rent Amount
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(booking.rentAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Security Deposit
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(booking.securityDeposit)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold text-gray-900">
                        Total Amount
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(booking.totalBill)}
                      </span>
                    </div>
                  </div>
                </div>

                {booking.payments && booking.payments.length > 0 ? (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Payment History
                    </h4>
                    <div className="space-y-2">
                      {booking.payments.map((payment: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(payment.amount)}
                            </p>
                            <p className="text-xs text-gray-600">
                              {formatDate(payment.createdAt)}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              payment.status === "PAID"
                                ? "bg-green-100 text-green-800"
                                : payment.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 p-4 bg-gray-50 rounded-md text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      No payment history available
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Room Type Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Bed className="w-5 h-5 mr-2" />
                  Room Information
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Occupancy Type
                    </label>
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
                      {booking.roomType.occupancyType}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Count
                    </label>
                    <p className="text-sm text-gray-900">
                      {booking.roomType.roomCount} rooms available
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Beds in Room Type
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <Bed className="w-4 h-4 mr-2 text-gray-400" />
                      {booking.roomType.totalBeds} beds
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room Type Pricing
                    </label>
                    <div className="text-sm text-gray-900">
                      <p>Rent: {formatCurrency(booking.roomType.rentAmount)}</p>
                      <p>
                        Deposit:{" "}
                        {formatCurrency(booking.roomType.securityDeposit)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Documents */}
            {booking.property.propertyDocuments &&
              booking.property.propertyDocuments.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Property Documents
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {booking.property.propertyDocuments.map(
                        (doc: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-3 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                Document {index + 1}
                              </span>
                            </div>
                            <button
                              onClick={() => window.open(doc, "_blank")}
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Update Status Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Update Booking Status
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking Status
                    </label>
                    <select
                      value={updateData.bookingStatus}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          bookingStatus: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Keep Current Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Status
                    </label>
                    <select
                      value={updateData.paymentStatus}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          paymentStatus: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Keep Current Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="REFUNDED">Refunded</option>
                      <option value="FAILED">Failed</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={updateData.isBookingAccepted}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            isBookingAccepted: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Mark as Accepted
                      </span>
                    </label>
                  </div>

                  {updateData.bookingStatus === "CANCELLED" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cancellation Reason
                      </label>
                      <textarea
                        value={updateData.cancellationReason}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            cancellationReason: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter cancellation reason..."
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    // onClick={handleStatusUpdate}
                    disabled={isUpdating}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <div className="flex items-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </div>
                    ) : (
                      "Update Status"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
