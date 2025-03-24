import { useState } from "react";
import Navbar from "../components/layout/Navbar";

interface User {
  _id: string;
  name: string;
  avatar: string;
  lastMessage: string;
}

interface Message {
  sender: "me" | "other";
  text: string;
}

const dummyUsers: User[] = [
  {
    _id: "1",
    name: "Alice",
    avatar: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    lastMessage: "Hoorayy!!",
  },
  {
    _id: "2",
    name: "Martin",
    avatar: "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    lastMessage: "That pizza place was amazing!",
  },
];

const dummyMessages: Message[] = [
  { sender: "other", text: "Hey Bob, how's it going?" },
  {
    sender: "me",
    text: "I'm good, just finished a great book. How about you?",
  },
  { sender: "other", text: "That book sounds interesting! What's it about?" },
];

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [messageInput, setMessageInput] = useState("");

  const handleSend = () => {
    if (messageInput.trim() === "") return;
    setMessages([...messages, { sender: "me", text: messageInput }]);
    setMessageInput("");
  };

  return (
    <>
    <Navbar />
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
        </header>

        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {dummyUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              onClick={() => setSelectedUser(user)}
            >
              <div className="w-12 h-12 rounded-full mr-3 overflow-hidden">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-gray-600 truncate">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 relative flex flex-col">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700 border-b border-gray-200">
          <h1 className="text-2xl font-semibold">
            {selectedUser ? selectedUser.name : "Select a contact"}
          </h1>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedUser &&
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "me" ? "justify-end" : ""}`}
              >
                <div
                  className={`max-w-96 p-3 rounded-lg ${
                    msg.sender === "me"
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Chat Input */}
        {selectedUser && (
          <footer className="bg-white border-t border-gray-300 p-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSend}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Send
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
    </>
  );
};

export default ChatPage;
