"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "../ui/CustomInput";
import CustomSelect from "../ui/CustomSelect";
import CustomButton from "../ui/CustomButton";
import { useSignupMutation } from "@/store/api/authApi";
import MessageBar from "../ui/MessageBar";

// Define the form input types
type SignupFormInputs = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  cnic: string;
  password: string;
  confirmPassword: string;
  userType: "TENANT" | "LANDLORD";
};

const initialValues: SignupFormInputs = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  gender: "MALE",
  cnic: "",
  password: "",
  confirmPassword: "",
  userType: "TENANT",
};

const Signup: React.FC = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    defaultValues: initialValues,
  });

  // local states
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // api
  const [signup, { isLoading, isError, error, data }] = useSignupMutation();

  // Form submission handler
  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        userType: data.userType,
      };
      const resp = await signup(payload).unwrap();
      if (resp?.statusCode === 201) {
        reset(initialValues);
        setMessage({
          text: "Your account has been created successfully",
          type: "success",
        });
      } else {
        setMessage({
          text: resp?.message || "Something went wrong",
          type: "error",
        });
      }
    } catch (err: any) {
      console.error("Signup error:", err?.data);
      setMessage({
        text: err?.data?.message,
        type: "error",
      });
    }
  };

  // Access password value for validation
  const password = watch("password");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Form Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">
              Create Your Account
            </h1>
            <p className="text-blue-700 mt-2">Join our platform</p>
          </div>

          {/* Signup Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                <CustomInput
                  id="fullName"
                  label="Full Name"
                  register={register}
                  rules={{ required: "Full Name is required" }}
                  error={errors.fullName?.message}
                  placeholder="John"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                <CustomInput
                  id="phoneNumber"
                  label="Phone Number"
                  register={register}
                  rules={{
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number",
                    },
                  }}
                  error={errors.phoneNumber?.message}
                  placeholder="1234567890"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <CustomInput
                  id="password"
                  label="Password"
                  type="password"
                  register={register}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  }}
                  error={errors.password?.message}
                  placeholder="••••••••"
                />

                <CustomInput
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  register={register}
                  rules={{
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  }}
                  error={errors.confirmPassword?.message}
                  placeholder="••••••••"
                />
              </div>

              <div className="mb-6">
                <CustomSelect
                  id="userType"
                  label="I am a"
                  register={register}
                  options={[
                    { value: "TENANT", label: "Tenant" },
                    { value: "LANDLORD", label: "Landlord" },
                  ]}
                  error={errors.userType?.message}
                />
              </div>

              {message?.text && (
                <MessageBar message={message?.text} type={message?.type} />
              )}

              <CustomButton
                type="submit"
                label="Create Account"
                loading={isLoading}
              />

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-700 font-medium hover:underline"
                  >
                    Log In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
