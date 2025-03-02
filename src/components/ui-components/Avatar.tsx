import React from "react";

type AvatarProps = {
  image: string;
  alt?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ image, alt = "User" }) => {
  return (
    <img
      src={image}
      alt={alt}
      className="w-10 h-10 rounded-full object-cover"
    />
  );
};