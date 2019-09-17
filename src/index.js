import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Homepage from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Router } from "@reach/router";

import { Art } from "./art/Art";

let App = () => (
  <Router>
    <Homepage path="/" />
    <Art path="/art" />
    {/* <Wisdom path="/wisdom" /> */}
  </Router>
);
console.log(App);

ReactDOM.render(<App />, document.getElementById("root"));
