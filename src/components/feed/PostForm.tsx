import { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";

interface Post {
  id: number;
  content: string;
  image: string;
  likes: number;
  comments: { id: number; text: string; user: string }[];
}

const PostForm = ({ onAddPost }: { onAddPost: (post: Post) => void }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    const newPost = {
      id: Date.now(),
      content,
      image,
      likes: 0,
      comments: [],
    };

    onAddPost(newPost);
    setContent("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea 
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded-lg"
      />
      <Input 
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full bg-gray-700 text-white p-2 rounded-lg"
      />
      <Button type="submit" className="w-full bg-indigo-500 text-white hover:bg-indigo-600 transition">
        Post
      </Button>
    </form>
  );
};

export default PostForm;
