
import Avatar from "../ui-components/Avatar";

interface CardProps {
    userName: string;
    email: string;
    image: string;
    }

const Card = ({ userName, email, image }: CardProps) => {
  return (
    <div
      className="card"
      style={{ width: "28rem", margin: "1rem", height: "100%" }}
    >
      <Avatar
        src={image}
        alt="Card image"
        size="sm"
      />
      <div className="card-body">
        <h5 className="card-title">{userName}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
        {email}
        </h6>
        <p className="card-text">
          
        </p>
      </div>
    </div>
  );
};

export default Card;
