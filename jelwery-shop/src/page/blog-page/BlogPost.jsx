import React from 'react';
import './Blog.css';

const BlogPost = ({ title, createDate, createBy, content, picture }) => {
  return (
    <div className="blog-post">
      <h1 className="blog-title">{title}</h1>
      <div className="blog-meta">
        <span className="blog-date">{createDate}</span>
        <span className="blog-author">by {createBy}</span>
      </div>
      {picture && <img src={picture} alt={title} className="blog-picture" />}
      <div className="blog-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
