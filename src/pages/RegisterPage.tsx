import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
  Spacer,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch country list from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();

        const countryList = data.map(
          (country: { name: { common: string }; cca2: string }) => ({
            name: country.name.common,
            code: country.cca2,
          })
        );

        setCountries(
          countryList.sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
          )
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleRegister = async () => {
    setError("");

    // 🔹 Validate inputs
    if (
      !userFullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !country ||
      !dob
    ) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!userFullName.trim() || userFullName.length < 2) {
      setError("Full name is required (min 2 characters)");
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userFullName,
          email,
          password,
          confirmPassword, // <== ADD THIS
          country,
          dateOfBirth: new Date(dob).toISOString().split("T")[0],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 relative">
      <div className="flex w-full max-w-6xl items-center justify-between relative">
        {/* 🔥 AI-Inspired Left Side - Brighter */}
        <div className="hidden md:flex flex-col w-1/2 items-center justify-center relative text-black">
          <div className="absolute inset-0">
            {/* AI Glow Effects */}
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

          {/* Floating AI Effects */}
          <div className="absolute top-10 right-10 w-44 h-44 bg-purple-300 opacity-50 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 left-20 w-56 h-56 bg-indigo-300 opacity-40 rounded-full blur-[120px]"></div>
        </div>

        {/* 📝 Register Form */}
        <Card className="w-full max-w-md bg-white text-gray-800 p-8 rounded-lg shadow-xl">
          <CardHeader className="text-center text-2xl font-bold pb-4">
            Create an Account
          </CardHeader>
          <CardBody className="flex flex-col gap-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <Input
              type="text"
              placeholder="Enter your full name"
              variant="bordered"
              value={userFullName}
              onChange={(e) => setUserFullName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Enter your email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm your password"
              variant="bordered"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Select
              placeholder="Choose a country"
              className="w-full bg-white border border-gray-300 rounded-lg shadow-md"
              popoverProps={{
                className:
                  "bg-white shadow-md border border-gray-300 rounded-lg",
              }}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((c) => (
                <SelectItem key={c.code} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </Select>

            <Input
              type="date"
              className="w-full h-12"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <Button
              className="w-full h-12 bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300 shadow-md"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <Spacer y={2} />

            <div className="text-center">
              <span className="text-gray-500">Already have an account?</span>{" "}
              <Link
                href="/"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Login
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
