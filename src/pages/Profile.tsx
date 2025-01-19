import LoggedInNavBar from "../components/navbars-components/LoggedInNavBar";
import Card from "../components/ui-components/Card";
import "../css/Avatar.css"

const user = {
  userName: "John Doe",
  email: "johndoe@gmail.com",
  image: "https://www.svgrepo.com/show/51675/man.svg",
};

const Profile = () => {
  return (
    <>
      <LoggedInNavBar />
      <Card
        userName={user.userName}
        email={user.email}
        image={user.image}
      />
    </>
  );
};

export default Profile;
