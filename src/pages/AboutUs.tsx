import LandingPageNavbar from "../components/navbars-components/LandingPageNavbar";
import "../css/pages_css/AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <LandingPageNavbar />
      <div className="container mt-5">
        <h1 className="text-center">About VisionGoal</h1>
        <p className="mt-4 text-center">
          Welcome to <strong>VisionGoal</strong>, where innovation meets the passion for sports. Our mission is to revolutionize the way fans experience football by combining technology, analytics, and community-driven insights.
        </p>
        <div className="mt-5">
          <h2>Our Vision</h2>
          <p>
            At VisionGoal, we believe in the power of data and the collective wisdom of fans to predict and analyze football outcomes. Our platform brings together cutting-edge AI technology and the vibrant energy of sports enthusiasts, empowering everyone to engage with the game in a whole new way.
          </p>
        </div>
        <div className="mt-5">
          <h2>The People Behind the Idea</h2>
          <p>
            We are a team of passionate developers, designers, and sports enthusiasts who share a deep love for football and technology. With diverse backgrounds in AI, software engineering, and user experience, we are dedicated to creating a platform that is not only functional but also a joy to use.
          </p>
          <p>
            Each feature of VisionGoal is thoughtfully designed to bring fans closer to the action. Whether you're making predictions, exploring analytics, or sharing insights with the community, our team is here to make your experience unforgettable.
          </p>
        </div>
        <div className="mt-5">
          <h2>Why Choose VisionGoal?</h2>
          <ul>
            <li>Accurate predictions powered by state-of-the-art AI.</li>
            <li>A community-driven platform where your voice matters.</li>
            <li>Detailed match analytics for deeper engagement.</li>
            <li>A seamless, user-friendly interface designed for fans by fans.</li>
          </ul>
        </div>
        <div className="mt-5 text-center">
          <h3>Join us in shaping the future of football analysis and predictions!</h3>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
