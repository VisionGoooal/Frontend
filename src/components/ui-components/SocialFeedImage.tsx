import React from "react";

type SocialFeedImageProps = {
  image: string;
};

export const SocialFeedImage: React.FC<SocialFeedImageProps> = ({ image }) => {
  return <img src={image} alt="Post preview" className="w-full rounded-lg" />;
};
