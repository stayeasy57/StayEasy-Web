"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";

import { useResetPasswordMutation } from "@/store/api/apiSlice";
import MessageBar from "../ui/MessageBar";

// Form input types
type NewPasswordFormInputs = {
  newPassword: string;
  confirmPassword: string;
};

const NewPassword = () => {
  const router = useRouter();

  // local state
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordFormInputs>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Watch the new password field to validate confirm password
  const watchNewPassword = watch("newPassword");

  // api
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Form submission handler
  const onSubmit = async (data: any) => {
    try {
      // Get email from localStorage (stored during forgot password flow)
      const email = localStorage.getItem("forgotPasswordEmail");
      
      const payload = {
        email: email,
        otp: localStorage.getItem("forgotPasswordOtp"),
        newPassword: data.newPassword,
      };

      const response: any = await resetPassword(payload).unwrap();

      if (response?.statusCode === 400) {
        setMessage({
          text: response?.message || "Failed to reset password",
          type: "error",
        });
        return;
      } else {
        setMessage({
          text: response?.message || "Password reset successfully",
          type: "success",
        });

        // Clear the stored email
        localStorage.removeItem("forgotPasswordEmail");

        // Clear the stored OTP
        localStorage.removeItem("forgotPasswordOtp");

        // Redirect to login after success
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err: any) {
      console.log(err);
      setMessage({
        text: err?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  // Create a handler that will be called on button click
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Form title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Reset Password</h1>
            <p className="text-blue-700 mt-2">
              Enter your new password
            </p>
          </div>

          {/* New password form card */}
          <form
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            onSubmit={handleFormSubmit}
          >
            <div>
              <div>
                <CustomInput
                  id="newPassword"
                  label="New Password"
                  type="password"
                  register={register}
                  rules={{
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  error={errors.newPassword?.message}
                  placeholder="••••••••"
                />
              </div>

              <div className="my-4">
                <CustomInput
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  register={register}
                  rules={{
                    required: "Please confirm your password",
                    validate: (value: string) =>
                      value === watchNewPassword || "Passwords do not match",
                  }}
                  error={errors.confirmPassword?.message}
                  placeholder="••••••••"
                />
              </div>

              {message?.text && (
                <div className="my-4">
                  <MessageBar message={message.text} type={message.type} />
                </div>
              )}

              <div className="mt-6">
                <CustomButton 
                  type="submit" 
                  label="Reset Password" 
                  loading={isLoading} 
                />
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Remember your password?
                  <span
                    onClick={() => router.push("/login")}
                    className="text-blue-700 font-medium hover:underline cursor-pointer ml-1"
                  >
                    Back to Login
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewPassword;