import React from "react";

type SocialSuggestedCardProps = {
  title: string;
  children: React.ReactNode;
};

export const SocialSuggestedCard: React.FC<SocialSuggestedCardProps> = ({
  title,
  children,
}) => {
  return (
    <div className="border p-4 rounded-lg bg-white w-full shadow-md">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div>{children}</div>
    </div>
  );
};