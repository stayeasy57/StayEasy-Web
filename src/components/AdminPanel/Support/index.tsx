"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetContactUsListQuery,
  useUpdateReadContactStatusMutation,
  ContactUsItem,
  ContactUsListQueryParams,
} from "@/store/api/apiSlice";
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Loader2,
  AlertCircle,
  RefreshCw,
  Settings,
  HelpCircle,
  CreditCard,
  Home,
  User,
  Calendar,
  Badge,
  AlertTriangle,
  FileText,
  Send,
  MapPin,
  Smartphone,
  Globe,
  Monitor,
  ExternalLink,
} from "lucide-react";

const ContactUsList: React.FC = () => {
  const router = useRouter();

  // State for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [readFilter, setReadFilter] = useState<boolean | undefined>(undefined);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState<ContactUsItem | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch contacts with RTK Query
  const {
    data: contactsDataApi,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetContactUsListQuery({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
    status: statusFilter,
    category: categoryFilter,
    priority: priorityFilter,
    isRead: readFilter,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  // Update contact mutation
  const [updateContact, { isLoading: isUpdating }] = useUpdateReadContactStatusMutation();

  // Handle contact click to navigate to details page
  const handleContactClick = (contact: ContactUsItem) => {
    // Navigate to the details page
    handleMarkAsRead(contact.id);
    router.push(`/admin/support/${contact.id}`);
  };

  // Handle mark as read
  const handleMarkAsRead = async (contactId: number) => {
    try {
      await updateContact({
        id: contactId,
        isRead: true,
      }).unwrap();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  // Handle status change
  const handleStatusChange = async (contactId: number, newStatus: string) => {
    try {
      await updateContact({
        id: contactId,
        status: newStatus,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Handle admin response
  const handleSendResponse = async () => {
    if (!selectedContact || !adminResponse.trim()) return;

    try {
      await updateContact({
        id: selectedContact.id,
        adminResponse: adminResponse,
        status: "IN_PROGRESS",
      }).unwrap();
      setShowResponseModal(false);
      setAdminResponse("");
      setSelectedContact(null);
    } catch (error) {
      console.error("Failed to send response:", error);
    }
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

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "TECHNICAL_SUPPORT":
        return Settings;
      case "GENERAL_INQUIRY":
        return HelpCircle;
      case "BILLING":
        return CreditCard;
      case "TENANT_SUPPORT":
        return Home;
      case "PROPERTY_LISTING":
        return FileText;
      case "LANDLORD_SUPPORT":
        return User;
      default:
        return MessageSquare;
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
      switch (status) {
        case "PENDING":
          return {
            color: "bg-yellow-100 text-yellow-800",
            icon: Clock,
          };
        case "IN_PROGRESS":
          return {
            color: "bg-blue-100 text-blue-800",
            icon: RefreshCw,
          };
        case "RESOLVED":
          return {
            color: "bg-green-100 text-green-800",
            icon: CheckCircle,
          };
        case "CLOSED":
          return {
            color: "bg-gray-100 text-gray-800",
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
        {status.replace("_", " ")}
      </span>
    );
  };

  // Priority badge component
  const PriorityBadge = ({ priority }: { priority: string }) => {
    const getPriorityConfig = (priority: string) => {
      switch (priority) {
        case "URGENT":
          return {
            color: "bg-red-100 text-red-800",
            icon: AlertTriangle,
          };
        case "HIGH":
          return {
            color: "bg-orange-100 text-orange-800",
            icon: AlertTriangle,
          };
        case "MEDIUM":
          return {
            color: "bg-yellow-100 text-yellow-800",
            icon: Badge,
          };
        case "LOW":
          return {
            color: "bg-green-100 text-green-800",
            icon: Badge,
          };
        default:
          return {
            color: "bg-gray-100 text-gray-800",
            icon: Badge,
          };
      }
    };

    const config = getPriorityConfig(priority);
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {priority}
      </span>
    );
  };

  // Category badge component
  const CategoryBadge = ({ category }: { category: string }) => {
    const Icon = getCategoryIcon(category);
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
        <Icon className="w-3 h-3 mr-1" />
        {category
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase())}
      </span>
    );
  };

  // Action buttons component
  const ActionButtons = ({ contact }: { contact: ContactUsItem }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/admin/contact-us/${contact.id}`);
        }}
        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedContact(contact);
          setShowResponseModal(true);
        }}
        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
        title="Quick Response"
      >
        <Send className="w-4 h-4" />
      </button>
      <div className="relative group">
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="Change Status"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
          <div className="p-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(contact.id, "IN_PROGRESS");
              }}
              className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded"
            >
              Mark In Progress
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(contact.id, "RESOLVED");
              }}
              className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded"
            >
              Mark Resolved
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(contact.id, "CLOSED");
              }}
              className="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
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
  const handleStatusChangeFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value);
    setCurrentPage(1);
  };

  const handleReadFilterChange = (value: string) => {
    if (value === "all") {
      setReadFilter(undefined);
    } else {
      setReadFilter(value === "true");
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
    if (!contactsDataApi?.pagination) return null;

    const { pagination } = contactsDataApi;
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
        <p className="text-gray-600">Loading contact messages...</p>
      </div>
    </div>
  );

  // Error component
  const ErrorTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-8 text-center">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
        <p className="text-gray-900 font-semibold mb-2">
          Failed to load contact messages
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

  // Response modal for quick responses
  const ResponseModal = () => {
    if (!showResponseModal || !selectedContact) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Quick Response to {selectedContact.firstName}{" "}
                {selectedContact.lastName}
              </h2>
              <button
                onClick={() => setShowResponseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Original message:</p>
              <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700">
                <strong>Subject:</strong> {selectedContact.subject}
                <br />
                <strong>Message:</strong> {selectedContact.message}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response
              </label>
              <textarea
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your response here..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowResponseModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendResponse}
                disabled={isUpdating || !adminResponse.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send Response</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div>
          <LoadingTable />
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div>
          <ErrorTable />
        </div>
      </div>
    );
  }

  const contacts = contactsDataApi?.data || [];
  const pagination = contactsDataApi?.pagination;

  return (
    <div className="px-6">
      <div>
        {/* Header with Search and Filters */}
        <div className="mb-8 pt-6">
          <div className="flex flex-col space-y-4">
            {/* Title */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Support Messages
              </h1>
              <button
                onClick={() => refetch()}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusChangeFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="GENERAL_INQUIRY">General Inquiry</option>
                <option value="TECHNICAL_SUPPORT">Technical Support</option>
                <option value="BILLING">Billing</option>
                <option value="TENANT_SUPPORT">Tenant Support</option>
                <option value="LANDLORD_SUPPORT">Landlord Support</option>
                <option value="PROPERTY_LISTING">Property Listing</option>
                <option value="PARTNERSHIP">Partnership</option>
                <option value="FEEDBACK">Feedback</option>
                <option value="COMPLAINT">Complaint</option>
                <option value="OTHER">Other</option>
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>

              {/* Read Filter */}
              <select
                value={readFilter === undefined ? "all" : readFilter.toString()}
                onChange={(e) => handleReadFilterChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Messages</option>
                <option value="false">Unread Only</option>
                <option value="true">Read Only</option>
              </select>
            </div>

            {/* Date Range Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  From:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">To:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear dates
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {pagination && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Messages
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
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      contacts.filter(
                        (contact) => contact.status === "PENDING"
                      ).length
                    }
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
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      contacts.filter(
                        (contact) => contact.status === "RESOLVED"
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contacts.filter((contact) => !contact.isRead).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    High Priority
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      contacts.filter(
                        (contact) =>
                          contact.priority === "HIGH" ||
                          contact.priority === "URGENT"
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
          {contacts.length > 0 ? (
            <>
              <div className="overflow-auto xl:overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject & Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status & Priority
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
                    {contacts.map((contact) => (
                      <tr
                        key={contact.id}
                        onClick={() => handleContactClick(contact)}
                        className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                          !contact.isRead ? "bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {contact.firstName.charAt(0)}
                                {contact.lastName.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 flex items-center">
                                {contact.firstName} {contact.lastName}
                                {!contact.isRead && (
                                  <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
                                )}
                                <ExternalLink className="w-3 h-3 ml-2 text-gray-400" />
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {contact.email}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {contact.phoneNumber}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium mb-1">
                              {contact.subject}
                            </div>
                            <div className="text-gray-500 text-xs line-clamp-2">
                              {contact.message.length > 100
                                ? `${contact.message.substring(0, 100)}...`
                                : contact.message}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <CategoryBadge category={contact.category} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <StatusBadge status={contact.status} />
                            <PriorityBadge priority={contact.priority} />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="font-medium">
                              {formatDate(contact.createdAt)}
                            </div>
                            {contact.respondedAt && (
                              <div className="text-xs text-green-600">
                                Responded: {formatDate(contact.respondedAt)}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <ActionButtons contact={contact} />
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
              <p className="text-gray-500">No contact messages found</p>
              {(searchTerm ||
                statusFilter !== "all" ||
                categoryFilter !== "all" ||
                priorityFilter !== "all" ||
                readFilter !== undefined ||
                startDate ||
                endDate) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setCategoryFilter("all");
                    setPriorityFilter("all");
                    setReadFilter(undefined);
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Response Modal for Quick Responses */}
        <ResponseModal />
      </div>
    </div>
  );
};

export default ContactUsList;