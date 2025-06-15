import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, LoginRequest, SignupRequest } from "@/utils/types/auth";
import { RootState } from "../store";
import {
  BookingDetailsResponse,
  BookingsQueryParams,
  BookingsResponse,
  CreateBookingRequest,
  CreateBookingResponse,
  LandlordDetailsResponse,
  LandlordsQueryParams,
  LandlordsResponse,
  PropertiesQueryParams,
  PropertiesResponse,
  PropertyResponse,
  PublishPropertyRequest,
  PublishPropertyResponse,
  ReviewDetailsResponse,
  ReviewsQueryParams,
  ReviewsResponse,
  TenantDetailsResponse,
  TenantsQueryParams,
  TenantsResponse,
  UpdateBookingStatusRequest,
  UpdateBookingStatusResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
  UsersQueryParams,
  UsersResponse,
} from "@/utils/types";

// Define interfaces for Contact Us API
export interface ContactUsRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  subject: string;
  message: string;
  category: 'GENERAL_INQUIRY' | 'TECHNICAL_SUPPORT' | 'BILLING' | 'PROPERTY_LISTING' | 'TENANT_SUPPORT' | 'LANDLORD_SUPPORT' | 'PARTNERSHIP' | 'FEEDBACK' | 'COMPLAINT' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface ContactUsResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    createdAt: string;
  };
}

// Define interface for Contact Us Statistics
export interface ContactUsStatisticsResponse {
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

// Define our API with endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: '/api/proxy',
    baseUrl: "https://stayeasy.online/",

    prepareHeaders: (headers, { getState }) => {
      // Get token from state
      const token = (getState() as RootState).auth.token;

      // If we have a token, add it to the request
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Users",
    "Landlords",
    "Tenants",
    "Properties",
    "Property",
    "Bookings",
    "Reviews",
    "ContactUs",
    "ContactUsStats", // Add new tag type for contact us statistics
  ],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (userData) => ({
        url: "/users/signup",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getProperties: builder.query<any, void>({
      query: () => "/properties",
    }),
    getProperty: builder.query<any, any>({
      query: (id) => `/properties/${id}`,
    }),

    // CONTACT US API --------------------
    submitContactForm: builder.mutation<ContactUsResponse, ContactUsRequest>({
      query: (contactData) => ({
        url: "/contact-us",
        method: "POST",
        body: contactData,
      }),
      invalidatesTags: ["ContactUs", "ContactUsStats"], // Also invalidate stats when new contact is created
    }),

    // Get Contact Us Statistics - NEW ENDPOINT
    getContactUsStatistics: builder.query<ContactUsStatisticsResponse, void>({
      query: () => "/admin/contact-us/statistics",
      providesTags: ["ContactUsStats"],
    }),

    // BOOKING API --------------------
    createBooking: builder.mutation<
      CreateBookingResponse,
      CreateBookingRequest
    >({
      query: (bookingData) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Bookings", "Properties"], // Invalidate bookings and properties cache after creating a booking
    }),

    // ADMIN --------------------
    getAdminDashboardStats: builder.query<any, void>({
      query: () => "/admin/dashboard",
    }),

    // Users API endpoint
    getUsers: builder.query<UsersResponse, UsersQueryParams>({
      query: (params = {}) => {
        const { page = 1, limit = 10, search, isActive } = params;

        // Build query string
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());

        if (search && search.trim()) {
          searchParams.append("search", search.trim());
        }

        if (isActive !== undefined) {
          searchParams.append("isActive", isActive.toString());
        }

        return `/admin/users?${searchParams.toString()}`;
      },
      providesTags: ["Users"],
    }),

    // Landlords API endpoint
    getLandlords: builder.query<LandlordsResponse, LandlordsQueryParams>({
      query: (params = {}) => {
        const { page = 1, limit = 10, search, isActive } = params;

        // Build query string
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());

        if (search && search.trim()) {
          searchParams.append("search", search.trim());
        }

        if (isActive !== undefined) {
          searchParams.append("isActive", isActive.toString());
        }

        return `/admin/landlords?${searchParams.toString()}`;
      },
      providesTags: ["Landlords"],
    }),

    // Single Landlord API endpoint
    getLandlordById: builder.query<LandlordDetailsResponse, string | number>({
      query: (id) => `/admin/landlords/${id}`,
      providesTags: (result, error, id) => [
        { type: "Landlords", id },
        { type: "Landlords", id: "LIST" },
      ],
    }),

