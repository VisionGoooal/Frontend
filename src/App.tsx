import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

import { LANDING_PAGE_PATH } from "./constants/routePaths";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={LANDING_PAGE_PATH} element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
