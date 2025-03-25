// ✅ Updated ProfilePage: email/password are now read-only fields
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Select, SelectItem } from "@nextui-org/react";

const ProfilePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState("../assets/man.png");
  const [userFullName, setUserFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password] = useState("********"); // Read-only dummy placeholder
  const [confirmPassword] = useState("********"); // Read-only dummy placeholder
  const [country, setCountry] = useState("Israel");
  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER_API_URL+`/api/auth/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        console.log(data.profileImage)
        setUserFullName(data.userFullName);
        setEmail(data.email);
        setCountry(data.country);
        setDateOfBirth(data.dateOfBirth?.split("T")[0] || "2000-01-01");
        const profileImageURL = data.profileImage?.startsWith("http")
        ? data.profileImage
        : `${import.meta.env.VITE_SERVER_API_URL}${data.profileImage}`;
      
        setProfilePic(profileImageURL);
      

        console.log(profilePic)
        
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data.map(
          (c: { name: { common: string }; cca2: string }) => ({
            name: c.name.common,
            code: c.cca2,
          })
        );
        setCountries(
          countryList.sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
          )
        );
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    const fetchUserPosts = async () => {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
    
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/api/posts/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
    
        setUserPosts(data);
      } catch (err) {
        console.error("❌ Failed to fetch user posts:", err);
      }
    };
    

    fetchProfile();
    fetchCountries();
    fetchUserPosts(); // ⬅️ כאן
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!userFullName.trim() || userFullName.length < 2) {
      newErrors.fullName = "Full name is required (min 2 characters)";
    }
    if (!country) {
      newErrors.country = "Country is required";
    }
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    try {
      // 🔹 Step 1: Update text fields
      const response = await fetch(
        import.meta.env.VITE_SERVER_API_URL+`/api/auth/update-profile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userFullName,
            country,
            dateOfBirth,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // 🔹 Step 2: Upload new profile image (if changed)
      if (selectedFile) {
        const formData = new FormData();
        formData.append("profileImage", selectedFile);

        const imageRes = await fetch(
          import.meta.env.VITE_SERVER_API_URL+`/api/auth/upload-profile-image/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const imgData = await imageRes.json();
        if (!imageRes.ok) throw new Error(imgData.message);

        setProfilePic(`${imgData.profileImage}?t=${Date.now()}`);
      }

      alert("✅ Profile updated!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("❌ Update failed: " + err.message);
      } else {
        alert("❌ Update failed: An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="font-sans w-full max-w-4xl rounded-2xl bg-white p-10 text-gray-900 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between mb-8 items-start">
            <h2 className="mb-4 text-4xl font-bold text-blue-900">
              Update Profile
            </h2>
            <div className="text-center">
            <img
                src={profilePic}
                alt="Profile"
                className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-3 hover:scale-105 transition-transform ring ring-gray-300"
              />

              <input
                type="file"
                accept="image/*"
                id="upload_profile"
                hidden
                onChange={handleProfileChange}
              />
              <label
                htmlFor="upload_profile"
                className="inline-block cursor-pointer text-blue-700 text-sm mb-2"
              >
                Change Profile Picture
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={userFullName}
                onChange={(e) => setUserFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email (read-only)
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password (cannot be changed)
              </label>
              <input
                type="password"
                value={password}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password (cannot be changed)
              </label>
              <input
                type="password"
                value={confirmPassword}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <Select
                placeholder="Choose a country"
                selectedKeys={[country]}
                onChange={(e) => setCountry(e.target.value)}
                classNames={{
                  trigger:
                    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white",
                  popoverContent:
                    "bg-white z-50 rounded-md shadow-md border border-gray-200 text-black",
                  listbox: "bg-white text-black",
                }}
              >
                {countries.map((c) => (
                  <SelectItem key={c.code} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </Select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>

          <div className="mt-12">
  <h3 className="text-2xl font-semibold text-indigo-700 mb-4">My Posts</h3>

  {userPosts.length === 0 ? (
    <p className="text-gray-500">You haven’t posted anything yet.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {userPosts.map((post) => (
        <div
          key={post._id}
          className="p-4 bg-white shadow-md border rounded-lg"
        >
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>

          {post.image && (
            <img
              src={`${import.meta.env.VITE_SERVER_API_URL}${post.image}`}
              alt="Post"
              className="mt-3 w-full h-auto rounded"
            />
          )}
        </div>
      ))}
    </div>
  )}
</div>

        </div>
      </div>
    </>
  );
};

export default ProfilePage;
