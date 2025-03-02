import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/axiosConfig";
import PostWithComments from "./PostWithComments";
import { Post } from "../types/Post";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import FriendsList from "./FriendsList"; // Component for Friends List
import ChatSidebar from "../components/chat-components/ChatSidebar"; // Chat Sidebar
import UpcomingMatches from "./UpcomingMatches"

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postContent, setPostContent] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setPostContent((prevContent) => prevContent + emojiData.emoji);
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/post");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim() && !selectedImage) {
      alert("Please add some content or an image.");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", "New Post");
      formData.append("content", postContent);
      formData.append("owner", "some-user-id");
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("likes", "0");

      await axiosInstance.post("/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPostContent("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsSubmitting(false);
    }
    fetchPosts();
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-4">
      {/* Left Sidebar */}
      <aside className="hidden lg:block w-1/4 p-4">
        <UpcomingMatches />
      </aside>

      {/* Main Feed */}
      <main className="w-full lg:w-1/2 p-4 bg-white shadow-md rounded-lg border border-gray-300">
        {/* Create Post */}
        <div className="p-4 border-b border-gray-300">
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={postContent}
              onChange={handleContentChange}
              placeholder="What's on your mind?"
              rows={3}
              className="w-full p-2 border rounded-md bg-gray-100"
              required
            />
            <div className="flex justify-between">
              <label className="cursor-pointer">
                <input type="file" hidden onChange={handleImageSelect} />
                <span className="text-blue-600">📸 Add Image</span>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>

        {/* Posts */}
        <div className="mt-4">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="p-4 border-b">
                <PostWithComments postId={post._id} />
              </div>
            ))
          ) : (
            <p className="text-center">No posts available.</p>
          )}
        </div>
      </main>

      {/* Right Sidebar (Chat + Friends List) */}
      <aside className="hidden lg:block w-1/4 p-4">
        <FriendsList />
        <ChatSidebar />
      </aside>
    </div>
  );
};

export default FeedPage;
