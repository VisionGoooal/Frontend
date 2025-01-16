import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/axiosConfig"; 
import PostWithComments from "./PostWithComments";
import { Post } from "../types/Post";


const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
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

    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Feed</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
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
