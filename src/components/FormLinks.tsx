import { Link } from "react-router-dom";

interface FormLinksProps {
    path: string;
    text: string;
}  
const FormLinks: React.FC<FormLinksProps> = ({ path, text }) => {
    return (
        <div className="form-links">
            <Link to={path}>{text}</Link>
        </div>
    );
};
export default FormLinks;