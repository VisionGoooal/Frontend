import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Feed from "./pages/Feed";

import { LANDING_PAGE_PATH,ABOUT_US_PAGE_PATH, FEED_PAGE_PATH } from "./constants/routePaths";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={LANDING_PAGE_PATH} element={<LandingPage />} />
          <Route path={ABOUT_US_PAGE_PATH} element={<AboutUs />} />
          <Route path={FEED_PAGE_PATH} element={<Feed />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
