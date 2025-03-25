import React, { useEffect, useState } from "react";
import axiosInstance from "../../Services/axiosConfig";
import { Comment } from "../../types/Comment";
import { Post } from "../../types/Post";
import { User } from "../../types/user";

interface PostWithCommentsProps {
  postId: string;
  deleteHandler : (postId:string)=>{};
}

const PostWithComments: React.FC<PostWithCommentsProps> = ({ postId , deleteHandler }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState<[number]>([0]);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>("");
  const [editImage, setEditImage] = useState<File | null>(null);


  const user : User = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setIsLoading(true);

        const [postResponse, commentsResponse] = await Promise.all([
          axiosInstance.get(`/api/posts/${postId}`),
          axiosInstance.get(`/api/comments/${postId}`),
        ]);

        const postData = postResponse.data;
        setPost(postData);
        setLikes(postData.likes);
        setComments(
          Array.isArray(commentsResponse.data) ? commentsResponse.data : []
        );
      } catch (error) {
        console.error("Error fetching post or comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);
  const handleEditModal = () => {
    if (!post) return;
    setEditContent(post.content);
    setShowEditModal(true);
  };
  
  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", editContent);
      if (editImage) formData.append("image", editImage);
  
      const response = await axiosInstance.put(`/api/posts/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setPost(response.data);
      setShowEditModal(false);
      setEditImage(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  
  
  
  

  const handleLike = async () => {
    try {
      const response = await axiosInstance.put(`/api/posts/${postId}/like`, {
        action: "like",
      });
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleCommentClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axiosInstance.post(`/api/comments/${postId}`, {
        content: newComment,
        postId: postId,
        owner: user.id,
      });
      console.log(response.data)
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
      setShowCommentInput(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (isLoading) return <div className="loader">Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  const commentsToDisplay =  comments
  return (
    <div className="bg-white dark:bg-gray-900 p-6 mb-6 rounded-lg shadow">
      {/* Header: user avatar + name + time */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={user.profileImage}
            alt="user-profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-black">
              {post.owner.userFullName }
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Just now</p>
          </div>
        </div>
        {/* conditianal rendering */}
        {post.owner._id === user.id && (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEditModal()}
          className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition"
          title="Edit Post"
        >
          ✏️
        </button>
        <button
          onClick={()=>{deleteHandler(post._id)}}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
          title="Delete Post"
        >
          🗑️
        </button>
      </div>
    )}
    {/* modal for editing post */}
  {/* Modal Overlay (optional) */}
  {showEditModal && (
  <div className="absolute inset-0 flex items-center justify-center z-10">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Edit Post</h2>

      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
        rows={4}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setEditImage(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setShowEditModal(false)}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdatePost}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}



      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 dark:text-black">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="mb-4">
          <img
            src={
              post.image.startsWith("http")
                ? post.image
                : import.meta.env.VITE_SERVER_API_URL+`/${post.image}`
            }
            alt="Post"
            className="rounded-lg max-w-full"
          />
        </div>
      )}

      {/* Likes & Comments Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleLike}
          className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:underline"
        >
          👍 <span className="ml-1">{likes.length} Likes</span>
        </button>
        <button
          onClick={handleCommentClick}
          className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:underline"
        >
          💬 <span className="ml-1">{comments.length} Comments</span>
        </button>
      </div>

      {/* Comment Input */}
      {showCommentInput && (
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-2 border rounded-lg text-sm dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      )}

      {/* Comment List */}
      <div className="space-y-4">
        {commentsToDisplay.length > 0 ? (
          comments
            .slice()
            .reverse()
            .map((comment) => (
              <div key={comment._id} className="flex items-start space-x-3 border-t pt-4">
                <img
                src={user.profileImage}
                alt={user.userFullName}
                className="w-10 h-10 rounded-full"
              />
                <p className="text-sm font-semibold text-gray-800 dark:text-black">
                  {comment.owner.userFullName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
            ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostWithComments;
