// components/Input.tsx
import React from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

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
  return (
    <div className={`form-control w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-200"
        } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomInput;
