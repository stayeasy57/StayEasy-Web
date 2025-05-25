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

// Define interfaces for Properties API
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
  roomTypes?: any[];
  reviews?: any[];
  bookings?: any[];
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

interface PropertiesResponse {
  statusCode: number;
  message: string;
  data: Property[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface PropertyResponse {
  statusCode: number;
  message: string;
  data: Property;
}

interface PropertiesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  accommodationType?: string;
  isPublished?: boolean;
  isDraft?: boolean;
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
  tagTypes: ["Users", "Properties", "Property"], // Add tag types for caching
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
  useGetPropertiesForAdminQuery,
  useGetPropertyByAdminQuery,

  useGetPropertyQuery,
  useGetCurrentUserQuery,
} = authApi;
