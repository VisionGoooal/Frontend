interface InputProps {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  className?: string;
  role?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  placeholder,
  required,
  options,
  className, // Include className in the destructure
  role, // Include role if needed
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select
          className={`form-control ${className || ""}`} // Apply the custom class if provided
          id={id}
          required={required}
          role={role} // Include role for accessibility
        >
          <option value="">Select your {label.toLowerCase()}</option>
          {options?.map((option: { value: string; label: string }) => (
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
          className={`form-control ${className || ""}`} // Apply the custom class if provided
          role={role} // Include role for accessibility
        />
      )}
    </div>
  );
};

export default Input;
