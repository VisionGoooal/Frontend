import React from "react";
import "../../css/Input.css";

interface InputProps {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // For dropdown options
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  placeholder,
  required,
  options,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select className="form-control" id={id} required={required}>
          <option value="">Select your {label.toLowerCase()}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          required={required}
          className="form-control"
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
