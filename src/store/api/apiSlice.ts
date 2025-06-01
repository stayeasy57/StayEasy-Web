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
  TenantDetailsResponse,
  TenantsQueryParams,
  TenantsResponse,
  UpdateBookingStatusRequest,
  UpdateBookingStatusResponse,
  UsersQueryParams,
  UsersResponse,
} from "@/utils/types";

// Define interfaces for Users API

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
  ], // Add Landlords tag type for caching
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

    // Update Booking Status API endpoint for Admin
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
  // BOOKING
  useCreateBookingMutation,
  // ADMIN
  useGetAdminDashboardStatsQuery,
  useGetUsersQuery,
  useGetLandlordsQuery, // New hook for landlords
  useGetLandlordByIdQuery, // New hook for single landlord
  useGetTenantsQuery, // New hook for tenants
  useGetTenantByIdQuery, // New hook for single tenant
  useGetPropertiesForAdminQuery,
  useGetPropertyByAdminQuery,
  usePublishPropertyMutation,
  // BOOKINGS ADMIN
  useGetBookingsQuery, // New hook for bookings
  useGetBookingByIdQuery, // New hook for single booking
  useUpdateBookingStatusMutation, // New hook for updating booking status

  useGetPropertyQuery,
  useGetCurrentUserQuery,
} = authApi;
