import FeedPage from "../components/FeedPage";
import LoggedInNavBar from "../components/navbars-components/LoggedInNavBar";
import "../css/pages_css/Feed.css"

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
