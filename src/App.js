import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";
import Toast from "./components/Toast";
import useToast from "./hooks/toasts";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect, useState } from "react";
import { login } from "./store/authSlice";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const toasts = useSelector(state => state.toast.toasts);

  // const [addToast, deleteToast] = useToast();
  const { deleteToast } = useToast();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      dispatch(login());
    }
    setLoading(false);
  },[]);
  
  if(loading) {
    <LoadingSpinner />
  }

  return (
    <Router>
      <NavBar></NavBar>
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className="container mt-3">
        <Switch>
          {routes.map((route) => {
            if (route.auth) {
              return <ProtectedRoute path={route.path} component={route.component} key={route.path}/>
            }
            return <Route key={route.path} path={route.path} exact 
            component={route.component} 
            />
          })}
        </Switch>
      </div>
    </Router>
  )
}

export default App;
