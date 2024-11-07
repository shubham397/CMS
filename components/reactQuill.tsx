import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Disable server-side rendering for this component
});

const MyEditor = ({ value, onChange }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  return (
    <ReactQuill
        value={value}
        onChange={onChange}
        style={styles.reactQuill}
      />
  );
};

const styles = {
  editorContainer: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    height: "500px",
  },
  reactQuill: {
    height: "400px",
  },
};

export default MyEditor;
