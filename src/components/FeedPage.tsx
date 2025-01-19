import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/axiosConfig";
import PostWithComments from "./PostWithComments";
import { Post } from "../types/Post";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

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
        posts.map((post) => (
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
