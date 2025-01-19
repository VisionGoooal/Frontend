import FeedPage from "../components/FeedPage";
import LoggedInNavBar from "../components/navbars-components/LoggedInNavBar";
import "../css/pages_css/Feed.css"

const Feed = () => {
  return (
    <>
      <LoggedInNavBar />
      <div>
      <center>
        <h1>Feed</h1>
      </center>
        
        <FeedPage />
      </div>
    </>
  );
};

export default Feed;
