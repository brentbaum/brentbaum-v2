import React, { Component } from "react";
import { BackgroundAnimation } from "./Background";
import logo from "./logo.svg";
import styled from "styled-components";
import "./App.css";
import { Header } from "./Header";

const Outline = styled.div`
  position: fixed;
  z-index: -1;
  pointer-events: none;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 1.5rem solid ${props => props.color};
  transition: border-color 200ms;

  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  z-index: 1;
  font-size: 1.4rem;
  line-height: 1.6;
  color: rgba(244, 250, 255, 0.95);
  padding: 25vh 5rem;
  max-width: 72rem;
  margin: 0 auto;
  @media (max-width: 700px) {
    padding: 15vh 1.5rem;
    font-size: 1.3rem;
  }
  @media (max-width: 500px) {
    padding: 15vh 1.5rem;
    font-size: 1.1rem;
  }
`;

const H3 = styled.h3`
  margin-bottom: 1rem;
  position: relative;
`;

const P = styled.p`
  margin-bottom: 1rem;
  margin-top: 0;
  position: relative;
  cursor: default;
`;

const S = styled.strong`
  font-weight: 500;
  color: rgba(244, 250, 255, 0.95);
  position: relative;
  white-space: nowrap;
  &:after {
    content: " ";
    height: 3px;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    background-color: rgba(255, 255, 255, 0.7);
    transition: bottom 300ms, height 300ms;
  }
  &:hover,
  &.selected {
    cursor: default;
    color: ${props => props.color};
  }
  &:hover:after,
  &.selected:after {
    background-color: ${props => props.color};
    height: 4px;
    bottom: -4px;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Intro = styled.div`
  max-width: 400px;
  span {
    opacity: ${props => props.o};
  }
`;

const F = styled.span`
  transition: opacity 300ms;
`;

const L = ({ onChange, color, children, selected, onSelect, position }) => (
  <React.Fragment>
    <F
      onMouseLeave={() => onChange({ color: "white" })}
      onMouseEnter={() => onChange({ color })}
      onClick={e => {
        onChange({ o: 0, selected: color });
        onSelect(e);
      }}
      style={{
        opacity: !selected ? 1 : 0
      }}
    >
      <S color={color}>{children}</S>
    </F>
    {selected === color && (
      <F
        style={{
          color: console.log(color) || "white",
          opacity: 1,
          position: "fixed",
          top: position.y - 5,
          left: position.x
        }}
      >
        <S color={color} className={selected === color ? "selected" : ""}>
          {children}
        </S>
      </F>
    )}
  </React.Fragment>
);

class App extends Component {
  state = { color: "white", o: 1, selected: null };
  yellow = "#f5c156";
  red = "#e6616b";
  green = "#5cd3ad";
  blue = "#70bfff";

  onChange = change => this.setState(change);
  L = (color, text) => {
    const component = (
      <L
        color={color}
        onChange={this.onChange}
        selected={this.state.selected}
        onSelect={e => {
          console.log(e.target.get);
          this.setState({
            position: e.target.getBoundingClientRect()
          });
        }}
        position={this.state.position}
      >
        {text}
      </L>
    );
    return component;
  };
  render() {
    const o = this.state.o;
    return (
      <Flex
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          bottom: "1.5rem",
          left: "1.5rem"
        }}
      >
        {/* <Header /> */}
        <Body style={{ flex: 1, width: "100%" }}>
          <BackgroundAnimation />
          <Intro o={o}>
            <H3>
              <span>Hello! I’m Brent.</span>
            </H3>
            <P>
              <F>I'm a </F>
              {this.L(this.yellow, "multi-disciplinary developer")}{" "}
              <F>from Charlottesville, Virginia where I do </F>
              {this.L(this.red, "product design")} <F o={o}>and </F>
              {this.L(this.green, "machine learning")} <F o={o}>at </F>
              {this.L(this.blue, "TwinThread")}
              <F>, an IIoT analytics business.</F>
            </P>
            <P>
              <F>
                I work with startups to develop and implement digital strategy.
              </F>
            </P>
          </Intro>
        </Body>
        <Outline color={this.state.selected || this.state.color} />
      </Flex>
    );
  }
}

export default App;
