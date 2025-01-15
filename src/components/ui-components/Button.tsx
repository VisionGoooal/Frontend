import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  className?: string;
  id?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ariaLabel, ...rest }) => {
  return (
    <button aria-label={ariaLabel} {...rest}>
      {children}
    </button>
  );
};

export default Button;
