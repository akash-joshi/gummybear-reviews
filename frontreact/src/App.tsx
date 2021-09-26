import React from "react";
import "./index.scss";

// why I'm using hashrouter: https://github.com/remix-run/react-router/blob/main/FAQ.md#why-doesnt-my-application-render-after-refreshing
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import AddReview from "./components/AddReview";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/addreview">
          <AddReview />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
