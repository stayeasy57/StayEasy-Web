import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/utils/types/auth";

// Check if we have auth data in localStorage (for persistence)
const loadAuthFromStorage = (): Partial<AuthState> => {
  if (typeof window === "undefined") return {};

  try {
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth_user");
    const expiresAt = localStorage.getItem("token_expires_at");

    if (token && userStr) {
      const user = JSON.parse(userStr) as User;

      // Check if token is expired
      if (expiresAt && new Date().getTime() > parseInt(expiresAt)) {
        clearAuthFromStorage();
        return {};
      }

      return {
        token,
        user,
        isAuthenticated: true,
        tokenExpiresAt: expiresAt ? parseInt(expiresAt) : null,
      };
    }
  } catch (error) {
    console.error("Failed to load auth state from localStorage", error);
    clearAuthFromStorage(); // Clear corrupted data
  }

  return {};
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  tokenExpiresAt: null,
  lastActivity: null,
  refreshTokenPromise: null,
  ...loadAuthFromStorage(),
};

const saveAuthToStorage = (token: string, user: User, expiresAt?: number) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));

    if (expiresAt) {
      localStorage.setItem("token_expires_at", expiresAt.toString());
    }

    // Update last activity
    localStorage.setItem("last_activity", Date.now().toString());
  } catch (error) {
    console.error("Failed to save auth state to localStorage", error);
  }
};

const clearAuthFromStorage = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("token_expires_at");
    localStorage.removeItem("last_activity");
  } catch (error) {
    console.error("Failed to clear auth state from localStorage", error);
  }
};

const updateLastActivityFunc = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("last_activity", Date.now().toString());
  } catch (error) {
    console.error("Failed to update last activity", error);
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken?: string;
        expiresIn?: number;
      }>
    ) => {
      const { user, token, refreshToken, expiresIn } = action.payload;

      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.error = null;
      state.lastActivity = Date.now();

      // Calculate expiration time
      if (expiresIn) {
        state.tokenExpiresAt = Date.now() + expiresIn * 1000;
        saveAuthToStorage(token, user, state.tokenExpiresAt);
      } else {
        saveAuthToStorage(token, user);
      }

      // Store refresh token separately if provided
      if (refreshToken && typeof window !== "undefined") {
        try {
          localStorage.setItem("refresh_token", refreshToken);
        } catch (error) {
          console.error("Failed to save refresh token", error);
        }
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      state.tokenExpiresAt = null;
      state.lastActivity = null;

      clearAuthFromStorage();
    },

    // Token refresh actions
    refreshTokenStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    refreshTokenSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        expiresIn?: number;
        user?: User;
      }>
    ) => {
      const { token, expiresIn, user } = action.payload;

      state.isLoading = false;
      state.token = token;
      state.error = null;
      state.lastActivity = Date.now();

      // Update user data if provided
      if (user) {
        state.user = user;
      }

      // Calculate new expiration time
      if (expiresIn) {
        state.tokenExpiresAt = Date.now() + expiresIn * 1000;
      }

      // Update storage
      if (state.user) {
        saveAuthToStorage(token, state.user, state.tokenExpiresAt || undefined);
      }
    },
    refreshTokenFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      state.tokenExpiresAt = null;
      state.lastActivity = null;

      clearAuthFromStorage();

      // Clear refresh token
      if (typeof window !== "undefined") {
        localStorage.removeItem("refresh_token");
      }
    },

    // User profile actions
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };

        // Update storage
        if (state.token) {
          saveAuthToStorage(
            state.token,
            state.user,
            state.tokenExpiresAt || undefined
          );
        }
      }
    },

    // Session management
    updateLastActivity: (state) => {
      state.lastActivity = Date.now();
      updateLastActivityFunc();
    },

    checkTokenExpiration: (state) => {
      if (state.tokenExpiresAt && Date.now() > state.tokenExpiresAt) {
        // Token expired, clear auth state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = "Session expired. Please login again.";
        state.tokenExpiresAt = null;
        state.lastActivity = null;

        clearAuthFromStorage();
      }
    },

    // Logout actions
    logout: (state, action?: PayloadAction<{ reason?: string }>) => {
      const reason = action?.payload?.reason;

      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = reason || null;
      state.tokenExpiresAt = null;
      state.lastActivity = null;
      state.refreshTokenPromise = null;

      // Clear persisted auth data
      clearAuthFromStorage();

      // Clear refresh token
      if (typeof window !== "undefined") {
        localStorage.removeItem("refresh_token");
      }
    },

    // Error management
    clearError: (state) => {
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // Loading state management
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Token verification
    verifyTokenStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    verifyTokenSuccess: (
      state,
      action: PayloadAction<{ user: User; valid: boolean }>
    ) => {
      state.isLoading = false;

      if (action.payload.valid) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.lastActivity = Date.now();

        // Update storage with fresh user data
        if (state.token) {
          saveAuthToStorage(
            state.token,
            action.payload.user,
            state.tokenExpiresAt || undefined
          );
        }
      } else {
        // Token is invalid
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = "Invalid session. Please login again.";
        state.tokenExpiresAt = null;
        state.lastActivity = null;

        clearAuthFromStorage();
      }
    },
    verifyTokenFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      state.tokenExpiresAt = null;
      state.lastActivity = null;

      clearAuthFromStorage();
    },

    // Reset auth state (useful for testing or complete reset)
    resetAuthState: (state) => {
      Object.assign(state, {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        tokenExpiresAt: null,
        lastActivity: null,
        refreshTokenPromise: null,
      });

      clearAuthFromStorage();

      if (typeof window !== "undefined") {
        localStorage.removeItem("refresh_token");
      }
    },
  },
});

export const {
  // Login actions
  loginStart,
  loginSuccess,
  loginFailure,

  // Token refresh actions
  refreshTokenStart,
  refreshTokenSuccess,
  refreshTokenFailure,

  // User profile actions
  updateProfile,

  // Session management
  updateLastActivity,
  checkTokenExpiration,

  // Logout actions
  logout,

  // Error management
  clearError,
  setError,

  // Loading state
  setLoading,

  // Token verification
  verifyTokenStart,
  verifyTokenSuccess,
  verifyTokenFailure,

  // Reset
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors for easier state access
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectTokenExpiresAt = (state: { auth: AuthState }) =>
  state.auth.tokenExpiresAt;
export const selectLastActivity = (state: { auth: AuthState }) =>
  state.auth.lastActivity;

// Helper function to check if token is about to expire (within 5 minutes)
export const selectIsTokenExpiringSoon = (state: { auth: AuthState }) => {
  const { tokenExpiresAt } = state.auth;
  if (!tokenExpiresAt) return false;

  const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
  return tokenExpiresAt <= fiveMinutesFromNow;
};
