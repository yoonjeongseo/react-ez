import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useToast from "../hooks/toasts";

const ShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const { addToast } = useToast();
  const [error, setError] = useState('');

  const getPost = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`)
    .then((response) => {
      setPost(response.data);
      setLoading(false);
    })
    .catch(e => {
      setError('Something went wrong In database');
      addToast({
        text: 'Something went wrong In database',
        type: 'danger'
      })
      setLoading(false);
    })
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev =>  prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

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

  if(error) {
    return (
      <div>
        {error}
      </div>
    )
  }

  return (
    <>
      <div className="d-flex">
        <h1 className="flex-grow-1">{ post.title } ({timer}초)</h1>
        {isLoggedIn ? <div>
          <Link to={`/blogs/${id}/edit`} className="btn btn-primary">
            Edit
          </Link>
        </div> : null}
      </div>
      <small className="text-muted">createAt: {printDate(post.createAt)}</small>
      <hr />
      <p>{ post.text }</p>
    </>
  );
}

export default ShowPage;

