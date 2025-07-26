"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";

import { useForgotPasswordMutation } from "@/store/api/apiSlice";
import MessageBar from "../ui/MessageBar";

// Form input types
type ForgotPasswordFormInputs = {
  email: string;
};

const ForgotPassword = () => {
  const router = useRouter();

  // local state
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    defaultValues: {
      email: "",
    },
  });

  // api
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  // Form submission handler
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        email: data.email,
      };

      const response: any = await forgotPassword(payload).unwrap();

      if (response?.statusCode === 404) {
        setMessage({
          text: response?.message || "Email not found",
          type: "error",
        });
        return;
      } else {
        setMessage({
          text: response?.message || "Password reset link sent to your email",
          type: "success",
        });

        localStorage.setItem("forgotPasswordEmail", data.email);

        // Optionally redirect after success
        setTimeout(() => {
          router.push("/otp-verification");
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
            <h1 className="text-3xl font-bold text-blue-900">Forgot Password</h1>
            <p className="text-blue-700 mt-2">
              Enter your email to reset your password
            </p>
          </div>

          {/* Forgot password form card */}
          <form
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            onSubmit={handleFormSubmit}
          >
            <div>
              <div>
                <CustomInput
                  id="email"
                  label="Email Address"
                  type="email"
                  register={register}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  error={errors.email?.message}
                  placeholder="john.doe@example.com"
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
                  label="Send Reset Link" 
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

export default ForgotPassword;