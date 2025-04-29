import React from "react";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
  loading?: boolean; // Added loading prop
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  loading = false, // Default to false
}) => {
  const baseClasses =
    "w-full py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors relative";

  const variantClasses = {
    primary: "bg-primary hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    outline:
      "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  // CSS for the loader
  const loaderStyles = `
    .button-loader {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 0.8s linear infinite;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -10px;
      margin-left: -10px;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <>
      <style>{loaderStyles}</style>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses[variant]} ${
          disabled || loading ? disabledClasses : ""
        } ${className}`}
      >
        {loading && <span className="button-loader"></span>}
        <span className={loading ? "invisible" : ""}>{label}</span>
      </button>
    </>
  );
};

export default CustomButton;
