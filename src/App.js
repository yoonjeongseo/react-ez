import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";
import Toast from "./components/Toast";
import useToast from "./hooks/toasts";
import { useSelector } from "react-redux";

function App() {
  const toasts = useSelector(state => state.toast.toasts);

  // const [addToast, deleteToast] = useToast();
  const { deleteToast } = useToast();

  return (
    <Router>
      <NavBar></NavBar>
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className="container mt-3">
        <Switch>
          {routes.map((route) => {
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
