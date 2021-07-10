import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import FrontPage from "./pages/FrontPage";
import { react } from "@babel/types";
import Nav from './components/NavBar';

function App() {
  return (
    <>
    <Nav/>
    <Switch>
      <Route path={"*"}>
        <FrontPage/>
      </Route>
    </Switch>
  </>
  );
}

export default App;
