import React from "react";

interface ChatItemProps {
  icon?: string;
  name: string;
  subtitle?: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ icon, name, subtitle }) => {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
      {icon && <img src={icon} alt={name} className="w-8 h-8 rounded-full" />}
      <div className="flex flex-col">
        <span className="text-gray-900 font-semibold">{name}</span>
        {subtitle && <span className="text-gray-500 text-sm">{subtitle}</span>}
      </div>
    </div>
  );
};

export default ChatItem;
