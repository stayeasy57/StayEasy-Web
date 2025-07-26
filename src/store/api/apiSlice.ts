import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, LoginRequest, SignupRequest } from "@/utils/types/auth";
import { RootState } from "../store";
import {
  BookingDetailsResponse,
  BookingsQueryParams,
  BookingsResponse,
  ContactUsDetailsResponse,
  ContactUsRequest,
  ContactUsResponse,
  ContactUsStatisticsResponse,
  CreateBookingRequest,
  CreateBookingResponse,
  FullUpdateContactRequest,
  FullUpdateContactResponse,
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

// Interface for properties query with all filter parameters
export interface PropertyFilters {
  page?: number;
  limit?: number;
  city?: string;
  gender?: string; // BOYS, GIRLS, OTHER
  accommodationType?: string; // HOSTEL, PG
  idealFor?: string; // STUDENTS, WORKING
  minRating?: number;
  maxRating?: number;
  exactRating?: number;
  ratingAbove?: number;
  minPrice?: number;
  maxPrice?: number;
  hasFood?: boolean;
  search?: string;
  occupancyType?: string; // "1 Seater", "2 Seater", etc.
  // Additional filters that might be useful
  isActive?: boolean;
  isPublished?: boolean;
  propertyGender?: string; // Same as gender, keeping both for compatibility
}

// Define interfaces for Contact Us List API
export interface ContactUsItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phoneNumber: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  adminResponse: string | null;
  respondedBy: number | null;
  respondedAt: string | null;
  ipAddress: string;
  userAgent: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContactUsListResponse {
  statusCode: number;
  message: string;
  data: ContactUsItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ContactUsListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  category?: string;
  priority?: string;
  isRead?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface UpdateReadContactStatusRequest {
  id: number;
  status?: string;
  adminResponse?: string;
  isRead?: boolean;
}

export interface UpdateReadContactStatusResponse {
  statusCode: number;
  message: string;
  data: ContactUsItem;
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
    "ContactUsStats",
    "ContactUsList", // Add new tag type for contact us list
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
    forgotPassword: builder.mutation<AuthResponse, any>({
      query: (credentials) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    
    postReview: builder.mutation<any, any>({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
      }),
    }),

    // Updated getProperties with comprehensive filtering
    getProperties: builder.query<any, PropertyFilters>({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 10,
          city,
          gender,
          accommodationType,
          idealFor,
          minRating,
          maxRating,
          exactRating,
          ratingAbove,
          minPrice,
          maxPrice,
          hasFood,
          search,
          occupancyType,
          isActive,
          isPublished,
          propertyGender,
        } = params;

        // Build query string
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());

        // Add filters only if they have values
        if (city && city.trim()) {
          searchParams.append("city", city.trim());
        }

        if (gender && gender !== "all") {
          searchParams.append("gender", gender);
        }

        // Support both gender and propertyGender
        if (propertyGender && propertyGender !== "all") {
          searchParams.append("gender", propertyGender);
        }

        if (accommodationType && accommodationType !== "all") {
          searchParams.append("accommodationType", accommodationType);
        }

        if (idealFor && idealFor !== "all") {
          searchParams.append("idealFor", idealFor);
        }

        if (minRating !== undefined && minRating > 0) {
          searchParams.append("minRating", minRating.toString());
        }

        if (maxRating !== undefined && maxRating > 0) {
          searchParams.append("maxRating", maxRating.toString());
        }

        if (exactRating !== undefined && exactRating > 0) {
          searchParams.append("exactRating", exactRating.toString());
        }

        if (ratingAbove !== undefined && ratingAbove > 0) {
          searchParams.append("ratingAbove", ratingAbove.toString());
        }

        if (minPrice !== undefined && minPrice > 0) {
          searchParams.append("minPrice", minPrice.toString());
        }

        if (maxPrice !== undefined && maxPrice > 0) {
          searchParams.append("maxPrice", maxPrice.toString());
        }

        if (hasFood !== undefined) {
          searchParams.append("hasFood", hasFood.toString());
        }

        if (search && search.trim()) {
          searchParams.append("search", search.trim());
        }

        if (occupancyType && occupancyType !== "all") {
          searchParams.append("occupancyType", occupancyType);
        }

        if (isActive !== undefined) {
          searchParams.append("isActive", isActive.toString());
        }

        if (isPublished !== undefined) {
          searchParams.append("isPublished", isPublished.toString());
        }

        return `/properties?${searchParams.toString()}`;
      },
      providesTags: ["Properties"],
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
      invalidatesTags: ["ContactUs", "ContactUsStats", "ContactUsList"],
    }),

    // Get Contact Us Statistics
    getContactUsStatistics: builder.query<ContactUsStatisticsResponse, void>({
      query: () => "/admin/contact-us/statistics",
      providesTags: ["ContactUsStats"],
    }),

    updateContact: builder.mutation<
      FullUpdateContactResponse,
      FullUpdateContactRequest
    >({
      query: ({ id, ...updateData }) => ({
        url: `/admin/contact-us/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ContactUsList", id },
        { type: "ContactUsList", id: "LIST" },
        "ContactUsList",
        "ContactUsStats",
        "ContactUs",
      ],
    }),

    // Get Contact Us List - NEW ENDPOINT
    getContactUsList: builder.query<
      ContactUsListResponse,
      ContactUsListQueryParams
    >({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 10,
          search,
          status,
          category,
          priority,
          isRead,
          startDate,
          endDate,
        } = params;

        // Build query string
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());

        if (search && search.trim()) {
          searchParams.append("search", search.trim());
        }

        if (status && status !== "all") {
          searchParams.append("status", status);
        }

        if (category && category !== "all") {
          searchParams.append("category", category);
        }

        if (priority && priority !== "all") {
          searchParams.append("priority", priority);
        }

        if (isRead !== undefined) {
          searchParams.append("isRead", isRead.toString());
        }

        if (startDate) {
          searchParams.append("startDate", startDate);
        }

        if (endDate) {
          searchParams.append("endDate", endDate);
        }

        return `/admin/contact-us?${searchParams.toString()}`;
      },
      providesTags: ["ContactUsList"],
    }),

    getContactUsById: builder.query<ContactUsDetailsResponse, string | number>({
      query: (id) => `/admin/contact-us/${id}`,
      providesTags: (result, error, id) => [
        { type: "ContactUsList", id },
        { type: "ContactUsList", id: "LIST" },
      ],
    }),

    // Update Contact Us - NEW ENDPOINT
    UpdateReadContactStatus: builder.mutation<
      UpdateReadContactStatusResponse,
      UpdateReadContactStatusRequest
    >({
      query: ({ id, ...updateData }) => ({
        url: `/admin/contact-us/${id}/read-status`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ContactUsList", id },
        { type: "ContactUsList", id: "LIST" },
        "ContactUsList",
        "ContactUsStats",
      ],
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
      invalidatesTags: ["Bookings", "Properties"],
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
      any
    >({
      query: ({ id, data }) => ({
        url: `/admin/properties/${id}/status`,
        method: "PATCH",
        body: data,
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

    verifyOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: "/email-verification/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    sendOtp: builder.mutation<any, any>({
      query: (data) => ({
        url: "/email-verification/send-otp",
        method: "POST",
        body: data,
      }),
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
  useForgotPasswordMutation,
  useLogoutMutation,
  useVerifyOtpMutation,
  useVerifyForgotPasswordOtpMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
  useGetPropertiesQuery,
  usePostReviewMutation,
  // CONTACT US
  useSubmitContactFormMutation,
  useGetContactUsByIdQuery,
  useUpdateContactMutation,
  useGetContactUsStatisticsQuery,
  useGetContactUsListQuery, // NEW HOOK for contact us list
  useUpdateReadContactStatusMutation, // NEW HOOK for updating contact us
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