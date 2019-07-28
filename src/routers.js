import React from "react";
import { Route, } from "react-router-dom";
import Login from './containers/user/login';
import Register from './containers/user/register';
import Home from './containers/home';
 
function AppRouter() {
  return (
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/register/" component={Register} />
        <Route path="/login/" component={Login} />
      </div>
  );
}

export default AppRouter;