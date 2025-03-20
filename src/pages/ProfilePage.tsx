import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Select,
  SelectItem,
} from "@nextui-org/react";

interface Post {
  date: string;
  content: string;
}

const ProfilePage = () => {
  const [userFullName, setUserFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("Unauthorized! Please log in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        setUserFullName(data.userFullName);
        setEmail(data.email);
        setCountry(data.country);
        setDateOfBirth(data.dateOfBirth ? data.dateOfBirth.split("T")[0] : ""); // Format date
        setProfilePic(data.profileImage || "https://www.svgrepo.com/show/51675/man.svg");
        setPosts(
          (data.postsHistory || []).map((post: { date: string; content: string }) => ({
            date: post.date || "Unknown Date",
            content: post.content || "No Content Available",
          }))
        );
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

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
        setCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Handle Profile Photo Upload
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Handle Profile Update
  const handleUpdateProfile = async () => {
    setError("");

    if (!userFullName || !email || !country || !dateOfBirth) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("userFullName", userFullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("country", country);
      formData.append("dateOfBirth", dateOfBirth);
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      const token = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");

      alert("Profile updated successfully!");

      if (data.profileImage) {
        setProfilePic(data.profileImage);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
        <div className="w-full max-w-3xl space-y-6">

          {/* Profile Header */}
          <Card className="p-6 bg-white shadow-lg rounded-lg">
            <CardBody className="flex items-center space-x-6">
              <Avatar src={profilePic} size="lg" className="w-20 h-20 rounded-full" />
              <div>
                <h2 className="text-xl font-semibold">{userFullName}</h2>
                <p className="text-gray-500">{email}</p>
              </div>
            </CardBody>
          </Card>

          {/* Edit Profile */}
          <Card className="p-6 bg-white shadow-lg rounded-lg">
            <CardHeader className="text-lg font-semibold">Edit Profile</CardHeader>
            <CardBody className="space-y-4">

              {/* Profile Picture Upload */}
              <div className="flex flex-col space-y-3">
                <label className="text-gray-700 font-semibold">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-indigo-500 file:text-white file:rounded-lg file:cursor-pointer"
                />
              </div>

              {/* Full Name */}
              <Input type="text" placeholder="Full Name" value={userFullName} onChange={(e) => setUserFullName(e.target.value)} />

              {/* Email */}
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

              {/* Password */}
              <Input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              {/* Country Selection */}
              <Select placeholder="Choose a country" value={country} onChange={(e) => setCountry(e.target.value)}>
                {countries.map((c) => (
                  <SelectItem key={c.code} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </Select>

              {/* Date of Birth */}
              <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

              {/* Save Changes Button */}
              <Button className="w-full bg-indigo-500 text-white hover:bg-indigo-600 transition" onClick={handleUpdateProfile} disabled={loading}>
                {loading ? "Updating..." : "Save Changes"}
              </Button>

              {error && <p className="text-red-500 text-center">{error}</p>}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
