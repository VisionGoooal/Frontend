import FeedPage from "../components/FeedPage";
import LoggedInNavBar from "../components/navbars-components/LoggedInNavBar";

const Feed = () => {
  return (
    <>
      <LoggedInNavBar />
      <div>
        <FeedPage />
      </div>
    </>
  );
};

export default Feed;
