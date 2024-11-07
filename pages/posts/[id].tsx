import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [postData, setPostData] = useState({}) as any;

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setPostData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{postData.title}</h1>
      <div
        style={styles.content}
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />
    </div>
  );
};

const styles = {
  container: {
    width: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    marginBottom: "40px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#4A90E2",
  },
  content: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#555",
    padding: "10px 0",
  },
};

export default PostPage;
