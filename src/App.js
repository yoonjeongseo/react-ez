import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";
import Toast from "./components/Toast";
import useToast from "./hooks/toasts";

function App() {
  const [toasts, addToast, deleteToast] = useToast();

  return (
    <Router>
      <NavBar></NavBar>
      <Toast toasts={toasts} deleteToast={deleteToast} />
      <div className="container mt-3">
        <Switch>
          {routes.map((route) => {
            const Component = route.component;

            return <Route key={route.path} path={route.path} exact 
            //component={route.component} 
            >
              <Component addToast={addToast} />
            </Route>
          })}
        </Switch>
      </div>
    </Router>
  )
}

export default App;
