import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
