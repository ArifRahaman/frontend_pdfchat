
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostsByAuthor = () => {
    const [posts, setPosts] = useState([]);
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const authorId = localStorage.getItem('userId');
    // console.log(postId)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `${import.meta.env.VITE_BACKEND_DOMAIN}/posts/by-author/${authorId}`,
                };

                const response = await axios.request(config);
                setPosts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleToggle = (postId) => {
        setExpandedPostId(expandedPostId === postId ? null : postId);
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_DOMAIN}/posts/delete/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (err) {
            setError('Failed to delete the post');
        }
    };

    if (loading) {
        return <p className="text-center text-xl font-bold animate-pulse">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 text-xl font-bold">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 border border-gray-500 border-4">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Posts by Author</h2>
            {posts.length > 0 ? (
                <div>
                    {posts.map((post, index) => (
                        <div key={post._id} className={`post bg-yellow-100 shadow-md overflow-hidden mb-8 rounded-sm ${index > 0 ? 'mt-8' : ''}`}>
                            <h3
                                className="text-4xl font-semibold text-green-500 border-b-2 border-gray-700 mb-2 pb-2 text-center cursor-pointer"
                                onClick={() => handleToggle(post._id)}
                            >
                                {post.title}
                            </h3>
                            {expandedPostId === post._id && (
                                <div>
                                    <p className="text-gray-700 mb-4">{post.summary}</p>
                                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                    <p className="text-gray-600 mb-2">Likes: {post.likes}</p>
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={post.author.profileImage}
                                            alt="Author Profile"
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <button
                                            className="bg-red-500 text-white p-2 rounded ml-auto"
                                            onClick={() => handleDelete(post._id)}
                                        >
                                            Delete Post
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-purple-500 mt-4 mb-2">Comments:</h4>
                                        {post.comments.map((comment) => (
                                            <div key={comment._id} className="comment bg-gray-100 rounded p-2 mb-2">
                                                <p className="text-gray-700">{comment.text}</p>
                                                <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-xl font-bold">No posts found for this author.</p>
            )}
        </div>
    );
};

export default PostsByAuthor;
