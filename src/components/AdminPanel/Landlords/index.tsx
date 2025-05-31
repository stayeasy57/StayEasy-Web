"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetLandlordsQuery } from "@/store/api/apiSlice";
import {
  Users,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
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
  Home,
  Building2,
  UserCheck,
  Crown,
} from "lucide-react";

interface LandlordType {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string | null;
    isActive: boolean;
    isVerified: boolean;
  };
  _count: {
    properties: number;
  };
}

const Landlords: React.FC = () => {
  const router = useRouter();
  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Fetch landlords with RTK Query
  const {
    data: landlordsDataApi,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetLandlordsQuery({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
    isActive: activeFilter,
  });

  // Handle landlord row click
  const handleLandlordClick = (landlordId: number) => {
    router.push(`/admin/landlords/${landlordId}`);
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

  // Status badge component
  const StatusBadge = ({
    isActive,
    isVerified,
  }: {
    isActive: boolean;
    isVerified: boolean;
  }) => (
    <div className="flex space-x-1">
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
          isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isActive ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <XCircle className="w-3 h-3 mr-1" />
        )}
        {isActive ? "Active" : "Inactive"}
      </span>
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
          isVerified
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {isVerified ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <XCircle className="w-3 h-3 mr-1" />
        )}
        {isVerified ? "Verified" : "Pending"}
      </span>
    </div>
  );

  // Action buttons component
  const ActionButtons = ({ landlordId }: { landlordId: number }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleLandlordClick(landlordId);
        }}
        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => e.stopPropagation()}
        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
        title="Edit Landlord"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => e.stopPropagation()}
        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
        title="Delete Landlord"
      >
        <Trash2 className="w-4 h-4" />
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

  // Handle filter change
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
    if (!landlordsDataApi?.pagination) return null;

    const { pagination } = landlordsDataApi;
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
        <p className="text-gray-600">Loading landlords...</p>
      </div>
    </div>
  );

  // Error component
  const ErrorTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-8 text-center">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
        <p className="text-gray-900 font-semibold mb-2">
          Failed to load landlords
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

  const landlords = landlordsDataApi?.data || [];
  const pagination = landlordsDataApi?.pagination;

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
                  placeholder="Search by name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
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
                  <option value="all">All Landlords</option>
                  <option value="true">Active Only</option>
                  <option value="false">Inactive Only</option>
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

            {/* Add Landlord Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Crown className="w-4 h-4" />
              <span>Add Landlord</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {pagination && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Crown className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Landlords
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pagination.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Active Landlords
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      landlords.filter((landlord) => landlord.user.isActive)
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      landlords.filter((landlord) => landlord.user.isVerified)
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border-gray-200 border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    With Properties
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      landlords.filter(
                        (landlord) => landlord._count.properties > 0
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {landlords.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Landlord
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Properties
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
                    {landlords.map((landlord) => (
                      <tr
                        key={landlord.id}
                        onClick={() => handleLandlordClick(landlord.id)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {landlord.user.fullName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {landlord.user.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {landlord.id} • User ID: {landlord.userId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {landlord.user.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {landlord.user.phoneNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {landlord.user.gender ? (
                              <span className="capitalize">
                                {landlord.user.gender}
                              </span>
                            ) : (
                              <span className="text-gray-400 italic">
                                Not specified
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge
                            isActive={landlord.user.isActive}
                            isVerified={landlord.user.isVerified}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {landlord._count.properties}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              {landlord._count.properties === 1
                                ? "property"
                                : "properties"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {formatDate(landlord.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <ActionButtons landlordId={landlord.id} />
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
              <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No landlords found</p>
              {(searchTerm || activeFilter !== undefined) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
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
      </div>
    </div>
  );
};

export default Landlords;
