import React from "react";
import ChatList from "./ChatList";

const ChatSidebar = () => {
  return (
    <div className="w-[300px] flex flex-col bg-white shadow-md border-l border-gray-300 h-full p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
      <ChatList />
    </div>
  );
};

export default ChatSidebar;
