import React, { useState } from 'react';
import axiosInstance from '../Services/axiosConfig';
import { Post } from '../types/Post'; // Import your Post type from the appropriate file

const AddPost: React.FC = () => {
    const [postContent, setPostContent] = useState<string>(''); // Type for content state
    const [postTitle, setPostTitle] = useState<string>(''); // State to manage title
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Track submission state

    // Handle change in the content input
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(e.target.value);
    };

    // Handle change in the title input
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostTitle(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!postContent.trim() || !postTitle.trim()) {
            return; // Don't submit if title or content is empty
        }

        setIsSubmitting(true);

        try {
            const newPost: Post = {
                title: postTitle,
                content: postContent,
                owner: 'some-user-id', // Replace with actual user ID
                likes: 0,
            };

            const response = await axiosInstance.post('/post', newPost);
            console.log('Post added successfully:', response.data);
            setPostContent(''); // Clear input after submission
            setPostTitle('');
        } catch (error) {
            console.error('Error adding post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Add Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={postTitle}
                        onChange={handleTitleChange}
                        placeholder="Post Title"
                        required
                    />
                </div>
                <div>
                    <textarea
                        value={postContent}
                        onChange={handleContentChange}
                        placeholder="What's on your mind?"
                        rows={4}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Posting...' : 'Post'}
                </button>
            </form>
        </div>
    );
};

export default AddPost;
