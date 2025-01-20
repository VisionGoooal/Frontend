import NavBar from "./NavBar";
import axiosInstance from "../../Services/axiosConfig";
import {
  LANDING_PAGE_PATH,
  FEED_PAGE_PATH,
  PREDICTIONS_PAGE_PATH,
  PROFILE_PAGE_PATH,
} from "../../constants/routePaths";

import { useNavigate } from "react-router-dom";



const LoggedInNavBar = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    const refreshTokenFromLocalStorage = localStorage.getItem("refreshToken");
    try {
      console.log(refreshTokenFromLocalStorage);
      await axiosInstance.post("/auth/logout",{refreshToken: refreshTokenFromLocalStorage});
      console.log("User logged out");
      localStorage.removeItem("refreshToken");
      navigate(LANDING_PAGE_PATH);
      
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  const logoutButton = (
    <button type="button" className="btn btn-danger" onClick={logoutUser}>
      Logout
    </button>
  );

  return (
    <NavBar
      brandPath={LANDING_PAGE_PATH}
      brandName="VisionGoal"
      links={[
        { path: FEED_PAGE_PATH, name: "Feed" },
        { path: PREDICTIONS_PAGE_PATH, name: "Predictions" },
        { path: PROFILE_PAGE_PATH, name: "My Profile" },
      ]}
      actions={logoutButton}
    />
  );
};

export default LoggedInNavBar;
