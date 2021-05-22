import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Car_user from "./pages/Cad_user";
import Login from "./pages/Login";


import { Authenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Authenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <h1>Page principal</h1>} />
      <PrivateRoute Route path="/cad_user" component={Car_user} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/app" component={() => <h1>App</h1>} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;