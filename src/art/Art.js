import React from "react";
import { go } from "./draw";
import ReactTimeout from "react-timeout";

class ArtComponent extends React.Component {
  draw = () => {
    go();
    this.props.setTimeout(() => {
      this.draw();
    }, 3000);
  };
  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <canvas id="art" />;
  }
}

export const Art = ReactTimeout(ArtComponent);
