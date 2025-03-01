import { Disclosure, Menu } from "@headlessui/react";
import axiosInstance from "../../Services/axiosConfig";
import {
  LANDING_PAGE_PATH,
  FEED_PAGE_PATH,
  PREDICTIONS_PAGE_PATH,
  PROFILE_PAGE_PATH,
} from "../../constants/routePaths";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";

const links = [
  { name: "Feed", path: FEED_PAGE_PATH },
  { name: "Predictions", path: PREDICTIONS_PAGE_PATH },
  { name: "My Profile", path: PROFILE_PAGE_PATH },
];

const LoggedInNavBar = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      console.log(refreshToken);
      await axiosInstance.post("/auth/logout", { refreshToken });
      console.log("User logged out");
      localStorage.removeItem("refreshToken");
      navigate(LANDING_PAGE_PATH);
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  return (
    <Disclosure as="nav" className="logeed-in-navbar">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to={LANDING_PAGE_PATH} className="flex-shrink-0">
                 
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {links.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={classNames(
                          window.location.pathname === link.path
                            ? "bg-gray-200 text-black"
                            : "text-black hover:bg-gray-200 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="User"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={PROFILE_PAGE_PATH}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          My Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logoutUser}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                          )}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {links.map((link) => (
                <Disclosure.Button
                  key={link.name}
                  as={Link}
                  to={link.path}
                  className={classNames(
                    window.location.pathname === link.path
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {link.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                onClick={logoutUser}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Logout
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default LoggedInNavBar;
