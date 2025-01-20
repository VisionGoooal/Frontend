import React from "react";
import LoggedInNavBar from "../components/navbars-components/LoggedInNavBar";
import Card from "../components/ui-components/Card";
import Input from "../components/ui-components/Input";
import Button from "../components/ui-components/Button";
import "../css/pages_css/Profile.css";

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
        "https://upload.wikimedia.org/wikipedia/en/e/e0/Manchester_City_FC_badge.svg", // Manchester City logo
    },
    {
      title: "Barcelona VS Real Madrid Match Review",
      date: "2025-01-18",
      content:
        "Barcelona dominated the match with a stunning 3-1 victory over Real Madrid in El Clásico!",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/800px-FC_Barcelona_%28crest%29.svg.png", // Barcelona logo
    },
    {
      title: "Arsenal VS Tottenham Hotspur Derby Analysis",
      date: "2025-01-15",
      content:
        "Arsenal edged out Tottenham in the North London Derby with a 2-1 win, securing their top spot in the league.",
      image: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg", // Arsenal logo
    },
  ],
};

const Profile = () => {
  return (
    <>
      <LoggedInNavBar />
      <div className="profile-container">
        <Card className="profile-card">
          <div className="profile-card-content">
            <img
              src={user.image}
              alt="User Avatar"
              className="profile-avatar"
            />
            <div className="profile-info">
              <h2>{user.userName}</h2>
              <p>
                Wins: {user.wins} | Losses: {user.losses}
              </p>
            </div>
          </div>
        </Card>

        {/* Posts History Section */}
        <Card title="Posts History">
          <ul className="posts-list">
            {user.postsHistory.map((post, index) => (
              <li key={index} className="post-item">
                <h4>{post.title}</h4>
                <p>
                  <strong>Date:</strong> {post.date}
                </p>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Edit Personal Information Section */}
        <Card title="Edit Personal Information">
          <div className="edit-info">
            <Input
              label="Username"
              type="text"
              id="username"
              placeholder="Enter your username"
              required
            />
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              id="date-of-birth"
              required
            />
            <Input
              label="Country"
              type="select"
              id="country"
              required
              options={[
                { value: "usa", label: "United States" },
                { value: "uk", label: "United Kingdom" },
                { value: "canada", label: "Canada" },
                { value: "australia", label: "Australia" },
                { value: "israel", label: "Israel" },
              ]}
            />
            {/* Save Changes Button */}
            <Button
              type="submit"
              className="btn btn-primary"
              ariaLabel="Save Changes"
            >
              Save Changes
            </Button>
          </div>
        </Card>

        <Card title="Preferences">
  <div className="preferences">
    <Input
      label="Dark Mode"
      type="checkbox"
      id="dark-mode"
      className="form-check-input"
      role="switch"
    />
    <Input
      label="Receive Notifications"
      type="checkbox"
      id="receive-notifications"
      className="form-check-input"
      role="switch"
    />
  </div>
</Card>

      </div>
    </>
  );
};

export default Profile;
