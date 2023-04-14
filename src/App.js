import React from "react";
import "./styles.css";
import Home from "./Home";
import Source from "./Source";
import About from "./About";
import Developer from "./Developer";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/source-code" component={Source} />
          <Route path="/about" component={About} />
          <Route path="/developer" component={Developer} />
        </Switch>
      </div>
    </Router>
  );
}
