
import { Route, Switch } from "react-router";
import "./App.css";
import FrontPage from "./pages/FrontPage";
import Nav from './components/NavBar';
import TeamPage from "./pages/TeamPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
    <Nav/>
    <Switch>
      <Route path={"/rankings"}>
        <FrontPage/>
      </Route>
      <Route path={"/team"}>
        <TeamPage/>
      </Route>
    </Switch>
  </div>
  );
}

export default App;
