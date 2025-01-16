import NavBar from "./NavBar";
import Modal from "../ui-components/Modal";
import Input from "../ui-components/Input";
import {
  LANDING_PAGE_PATH,
  ABOUT_US_PAGE_PATH,
  FEED_PAGE_PATH,
} from "../../constants/routePaths";

const LandingPageNavbar = () => {
  const loginModal = (
    <Modal
      buttonDesign="outline-dark"
      id="login"
      modalName="Login"
      headerText="Login"
      bodyContent={
        <form className="px-4 py-3 text-dark">
          <div className="mb-3">
            <Input
              label="Email Address"
              type="email"
              id="exampleDropdownFormEmail1"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <Input
              label="Password"
              type="password"
              id="exampleDropdownFormPassword1"
              placeholder="Password"
              required
            />
            <a className="dropdown-item text-dark" href="#">
              Forgot password?
            </a>
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="dropdownCheck"
              />
              <label className="form-check-label" htmlFor="dropdownCheck">
                Remember me
              </label>
            </div>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </form>
      }
    />
  );

  const registerModal = (
    <Modal
      buttonDesign="dark"
      id="registerModal"
      modalName="Register"
      headerText="Register"
      bodyContent={
        <form className="px-4 py-3 text-dark">
          <div className="mb-3">
            <Input
              label="Full Name"
              type="text"
              id="registerName"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-3">
            <Input
              label="Email Address"
              type="email"
              id="registerEmail"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <Input
              label="Password"
              type="password"
              id="registerPassword"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            <Input
              label="Date of Birth"
              type="date"
              id="registerDob"
              placeholder=""
            />
          </div>
          <div className="mb-3">
            <Input
              label="Country"
              type="select"
              id="registerCountry"
              required
              options={[
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
                { value: "uk", label: "United Kingdom" },
                { value: "au", label: "Australia" },
                { value: "in", label: "India" },
              ]}
            />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      }
    />
  );

  return (
    <NavBar
      brandPath={LANDING_PAGE_PATH}
      brandName="VisionGoal"
      links={[
        { path: ABOUT_US_PAGE_PATH, name: "About Us" },
        { path: FEED_PAGE_PATH, name: "Feed" },
      ]}
      actions={
        <>
          {loginModal}
          {registerModal}
        </>
      }
    />
  );
};

export default LandingPageNavbar;
