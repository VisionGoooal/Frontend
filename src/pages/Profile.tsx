import React from "react";
import LoggedInNavBar from "../components/navbars-components/LoggedInNavBar";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Button from "../components/ui-components/Button";
import Footer from "../components/ui-components/Footer";

const user = {
  userName: "John Doe",
  email: "johndoe@example.com",
  image: "https://www.svgrepo.com/show/51675/man.svg",
  wins: 34,
  losses: 12,
  postsHistory: [
    {
      title: "Liverpool VS Manchester City Prediction",
      date: "2025-01-20",
      content:
        "VisionGoal AI predicts that Manchester City will win the match, and I support them!",
      image:
        "https://upload.wikimedia.org/wikipedia/en/e/e0/Manchester_City_FC_badge.svg",
    },
    {
      title: "Barcelona VS Real Madrid Match Review",
      date: "2025-01-18",
      content:
        "Barcelona dominated the match with a stunning 3-1 victory over Real Madrid in El Clásico!",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/800px-FC_Barcelona_%28crest%29.svg.png",
    },
    {
      title: "Arsenal VS Tottenham Hotspur Derby Analysis",
      date: "2025-01-15",
      content:
        "Arsenal edged out Tottenham in the North London Derby with a 2-1 win, securing their top spot in the league.",
      image: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    },
  ],
};

const Profile = () => {
  return (
    <>
      <LoggedInNavBar />

      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Profile
          </h1>
        </div>

        <main className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          {/* Profile Card */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-6">
              <img
                src={user.image}
                alt="User Avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">{user.userName}</h2>
                <p className="text-gray-500">{user.email}</p>
                <p className="mt-1 text-gray-600">
                  Wins: {user.wins} | Losses: {user.losses}
                </p>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
            <p className="text-sm text-gray-500">
              This information will be displayed publicly.
            </p>

            <form className="mt-4 space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={user.userName}
                    className="block w-full rounded-md border-gray-300 px-3 py-1.5 focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user.email}
                    className="block w-full rounded-md border-gray-300 px-3 py-1.5 focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>

                <div className="col-span-full">
                  <label htmlFor="photo" className="block text-sm font-medium text-gray-900">
                    Profile Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon className="size-12 text-gray-300" />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-900">
                    About
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    placeholder="Write a few sentences about yourself..."
                    className="block w-full rounded-md border-gray-300 px-3 py-1.5 focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
              >
                Save Changes
              </Button>
            </form>
          </div>

          {/* Posts History Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Posts History</h2>
            <ul className="mt-4 space-y-4">
              {user.postsHistory.map((post, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm">
                  <h4 className="text-md font-semibold">{post.title}</h4>
                  <p className="text-gray-500">
                    <strong>Date:</strong> {post.date}
                  </p>
                  <p>{post.content}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
            <div className="mt-4 flex flex-col space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                <span className="text-gray-700">Enable Dark Mode</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                <span className="text-gray-700">Receive Notifications</span>
              </label>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
