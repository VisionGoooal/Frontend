import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/axiosConfig";
import PostWithComments from "../components/feed/PostWithComments";
import { Post } from "../types/Post";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Prediction } from "../types/Prediction";
import Navbar from "../components/layout/Navbar";

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postContent, setPostContent] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const avatar = user.profileImage || "/gamer.png";

  // Handle emoji selection
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setPostContent((prevContent) => prevContent + emojiData.emoji);
  };

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("api/posts");
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

  useEffect(() => {
    const storedPrediction = window.localStorage.getItem("prediction");
    if (storedPrediction) {
      const prediction: Prediction = JSON.parse(storedPrediction);
      addPostByPrediction(prediction);
    }
    window.localStorage.removeItem("prediction");
    fetchPosts();
  }, []);

  const addPostByPrediction = async (prediction: Prediction) => {
    let team1Logo = "";
    let team2Logo = "";
    try {
      const logosResponse = await fetch("/src/constants/teamsLogos.json");
      const data = await logosResponse.json();
      team1Logo = data[prediction.Team1];
      team2Logo = data[prediction.Team2];
      const drawLogo = data["Draw"];

      const post = {
        title: `${prediction.Team1} VS ${prediction.Team2} - AI Prediction`,
        content:
          prediction.Winner !== "Draw"
            ? `VisionGoal AI predicts that ${prediction.Winner} will win ${prediction.Team1Score}-${prediction.Team2Score}!`
            : `VisionGoal AI predicts a draw ${prediction.Team1Score}-${prediction.Team2Score}.`,
        owner: "some-user-id",
        likes: 0,
        image:
          prediction.Winner === prediction.Team1
            ? team1Logo
            : prediction.Winner === prediction.Team2
            ? team2Logo
            : drawLogo,
      };

      await axiosInstance.post("api/prediction/post", post);
    } catch (error) {
      console.error("Error reposting prediction:", error);
    }
  };

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
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      formData.append("owner", user.id);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("likes", "0");

      await axiosInstance.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPostContent("");
      setSelectedImage(null);
      fetchPosts(); // Refresh posts after submission
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Post Creation */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Top Row: Avatar + Textarea */}
            <div className="flex items-start space-x-4">
              <img
                src="/gamer.png"
                alt={avatar}
                className="w-10 h-10 rounded-full"
              />
              <textarea
                value={postContent}
                onChange={handleContentChange}
                placeholder="What's on your mind?"
                rows={3}
                className="flex-1 p-3 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white resize-none"
              />
            </div>

            {/* Image Preview */}
            {selectedImage && (
              <div className="pl-14">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selected Image: {selectedImage.name}
                </p>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="mt-2 max-w-xs rounded-lg shadow"
                />
              </div>
            )}

            {/* Buttons Row */}
            <div className="flex items-center justify-between pl-14 flex-wrap gap-3">
              <div className="flex gap-3">
                {/* Image Upload */}
                <button
                  type="button"
                  onClick={() => document.getElementById("imageInput")?.click()}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  📷 Image
                </button>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageSelect}
                />

                {/* Emoji Picker */}
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                >
                  😀 Emoji
                </button>
              </div>

              {/* Post Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-60"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>

            {/* Emoji Picker UI */}
            {showEmojiPicker && (
              <div className="relative z-50 mt-2 pl-14">
                <div className="absolute">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Posts Feed */}
        {isLoading ? (
          <p>Loading...</p>
        ) : posts.length > 0 ? (
          posts
            .slice()
            .reverse()
            .map((post) => (
              <div
                key={post._id}
                className="my-6 p-4 border rounded-lg shadow-md"
              >
                <PostWithComments postId={post._id} />
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </>
  );
};

export default FeedPage;
