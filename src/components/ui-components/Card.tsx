import React from "react";
import "../../css/Card.css";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className }: CardProps) => {
  return (
    <div className={`card ${className || ""}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
};

Card.defaultProps = {
  title: null, // Default to null if no title is provided
};

export default Card;
