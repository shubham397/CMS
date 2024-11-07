import { useState, useEffect } from 'react';
import Link from 'next/link';
import React from 'react';

export default function Posts() {
  const [posts, setPosts] = useState([]) as any;

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Posts</h1>
      <Link href="/posts/create" style={styles.createButton}>
        Create New Post
      </Link>
      <h1>List of Posts</h1>
      <ul style={styles.postsList}>
        {posts.map((post,index) => (
          <li key={post.id} style={styles.postItem}>
            <Link href={`/posts/${post.id}`} style={styles.postLink}>
              {index+1}. {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#4A90E2',
  },
  createButton: {
    display: 'inline-block',
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#4A90E2',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  createButtonHover: {
    backgroundColor: '#357ABD',
  },
  postsList: {
    listStyleType: 'none',
    padding: 0,
  },
  postItem: {
    marginBottom: '15px',
  },
  postLink: {
    textDecoration: 'none',
    fontSize: '1.2rem',
    color: '#333',
    transition: 'color 0.3s ease',
  },
  postLinkHover: {
    color: '#4A90E2',
  },
};
