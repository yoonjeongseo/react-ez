import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
  }

  const deleteBlog = (e, id) => {
    e.stopPropagation(); 
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter( post => post.id !== id ) )
    })
  }

  useEffect(() => {
    getPosts();
  }, [])

  const renderBlogList = () => {
    if (loading) {
      return (
        <LoadingSpinner />
      );
    }

    if(posts.length === 0) {
      return (<div>No Blog Posts Found</div>)
    }

    return posts.map(post => {
      return (
        <Card key={post.id} title={post.title} onClick={() => history.push(`/blogs/${post.id}`) }>
          <div>
            <button className="btn btn-danger btn-sm" onClick={(e) => {deleteBlog(e, post.id)}}>Delete</button>
          </div>
        </Card>
      )
    })
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      {renderBlogList()}
    </div>
  )
}

export default ListPage;


