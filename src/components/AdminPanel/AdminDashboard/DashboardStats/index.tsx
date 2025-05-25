import React from "react";
import { useGetAdminDashboardStatsQuery } from "@/store/api/apiSlice";
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
      activeUsers: number;
      pendingBookings: number;
      publishedProperties: number;
    };
    recentBookings: any[];
    recentUsers: Array<{
      id: number;
      fullName: string;
      email: string;
      userType: string;
      createdAt: string;
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

const DashboardStats: React.FC = () => {
  // Fetch dashboard statistics using RTK Query
  const {
    data: dashboardDataApi,
    isLoading,
    isError,
    error,
  } = useGetAdminDashboardStatsQuery();

  console.log("Dashboard Data:", dashboardDataApi);

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
        return "text-yellow-600";
      case "CONFIRMED":
        return "text-green-600";
      case "CANCELLED":
        return "text-red-600";
      case "CHECKED_IN":
        return "text-blue-600";
      case "CHECKED_OUT":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    isLoading = false,
  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    isLoading?: boolean;
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
            <p className="text-3xl font-bold text-gray-900">{value}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
          <StatCard
            title="Published Properties"
            value={0}
            icon={Building}
            color="bg-teal-500"
            isLoading
          />
          <StatCard
            title="Bookings"
            value={0}
            icon={Calendar}
            color="bg-pink-500"
            isLoading
          />
          <StatCard
            title="Reviews"
            value={0}
            icon={Star}
            color="bg-yellow-500"
            isLoading
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Loading Recent Users */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Users
                </h2>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                      <div>
                        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
                        <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                      <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Booking Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Booking Status
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="w-8 h-6 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
  if (isLoading) {
    return <LoadingDashboard />;
  }

  // Show error state
  if (isError) {
    return <ErrorDashboard error={error} />;
  }

  // Check if data exists and has the expected structure
  if (!dashboardDataApi || !dashboardDataApi.data) {
    return (
      <ErrorDashboard error={{ message: "No data received from server" }} />
    );
  }

  const data = dashboardDataApi.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
          />
          <StatCard
            title="Published Properties"
            value={data.counts?.publishedProperties || 0}
            icon={Building}
            color="bg-teal-500"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
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
                              className={`w-5 h-5 ${getBookingStatusColor(
                                status
                              )}`}
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

        {/* Recent Bookings Section */}
        {(!data.recentBookings || data.recentBookings.length === 0) && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Bookings
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No recent bookings</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardStats;
