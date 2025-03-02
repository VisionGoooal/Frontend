import React from "react";

const friends = [
  { id: 1, name: "John Smith", avatar: "https://via.placeholder.com/40", status: "online" },
  { id: 2, name: "Jane Doe", avatar: "https://via.placeholder.com/40", status: "offline" },
  { id: 3, name: "Michael Johnson", avatar: "https://via.placeholder.com/40", status: "online" },
];

const FriendsList = () => {
  return (
    <div className="bg-white p-4 shadow-md border border-gray-300 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Friends List</h2>
      <div className="space-y-3">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center gap-3">
            <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
            <span className="text-gray-900 font-medium">{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