    // Tenants API endpoint
    getTenants: builder.query<TenantsResponse, TenantsQueryParams>({
      query: (params = {}) => {
        const { page = 1, limit = 10, search, isActive } = params;

        // Build query string
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());

        if (search && search.trim()) {
          searchParams.append("search", search.trim());
        }

        if (isActive !== undefined) {
          searchParams.append("isActive", isActive.toString());
        }

        return `/admin/tenants?${searchParams.toString()}`;
      },
      providesTags: ["Tenants"],
    }),

    // Single Tenant API endpoint
    getTenantById: builder.query<TenantDetailsResponse, string | number>({
      query: (id) => `/admin/tenants/${id}`,
      providesTags: (result, error, id) => [
        { type: "Tenants", id },
        { type: "Tenants", id: "LIST" },
      ],
    }),

    // Properties API endpoint for Admin
    getPropertiesForAdmin: builder.query<
      PropertiesResponse,
      PropertiesQueryParams
    >({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 10,
          search,
          isActive,
          accommodationType,
          isPublished,
          isDraft,
        } = params;

        // Build query string
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());

        if (search && search.trim()) {
          searchParams.append("search", search.trim());
        }

        if (isActive !== undefined) {
          searchParams.append("isActive", isActive.toString());
        }

        if (accommodationType && accommodationType !== "all") {
          searchParams.append("accommodationType", accommodationType);
        }

        if (isPublished !== undefined) {
          searchParams.append("isPublished", isPublished.toString());
        }

        if (isDraft !== undefined) {
          searchParams.append("isDraft", isDraft.toString());
        }

        return `/admin/properties?${searchParams.toString()}`;
      },
      providesTags: ["Properties"],
    }),

    // Single Property API endpoint for Admin
    getPropertyByAdmin: builder.query<PropertyResponse, string | number>({
      query: (id) => `/admin/properties/${id}`,
      providesTags: (result, error, id) => [
        { type: "Property", id },
        { type: "Property", id: "LIST" },
      ],
    }),

    // Publish/Unpublish Property API endpoint for Admin
    publishProperty: builder.mutation<
      PublishPropertyResponse,
      PublishPropertyRequest
    >({
      query: ({ id, isPublished }) => ({
        url: `/admin/properties/${id}/publish`,
        method: "PATCH",
        body: { isPublished },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Property", id },
        { type: "Property", id: "LIST" },
        "Properties",
      ],
    }),

    // Bookings API endpoint for Admin
    getBookings: builder.query<BookingsResponse, BookingsQueryParams>({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 10,
          search,
          bookingStatus,
          paymentStatus,
          isBookingAccepted,
        } = params;

        // Build query string
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());

        if (search && search.trim()) {
          searchParams.append("search", search.trim());
        }

        if (bookingStatus && bookingStatus !== "all") {
          searchParams.append("bookingStatus", bookingStatus);
        }

        if (paymentStatus && paymentStatus !== "all") {
          searchParams.append("paymentStatus", paymentStatus);
        }

        if (isBookingAccepted !== undefined) {
          searchParams.append(
            "isBookingAccepted",
            isBookingAccepted.toString()
          );
        }

        return `/admin/bookings?${searchParams.toString()}`;
      },
      providesTags: ["Bookings"],
    }),

    // Single Booking API endpoint for Admin
    getBookingById: builder.query<BookingDetailsResponse, string | number>({
      query: (id) => `/admin/bookings/${id}`,
      providesTags: (result, error, id) => [
        { type: "Bookings", id },
        { type: "Bookings", id: "LIST" },
      ],
    }),

    // Reviews API endpoint for Admin
    getReviews: builder.query<ReviewsResponse, ReviewsQueryParams>({
      query: (params = {}) => {
        const { page = 1, limit = 10, search, isActive, rating } = params;

        // Build query string
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());

        if (search && search.trim()) {
          searchParams.append("search", search.trim());
        }

        if (isActive !== undefined) {
          searchParams.append("isActive", isActive.toString());
        }

        if (rating !== undefined && rating > 0) {
          searchParams.append("rating", rating.toString());
        }

        return `/admin/reviews?${searchParams.toString()}`;
      },
      providesTags: ["Reviews"],
    }),

    // Single Review API endpoint for Admin
    getReviewById: builder.query<ReviewDetailsResponse, string | number>({
      query: (id) => `/admin/reviews/${id}`,
      providesTags: (result, error, id) => [
        { type: "Reviews", id },
        { type: "Reviews", id: "LIST" },
      ],
    }),

    // Update Review API endpoint for Admin
    updateReview: builder.mutation<UpdateReviewResponse, UpdateReviewRequest>({
      query: ({ id, ...updateData }) => ({
        url: `/admin/reviews/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Reviews", id },
        { type: "Reviews", id: "LIST" },
        "Reviews",
      ],
    }),
    updateBookingStatus: builder.mutation<
      UpdateBookingStatusResponse,
      UpdateBookingStatusRequest
    >({
      query: ({ id, ...updateData }) => ({
        url: `/admin/bookings/${id}/status`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Bookings", id },
        { type: "Bookings", id: "LIST" },
        "Bookings",
      ],
    }),

    // For checking if the current token is valid
    getCurrentUser: builder.query<AuthResponse, void>({
      query: () => "/auth/me",
    }),
  }),
});

// Export hooks for using the API endpoints
export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetPropertiesQuery,
  // CONTACT US
  useSubmitContactFormMutation,
  useGetContactUsStatisticsQuery, // NEW HOOK for contact us statistics
  // BOOKING
  useCreateBookingMutation,
  // ADMIN
  useGetAdminDashboardStatsQuery,
  useGetUsersQuery,
  useGetLandlordsQuery,
  useGetLandlordByIdQuery,
  useGetTenantsQuery,
  useGetTenantByIdQuery,
  useGetPropertiesForAdminQuery,
  useGetPropertyByAdminQuery,
  usePublishPropertyMutation,
  // BOOKINGS ADMIN
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingStatusMutation,
  // REVIEWS ADMIN
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
  useGetPropertyQuery,
  useGetCurrentUserQuery,
} = authApi;