import NavBar from "./NavBar";
import {
  LANDING_PAGE_PATH,
  FEED_PAGE_PATH,
  PREDICTIONS_PAGE_PATH,
  PROFILE_PAGE_PATH,
} from "../constants/routePaths";

const LoggedInNavBar = () => {
  const logoutButton = (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => console.log("Logout button clicked")}
    >
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
