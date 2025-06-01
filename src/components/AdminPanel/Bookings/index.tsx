"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetBookingsQuery } from "@/store/api/apiSlice";
import {
  Calendar,
  CreditCard,
  Clock,
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
} from "lucide-react";

interface BookingType {
  id: number;
  propertyId: number;
  roomTypeId: number;
  tenantId: number;
  landlordId: number;
  checkInDate: string;
  checkOutDate: string;
  bookingStatus: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "PENDING" | "PAID" | "REFUNDED" | "FAILED";
  isBookingAccepted: boolean;
  rentAmount: number;
  securityDeposit: number;
  totalBill: number;
  numberOfBeds: number;
  cancelledAt: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
  property: {
    id: number;
    hostelName: string;
    hostelCity: string;
  };
  roomType: {
    occupancyType: string;
    rentAmount: number;
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
      phoneNumber: string;
    };
  };
  landlord: {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    user: {
      fullName: string;
    };
  };
}

const Bookings: React.FC = () => {
  const router = useRouter();
  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [acceptedFilter, setAcceptedFilter] = useState<boolean | undefined>(
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

  // Fetch bookings with RTK Query
  const {
    data: bookingsDataApi,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetBookingsQuery({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
    bookingStatus: bookingStatusFilter,
    paymentStatus: paymentStatusFilter,
    isBookingAccepted: acceptedFilter,
  });

  // Handle booking row click
  const handleBookingClick = (bookingId: number) => {
    router.push(`/admin/bookings/${bookingId}`);
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

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Status badge component
  const BookingStatusBadge = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
      switch (status) {
        case "PENDING":
          return {
            color: "bg-yellow-100 text-yellow-800",
            icon: Clock3,
          };
        case "CONFIRMED":
          return {
            color: "bg-green-100 text-green-800",
            icon: CheckCircle,
          };
        case "CANCELLED":
          return {
            color: "bg-red-100 text-red-800",
            icon: Ban,
          };
        case "COMPLETED":
          return {
            color: "bg-blue-100 text-blue-800",
            icon: CheckCheck,
          };
        default:
          return {
            color: "bg-gray-100 text-gray-800",
            icon: Clock3,
          };
      }
    };

    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  // Payment status badge component
  const PaymentStatusBadge = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
      switch (status) {
        case "PENDING":
          return {
            color: "bg-yellow-100 text-yellow-800",
            icon: Clock,
          };
        case "PAID":
          return {
            color: "bg-green-100 text-green-800",
            icon: CheckCircle,
          };
        case "REFUNDED":
          return {
            color: "bg-blue-100 text-blue-800",
            icon: RefreshCw,
          };
        case "FAILED":
          return {
            color: "bg-red-100 text-red-800",
            icon: XCircle,
          };
        default:
          return {
            color: "bg-gray-100 text-gray-800",
            icon: Clock,
          };
      }
    };

    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  // Acceptance badge component
  const AcceptanceBadge = ({ isAccepted }: { isAccepted: boolean }) => (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
        isAccepted ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      }`}
    >
      {isAccepted ? (
        <CheckCircle className="w-3 h-3 mr-1" />
      ) : (
        <Clock className="w-3 h-3 mr-1" />
      )}
      {isAccepted ? "Accepted" : "Pending"}
    </span>
  );

  // Action buttons component
  const ActionButtons = ({ bookingId }: { bookingId: number }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleBookingClick(bookingId);
        }}
        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => e.stopPropagation()}
        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
        title="Edit Booking"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => e.stopPropagation()}
        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
        title="Cancel Booking"
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

  // Handle filter changes
  const handleBookingStatusChange = (value: string) => {
    setBookingStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePaymentStatusChange = (value: string) => {
    setPaymentStatusFilter(value);
    setCurrentPage(1);
  };

  const handleAcceptedFilterChange = (value: string) => {
    if (value === "all") {
      setAcceptedFilter(undefined);
    } else {
      setAcceptedFilter(value === "true");
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
    if (!bookingsDataApi?.pagination) return null;

    const { pagination } = bookingsDataApi;
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
        <p className="text-gray-600">Loading bookings...</p>
      </div>
    </div>
  );

  // Error component
  const ErrorTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-8 text-center">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
        <p className="text-gray-900 font-semibold mb-2">
          Failed to load bookings
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

  const bookings = bookingsDataApi?.data || [];
  const pagination = bookingsDataApi?.pagination;

  return (
    <div className=" bg-gray-50 ">
      <div className="">
        {/* Header with Search and Filters */}
        <div className="mb-8 px-6 pt-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by tenant, property..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>

              {/* Booking Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 w-4 h-4" />
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => handleBookingStatusChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              {/* Payment Status Filter */}
              <div className="flex items-center space-x-2">
                <CreditCard className="text-gray-400 w-4 h-4" />
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => handlePaymentStatusChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Payments</option>
                  <option value="PENDING">Payment Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="REFUNDED">Refunded</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>

              {/* Acceptance Filter */}
              <select
                value={
                  acceptedFilter === undefined
                    ? "all"
                    : acceptedFilter.toString()
                }
                onChange={(e) => handleAcceptedFilterChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Bookings</option>
                <option value="true">Accepted Only</option>
                <option value="false">Pending Only</option>
              </select>

              <button
                onClick={() => refetch()}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>

            {/* Add Booking Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Add Booking</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {pagination && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 px-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Bookings
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
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      bookings.filter(
                        (booking) => booking.bookingStatus === "CONFIRMED"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      bookings.filter(
                        (booking) => booking.bookingStatus === "PENDING"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border-gray-200 border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Paid Bookings
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      bookings.filter(
                        (booking) => booking.paymentStatus === "PAID"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ">
          {bookings.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tenant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        onClick={() => handleBookingClick(booking.id)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {booking.id}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Booking #{booking.id}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Badge className="w-3 h-3 mr-1" />
                                {booking.roomType.occupancyType} •{" "}
                                {booking.numberOfBeds} bed
                                {booking.numberOfBeds > 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium flex items-center">
                              <User className="w-4 h-4 mr-2 text-gray-400" />
                              {booking.tenant.user.fullName}
                            </div>
                            <div className="text-gray-500 flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1 text-gray-400" />
                              {booking.tenant.user.phoneNumber}
                            </div>
                            <div className="text-gray-500 flex items-center mt-1">
                              <Mail className="w-3 h-3 mr-1 text-gray-400" />
                              {booking.tenant.tenantEmail}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium flex items-center">
                              <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                              {booking.property.hostelName}
                            </div>
                            <div className="text-gray-500 flex items-center mt-1">
                              <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                              {booking.property.hostelCity}
                            </div>
                            <div className="text-gray-500 text-xs mt-1">
                              Owner: {booking.landlord.user.fullName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                              <div>
                                <div className="font-medium">
                                  {new Date(
                                    booking.checkInDate
                                  ).toLocaleDateString()}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  to{" "}
                                  {new Date(
                                    booking.checkOutDate
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-gray-500 text-xs mt-1">
                              Created: {formatDate(booking.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium flex items-center">
                              <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                              {formatCurrency(booking.totalBill)}
                            </div>
                            <div className="text-gray-500 text-xs">
                              Rent: {formatCurrency(booking.rentAmount)}
                            </div>
                            <div className="text-gray-500 text-xs">
                              Deposit: {formatCurrency(booking.securityDeposit)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <BookingStatusBadge
                              status={booking.bookingStatus}
                            />
                            <PaymentStatusBadge
                              status={booking.paymentStatus}
                            />
                            <AcceptanceBadge
                              isAccepted={booking.isBookingAccepted}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <ActionButtons bookingId={booking.id} />
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
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No bookings found</p>
              {(searchTerm ||
                bookingStatusFilter !== "all" ||
                paymentStatusFilter !== "all" ||
                acceptedFilter !== undefined) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setBookingStatusFilter("all");
                    setPaymentStatusFilter("all");
                    setAcceptedFilter(undefined);
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

export default Bookings;
