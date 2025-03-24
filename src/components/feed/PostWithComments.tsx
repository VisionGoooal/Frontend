import React, { useEffect, useState } from "react";
import axiosInstance from "../../Services/axiosConfig";
import { Comment } from "../../types/Comment";
import { Post } from "../../types/Post";

interface PostWithCommentsProps {
  postId: string;
}

const PostWithComments: React.FC<PostWithCommentsProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(0);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userFullName = user?.fullName || "Anonymous";

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

  const handleShowAllComments = () => {
    setShowAllComments(true);
  };

  const handleLike = async () => {
    try {
      console.log("Like button clicked!");
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
        title: "title",
        content: newComment,
        postId: postId,
        owner: userFullName,
      });

      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
      setShowCommentInput(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (isLoading) return <div className="loader">Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  const commentsToDisplay = showAllComments ? comments : comments.slice(0, 1);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 mb-6 rounded-lg shadow">
      {/* Header: user avatar + name + time */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src="/gamer.png"
            alt="user-profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-black">
              {post.owner.userFullName || "Anonymous"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Just now</p>
          </div>
        </div>
        <img src="/vite.svg" alt="icon" className="w-6 h-6" />
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
          👍 <span className="ml-1">{likes} Likes</span>
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
            className="w-full p-2 border rounded-lg text-sm dark:bg-gray-200 dark:text-white"
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
          commentsToDisplay
            .slice()
            .reverse()
            .map((comment) => (
              <div key={comment._id} className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-800 dark:text-black">
                  {comment.owner}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
            ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}

        {comments.length > 3 && !showAllComments && (
          <button
            onClick={handleShowAllComments}
            className="text-sm text-blue-500 hover:underline"
          >
            See All Comments
          </button>
        )}
        {showAllComments && (
          <button
            onClick={() => setShowAllComments(false)}
            className="text-sm text-blue-500 hover:underline"
          >
            Hide Comments
          </button>
        )}
      </div>
    </div>
  );
};

export default PostWithComments;
