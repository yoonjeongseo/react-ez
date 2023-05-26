import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const ShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPost = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setPost(response.data);
      setLoading(false);
    })
  };

  useEffect(() => {
    getPost(id)
  }, [id]);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  }

  if(loading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      <div className="d-flex">
        <h1 className="flex-grow-1">{ post.title }</h1>
        <div>
          <Link to={`/blogs/${id}/edit`} className="btn btn-primary">
            Edit
          </Link>
        </div>
      </div>
      <small className="text-muted">createAt: {printDate(post.createAt)}</small>
      <hr />
      <p>{ post.text }</p>
    </>
  );
}

export default ShowPage;

