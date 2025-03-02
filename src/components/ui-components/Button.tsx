import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "brand-secondary";
}

const buttonStyles = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  "brand-secondary": "bg-blue-500 text-white hover:bg-blue-600",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold shadow-sm transition ${buttonStyles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
