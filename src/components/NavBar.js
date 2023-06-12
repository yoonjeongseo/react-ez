import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { login, logout } from "../store/authSlice";

const NavBar = () => {
  const isLoggeIn = useSelector(state => state.auth.isLoggeIn);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Home</Link>
        <ul className="navbar-nav" style={{flexDirection: 'row'}}>
          <li className="nav-item">
            <button className="text-white btn btn-link text-decoration-none" onClick={() => {
              if (isLoggeIn) {
                dispatch(logout());
              } else {
                dispatch(login());
              }
            }}>{isLoggeIn ? 'Logout' : 'Login'}</button>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link me-2" aria-current="page" to="/Admin">Admin</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" aria-current="page" to="/blogs">Blogs</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;




