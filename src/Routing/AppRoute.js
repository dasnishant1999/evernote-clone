import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "../components/Authentication/SignUp";
import SignIn from "../components/Authentication/SignIn";
import Home from "./Home";

import PrivateRoute from "./PrivateRoute";

function AppRoute() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/signin" component={SignIn}></Route>
      </Switch>
    </Router>
  );
}

export default AppRoute;
