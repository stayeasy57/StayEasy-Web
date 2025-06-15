export interface User {
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

export interface UsersResponse {
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

export interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

// Define interfaces for Landlords API
export interface Landlord {
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
export interface LandlordDetails {
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

export interface LandlordsResponse {
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

export interface LandlordDetailsResponse {
  statusCode: number;
  message: string;
  data: LandlordDetails;
}

export interface LandlordsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

// Define interfaces for Tenants API
export interface Tenant {
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
export interface TenantDetails {
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

export interface TenantsResponse {
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

export interface TenantDetailsResponse {
  statusCode: number;
  message: string;
  data: TenantDetails;
}

export interface TenantsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

// Define interfaces for Properties API
export interface Property {
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

export interface PropertiesResponse {
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

export interface PropertyResponse {
  statusCode: number;
  message: string;
  data: Property;
}

export interface PropertiesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  accommodationType?: string;
  isPublished?: boolean;
  isDraft?: boolean;
}

// Interface for publish property request
export interface PublishPropertyRequest {
  id: string | number;
  isPublished: boolean;
}

// Interface for publish property response
export interface PublishPropertyResponse {
  statusCode: number;
  message: string;
  data?: any;
}

// Define interfaces for Bookings API
export interface BookingType {
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

export interface BookingsResponse {
  statusCode: number;
  message: string;
  data: BookingType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface BookingDetailsResponse {
  statusCode: number;
  message: string;
  data: BookingType;
}

export interface BookingsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  bookingStatus?: string;
  paymentStatus?: string;
  isBookingAccepted?: boolean;
}

// Define interfaces for Booking API
export interface CreateBookingRequest {
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

export interface CreateBookingResponse {
  statusCode: number;
  message: string;
  data?: any;
}

// Update booking status interface
export interface UpdateBookingStatusRequest {
  id: string | number;
  bookingStatus?: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus?: "PENDING" | "PAID" | "REFUNDED" | "FAILED";
  isBookingAccepted?: boolean;
  cancellationReason?: string;
}

export interface UpdateBookingStatusResponse {
  statusCode: number;
  message: string;
  data?: any;
}

export interface ReviewType {
  id: number;
  propertyId: number;
  tenantId: number;
  bookingId: number;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: number;
    hostelName: string;
    hostelCity: string;
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
    };
  };
}

export interface ReviewsResponse {
  statusCode: number;
  message: string;
  data: ReviewType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ReviewDetailsResponse {
  statusCode: number;
  message: string;
  data: ReviewType;
}

export interface ReviewsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  rating?: number;
}

// Update review interface
export interface UpdateReviewRequest {
  id: string | number;
  isActive?: boolean;
  moderationStatus?: string;
}

export interface UpdateReviewResponse {
  statusCode: number;
  message: string;
  data?: any;
}


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


export interface ContactUsDetailsResponse {
  statusCode: number;
  message: string;
  data: {
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
  };
}
