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

// Define interfaces for Landlords API
interface Landlord {
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

// Interface for single landlord details
interface LandlordDetails {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string | null;
    gender: string | null;
    isActive: boolean;
    isVerified: boolean;
    createdAt: string;
  };
  properties: Array<{
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
    description: string;
    isProvidedFood: boolean;
    mealProvided: string[];
    foodType: string[];
    roomFacilities: string[];
    basicFacilities: string[];
    otherFacilities: string[];
    roomImages: string[];
    messImages: string[];
    washroomImages: string[];
    otherImages: string[];
    propertyDocuments: string[];
    noticePeriodDays: number;
    isDraft: boolean;
    isCompleted: boolean;
    isPublished: boolean;
    totalBeds: number;
    availableBeds: number;
    totalViews: number;
    uniqueViews: number;
    createdAt: string;
    updatedAt: string;
    _count: {
      bookings: number;
      roomTypes: number;
    };
  }>;
  bookings: any[];
}

interface LandlordsResponse {
  statusCode: number;
  message: string;
  data: Landlord[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface LandlordDetailsResponse {
  statusCode: number;
  message: string;
  data: LandlordDetails;
}

interface LandlordsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

// Define interfaces for Tenants API
interface Tenant {
  id: number;
  userId: number;
  fatherName: string;
  fatherContact: string;
  fatherOccupation: string;
  motherName: string;
  motherContact: string;
  motherOccupation: string;
  instituteOrOfficeName: string;
  tenantName: string | null;
  tenantEmail: string | null;
  universityOrOffice: string | null;
  semesterOrDesignation: string | null;
  instituteOrOfficeAddress: string;
  documents: any[];
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
    bookings: number;
  };
}

// Interface for single tenant details
interface TenantDetails {
  id: number;
  userId: number;
  fatherName: string;
  fatherContact: string;
  fatherOccupation: string;
  motherName: string;
  motherContact: string;
  motherOccupation: string;
  instituteOrOfficeName: string;
  tenantName: string | null;
  tenantEmail: string | null;
  universityOrOffice: string | null;
  semesterOrDesignation: string | null;
  instituteOrOfficeAddress: string;
  documents: any[];
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string | null;
    gender: string | null;
    isActive: boolean;
    isVerified: boolean;
    createdAt: string;
  };
  bookings: any[];
  reviews: any[];
}

interface TenantsResponse {
  statusCode: number;
  message: string;
  data: Tenant[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface TenantDetailsResponse {
  statusCode: number;
  message: string;
  data: TenantDetails;
}

interface TenantsQueryParams {
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

// Interface for publish property request
interface PublishPropertyRequest {
  id: string | number;
  isPublished: boolean;
}

// Interface for publish property response
interface PublishPropertyResponse {
  statusCode: number;
  message: string;
  data?: any;
}

// Define interfaces for Booking API
interface CreateBookingRequest {
  propertyId: number;
  roomTypeId: number;
  checkInDate: string; // Format: "YYYY-MM-DD"
  checkOutDate: string; // Format: "YYYY-MM-DD"
  numberOfBeds: number;
  tenantName: string;
  tenantEmail: string;
  universityOrOffice: string;
  semesterOrDesignation: string;
}

interface CreateBookingResponse {
  statusCode: number;
  message: string;
  data?: any;
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
  tagTypes: ["Users", "Landlords", "Tenants", "Properties", "Property", "Bookings"], // Add Landlords tag type for caching
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

  useGetPropertyQuery,
  useGetCurrentUserQuery,
} = authApi;