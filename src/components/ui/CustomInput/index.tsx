// components/Input.tsx
import React, { useState } from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

const CustomInput: React.FC<InputProps> = ({
  id,
  label,
  register,
  rules,
  error,
  type = "text",
  placeholder,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`form-control w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`w-full px-4 py-2 ${
            isPasswordType ? "pr-12" : ""
          } border ${
            error ? "border-red-500" : "border-gray-200"
          } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          placeholder={placeholder}
          {...register(id, rules)}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomInput;
