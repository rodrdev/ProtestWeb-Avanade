import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login";
import Timeline from "./pages/timeline";
import Aceleracao from "./img/Aceleracao.png";
import "./style/index.css";
export default function App() {
  return (
    <Router>
      <img className="aceleracao" src={Aceleracao} alt="" />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/timeline">
          <Timeline />
        </Route>
      </Switch>
    </Router>
  );
}
