import React from "react";

type SocialFeedCardLargeProps = {
  image: string;
  title: string;
  subtitle: string;
  caption: string;
};

export const SocialFeedCardLarge: React.FC<SocialFeedCardLargeProps> = ({
  image,
  title,
  subtitle,
  caption,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{subtitle}</p>
        <span className="text-xs text-gray-500">{caption}</span>
      </div>
    </div>
  );
};