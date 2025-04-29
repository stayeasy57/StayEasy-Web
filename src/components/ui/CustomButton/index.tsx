// components/Button.tsx
import React from "react";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "w-full py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const variantClasses = {
    primary: "bg-primary hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    outline:
      "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled ? disabledClasses : ""
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
