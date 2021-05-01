import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import ContextProvider from "../contexts/Context";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <ContextProvider>
            <Component {...props} />
          </ContextProvider>
        ) : (
          <Redirect to="/signin" />
        );
      }}
    ></Route>
  );
}

export default PrivateRoute;
