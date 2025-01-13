import Button from "../components/Button";
import { Link } from "react-router-dom";
import { LOGIN_PAGE_PATH, REGISTER_PAGE_PATH } from "../constants/routePaths";
import "../css/LandingPage.css";

const LandingPage = () => {
    return (
    <>
      <div className="home-container">
        <div className="left-container">
            <div className="text-container">
                <h1>Welcome to VisionGoooal</h1>
                <h2>World's No. 1 football predictor</h2>
                <div className="opening-paragraph">
                    <p>
                        Welcome to VisionGoooal, the world's leading football prediction platform.
                    </p>
                    <p>
                        We are passionate about revolutionizing football predictions through the power of AI.
                    </p>
                    <p>
                        Our software harnesses advanced machine learning to analyze team performance, 
                        player stats, injuries, and more, delivering accurate predictions for upcoming matches. 
                    </p>
                    <p>
                    </p>
                    <p>
                        Join us today and start predicting football matches like never before!
                    </p>
                </div>
          
                <div className="buttons-container">
                    <Link to={REGISTER_PAGE_PATH}><Button>Register</Button></Link>
                    <Link to={LOGIN_PAGE_PATH}><Button>Log In</Button></Link>
                </div>
          
            </div>
        </div>
        <div className="right-container"></div>
      </div>
    </>
    );
}
export default LandingPage;   