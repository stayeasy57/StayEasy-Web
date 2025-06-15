import React from "react";
import {
  useGetAdminDashboardStatsQuery,
  useGetContactUsStatisticsQuery,
} from "@/store/api/apiSlice";
import {
  Users,
  Building,
  UserCheck,
  Calendar,
  Star,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  LogIn,
  LogOut,
  AlertCircle,
  Loader2,
  MapPin,
  DollarSign,
  BedDouble,
  Eye,
  TrendingUp,
  Award,
  Globe,
  MessageSquare,
  Mail,
  Phone,
  HelpCircle,
  CreditCard,
  Home,
  Settings,
  AlertTriangle,
  FileText,
  MessageCircle,
} from "lucide-react";

interface DashboardData {
  statusCode: number;
  message: string;
  data: {
    counts: {
      users: number;
      tenants: number;
      landlords: number;
      properties: number;
      bookings: number;
      reviews: number;
      propertyViews: number;
      activeUsers: number;
      pendingBookings: number;
      publishedProperties: number;
    };
    viewStats: {
      totalViews: number;
      uniqueViewers: number;
      recentViews: number;
      averageViewsPerProperty: number;
    };
    recentBookings: Array<{
      id: number;
      propertyId: number;
      roomTypeId: number;
      tenantId: number;
      landlordId: number;
      checkInDate: string;
      checkOutDate: string;
      bookingStatus: string;
      paymentStatus: string;
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
        hostelName: string;
      };
      tenant: {
        id: number;
        userId: number;
        tenantName: string;
        tenantEmail: string;
        universityOrOffice: string;
        semesterOrDesignation: string;
        user: {
          fullName: string;
        };
      };
    }>;
    recentUsers: Array<{
      id: number;
      fullName: string;
      email: string;
      userType: string;
      createdAt: string;
    }>;
    recentPropertyViews: Array<{
      id: number;
      propertyId: number;
      tenantId: number;
      viewedAt: string;
      ipAddress: string;
      userAgent: string;
      duration: number | null;
      property: {
        hostelName: string;
        hostelCity: string;
      };
      tenant: {
        id: number;
        userId: number;
        user: {
          fullName: string;
        };
      };
    }>;
    topPropertiesThisMonth: Array<{
      id: number;
      hostelName: string;
      hostelCity: string;
      totalViews: number;
      monthlyViews: number;
    }>;
    bookingStats: {
      PENDING: number;
      CONFIRMED: number;
      CANCELLED: number;
      CHECKED_IN: number;
      CHECKED_OUT: number;
    };
  };
}

// Contact Us Statistics Data Interface
interface ContactUsStatisticsData {
  statusCode: number;
  message: string;
  data: {
    total: number;
    byStatus: {
      pending: number;
      inProgress: number;
      resolved: number;
      closed: number;
    };
    byCategory: {
      TECHNICAL_SUPPORT: number;
      GENERAL_INQUIRY: number;
      BILLING: number;
      TENANT_SUPPORT: number;
      PROPERTY_LISTING?: number;
      LANDLORD_SUPPORT?: number;
      PARTNERSHIP?: number;
      FEEDBACK?: number;
      COMPLAINT?: number;
      OTHER?: number;
    };
    byPriority: {
      low: number;
      medium: number;
      high: number;
      urgent: number;
    };
    unread: number;
    timeBasedCounts: {
      today: number;
      thisWeek: number;
      thisMonth: number;
    };
    responseStats: {
      totalResponded: number;
      averageResponseTime: number;
      pendingResponse: number;
    };
    recentContacts: Array<{
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      subject: string;
      status: string;
      priority: string;
      isRead: boolean;
      createdAt: string;
    }>;
  };
}

