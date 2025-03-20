const Comment = ({ text }: { text: string }) => {
    return (
      <div className="mt-2 p-2 bg-gray-700 rounded-lg text-white">
        {text}
      </div>
    );
  };
  
  export default Comment;
  