import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user.id);
      
      navigate("/feed");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-6xl items-center justify-between relative">
        {/* 🔥 AI-Inspired Left Side - Bright */}
        <div className="hidden md:flex flex-col w-1/2 items-center justify-center relative text-black">
          <div className="absolute inset-0">
            {/* AI Bright Glow Effects */}
            <div className="absolute w-96 h-96 bg-gradient-to-r from-indigo-300 to-purple-300 blur-[120px] opacity-70 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 opacity-60 rounded-full blur-[100px]"></div>
          </div>

          <h1 className="text-5xl font-extrabold text-indigo-500 drop-shadow-lg z-10">
            VisionGoal
          </h1>
          <p className="mt-4 text-lg text-gray-700 text-center max-w-md z-10">
            AI-powered football match predictions. Get real-time insights and
            analytics to stay ahead of the game!
          </p>

          {/* Glowing Orbs - AI Style */}
          <div className="absolute top-10 right-10 w-44 h-44 bg-purple-300 opacity-50 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 left-20 w-56 h-56 bg-indigo-300 opacity-40 rounded-full blur-[120px]"></div>
        </div>

        {/* 🔐 Right Side - Login Form */}
        <Card className="w-full max-w-md bg-white text-gray-800 p-8 rounded-lg shadow-xl">
          <CardHeader className="text-center text-2xl font-bold pb-4">
            Sign In
          </CardHeader>
          <CardBody className="flex flex-col gap-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <Input
              type="email"
              placeholder="Enter your email"
              variant="bordered"
              className="w-full h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Enter your password"
              variant="bordered"
              className="w-full h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="w-full h-12 bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300 shadow-md"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>

            <Button
              className="w-full h-12 flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
              onClick={handleGoogleLogin}
            >
              <img
                src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                alt="Google Logo"
                className="w-5 h-5"
              />
              <span className="font-medium">Sign in with Google</span>
            </Button>

            <Spacer y={2} />

            <div className="text-center">
              <span className="text-gray-500">Don't have an account?</span>{" "}
              <Link
                href="/register"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Register
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
