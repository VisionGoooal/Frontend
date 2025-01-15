import LandingPageNavbar from "../navbars-components/LandingPageNavbar";
import "../css/LandingPage.css";
import "../css/LandingPageNavbar.css";

const LandingPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <div className="home-container">
        <div className="left-container">
          <div className="text-container">
            <h1>Welcome to VisionGoal ⚽</h1>
            <h2>Predict match outcomes with AI and fans!</h2>
            <div className="opening-paragraph"></div>
          </div>
        </div>
        <div className="right-container"></div>
      </div>
    </>
  );
};
export default LandingPage;
