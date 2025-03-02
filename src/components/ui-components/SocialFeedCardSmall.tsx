import React from "react";

type SocialFeedCardSmallProps = {
  title: string;
  caption: string;
};

export const SocialFeedCardSmall: React.FC<SocialFeedCardSmallProps> = ({
  title,
  caption,
}) => {
  return (
    <div className="border p-3 rounded-lg">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <span className="text-xs text-gray-500">{caption}</span>
    </div>
  );
};
