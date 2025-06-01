"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
} from "@/store/api/apiSlice";
import {
  ArrowLeft,
  Star,
  StarHalf,
  MessageSquare,
  Edit,
  Loader2,
  AlertCircle,
  RefreshCw,
  Building2,
  User,
  Calendar,
  CalendarDays,
  Phone,
  Mail,
  Badge,
  MapPin,
  Home,
  Clock,
  CheckCircle,
  XCircle,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Download,
  FileText,
} from "lucide-react";

interface ReviewDetailsProps {
  params: {
    id: any;
  };
}

const ReviewDetails: React.FC<ReviewDetailsProps> = ({ params }) => {
  const router = useRouter();
  const reviewId = params.id;
  const [showModerationModal, setShowModerationModal] = useState(false);
  const [moderationData, setModerationData] = useState({
    isActive: true,
    moderationStatus: "",
    moderationNote: "",
  });

  // Fetch review details
  const {
    data: reviewResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetReviewByIdQuery(reviewId);

  // Update review mutation
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  const review: any = reviewResponse?.data;

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

  // Calculate stay duration
  const calculateStayDuration = (checkIn: string, checkOut: string) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Star rating component
  const StarRating = ({
    rating,
    size = "md",
  }: {
    rating: number;
    size?: "sm" | "md" | "lg";
  }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    const starSize =
      size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8";

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className={`${starSize} text-yellow-400 fill-current`}
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className={`${starSize} text-yellow-400 fill-current`}
        />
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />
      );
    }

    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  // Rating badge component
  const RatingBadge = ({ rating }: { rating: number }) => {
    const getRatingColor = (rating: number) => {
      if (rating >= 4.5) return "bg-green-100 text-green-800";
      if (rating >= 3.5) return "bg-blue-100 text-blue-800";
      if (rating >= 2.5) return "bg-yellow-100 text-yellow-800";
      if (rating >= 1.5) return "bg-orange-100 text-orange-800";
      return "bg-red-100 text-red-800";
    };

    const getRatingText = (rating: number) => {
      if (rating >= 4.5) return "Excellent";
      if (rating >= 3.5) return "Good";
      if (rating >= 2.5) return "Average";
      if (rating >= 1.5) return "Poor";
      return "Terrible";
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getRatingColor(
          rating
        )}`}
      >
        <Star className="w-4 h-4 mr-2 fill-current" />
        {rating.toFixed(1)} • {getRatingText(rating)}
      </span>
    );
  };

  // Handle moderation update
  const handleModerationUpdate = async () => {
    try {
      await updateReview({
        id: reviewId,
        ...moderationData,
      }).unwrap();
      setShowModerationModal(false);
      refetch();
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  // Loading component
  const LoadingState = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading review details...</p>
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
              Failed to load review details
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
  if (isError || !review) return <ErrorState />;

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
                  Review Details
                </h1>
                <p className="text-gray-600">
                  Review #{review.id} • {review.property.hostelName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setModerationData({
                    isActive: true,
                    moderationStatus: "",
                    moderationNote: "",
                  });
                  setShowModerationModal(true);
                }}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <Flag className="w-4 h-4" />
                <span>Moderate</span>
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Review Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              {/* Rating Section */}
              <div className="flex-shrink-0 mb-6 lg:mb-0">
                <div className="text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start mb-3">
                    <StarRating rating={review.rating} size="lg" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {review.rating.toFixed(1)}
                  </div>
                  <RatingBadge rating={review.rating} />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Review Content
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-gray-800 leading-relaxed text-base">
                      "{review.review}"
                    </p>
                  </div>
                </div>

                {/* Review Meta */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Reviewed: {formatDate(review.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Review ID: #{review.id}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Last updated: {formatDate(review.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property & Booking Info */}
          <div className="lg:col-span-2 space-y-8">
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
                      {review.property.hostelName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {review.property.hostelAddress}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <p className="text-sm text-gray-900">
                      {review.property.hostelCity}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property ID
                    </label>
                    <p className="text-sm text-gray-900">
                      #{review.property.id}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking ID
                    </label>
                    <p className="text-sm text-gray-900">#{review.bookingId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Booking Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Date
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                      {formatShortDate(review.booking.checkInDate)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out Date
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                      {formatShortDate(review.booking.checkOutDate)}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stay Duration
                    </label>
                    <p className="text-sm text-gray-900 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {calculateStayDuration(
                        review.booking.checkInDate,
                        review.booking.checkOutDate
                      )}{" "}
                      days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Review Actions
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    <span>Approve Review</span>
                  </button>

                  <button className="flex items-center justify-center px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                    <ThumbsDown className="w-5 h-5 mr-2" />
                    <span>Reject Review</span>
                  </button>

                  <button className="flex items-center justify-center px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
                    <Flag className="w-5 h-5 mr-2" />
                    <span>Flag for Review</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Reviewer Info */}
          <div className="space-y-8">
            {/* Reviewer Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Reviewer Information
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">
                      {review.tenant.user.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-900">
                      {review.tenant.user.fullName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Tenant ID: {review.tenant.id}
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
                      {review.tenant.user.email}
                    </p>
                    {review.tenant.tenantEmail &&
                      review.tenant.tenantEmail !==
                        review.tenant.user.email && (
                        <p className="text-sm text-gray-900 ml-6">
                          {review.tenant.tenantEmail}
                        </p>
                      )}
                  </div>

                  {review.tenant.universityOrOffice && (
                    <div>
                      <div className="flex items-center mb-1">
                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          University/Office
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 ml-6">
                        {review.tenant.universityOrOffice}
                      </p>
                    </div>
                  )}

                  {review.tenant.semesterOrDesignation && (
                    <div>
                      <div className="flex items-center mb-1">
                        <Badge className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          Position/Semester
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 ml-6">
                        {review.tenant.semesterOrDesignation}
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center mb-1">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        Member Since
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 ml-6">
                      {formatShortDate(review.tenant.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Statistics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Review Statistics
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Review Length
                    </span>
                    <span className="text-sm text-gray-900">
                      {review.review.length} characters
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Word Count
                    </span>
                    <span className="text-sm text-gray-900">
                      {review.review.split(" ").length} words
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Review Type
                    </span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        review.rating >= 4
                          ? "bg-green-100 text-green-800"
                          : review.rating >= 3
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {review.rating >= 4
                        ? "Positive"
                        : review.rating >= 3
                        ? "Neutral"
                        : "Negative"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Status
                    </span>
                    <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Moderation Modal */}
        {showModerationModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Moderate Review
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={moderationData.isActive.toString()}
                      onChange={(e) =>
                        setModerationData({
                          ...moderationData,
                          isActive: e.target.value === "true",
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="true">Active (Visible)</option>
                      <option value="false">Hidden</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Moderation Status
                    </label>
                    <select
                      value={moderationData.moderationStatus}
                      onChange={(e) =>
                        setModerationData({
                          ...moderationData,
                          moderationStatus: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">No Action</option>
                      <option value="APPROVED">Approved</option>
                      <option value="FLAGGED">Flagged</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Moderation Note
                    </label>
                    <textarea
                      value={moderationData.moderationNote}
                      onChange={(e) =>
                        setModerationData({
                          ...moderationData,
                          moderationNote: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add moderation note (optional)..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowModerationModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleModerationUpdate}
                    disabled={isUpdating}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <div className="flex items-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </div>
                    ) : (
                      "Update Review"
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

export default ReviewDetails;
