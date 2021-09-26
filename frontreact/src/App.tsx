import React from "react";
import "./index.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import AddReview from "./components/AddReview";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/addreview">
          <AddReview />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
