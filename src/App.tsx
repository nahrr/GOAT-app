
import { Route, Switch } from "react-router";
import "./App.css";
import FrontPage from "./pages/FrontPage";
import Nav from './components/NavBar';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
    <Nav/>
    <Switch>
      <Route path={"*"}>
        <FrontPage/>
      </Route>
    </Switch>
  </div>
  );
}

export default App;
