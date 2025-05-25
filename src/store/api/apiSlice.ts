import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, LoginRequest, SignupRequest } from "@/utils/types/auth";
import { RootState } from "../store";

// Define interfaces for Users API
interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  gender: string | null;
  userType: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  statusCode: number;
  message: string;
  data: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
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
  tagTypes: ["Users"], // Add tag types for caching
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
  // ADMIN
  useGetAdminDashboardStatsQuery,
  useGetUsersQuery,

  useGetPropertyQuery,
  useGetCurrentUserQuery,
} = authApi;
