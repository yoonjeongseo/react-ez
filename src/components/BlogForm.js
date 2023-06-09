import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { bool } from "prop-types";
import propTypes from 'prop-types';
// import Toast from "../components/Toast";
// import useToast from "../hooks/toasts";

const BlogForm = ({ editing, addToast }) => {
  // const [toasts, addToast, deleteToast] = useToast();
  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [publish, setPublish] = useState(false);
  const [originalPublish, setOriginalPublish] = useState();
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);

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

  const validateForm = () => {
    let validated = true;

    if(title === '') {
      setTitleError(true);
      validated = false;
    }

    if(text === '') {
      setTextError(true);
      validated = false;
    }

    return validated;
  }


  const onSubmit = () => {
    setTitleError(false);
    setTextError(false);

    if(validateForm()) {
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
          //블로그 생성 성공
          addToast({
            text: 'Successfully created!',
            type: 'success'
          })
          history.push("/admin");
        })
      }
    }
  };

  const onChangePublish = (e) => {
    // console.log(e.target.checked);
    setPublish(e.target.checked);
  };

  return (
    <div>
      {/* <Toast toasts={toasts} deleteToast={deleteToast} /> */}
      <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input className={`form-control ${titleError ? 'border-danger': ''}`} value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} />
        {titleError && <div className="text-danger">Title is Required</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">text</label>
        <textarea rows="10" className={`form-control ${textError ? 'border-danger': ''}`} value={text} onChange={(e) => {
          setText(e.target.value)
        }}></textarea>
        {textError && <div className="text-danger">Text is Required</div>}
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
  editing: propTypes.bool
}

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm;

