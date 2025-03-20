import { useState, useRef, useEffect } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import Navbar from "../components/layout/Navbar";

const Chat = () => {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Simulating a sender (user vs AI response for demo)
    const sender = messages.length % 2 === 0 ? "user" : "bot";

    setMessages([...messages, { id: Date.now(), text: newMessage, sender }]);
    setNewMessage("");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-white px-4">
        <Card className="w-full max-w-2xl shadow-lg bg-gray-800 rounded-xl">
          <CardBody className="p-5">
            <h3 className="text-xl font-semibold text-center mb-4">Live Chat</h3>

            {/* Chat Messages Container */}
            <div className="h-80 overflow-y-auto space-y-3 p-3 bg-gray-700 rounded-lg">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center">No messages yet. Start the conversation!</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 max-w-xs rounded-lg ${
                      msg.sender === "user"
                        ? "bg-indigo-500 self-end ml-auto"
                        : "bg-gray-600 self-start"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="mt-4 flex">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg p-2"
              />
              <Button
                onClick={handleSendMessage}
                className="ml-2 px-6 bg-indigo-500 text-white hover:bg-indigo-600 transition rounded-lg"
              >
                Send
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Chat;
