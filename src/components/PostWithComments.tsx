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

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setIsLoading(true);

        const [postResponse, commentsResponse] = await Promise.all([
          axiosInstance.get(`/post/${postId}`), 
          axiosInstance.get(`/comment/${postId}`), 
        ]);

        setPost(postResponse.data);
        setComments(Array.isArray(commentsResponse.data) ? commentsResponse.data : []);
      } catch (error) {
        console.error("Error fetching post or comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>Author:</strong> {post.owner}</p>

      <h3>Comments</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <h4>{comment.title}</h4>
              <p>{comment.content}</p>
              <p><strong>By:</strong> {comment.owner}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default PostWithComments;
