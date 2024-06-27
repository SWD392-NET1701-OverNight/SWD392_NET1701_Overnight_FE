import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://localhost:7147/api/Blog/get-all-blog');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
        console.log(data)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog">
      {posts.map((post, index) => (
        <BlogPost 
          key={index}
          title={post.title}
          date={post.createBy}
          author={post.createDate}
          content={post.content}
          picture="https://res.cloudinary.com/dkyv1vp1c/image/upload/v1718934494/t%E1%BA%A3i_xu%E1%BB%91ng_ouules.jpg"
        />
      ))}
    </div>
  );
};

export default Blog;
