import React from "react";
import { Avatar } from "./Avatar";

type SocialFeedPostProps = {
  avatar: string;
  name: string;
  handle: string;
  timestamp: string;
  commentCount?: string;
  likeCount?: string;
  children: React.ReactNode;
  preview?: React.ReactNode;
};

export const SocialFeedPost: React.FC<SocialFeedPostProps> = ({
  avatar,
  name,
  handle,
  timestamp,
  commentCount,
  likeCount,
  children,
  preview,
}) => {
  return (
    <div className="p-4 border-b border-gray-300 bg-white">
      <div className="flex items-start gap-3">
        <Avatar image={avatar} />
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div>
              <span className="font-semibold text-gray-900">{name}</span>
              <span className="text-gray-500 text-sm"> {handle} · {timestamp}</span>
            </div>
          </div>
          <div className="mt-2">{children}</div>
          {preview && <div className="mt-3">{preview}</div>}
          <div className="mt-2 flex space-x-4 text-gray-500 text-sm">
            {commentCount && <span>💬 {commentCount}</span>}
            {likeCount && <span>❤️ {likeCount}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};