// src/app/page.jsx
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Fetch blog posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching posts');
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        setError('Failed to delete post');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while deleting the post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    onClick={() => router.push(`/post`)}
                    
                  >
                    Create Post
                  </button>
        <h1 className="text-3xl font-bold mb-6 text-center">All Blog Posts</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <ul>
          {posts.length === 0 ? (
            <p className="text-center">No blog posts available.</p>
          ) : (
            posts.map((post) => (
              <li key={post.id} className="mb-4 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.content.slice(0, 100)}...</p>
                <div className="mt-4">
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-indigo-700"
                    onClick={() => router.push(`/post/${post.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
