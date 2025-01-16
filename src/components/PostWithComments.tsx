import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/axiosConfig";
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";

interface PostWithCommentsProps {
  postId: string;
}

const PostWithComments: React.FC<PostWithCommentsProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(0);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false); // מצב לאינפוט
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>(""); // תוכן התגובה החדשה

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setIsLoading(true);

        const [postResponse, commentsResponse] = await Promise.all([
          axiosInstance.get(`/post/${postId}`),
          axiosInstance.get(`/comment/${postId}`),
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
      const response = await axiosInstance.patch(`/post/${postId}/like`, {
        action: "like",
      });
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleCommentClick = () => {
    setShowCommentInput(!showCommentInput); // הפוך את המצב
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // אל תאפשר שליחה של תגובה ריקה

    try {
      const response = await axiosInstance.post(`/comment`, {
        title: "title",
        content: newComment,
        postId: postId,
        owner: "owner",
      });

      setComments((prevComments) => [...prevComments, response.data]); // הוסף את התגובה לרשימה
      setNewComment(""); // רוקן את השדה
      setShowCommentInput(false); // הסתר את השדה
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (isLoading) return <div className="loader">Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  const commentsToDisplay = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="post-container">
      <div className="post">
        <div className="post-header">
          <h2>{post.title}</h2>
          <p className="post-author">By: {post.owner}</p>
          {/* שדה תגובה */}
          {showCommentInput && (
              
              <div className="comment-input-section">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="comment-input"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="submit-comment-button"
                >
                  Submit
                </button>
              </div>
            )}
          <div className="post-actions">
            <button className="like-button" onClick={handleLike}>
              👍 Like
            </button>
            <button className="comment-button" onClick={handleCommentClick}>
              💬 Comment
            </button>
            <span className="likes-count">{likes} Likes</span>
          </div>
        </div>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </div>

      {/* תגובות */}
      <div className="comments-section">
        <h3>Comments</h3>
        {commentsToDisplay.length > 0 ? (
          <ul className="comments-list">
            {commentsToDisplay.map((comment) => (
              <li key={comment._id} className="comment">
                <div className="comment-header">
                  <p className="comment-author">By: {comment.owner}</p>
                </div>
                <p className="comment-content">{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
        {comments.length > 3 && !showAllComments && (
          <button onClick={handleShowAllComments}>See All Comments</button>
        )}
        {showAllComments && (<button onClick={() => setShowAllComments(false)}>Hide Comments</button>)}
      </div>
    </div>
  );
};

export default PostWithComments;
