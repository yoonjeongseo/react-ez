import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

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

  if(loading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      <h1>{ post.title }</h1>
      <p>{ post.text }</p>
    </>
  );
}

export default ShowPage;

