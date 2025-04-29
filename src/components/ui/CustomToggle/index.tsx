import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface ToggleProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  defaultValue?: boolean;
  className?: string;
}

const CustomToggle: React.FC<ToggleProps> = ({
  id,
  label,
  register,
  defaultValue = false,
  className,
}) => {
  // Local state to handle the visual toggle
  const [isChecked, setIsChecked] = useState(defaultValue);

  // Create registration with additional onChange handler
  const { onChange, ...rest } = register(id);

  // Handle toggle change
  const handleToggleChange = (e: any) => {
    setIsChecked(e.target.checked);
    onChange(e); // Call the original onChange from react-hook-form
  };

  return (
    <div className={`form-control ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative inline-block w-12 align-middle select-none">
          <input
            id={id}
            type="checkbox"
            checked={isChecked}
            className="sr-only"
            onChange={handleToggleChange}
            {...rest}
          />
          <div
            className={`block w-12 h-6 rounded-full ${
              isChecked ? "bg-blue-600" : "bg-gray-300"
            } 
              cursor-pointer transition-colors duration-200 ease-in-out focus-within:ring-2 
              focus-within:ring-blue-500 focus-within:ring-opacity-50`}
          >
            <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform 
                duration-200 ease-in-out transform ${
                  isChecked ? "translate-x-6" : ""
                }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToggle;
