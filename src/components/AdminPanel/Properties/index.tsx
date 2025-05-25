"use client";

import React, { useState } from "react";
import { useGetPropertiesForAdminQuery } from "@/store/api/apiSlice";
import {
  Building2,
  MapPin,
  User,
  Mail,
  Phone,
  Calendar,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Users,
  Bed,
  UtensilsCrossed,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Plus,
  Loader2,
  AlertCircle,
  RefreshCw,
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

const Properties: React.FC = () => {
  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [accommodationTypeFilter, setAccommodationTypeFilter] =
    useState<string>("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Prepare query parameters
  const getQueryParams = () => {
    const params: any = {
      page: currentPage,
      limit: pageSize,
    };

    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    // Handle status filter
    if (statusFilter === "published") {
      params.isPublished = true;
    } else if (statusFilter === "draft") {
      params.isDraft = true;
    } else if (statusFilter === "inactive") {
      params.isActive = false;
    }

    // Handle accommodation type filter
    if (accommodationTypeFilter !== "all") {
      params.accommodationType = accommodationTypeFilter.toUpperCase();
    }

    return params;
  };

  // Fetch properties with RTK Query
  const {
    data: propertiesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPropertiesForAdminQuery(getQueryParams());

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

  // Get accommodation type badge styling
  const getAccommodationTypeBadge = (type: string) => {
    const baseClasses =
      "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (type) {
      case "HOSTEL":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "PG":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "APARTMENT":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // Get gender badge styling
  const getGenderBadge = (gender: string) => {
    const baseClasses =
      "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (gender) {
      case "BOYS":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "GIRLS":
        return `${baseClasses} bg-pink-100 text-pink-800`;
      case "BOTH":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // Status badges component
  const StatusBadges = ({ property }: { property: Property }) => (
    <div className="flex flex-col space-y-1">
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
          property.isPublished
            ? "bg-green-100 text-green-800"
            : property.isDraft
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {property.isPublished ? (
          <>
            <CheckCircle className="w-3 h-3 mr-1" />
            Published
          </>
        ) : property.isDraft ? (
          <>
            <Clock className="w-3 h-3 mr-1" />
            Draft
          </>
        ) : (
          <>
            <XCircle className="w-3 h-3 mr-1" />
            Inactive
          </>
        )}
      </span>

      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
          property.isCompleted
            ? "bg-blue-100 text-blue-800"
            : "bg-orange-100 text-orange-800"
        }`}
      >
        {property.isCompleted ? (
          <>
            <CheckCircle className="w-3 h-3 mr-1" />
            Complete
          </>
        ) : (
          <>
            <Clock className="w-3 h-3 mr-1" />
            Incomplete
          </>
        )}
      </span>
    </div>
  );

  // Property details component
  const PropertyDetails = ({ property }: { property: Property }) => (
    <div className="space-y-2">
      <div className="flex items-center text-sm text-gray-600">
        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
        <span className="truncate">
          {property.hostelAddress}, {property.hostelCity}
        </span>
      </div>
      {property.landmark && (
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-xs">Near: {property.landmark}</span>
        </div>
      )}
      <div className="flex items-center space-x-3 text-sm">
        <span className={getAccommodationTypeBadge(property.accommodationType)}>
          {property.accommodationType}
        </span>
        <span className={getGenderBadge(property.propertyGender)}>
          {property.propertyGender}
        </span>
      </div>
    </div>
  );

  // Facilities component
  const FacilitiesInfo = ({ property }: { property: Property }) => (
    <div className="space-y-2">
      <div className="flex items-center text-sm">
        <UtensilsCrossed className="w-4 h-4 mr-1 text-gray-400" />
        <span
          className={
            property.isProvidedFood ? "text-green-600" : "text-red-600"
          }
        >
          {property.isProvidedFood ? "Food Provided" : "No Food"}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <Bed className="w-4 h-4 mr-1 text-gray-400" />
        <span>Beds: {property.totalBeds || "Not set"}</span>
      </div>

      <div className="text-xs text-gray-500">
        <div>
          Room: {property.roomFacilities.slice(0, 2).join(", ")}
          {property.roomFacilities.length > 2 && "..."}
        </div>
        <div>
          Basic: {property.basicFacilities.slice(0, 2).join(", ")}
          {property.basicFacilities.length > 2 && "..."}
        </div>
      </div>
    </div>
  );

  // Landlord info component
  const LandlordInfo = ({ property }: { property: Property }) => (
    <div className="space-y-1">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {property.ownerName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium text-gray-900">
            {property.ownerName}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 flex items-center">
        <Mail className="w-3 h-3 mr-1" />
        {property.ownerEmail}
      </div>
      <div className="text-xs text-gray-500 flex items-center">
        <Phone className="w-3 h-3 mr-1" />
        {property.ownerContact}
      </div>
    </div>
  );

  // Action buttons component
  const ActionButtons = ({ propertyId }: { propertyId: number }) => (
    <div className="flex items-center space-x-2">
      <button
        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
        title="Edit Property"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
        title="Delete Property"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      <button
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
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleAccommodationTypeFilterChange = (value: string) => {
    setAccommodationTypeFilter(value);
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
    if (!propertiesData?.pagination) return null;

    const { pagination } = propertiesData;
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
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading properties...</p>
      </div>
    </div>
  );

  // Error component
  const ErrorTable = () => (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-8 text-center">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
        <p className="text-gray-900 font-semibold mb-2">
          Failed to load properties
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
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div >
          <LoadingTable />
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <ErrorTable />
        </div>
      </div>
    );
  }

  const properties = propertiesData?.data || [];
  const pagination = propertiesData?.pagination;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilterChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Accommodation Type Filter */}
              <select
                value={accommodationTypeFilter}
                onChange={(e) =>
                  handleAccommodationTypeFilterChange(e.target.value)
                }
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="hostel">Hostel</option>
                <option value="pg">PG</option>
                <option value="apartment">Apartment</option>
              </select>

              <button
                onClick={() => refetch()}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {pagination && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-50 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Properties
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pagination.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-50 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      properties.filter((property) => property.isPublished)
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-50 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {properties.filter((property) => property.isDraft).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-50 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Bookings
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {properties.reduce(
                      (sum, property) => sum + property._count.bookings,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-50 overflow-hidden">
          {properties.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Landlord
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Facilities
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stats
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr
                        key={property.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {property.hostelName}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {property.id}
                              </div>
                              <PropertyDetails property={property} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <LandlordInfo property={property} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <FacilitiesInfo property={property} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadges property={property} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm space-y-1">
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">
                                {property._count.roomTypes}
                              </span>
                              <span className="ml-1 text-xs">Room Types</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">
                                {property._count.bookings}
                              </span>
                              <span className="ml-1 text-xs">Bookings</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <span className="font-medium">
                                {property._count.reviews}
                              </span>
                              <span className="ml-1 text-xs">Reviews</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <div>
                              <div>{formatDate(property.createdAt)}</div>
                              <div className="text-xs text-gray-500">
                                Step: {property.step}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <ActionButtons propertyId={property.id} />
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
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No properties found</p>
              {(searchTerm ||
                statusFilter !== "all" ||
                accommodationTypeFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setAccommodationTypeFilter("all");
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
