import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const BlogForm = () => {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const history = useHistory();

  const onSubmit = () => {
    // console.log(title, text);

    axios.post("http://localhost:3001/posts", {
      title: title,
      text: text
    }).then(() => {
      history.push("/blogs");
    })
  };


  return (
    <div>
      <h1>Create a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input className="form-control" value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} />
      </div>
      <div className="mb-3">
        <label className="form-label">text</label>
        <textarea rows="20" className="form-control" value={text} onChange={(e) => {
          setText(e.target.value)
        }}></textarea>
      </div>
      <button onClick={onSubmit} className="btn btn-primary">post</button>
    </div>
  )
}

export default BlogForm;

