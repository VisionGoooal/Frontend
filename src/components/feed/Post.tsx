import { useState } from "react";
import { Card, CardBody, Avatar, Button } from "@nextui-org/react";
import { HeartIcon, ChatBubbleLeftIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled, BookmarkIcon as BookmarkIconFilled } from "@heroicons/react/24/solid";

const Post = ({ post }: { post: any }) => {
  const [likes, setLikes] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <Card className="p-4 bg-white shadow-lg rounded-lg transition-all hover:shadow-xl">
      <CardBody>
        <div className="flex items-start gap-4">
          {/* User Avatar */}
          <Avatar src={post.user.profilePic} className="w-12 h-12" />

          <div className="w-full">
            {/* Username & Handle */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900">
                {post.user.name} <span className="text-gray-500 text-sm">{post.user.username}</span>
              </h3>
            </div>

            {/* Post Content */}
            <p className="text-gray-700 mt-1 text-lg leading-relaxed">{post.content}</p>

            {/* Post Image (If Available) */}
            {post.image && (
              <div className="w-full mt-3 rounded-xl overflow-hidden">
                <img src={post.image} alt="Post" className="w-full rounded-xl object-cover" />
              </div>
            )}

            {/* Like, Comment, Bookmark Actions */}
            <div className="flex items-center justify-between mt-4 text-gray-600">
              {/* Like Button */}
              <button
                onClick={() => {
                  setLiked(!liked);
                  setLikes(liked ? likes - 1 : likes + 1);
                }}
                className="flex items-center gap-2 hover:text-red-500 transition"
              >
                {liked ? <HeartIconFilled className="w-6 h-6 text-red-500" /> : <HeartIcon className="w-6 h-6" />}
                <span className="text-lg">{likes}</span>
              </button>

              {/* Comment Button */}
              <button className="flex items-center gap-2 hover:text-blue-500 transition">
                <ChatBubbleLeftIcon className="w-6 h-6" />
                <span className="text-lg">{post.comments.length}</span>
              </button>

              {/* Bookmark Button */}
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="flex items-center gap-2 hover:text-yellow-500 transition"
              >
                {bookmarked ? <BookmarkIconFilled className="w-6 h-6 text-yellow-500" /> : <BookmarkIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
