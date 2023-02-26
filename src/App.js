import "antd/dist/antd.css";
import React, { useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Video from "./Components/Video";
import ipConfig from "./ipConfig.json";

export const config = {
  endpoint: `${ipConfig.workspaceIp}/v1`,
};

export default function App(props) {
  const location = useLocation();
  // Scroll to top if path changes
  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <Switch>
        <Route path="/:videoId">
          <Video />
        </Route>
        <Route path="/">
          <Home />
        </Route>  
      </Switch>
    </div>
  );
}
