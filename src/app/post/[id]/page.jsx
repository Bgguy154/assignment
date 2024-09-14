// src/app/post/[id]/page.jsx
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ViewPost = ({ params }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const postId = params.id;

  useEffect(() => {
    // Fetch the post data from the API
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();

        if (response.ok) {
          setPost(data);
        } else {
          setError('Failed to fetch post');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching the post');
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-6">Published on: {new Date(post.created_at).toLocaleDateString()}</p>
        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>
        <button
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
          onClick={() => window.history.back()}
        >
          Back to Posts
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
