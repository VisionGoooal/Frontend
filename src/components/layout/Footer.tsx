import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow-sm ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo and Branding */}
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            {/* <img
              src="../../assets/react.svg" // Update with your actual logo path
              className="h-8"
              alt="VisionGoal Logo"
            /> */}
           
          </Link>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline me-4 md:me-6">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        {/* Copyright */}
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <Link to="/" className="hover:underline">
            VisionGoal™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
