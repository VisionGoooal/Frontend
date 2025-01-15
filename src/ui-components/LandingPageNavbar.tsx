import { LANDING_PAGE_PATH } from "../constants/routePaths";
import Modal from "./Modal";

const LandingPageNavbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#f8f9fa" }} // Apply background color directly
    >
      <div className="container-fluid">
        <a className="navbar-brand" href={LANDING_PAGE_PATH}>
          VisionGoal
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                About Us
              </a>
            </li>
          </ul>
        </div>
        <Modal
          buttonDesign=""
          id="login-button"
          modalName="Login"
          headerText="Login"
          bodyContent={
            <form className="px-4 py-3 text-dark">
              <div className="mb-3">
                <label
                  htmlFor="exampleDropdownFormEmail1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleDropdownFormEmail1"
                  placeholder="email@example.com"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleDropdownFormPassword1"
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleDropdownFormPassword1"
                  placeholder="Password"
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
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </form>
          }
        />

        <Modal
          buttonDesign="primary"
          id="registerModal"
          modalName="Register"
          headerText="Register"
          bodyContent={
            <form className="px-4 py-3 text-dark">
              <div className="mb-3">
                <label htmlFor="registerName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="registerName"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="registerEmail"
                  placeholder="email@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="registerPassword"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          }
        />
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
