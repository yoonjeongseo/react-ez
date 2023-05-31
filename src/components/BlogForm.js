import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { bool } from "prop-types";

const BlogForm = ({ editing }) => {

  const history = useHistory();
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState();
  const { id } = useParams();

  useEffect(() => {
    if(editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
        setTitle(response.data.title);
        setOriginalTitle(response.data.title);
        setText(response.data.text);
        setOriginalText(response.data.text);
        setPublish(response.data.publish);
        setOriginalPublish(response.data.publish);
      })
    }
  }, [id, editing]);

  const isEdited = () => {
    return title !== originalTitle || text !== originalText || publish !== originalPublish;
  }

  const goBack = () => {
    if (editing) {
      history.push(`/blogs/${id}`)
    } else {
      history.push("/blogs")
    }
  }

  const onSubmit = () => {
    if(editing) {
      axios.patch(`http://localhost:3001/posts/${id}`, {
        title,
        text,
        publish
      }).then((response) => {
        // console.log(response);
        history.push(`/blogs/${id}`)
      })
    } else {
      axios.post("http://localhost:3001/posts", {
        title: title,
        text: text,
        publish: publish,
        createAt: Date.now()
      }).then(() => {
        history.push("/admin");
      })
    }
  };

  const onChangePublish = (e) => {
    // console.log(e.target.checked);
    setPublish(e.target.checked);
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
      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" checked={publish} onChange={onChangePublish} />
        <label className="form-check-label">Publish</label>
      </div>
      <button onClick={onSubmit} className="btn btn-primary" disabled={editing && !isEdited()}>{editing ? 'Edit' : 'post'}</button>
      <button onClick={goBack} className="btn btn-danger ms-2">Cancel</button>
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

