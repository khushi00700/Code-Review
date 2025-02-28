import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [code, setCode] = useState(`function sum() {
  return a + b
} `);

  const [review, setReview] = useState("");
  const [isDark, setIsDark] = useState(true); 

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });
    setReview(response.data);
  }

  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <main 
    
    className={isDark ? "dark-mode" : "light-mode"}>

      <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
        {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 18,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <div onClick={reviewCode} className="review">
          Review
        </div>
      </div>
      <div className="right">
        <Markdown>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
