"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "../ui/CustomInput";
import CustomSelect from "../ui/CustomSelect";
import CustomCheckbox from "../ui/CustomCheckbox";
import CustomToggle from "../ui/CustomToggle";
import CustomButton from "../ui/CustomButton";

// Define the form input types
type SignupFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "tenant" | "landlord";
  acceptTerms: boolean;
  receiveNotifications: boolean;
};

const Signup: React.FC = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    defaultValues: {
      userType: "tenant",
      acceptTerms: false,
      receiveNotifications: true,
    },
  });

  // Form submission handler
  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <CustomInput
                  id="firstName"
                  label="First Name"
                  register={register}
                  rules={{ required: "First name is required" }}
                  error={errors.firstName?.message}
                  placeholder="John"
                />

                <CustomInput
                  id="lastName"
                  label="Last Name"
                  register={register}
                  rules={{ required: "Last name is required" }}
                  error={errors.lastName?.message}
                  placeholder="Doe"
                />
              </div>

              <div className="mb-6">
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
                    { value: "tenant", label: "Tenant" },
                    { value: "landlord", label: "Landlord" },
                  ]}
                  error={errors.userType?.message}
                />
              </div>

              <div className="mb-6">
                <CustomCheckbox
                  id="acceptTerms"
                  register={register}
                  rules={{
                    required: "You must accept the terms and conditions",
                  }}
                  error={errors.acceptTerms?.message}
                  label="I agree to the Terms of Service and Privacy Policy"
                />
              </div>

              <CustomButton type="submit" label="Create Account" />

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
