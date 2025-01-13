import '../css/Input.css'

interface InputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type, id, placeholder, required}) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
export default Input;