import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/axiosConfig";
import PostWithComments from "./PostWithComments";
import { Post } from "../types/Post";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Prediction } from "../types/Prediction"; // Adjust the import path as necessary

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
      console.log("Response data:", response.data);
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

  const addPostByPrediction = async (prediction:Prediction) => {
    let team1Logo = "";
    let team2Logo = "";
try {
    const logosResponse = await fetch("/src/constants/teamsLogos.json");
    const data = await logosResponse.json();
    team1Logo = data[prediction.Team1];
    team2Logo = data[prediction.Team2];
    const drawLogo = data["Draw"];
    console.log(prediction.Team1, prediction.Team2);
    console.log("Team 1 logo:", team1Logo);
    console.log("Team 2 logo:", team2Logo);
    const post = {
        title: prediction.Team1 + " VS " + prediction.Team2 + " VisonGoal AI Prediction",
        content: prediction.Winner != "Draw" ? "VisionGoal AI predict that " + prediction.Winner + " will win " + prediction.Team1Score+"-"
        + prediction.Team2Score + "the match and I am with them!" : "VisionGoal AI predict that the match will end in a draw " + prediction.Team1Score+"-" + prediction.Team2Score,
        owner: "some-user-id",
        likes: 0,
        image: prediction.Winner == prediction.Team1 ? team1Logo : prediction.Winner == prediction.Team2 ? team2Logo : drawLogo, 
    };
    const response = await axiosInstance.post("/prediction/post", post);
    console.log("Prediction reposted successfully:", response.data);
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
      formData.append("title", "titleeee");
      formData.append("content", postContent);
      formData.append("owner", "some-user-id");
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("likes", "0");

      const response = await axiosInstance.post("/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Post added successfully:", response.data);

      setPostContent("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsSubmitting(false);
    }

    fetchPosts();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="add-post-container">
        <form onSubmit={handleSubmit} className="add-post-form">
          <textarea
            value={postContent}
            onChange={handleContentChange}
            placeholder="What's on your mind?"
            rows={4}
            className="add-post-textarea"
            required
          />
          <div className="add-post-actions">
            <div className="add-post-icons">
              {/* Image upload button */}
              <button
                type="button"
                className="add-post-icon-button"
                onClick={() => document.getElementById("imageInput")?.click()}
              >
                <img
                  src="../../public/add-image.png"
                  alt="Add Image"
                  className="add-post-icon"
                />
              </button>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageSelect}
              />

              <button
                type="button"
                className="add-emoji-button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <img
                  src="../../public/smile-plus.png"
                  alt="Add Emoji"
                  className="add-emoji-icon"
                />
              </button>

              {/* Emoji picker component */}
              {showEmojiPicker && (
                <div className="emoji-picker-container">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="add-post-submit-button"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
        {selectedImage && (
          <div>
            <p>Selected Image: {selectedImage.name}</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          </div>
        )}
      </div>

      {/* Posts rendering */}
      {posts.length > 0 ? (

        posts.slice().reverse().map((post) => (
          <div key={post._id} className="divFather">
            <PostWithComments postId={post._id} />
            <hr />
          </div>
        ))

      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default FeedPage;
