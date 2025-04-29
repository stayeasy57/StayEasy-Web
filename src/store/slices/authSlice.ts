import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/utils/types/auth';

// Check if we have auth data in localStorage (for persistence)
const loadAuthFromStorage = (): Partial<AuthState> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr) as User;
      return { token, user, isAuthenticated: true };
    }
  } catch (error) {
    console.error('Failed to load auth state from localStorage', error);
  }
  
  return {};
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  ...loadAuthFromStorage(),
};

const saveAuthToStorage = (token: string, user: User) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save auth state to localStorage', error);
  }
};

const clearAuthFromStorage = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  } catch (error) {
    console.error('Failed to clear auth state from localStorage', error);
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      
      // Persist auth data
      saveAuthToStorage(action.payload.token, action.payload.user);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Clear persisted auth data
      clearAuthFromStorage();
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout,
  clearError
} = authSlice.actions;

export default authSlice.reducer;