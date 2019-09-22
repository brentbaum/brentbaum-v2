import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Homepage from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Router } from "@reach/router";

import { Art } from "./art/Art";
import { NotFound } from "./NotFound";

let App = () => (
  <Router>
    <Homepage path="/" />
    <Art path="/art" />
    <NotFound path="/lost" />
    {/* <Wisdom path="/wisdom" /> */}
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
