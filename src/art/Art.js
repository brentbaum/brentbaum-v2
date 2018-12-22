import React from "react";
import { go } from "./draw";

export class Art extends React.Component {
  componentDidMount() {
    go();
  }

  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <canvas id="art" />;
  }
}
