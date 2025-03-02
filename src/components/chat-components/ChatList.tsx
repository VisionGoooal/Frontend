import React from "react";
import ChatItem from "./ChatItem";

const chatUsers = [
  { id: 1, name: "John Doe", message: "Hey! How are you?", avatar: "https://via.placeholder.com/50" },
  { id: 2, name: "Alice Smith", message: "Let’s meet tomorrow", avatar: "https://via.placeholder.com/50" },
  { id: 3, name: "Michael Brown", message: "Game tonight?", avatar: "https://via.placeholder.com/50" },
];

const ChatList = () => {
  return (
    <div className="space-y-4">
      {chatUsers.map((user) => (
        <ChatItem key={user.id} name={user.name} message={user.message} avatar={user.avatar} />
      ))}
    </div>
  );
};

export default ChatList;
