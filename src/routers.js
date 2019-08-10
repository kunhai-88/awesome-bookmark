import React from "react";
import { Route} from "react-router-dom";
import Home from './containers/home';
 
function AppRouter() {
  return (
      <div>
        <Route path="*" exact component={Home} />
      </div>
  );
}

export default AppRouter;