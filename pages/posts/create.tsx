import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import MyEditor from '../../components/reactQuill';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    router.push('/posts');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1 style={styles.title}>Create a New Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />
      <MyEditor value={content} onChange={setContent} />
      <button type="submit" style={styles.submitButton}>Create Post</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#4A90E2',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    margin: '10px 0 20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4A90E2',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop:"50px"
  },
  submitButtonHover: {
    backgroundColor: '#357ABD',
  },
};
