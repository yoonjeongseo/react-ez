import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import routes from "./routes";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <div className="container mt-3">
        <Switch>
          {routes.map((route) => {
            return <Route key={route.path} path={route.path} exact component={route.component} />;
          })}
        </Switch>
      </div>
    </Router>
  )
}

export default App;
