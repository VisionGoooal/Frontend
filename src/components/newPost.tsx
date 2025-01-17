import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/axiosConfig";
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";
import "../css/postCss.css";

interface PostWithCommentsProps {
  postId: string;
}

const newPost: React.FC<PostWithCommentsProps> = () => {
  return (
    <div className="container">
      <div className="first-row">
        <img src="../../public/gamer.png" alt="" />
        <div className="title-and-time">
          <h3>title</h3>
          <p>time</p>
        </div>

        <div className="icon">
          <div className="img-div">
            <img src="../../public/vite.svg" alt="icon" />
          </div>
        </div>
      </div>
      <div className="content">
        <p>content</p>
      </div>

      <div className="post-image">
        <img src="../../public/gamer.png" alt="post" />
      </div>

      <div className="likes-and-comments">
        <div className="likes">
          <img src="../../public/like.svg" alt="like" />
          <p>likes</p>
        </div>
        <div className="comments">
          <img src="../../public/comment.svg" alt="comment" />
          <p>comments</p>
        </div>
      </div>
    </div>
  );
};

export default newPost;
