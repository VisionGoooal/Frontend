import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";
import Predictions from "./pages/PredictionsPage";
import Profile from "./pages/ProfilePage";
import About from "./pages/AboutPage";
import Chat from "./pages/ChatPage";
import Footer from "./components/layout/Footer";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/predict" element={<Predictions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
