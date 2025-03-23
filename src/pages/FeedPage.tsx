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
      formData.append("owner", "some-user-id");
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
        <div className="add-post-container bg-gray-100 p-4 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <textarea
              value={postContent}
              onChange={handleContentChange}
              placeholder="What's on your mind?"
              rows={4}
              className="p-2 border rounded-lg w-full"
              required
            />
            <div className="flex items-center space-x-4">
              {/* Image upload */}
              <button
                type="button"
                onClick={() => document.getElementById("imageInput")?.click()}
                className="p-2 bg-blue-500 text-white rounded-lg"
              >
                📷 Add Image
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
                className="p-2 bg-yellow-500 text-white rounded-lg"
              >
                😀 Emoji
              </button>

              {showEmojiPicker && (
                <div className="absolute z-10 bg-white border rounded-lg shadow-lg">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 bg-green-500 text-white rounded-lg"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>

            {/* Image Preview */}
            {selectedImage && (
              <div>
                <p>Selected Image: {selectedImage.name}</p>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="max-w-xs mt-2"
                />
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
