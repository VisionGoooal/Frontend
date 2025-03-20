import React from "react";
import clsx from "clsx";

type InputProps = {
  type?: "text" | "password" | "email" | "textarea";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className,
}) => {
  return (
    <div className="w-full">
      {type === "textarea" ? (
        <textarea
          className={clsx(
            "w-full p-2 border rounded-md focus:outline-none focus:ring-2",
            {
              "border-red-500": error,
            },
            className
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className={clsx(
            "w-full p-2 border rounded-md focus:outline-none focus:ring-2",
            {
              "border-red-500": error,
            },
            className
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
