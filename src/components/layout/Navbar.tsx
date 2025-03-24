import { useState, useEffect } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/VisionGoal.png";

const navigation = [
  { name: "Feed", href: "/feed" },
  { name: "Predictions", href: "/predict" },
  { name: "Profile", href: "/profile" },
  { name: "Chat", href: "/chat" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    username: string;
    profileImage?: string;
  } | null>(null);

  // ✅ Check authentication state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove JWT
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null); // Update UI
    navigate("/"); // Redirect to Home
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block size-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block size-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <Link to="/feed">
                    <span className="sr-only">Vision Goal</span>
                    <img
                      className="h-11 w-14"
                      src={logo}
                      alt="Vision Goal Logo"
                    />
                  </Link>
                </div>

                {
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                }
              </div>

              {/* ✅ Profile & Log Out Section (Show only if user is logged in) */}
              {
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="ml-4 flex items-center space-x-4">
                    <Link to="/profile">
                      <img
                        className="size-8 rounded-full border-2 border-white"
                        src={
                          user?.profileImage
                            ? user.profileImage.startsWith("http")
                              ? user.profileImage
                              : import.meta.env.VITE_SERVER_API_URL+`/${user.profileImage}`
                            : "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg"
                        }
                        alt="User Profile"
                      />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm font-medium"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
