"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import { loginSuccess } from "@/store/slices/authSlice";

import { useRouter } from "next/navigation";

import CustomInput from "../ui/CustomInput";

import CustomCheckbox from "../ui/CustomCheckbox";
import CustomButton from "../ui/CustomButton";

import { useLoginMutation } from "@/store/api/apiSlice";
import MessageBar from "../ui/MessageBar";

// Form input types
type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  // redux
  const dispatch = useDispatch();

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
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // api
  const [login, { isLoading, isError, error, data }] = useLoginMutation();

  // Form submission handler
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const response = await login(payload).unwrap();

      if (response?.statusCode === 401) {
        setMessage({
          text: response?.message || "Something went wrong",
          type: "error",
        });
        return;
      } else {
        dispatch(
          loginSuccess({
            user: response.data?.user,
            token: response.data?.access_token,
          })
        );
        router.push("/");
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

              {message?.text && (
                <MessageBar message={message.text} type={message.type} />
              )}

              <CustomButton type="submit" label="Log In" loading={isLoading} />
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