const DashboardStats: React.FC = () => {
  // Fetch dashboard statistics using RTK Query
  const {
    data: dashboardDataApi,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
    error: dashboardError,
  } = useGetAdminDashboardStatsQuery();

  // Fetch contact us statistics using RTK Query
  const {
    data: contactUsDataApi,
    isLoading: isContactUsLoading,
    isError: isContactUsError,
    error: contactUsError,
  } = useGetContactUsStatisticsQuery();

  console.log("Dashboard Data:", dashboardDataApi);
  console.log("Contact Us Data:", contactUsDataApi);

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  // Get user type badge color
  const getUserTypeBadgeColor = (userType: string) => {
    switch (userType) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "LANDLORD":
        return "bg-blue-100 text-blue-800";
      case "TENANT":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get booking status color
  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "CONFIRMED":
        return "text-green-600 bg-green-100";
      case "CANCELLED":
        return "text-red-600 bg-red-100";
      case "CHECKED_IN":
        return "text-blue-600 bg-blue-100";
      case "CHECKED_OUT":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-orange-600 bg-orange-100";
      case "PAID":
        return "text-green-600 bg-green-100";
      case "FAILED":
        return "text-red-600 bg-red-100";
      case "REFUNDED":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Get contact status color
  const getContactStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "IN_PROGRESS":
        return "text-blue-600 bg-blue-100";
      case "RESOLVED":
        return "text-green-600 bg-green-100";
      case "CLOSED":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "text-red-600 bg-red-100";
      case "high":
        return "text-orange-600 bg-orange-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
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
      default:
        return MessageSquare;
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    isLoading = false,
    subtitle,
  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    isLoading?: boolean;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              <span className="text-2xl font-bold text-gray-400">--</span>
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {subtitle && (
                <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
              )}
            </>
          )}
        </div>
        <div
          className={`p-3 rounded-full ${color} ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // Loading component
  const LoadingDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        {/* Loading Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={0}
            icon={Users}
            color="bg-blue-500"
            isLoading
          />
          <StatCard
            title="Active Users"
            value={0}
            icon={Activity}
            color="bg-green-500"
            isLoading
          />
          <StatCard
            title="Landlords"
            value={0}
            icon={UserCheck}
            color="bg-purple-500"
            isLoading
          />
          <StatCard
            title="Tenants"
            value={0}
            icon={Users}
            color="bg-indigo-500"
            isLoading
          />
          <StatCard
            title="Properties"
            value={0}
            icon={Building}
            color="bg-orange-500"
            isLoading
          />
        </div>
      </div>
    </div>
  );

  // Error component
  const ErrorDashboard = ({ error }: { error: any }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg border border-red-200">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to Load Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            {error?.data?.message ||
              error?.message ||
              "An error occurred while fetching dashboard data"}
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Show loading state
  if (isDashboardLoading || isContactUsLoading) {
    return <LoadingDashboard />;
  }

  // Show error state
  if (isDashboardError || isContactUsError) {
    return <ErrorDashboard error={dashboardError || contactUsError} />;
  }

  // Check if data exists and has the expected structure
  if (!dashboardDataApi || !dashboardDataApi.data) {
    return (
      <ErrorDashboard
        error={{ message: "No dashboard data received from server" }}
      />
    );
  }

  // Check if contact us data exists
  if (!contactUsDataApi || !contactUsDataApi.data) {
    return (
      <ErrorDashboard
        error={{ message: "No contact us data received from server" }}
      />
    );
  }

  const data = dashboardDataApi.data;
  const contactUsData = contactUsDataApi;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        {/* Enhanced Stats Grid with View Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {/* First Row - Core Stats */}
          <StatCard
            title="Total Users"
            value={data.counts?.users || 0}
            icon={Users}
            color="bg-blue-500"
          />
          <StatCard
            title="Active Users"
            value={data.counts?.activeUsers || 0}
            icon={Activity}
            color="bg-green-500"
          />
          <StatCard
            title="Landlords"
            value={data.counts?.landlords || 0}
            icon={UserCheck}
            color="bg-purple-500"
          />
          <StatCard
            title="Tenants"
            value={data.counts?.tenants || 0}
            icon={Users}
            color="bg-indigo-500"
          />
          <StatCard
            title="Properties"
            value={data.counts?.properties || 0}
            icon={Building}
            color="bg-orange-500"
            subtitle={`${data.counts?.publishedProperties || 0} published`}
          />

          {/* Second Row - Property & Engagement Stats */}
          <StatCard
            title="Total Property Views"
            value={data.viewStats?.totalViews || 0}
            icon={Eye}
            color="bg-cyan-500"
            subtitle={`${data.viewStats?.recentViews || 0} in last 7 days`}
          />
          <StatCard
            title="Unique Viewers"
            value={data.viewStats?.uniqueViewers || 0}
            icon={Globe}
            color="bg-red-500"
          />
          <StatCard
            title="Avg Views/Property"
            value={data.viewStats?.averageViewsPerProperty || 0}
            icon={TrendingUp}
            color="bg-emerald-500"
          />
          <StatCard
            title="Bookings"
            value={data.counts?.bookings || 0}
            icon={Calendar}
            color="bg-pink-500"
          />
          <StatCard
            title="Reviews"
            value={data.counts?.reviews || 0}
            icon={Star}
            color="bg-yellow-500"
          />
        </div>

        {/* Contact Us Statistics Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Contact & Support Statistics
          </h2>

          {/* Contact Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Contacts"
              value={contactUsData.data.total}
              icon={MessageSquare}
              color="bg-violet-500"
              subtitle={`${contactUsData.data.unread} unread`}
            />
            <StatCard
              title="Pending Response"
              value={contactUsData.data.responseStats.pendingResponse}
              icon={AlertTriangle}
              color="bg-amber-500"
              subtitle="Need attention"
            />
            <StatCard
              title="Today's Contacts"
              value={contactUsData.data.timeBasedCounts.today}
              icon={Phone}
              color="bg-emerald-500"
            />
            <StatCard
              title="This Week"
              value={contactUsData.data.timeBasedCounts.thisWeek}
              icon={Calendar}
              color="bg-sky-500"
            />
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Status
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(contactUsData.data.byStatus).map(
                    ([status, count]) => (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              status === "pending"
                                ? "bg-yellow-400"
                                : status === "inProgress"
                                ? "bg-blue-400"
                                : status === "resolved"
                                ? "bg-green-400"
                                : "bg-gray-400"
                            }`}
                          ></div>
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {status.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          {count}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  By Category
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(contactUsData.data.byCategory).map(
                    ([category, count]) => {
                      const Icon = getCategoryIcon(category);
                      return (
                        <div
                          key={category}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                              {category
                                .replace(/_/g, " ")
                                .toLowerCase()
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                          </div>
                          <span className="text-lg font-semibold text-gray-900">
                            {count}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            {/* Priority Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  By Priority
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(contactUsData.data.byPriority).map(
                    ([priority, count]) => (
                      <div
                        key={priority}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              priority
                            )}`}
                          >
                            {priority.toUpperCase()}
                          </div>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          {count}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Contacts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Contact Messages
                </h3>
                <span className="text-sm text-gray-500">
                  {contactUsData.data.recentContacts.length} messages
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {contactUsData.data.recentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {contact.firstName?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </p>
                          {!contact.isRead && (
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        <p className="text-sm text-gray-800 font-medium">
                          {contact.subject}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="flex space-x-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getContactStatusColor(
                            contact.status
                          )}`}
                        >
                          {contact.status}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                            contact.priority
                          )}`}
                        >
                          {contact.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(contact.createdAt)}
                      </p>
                      <p className="text-xs text-gray-400">ID: #{contact.id}</p>
                    </div>
                  </div>
                ))}
              </div>
              {contactUsData.data.recentContacts.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No recent contact messages</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Existing Sections - Recent Users, Top Properties, Booking Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Users */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Users
                </h2>
                <span className="text-sm text-gray-500">
                  {data.recentUsers?.length || 0} users
                </span>
              </div>
            </div>
            <div className="p-6">
              {data.recentUsers && data.recentUsers.length > 0 ? (
                <div className="space-y-4">
                  {data.recentUsers.map((user: any) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.fullName || "Unknown User"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.email || "No email"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUserTypeBadgeColor(
                            user.userType
                          )}`}
                        >
                          {user.userType || "USER"}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {user.createdAt
                            ? formatDate(user.createdAt)
                            : "Unknown date"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No recent users</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Properties This Month */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Top Properties
                </h2>
                <span className="text-sm text-gray-500">This Month</span>
              </div>
            </div>
            <div className="p-6">
              {data.topPropertiesThisMonth &&
              data.topPropertiesThisMonth.length > 0 ? (
                <div className="space-y-4">
                  {data.topPropertiesThisMonth.map(
                    (property: any, index: number) => (
                      <div
                        key={property.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              #{index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {property.hostelName || "Unknown Property"}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {property.hostelCity || "Unknown City"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            {property.monthlyViews || 0}
                          </p>
                          <p className="text-xs text-gray-500">
                            views this month
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No data available</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Booking Status
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data.bookingStats &&
                  Object.entries(data.bookingStats).map(
                    ([status, count]: any) => {
                      const getIcon = (status: string) => {
                        switch (status) {
                          case "PENDING":
                            return Clock;
                          case "CONFIRMED":
                            return CheckCircle;
                          case "CANCELLED":
                            return XCircle;
                          case "CHECKED_IN":
                            return LogIn;
                          case "CHECKED_OUT":
                            return LogOut;
                          default:
                            return Calendar;
                        }
                      };

                      const Icon = getIcon(status);

                      return (
                        <div
                          key={status}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon
                              className={`w-5 h-5 ${
                                getBookingStatusColor(status).split(" ")[0]
                              }`}
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {status.replace("_", " ")}
                            </span>
                          </div>
                          <span className="text-lg font-semibold text-gray-900">
                            {count || 0}
                          </span>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Property Views Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Property Views
                </h2>
                <span className="text-sm text-gray-500">
                  {data.recentPropertyViews?.length || 0} views
                </span>
              </div>
            </div>
            <div className="p-6">
              {data.recentPropertyViews &&
              data.recentPropertyViews.length > 0 ? (
                <div className="space-y-4">
                  {data.recentPropertyViews.map((view: any) => (
                    <div
                      key={view.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {view.property?.hostelName || "Unknown Property"}
                          </p>
                          <p className="text-sm text-gray-500">
                            by {view.tenant?.user?.fullName || "Unknown User"}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {view.property?.hostelCity || "Unknown City"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {formatDateTime(view.viewedAt)}
                        </p>
                        <p className="text-xs text-gray-500">
                          View ID: #{view.id}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No recent property views</p>
                </div>
              )}
            </div>
          </div>

          {/* View Statistics Breakdown */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                View Statistics
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Total Views */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Total Views</p>
                      <p className="text-sm text-gray-600">
                        All time property views
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {data.viewStats?.totalViews || 0}
                  </span>
                </div>

                {/* Unique Viewers */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Unique Viewers
                      </p>
                      <p className="text-sm text-gray-600">
                        Individual users who viewed
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {data.viewStats?.uniqueViewers || 0}
                  </span>
                </div>

                {/* Recent Views */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Recent Activity
                      </p>
                      <p className="text-sm text-gray-600">
                        Views in last 7 days
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    {data.viewStats?.recentViews || 0}
                  </span>
                </div>

                {/* Average per Property */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Avg per Property
                      </p>
                      <p className="text-sm text-gray-600">
                        Average views per property
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">
                    {data.viewStats?.averageViewsPerProperty || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Bookings
              </h2>
              <span className="text-sm text-gray-500">
                {data.recentBookings?.length || 0} bookings
              </span>
            </div>
          </div>
          <div className="p-6">
            {data.recentBookings && data.recentBookings.length > 0 ? (
              <div className="space-y-6">
                {data.recentBookings.map((booking: any) => (
                  <div
                    key={booking.id}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      {/* Left Section - Property and Tenant Info */}
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {booking.property?.hostelName ||
                                "Unknown Property"}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <Users className="w-4 h-4" />
                              <span>
                                {booking.tenant?.user?.fullName ||
                                  booking.tenant?.tenantName ||
                                  "Unknown Tenant"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {booking.tenant?.universityOrOffice ||
                                  "No institution info"}
                              </span>
                            </div>
                            {booking.tenant?.semesterOrDesignation && (
                              <div className="text-sm text-gray-600">
                                {booking.tenant.semesterOrDesignation}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Center Section - Booking Details */}
                      <div className="flex-1 lg:px-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Check-in
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDate(booking.checkInDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Check-out
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.checkOutDate
                                ? formatDate(booking.checkOutDate)
                                : "Not set"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Beds
                            </p>
                            <div className="flex items-center space-x-1">
                              <BedDouble className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-900">
                                {booking.numberOfBeds || 1}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              Total Bill
                            </p>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-900">
                                {formatCurrency(booking.totalBill)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Status and Actions */}
                      <div className="flex-shrink-0 text-right space-y-3">
                        <div className="space-y-2">
                          <div>
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getBookingStatusColor(
                                booking.bookingStatus
                              )}`}
                            >
                              {booking.bookingStatus}
                            </span>
                          </div>
                          <div>
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(
                                booking.paymentStatus
                              )}`}
                            >
                              {booking.paymentStatus}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          <p>Booking ID: #{booking.id}</p>
                          <p>Created: {formatDate(booking.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details - Rent Breakdown */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Rent Amount:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {formatCurrency(booking.rentAmount)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            Security Deposit:
                          </span>
                          <span className="ml-2 font-medium text-gray-900">
                            {formatCurrency(booking.securityDeposit)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            Booking Accepted:
                          </span>
                          <span
                            className={`ml-2 font-medium ${
                              booking.isBookingAccepted
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {booking.isBookingAccepted ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Recent Bookings
                </h3>
                <p className="text-gray-500">
                  Bookings will appear here once tenants start making
                  reservations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;