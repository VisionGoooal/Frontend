import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

import { LANDING_PAGE_PATH, REGISTER_PAGE_PATH, LOGIN_PAGE_PATH } from './constants/routePaths';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path={LANDING_PAGE_PATH} element={<LandingPage />} />
        <Route path={LOGIN_PAGE_PATH} element={<Login />} />
        <Route path={REGISTER_PAGE_PATH} element={<Register />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
