import React, { useEffect, useState } from "react";
import axiosInstance from "../../Services/axiosConfig";
import { Comment } from "../../types/Comment";
import { Post } from "../../types/Post";
// import "../css/components_css/postCss.css";

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
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axiosInstance.post(`/comment`, {
        title: "title",
        content: newComment,
        postId: postId,
        owner: "owner",
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
    <div className="container">
      <div className="first-row">
        <img
          src="../../public/gamer.png"
          alt="user-profile"
          className="profile-img"
        />
        <div className="title-and-time">
          <h3>{post.title}</h3>
          <p>just now</p>
        </div>

        <div className="icon">
          <div className="img-div">
            <img src="../../public/vite.svg" alt="icon" />
          </div>
        </div>
      </div>

      <div className="content">
        <p>{post.content}</p>
      </div>

      {post.image != null && (
        <div className="post-image">
          <img
            src={
              post.image.startsWith("http")
                ? post.image
                : `http://localhost:3000${post.image}`
            }
            alt="post"
          />
        </div>
      )}

      <div className="likes-and-comments">
        <div className="likes" onClick={handleLike}>
          <span role="img" aria-label="like">
            👍
          </span>
          <p>{likes} Likes</p>
        </div>
        <div className="comments" onClick={handleCommentClick}>
          <span role="img" aria-label="comment">
            💬
          </span>
          <p>{comments.length} Comments</p>
        </div>
      </div>

      {showCommentInput && (
        <div className="comment-input-section">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        {commentsToDisplay.length > 0 ? (
          <ul className="comments-list">
            {commentsToDisplay
              .slice()
              .reverse()
              .map((comment) => (
                <li key={comment._id} className="comment">
                  <p className="comment-author">By: {comment.owner}</p>
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
        {showAllComments && (
          <button onClick={() => setShowAllComments(false)}>
            Hide Comments
          </button>
        )}
      </div>
    </div>
  );
};

export default PostWithComments;
