import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";
import Predictions from "./pages/PredictionsPage";
import Profile from "./pages/ProfilePage";
import About from "./pages/AboutPage";
import Chat from "./components/chat";
import Footer from "./components/layout/Footer";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import Terms from "./pages/Terms";


const App = () => {
  const location = useLocation();

  const showChatOnRoutes = ["/feed", "/profile", "/predict"];

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/predict" element={<Predictions />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/chat" element={<Chat />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<Terms/>}/>
      </Routes>

       {/* ✅ Show ChatWidget only on certain routes */}
       {showChatOnRoutes.includes(location.pathname) && <Chat />}
      <Footer />
    </>
  );
};

export default App;
