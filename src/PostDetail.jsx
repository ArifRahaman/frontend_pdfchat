import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_BACKEND_DOMAIN}/posts/${postId}`,
                headers: {
                    'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY4MzFmODc2MDk2N2Q4Y2YyMmUwMzIiLCJ1c2VybmFtZSI6ImFzZWVpZnZhaTg1IiwiZW1haWwiOiJhcmlmcmFoYW1hbjI2MEBnbWFpbC5jb20iLCJkb2IiOiIyMDI0LTA2LTEyVDAwOjAwOjAwLjAwMFoiLCJ1bml2ZXJzaXR5bmFtZSI6ImEiLCJpYXQiOjE3MTg0Mjc5MjgsImV4cCI6MTcxODk0NjMyOH0.3saPs9fuCf-_5wWNkR7jHEIqOcVJwzg3veMibSfC1Yw'
                }
            };

            try {
                const response = await axios.request(config);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching post');
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="bg-yellow-200">
            <div className="max-w-4xl mx-auto p-4 bg-blue-300 rounded-lg shadow-md mb-4">
                <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">{post.title}</h1>
                <div className="flex items-center justify-between">
                    <h2 className="text-6xl font-semibold text-green-600">{post.title}</h2>
                    <img
                        src={post.authorprofilepicture}
                        alt={post.authorname}
                        className="w-16 h-16 rounded-full ml-4 border border-gray-300 text-3xl"
                    />
                </div>
                <p className="font-bold text-gray-600 mb-2 text-3xl">By {post.authorname}</p>
                {post.cover && (
                    <img
                        src={post.cover}
                        alt={post.title}
                        className="mt-2 mb-4 w-full h-80 object-cover rounded-lg shadow-sm"
                    />
                )}
                <div className="prose prose-red max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </div>
    );
};

export default PostDetail;
