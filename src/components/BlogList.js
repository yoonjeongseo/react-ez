import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Card from "../components/Card";
import { useHistory } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import propTypes from 'prop-types';
import useToast from "../hooks/toasts";

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const { addToast } = useToast();
  const limit = 5;

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts/limit));
  }, [numberOfPosts]);

  const onClickPageButton = (page) => {
    history.push(`${location.pathname}?page=${page}`);
    setCurrentPage(page);
    getPosts(page);
  }

  const getPosts = useCallback((page = 1) => {
      let params = {
        _page: page,
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
        title_like: searchText
      }
  
      if(!isAdmin) {
        params = {...params, publish: true};
      }
  
      axios.get(`http://localhost:3001/posts`, {
        params,
      })
        .then((response) => {
          setNumberOfPosts(response.headers['x-total-count']);
          setPosts(response.data);
          setLoading(false);
        })
        .catch(e => {
          setError('Something went wrong In database');
          addToast({
            text: 'Something went wrong',
            type: 'danger'
          });
          setLoading(false);
        })
    }, [isAdmin, searchText])

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1);
  }, [])

  const deleteBlog = (e, id) => {
    e.stopPropagation(); 
    axios.delete(`http://localhost:3001/posts/${id}`)
    .then(() => {
      setPosts(prevPosts => prevPosts.filter( post => post.id !== id ) )
      addToast({
        text: 'Successfully deleted',
        type: 'success'
      })
    })
    .catch(e => {
      addToast({
        text: `The Blog could't be deleted.`,
        type: 'danger'
      });
    })
  }

  if (loading) {
    return (
      <LoadingSpinner />
    );
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

  const onSearch = (e) => {
    if(e.key === 'Enter') {
      history.push(`${location.pathname}?page=1`);
      setCurrentPage(1);
      getPosts(1);
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <input type="text" placeholder="Search" className="form-control" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyUp={onSearch} />
      <hr />
      {posts.length === 0 ? <div>No Blog Posts Found</div> :
        <>
          {renderBlogList()}
          {numberOfPages > 1 && <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={onClickPageButton}></Pagination>} 
        </>
      }
      
    </div>
  )
}

BlogList.propTypes = {
  isAdmin: propTypes.bool
};

BlogList.defaultProps = {
  isAdmin: false
}

export default BlogList;



