// components/Select.tsx
import React from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  options: SelectOption[];
  rules?: RegisterOptions;
  error?: string;
  className?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  id,
  label,
  register,
  options,
  rules,
  error,
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
      <select
        id={id}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white`}
        {...register(id, rules)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomSelect;
