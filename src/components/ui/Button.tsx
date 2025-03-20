import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  disabled,
  loading,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "px-4 py-2 rounded-md text-white font-semibold transition-all duration-200",
        {
          "bg-blue-600 hover:bg-blue-700": variant === "primary",
          "bg-gray-600 hover:bg-gray-700": variant === "secondary",
          "bg-red-600 hover:bg-red-700": variant === "danger",
          "border border-gray-400 text-gray-700 hover:bg-gray-100": variant === "outline",
          "opacity-50 cursor-not-allowed": disabled || loading,
        },
        className
      )}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;