"use client";

import React from "react";
import { useForm } from "react-hook-form";

import CustomInput from "../ui/CustomInput";

import CustomCheckbox from "../ui/CustomCheckbox";
import CustomButton from "../ui/CustomButton";

// Form input types
type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      rememberMe: false,
    },
  });

  // Form submission handler
  const onSubmit = (data: any) => {
    console.log("Login form submitted:", data);
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
            <h1 className="text-3xl font-bold text-blue-900">Welcome Back</h1>
            <p className="text-blue-700 mt-2">
              Log in to your StayEasy account
            </p>
          </div>

          {/* Login form card */}
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
              <div className="my-4">
                <CustomInput
                  id="password"
                  label="Password"
                  type="password"
                  register={register}
                  rules={{
                    required: "Password is required",
                  }}
                  error={errors.password?.message}
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <CustomCheckbox
                  id="rememberMe"
                  register={register}
                  label="Remember me"
                />

                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </a>
              </div>

              <CustomButton type="submit" label="Log In" />
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-blue-700 font-medium hover:underline"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
