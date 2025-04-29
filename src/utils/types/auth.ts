export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface SignupRequest {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: string;
    cnic: string;
    userType: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: any;
    token: string;
  }