"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuth,
  verifyTokenStart,
  verifyTokenSuccess,
  verifyTokenFailure,
  checkTokenExpiration,
  updateLastActivity,
} from "@/store/slices/authSlice";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      <p className="text-gray-600 text-sm">Verifying authentication...</p>
    </div>
  </div>
);

// Unauthorized Access Component
const UnauthorizedAccess = ({ onRedirect }: { onRedirect: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You need to be logged in to access this page.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onRedirect}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Go to Login
        </button>
        <button
          onClick={() => window.history.back()}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
);

// Session Expired Component
const SessionExpired = ({ onRedirect }: { onRedirect: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Session Expired
        </h1>
        <p className="text-gray-600 mb-6">
          Your session has expired. Please log in again to continue.
        </p>
      </div>

      <button
        onClick={onRedirect}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Login Again
      </button>
    </div>
  </div>
);

// Error Component
const ErrorDisplay = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-6">{error}</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onRetry}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Try Again
        </button>
        <button
          onClick={() => (window.location.href = "/login")}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  </div>
);

// Role-based access check
const InsufficientPermissions = ({
  onGoBack,
  onGoToDashboard,
}: {
  onGoBack: () => void;
  onGoToDashboard: () => void;
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You don't have the required permissions to access this page.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onGoBack}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Go Back
        </button>
        <button
          onClick={onGoToDashboard}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  </div>
);

// Configuration for the protected layout
// You can customize these values based on your needs
const LAYOUT_CONFIG = {
  requireAuth: true,
  requiredRole: undefined as string | string[] | undefined,
  fallbackPath: "/login",
  allowGuestAccess: false,
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading, error } =
    useSelector(selectAuth);

  const [isVerifying, setIsVerifying] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Function to verify token with server
  const verifyTokenWithServer = async () => {
    if (token && user) {
      setIsVerifying(false);
      setHasCheckedAuth(true);
      dispatch(verifyTokenSuccess({ user: user, valid: true }));
      return;
    }

    if (!token) {
      setIsVerifying(false);
      setHasCheckedAuth(true);
      return;
    }

    try {
      dispatch(verifyTokenStart());

      // Make API call to verify token
      const response = await fetch("/api/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(verifyTokenSuccess({ user: data.user, valid: data.valid }));
      } else {
        dispatch(verifyTokenFailure("Token verification failed"));
      }
    } catch (error) {
      dispatch(verifyTokenFailure("Network error during token verification"));
    } finally {
      setIsVerifying(false);
      setHasCheckedAuth(true);
    }
  };

  // Check for role-based access
  const hasRequiredRole = (
    userRole: string | undefined,
    required: string | string[] | undefined
  ): boolean => {
    if (!required || !userRole) return true;

    if (Array.isArray(required)) {
      return required.includes(userRole);
    }

    return userRole === required;
  };

  // Handle redirect to login
  const handleRedirectToLogin = () => {
    router.push(LAYOUT_CONFIG.fallbackPath);
  };

  // Update user activity
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(updateLastActivity());

      // Set up activity tracker
      const activityEvents = [
        "mousedown",
        "mousemove",
        "keypress",
        "scroll",
        "touchstart",
      ];
      const updateActivity = () => dispatch(updateLastActivity());

      activityEvents.forEach((event) => {
        document.addEventListener(event, updateActivity, true);
      });

      return () => {
        activityEvents.forEach((event) => {
          document.removeEventListener(event, updateActivity, true);
        });
      };
    }
  }, [isAuthenticated, dispatch]);

  // Check token expiration on mount and periodically
  useEffect(() => {
    dispatch(checkTokenExpiration());

    const interval = setInterval(() => {
      dispatch(checkTokenExpiration());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  // Verify token on mount
  useEffect(() => {
    if (!hasCheckedAuth) {
      verifyTokenWithServer();
    }
  }, [hasCheckedAuth]);

  // Handle authentication state changes
  useEffect(() => {
    if (
      hasCheckedAuth &&
      LAYOUT_CONFIG.requireAuth &&
      !LAYOUT_CONFIG.allowGuestAccess &&
      !isAuthenticated
    ) {
      // Add a small delay to prevent flash of content
      const timer = setTimeout(() => {
        router.push(LAYOUT_CONFIG.fallbackPath);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [hasCheckedAuth, isAuthenticated, router]);

  // Show loading state while checking authentication
  if (!hasCheckedAuth || isVerifying || isLoading) {
    return <LoadingSpinner />;
  }

  // Handle different error states
  if (error) {
    if (error.includes("expired")) {
      return <SessionExpired onRedirect={handleRedirectToLogin} />;
    }
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );
  }

  // If authentication is required but user is not authenticated
  if (
    LAYOUT_CONFIG.requireAuth &&
    !LAYOUT_CONFIG.allowGuestAccess &&
    !isAuthenticated
  ) {
    return <UnauthorizedAccess onRedirect={handleRedirectToLogin} />;
  }

  // Check for required role
  if (
    isAuthenticated &&
    LAYOUT_CONFIG.requiredRole &&
    !hasRequiredRole(user?.role, LAYOUT_CONFIG.requiredRole)
  ) {
    return (
      <InsufficientPermissions
        onGoBack={() => router.back()}
        onGoToDashboard={() => router.push("/dashboard")}
      />
    );
  }

  // Render children if authenticated or guest access is allowed
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
