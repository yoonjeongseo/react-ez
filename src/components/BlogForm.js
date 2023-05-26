import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { bool } from "prop-types";

const BlogForm = ({ editing }) => {

  const history = useHistory();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setTitle(response.data.title);
      setText(response.data.text);
    })
  }, [id]);

  const onSubmit = () => {
    if(editing) {
      axios.patch(`http://localhost:3001/posts/${id}`, {
        title,
        text
      }).then(response => {
        console.log(response);
      })
    } else {
      axios.post("http://localhost:3001/posts", {
        title: title,
        text: text,
        createAt: Date.now()
      }).then(() => {
        history.push("/blogs");
      })
    }
  };

  return (
    <div>
      <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input className="form-control" value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} />
      </div>
      <div className="mb-3">
        <label className="form-label">text</label>
        <textarea rows="10" className="form-control" value={text} onChange={(e) => {
          setText(e.target.value)
        }}></textarea>
      </div>
      <button onClick={onSubmit} className="btn btn-primary">{editing ? 'Edit' : 'post'}</button>
    </div>
  )
}

BlogForm.propTypes = {
  editing: bool
}

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm;