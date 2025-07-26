"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import {useSearchParams} from "next/navigation";
import CustomButton from "../ui/CustomButton";
import MessageBar from "../ui/MessageBar";
import { useVerifyOtpMutation , useVerifyForgotPasswordOtpMutation } from "@/store/api/apiSlice";

// Form input types
type OTPFormInputs = {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
  digit5: string;
  digit6: string;
};

interface OTPVerificationProps {
  email?: string;
  phoneNumber?: string;
  onVerifyOTP?: (otp: string) => Promise<void>;
  onResendOTP?: () => Promise<void>;
  title?: string;
  subtitle?: string;
  redirectPath?: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  phoneNumber,
  onVerifyOTP,
  onResendOTP,
  title = "Verify Your Account",
  subtitle = "Enter the 6-digit code sent to your email",
  redirectPath = "/",
}) => {
  // Redux and router
  const dispatch = useDispatch();
  const router = useRouter();

  // Query params
  const searchParams = useSearchParams();

  // Local state
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Refs for OTP inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OTPFormInputs>({
    defaultValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    },
  });

  const [verifyOtp ]  = useVerifyOtpMutation();

  const [verifyForgotPasswordOtp ]  = useVerifyForgotPasswordOtpMutation();

  // Watch all digits
  const watchedValues = watch();

  // Timer effect for resend countdown
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  // Auto-focus and auto-advance logic
  const handleInputChange = (
    index: number,
    value: string,
    fieldName: keyof OTPFormInputs
  ) => {
    if (value.length > 1) {
      value = value.slice(-1); // Only keep the last character
    }

    setValue(fieldName, value);

    if (value && index < 5) {
      // Move to next input
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, 6).split("");

    digits.forEach((digit, index) => {
      const fieldName = `digit${index + 1}` as keyof OTPFormInputs;
      setValue(fieldName, digit);
    });

    // Focus on the last filled input or the next empty one
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Form submission handler
  const onSubmit = async (data: OTPFormInputs) => {
    try {
      console.log("data -> ", data);
      setIsLoading(true);
      setMessage(null);

      const otp = Object.values(data).join("");

      if (otp.length !== 6) {
        setMessage({
          text: "Please enter all 6 digits",
          type: "error",
        });
        return;
      }

      if (otp.length === 6) {

        console.log("hi theere");
        if(localStorage.getItem("forgotPasswordEmail")){
          localStorage.setItem("forgotPasswordOtp", otp);
          const resp = await verifyForgotPasswordOtp({
            email: localStorage.getItem("forgotPasswordEmail"),
            otp
          }).unwrap();

            if(resp?.statusCode === 400){
            setMessage({
              text: resp?.message || "Failed to reset password",
              type: "error",
            });
            return;
          }
          setMessage({
            text: "OTP verified successfully!",
            type: "success",
          });

          console.log("resp -> ", resp);

        
          
          // Redirect after successful verification
          setTimeout(() => {
            router.push('/set-password');
          }, 1500);
        }else {

        const resp = await verifyOtp({
          userId: parseInt(searchParams.get('id') ?? ''),
          otp
        }).unwrap();
        setMessage({
          text: "OTP verified successfully!",
          type: "success",
        });
        
        // Redirect after successful verification
        setTimeout(() => {
          router.push('/login');
        }, 1500);

        }

      } else {
        // Default behavior - you can customize this
        console.log("OTP entered:", otp);
        setMessage({
          text: "OTP verified successfully!",
          type: "success",
        });

          setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
    } catch (err: any) {
      console.log(err);
      setMessage({
        text: err?.message || "Invalid OTP. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOTP = async () => {
    try {
      setIsResending(true);
      setMessage(null);

      if (onResendOTP) {
        await onResendOTP();
      }

      setMessage({
        text: "OTP has been resent successfully!",
        type: "success",
      });

      // Reset timer
      setTimeLeft(60);
      setCanResend(false);

      // Clear all inputs
      Object.keys(watchedValues).forEach((key) => {
        setValue(key as keyof OTPFormInputs, "");
      });

      // Focus on first input
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setMessage({
        text: err?.message || "Failed to resend OTP. Please try again.",
        type: "error",
      });
    } finally {
      setIsResending(false);
    }
  };

  // Create a handler that will be called on button click
  const handleFormSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  console.log('working -> ')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Form title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">{title}</h1>
            <p className="text-blue-700 mt-2">{subtitle}</p>
            {(email || phoneNumber) && (
              <p className="text-gray-600 mt-2 text-sm">
                Code sent to{" "}
                <span className="font-medium">
                  {email || phoneNumber}
                </span>
              </p>
            )}
          </div>

          {/* OTP form card */}
          <form
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            onSubmit={handleFormSubmit}
          >
            <div>
              {/* OTP Input Fields */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Enter 6-Digit Code 
                </label>
                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num, index) => {
                    const fieldName = `digit${num}` as keyof OTPFormInputs;
                    return (
                      <input
                        key={num}
                        ref={(el) => (inputRefs.current[index] = el) as any}
                        // {...register(fieldName, {
                        //   required: "Required",
                        //   pattern: {
                        //     value: /^[0-9]$/,
                        //     message: "Must be a digit",
                        //   },
                        // })}
                        type="text"
                        maxLength={1}
                        className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors[fieldName]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value, fieldName)
                        }
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        autoComplete="off"
                      />
                    );
                  })}
                </div>
                {Object.values(errors).some((error) => error) && (
                  <p className="text-red-500 text-sm mt-2">
                    Please fill in all fields with valid digits
                  </p>
                )}
              </div>

              {/* Resend OTP Section */}
              <div className="text-center mb-6">
                {!canResend ? (
                  <p className="text-gray-600 text-sm">
                    Didn't receive the code?{" "}
                    <span className="text-blue-600 font-medium">
                      Resend in {timeLeft}s
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm disabled:opacity-50"
                  >
                    {isResending ? "Resending..." : "Resend OTP"}
                  </button>
                )}
              </div>

              {message?.text && (
                <MessageBar message={message.text} type={message.type} />
              )}

              <CustomButton
                type="submit"
                label="Verify OTP"
                loading={isLoading}
              />

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Need help?{" "}
                  <a
                    href="/contact"
                    className="text-blue-700 font-medium hover:underline"
                  >
                    Contact Support
                  </a>
                </p>
              </div>

              {/* Back to login option */}
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  ← Back to previous page
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default OTPVerification;