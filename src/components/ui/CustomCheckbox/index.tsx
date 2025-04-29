// components/Checkbox.tsx
import React from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface CheckboxProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: string;
  className?: string;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({
  id,
  label,
  register,
  rules,
  error,
  className,
}) => {
  return (
    <div className={`form-control ${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            type="checkbox"
            className={`w-4 h-4 rounded border ${
              error ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500 text-blue-600`}
            {...register(id, rules)}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={id} className="font-medium text-gray-700">
            {label}
          </label>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomCheckbox;
