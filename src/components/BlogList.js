import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useHistory } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { bool } from "prop-types";
import Pagination from "./Pagination";

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = (page = 1) => {
    let params = {
      _page: page,
      _limit: 5,
      _sort: 'id',
      _order: 'desc',
      // publish: true,
    }

    if(!isAdmin) {
      params = {...params, publish: true};
    }

    axios.get(`http://localhost:3001/posts`, {
      params,
    })
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

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if(posts.length === 0) {
    return (<div>No Blog Posts Found</div>)
  }

  const renderBlogList = () => {
    return posts.map(post => {
      return (
        <Card key={post.id} title={post.title} onClick={() => history.push(`/blogs/${post.id}`) }>
         {isAdmin ? (<div>
            <button className="btn btn-danger btn-sm" onClick={(e) => {deleteBlog(e, post.id)}}>Delete</button>
          </div>) : null}
        </Card>
      )
    })
  }

  return (
    <div>
      {renderBlogList()}
      <Pagination currentPage={3} numberOfPages={5}></Pagination>
    </div>
  )
}

BlogList.propTypes = {
  isAdmin: bool
};

BlogList.defaultProps = {
  isAdmin: false
}

export default BlogList;



