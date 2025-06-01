"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetReviewsQuery } from "@/store/api/apiSlice";
import {
  Star,
  StarHalf,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  RefreshCw,
  Building2,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Flag,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

interface ReviewType {
  id: number;
  propertyId: number;
  tenantId: number;
  bookingId: number;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: number;
    hostelName: string;
    hostelCity: string;
  };
  tenant: {
    id: number;
    userId: number;
    fatherName: string;
    fatherContact: string;
    fatherOccupation: string;
    motherName: string;
    motherContact: string;
    motherOccupation: string;
    instituteOrOfficeName: string;
    tenantName: string;
    tenantEmail: string;
    universityOrOffice: string;
    semesterOrDesignation: string;
    instituteOrOfficeAddress: string;
    documents: any[];
    createdAt: string;
    updatedAt: string;
    user: {
      fullName: string;
    };
  };
}

const Reviews: React.FC = () => {
  const router = useRouter();
  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>(
    undefined
  );
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch reviews with RTK Query
  const {
    data: reviewsDataApi,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetReviewsQuery({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
    rating: ratingFilter,
    isActive: activeFilter,
  });

  // Handle review row click
  const handleReviewClick = (reviewId: number) => {
    router.push(`/admin/reviews/${reviewId}`);
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Star rating component
  const StarRating = ({
    rating,
    size = "sm",
  }: {
    rating: number;
    size?: "sm" | "md" | "lg";
  }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    const starSize =
      size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";

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

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getRatingColor(
          rating
        )}`}
      >
        <Star className="w-3 h-3 mr-1 fill-current" />
        {rating.toFixed(1)}
      </span>
    );
  };

  // Action buttons component
  const ActionButtons = ({ reviewId }: { reviewId: number }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleReviewClick(reviewId);
        }}
        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => e.stopPropagation()}
        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
        title="Edit Review"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => e.stopPropagation()}
        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
        title="Flag Review"
      >
        <Flag className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => e.stopPropagation()}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        title="More Options"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Handle filter changes
  const handleRatingFilterChange = (value: string) => {
    setRatingFilter(value === "all" ? 0 : parseInt(value));
    setCurrentPage(1);
  };

  const handleActiveFilterChange = (value: string) => {
    if (value === "all") {
      setActiveFilter(undefined);
    } else {
      setActiveFilter(value === "true");
    }
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = (totalPages: number, currentPageNum: number) => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPageNum <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPageNum >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPageNum - 1; i <= currentPageNum + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Pagination component
  const Pagination = () => {
    if (!reviewsDataApi?.pagination) return null;

    const { pagination } = reviewsDataApi;
    const totalPages = pagination.totalPages;
    const currentPageNum = pagination.page;

    return (
      <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-700">
            <span>
              Showing{" "}
              <span className="font-medium">
                {(currentPageNum - 1) * pagination.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPageNum * pagination.limit, pagination.total)}
              </span>{" "}
              of <span className="font-medium">{pagination.total}</span> results
            </span>
          </div>

          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="text-sm border border-gray-300 rounded-md px-2 py-1"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPageNum - 1)}
            disabled={!pagination.hasPreviousPage}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pagination.hasPreviousPage
                ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                : "text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {getPageNumbers(totalPages, currentPageNum).map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-sm text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      page === currentPageNum
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPageNum + 1)}
            disabled={!pagination.hasNextPage}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              pagination.hasNextPage
                ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                : "text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    );
  };

  // Loading component
  const LoadingTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    </div>
  );

  // Error component
  const ErrorTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-8 text-center">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
        <p className="text-gray-900 font-semibold mb-2">
          Failed to load reviews
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
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="">
          <LoadingTable />
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="">
          <ErrorTable />
        </div>
      </div>
    );
  }

  const reviews = reviewsDataApi?.data || [];
  const pagination = reviewsDataApi?.pagination;

  // Calculate statistics
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header with Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reviews, properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>

              {/* Rating Filter */}
              <div className="flex items-center space-x-2">
                <Star className="text-gray-400 w-4 h-4" />
                <select
                  value={ratingFilter}
                  onChange={(e) => handleRatingFilterChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              {/* Active Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 w-4 h-4" />
                <select
                  value={
                    activeFilter === undefined ? "all" : activeFilter.toString()
                  }
                  onChange={(e) => handleActiveFilterChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Reviews</option>
                  <option value="true">Active Only</option>
                  <option value="false">Hidden Only</option>
                </select>
              </div>

              <button
                onClick={() => refetch()}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>

            {/* Add Review Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Export Reviews</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {pagination && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Reviews
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pagination.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {averageRating.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ThumbsUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Positive Reviews
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {reviews.filter((review) => review.rating >= 4).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    5-Star Reviews
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ratingDistribution[5]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {reviews.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Review
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reviewer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reviews.map((review) => (
                      <tr
                        key={review.id}
                        onClick={() => handleReviewClick(review.id)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-semibold text-sm">
                                {review.id}
                              </span>
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="text-sm font-medium text-gray-900 mb-1">
                                Review #{review.id}
                              </div>
                              <p className="text-sm text-gray-600 max-w-md overflow-hidden">
                                <span className="line-clamp-2">
                                  {review.review}
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-xs">
                                {review.tenant.user.fullName
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {review.tenant.user.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {review.tenant.tenantEmail}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium flex items-center">
                              <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                              {review.property.hostelName}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {review.property.hostelCity}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col items-start space-y-1">
                            <StarRating rating={review.rating} size="sm" />
                            <RatingBadge rating={review.rating} />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(review.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <ActionButtons reviewId={review.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <Pagination />
            </>
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No reviews found</p>
              {(searchTerm ||
                ratingFilter > 0 ||
                activeFilter !== undefined) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setRatingFilter(0);
                    setActiveFilter(undefined);
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Rating Distribution Chart */}
        {reviews.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Rating Distribution
            </h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count =
                  ratingDistribution[rating as keyof typeof ratingDistribution];
                const percentage =
                  reviews.length > 0 ? (count / reviews.length) * 100 : 0;

                return (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-16">
                      <span className="text-sm font-medium text-gray-700 mr-1">
                        {rating}
                      </span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm text-gray-600">
                        {count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
