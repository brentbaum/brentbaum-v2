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
  border: 1.5rem solid white;

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
  strong {
    font-weight: 400;
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
      transition: bottom 500ms, height 500ms, background-color 500ms;
    }
    &:hover {
      cursor: default;
      color: rgba(255, 255, 255, 0.95);
    }
    &:hover:after {
      background-color: rgba(255, 255, 255, 0.95);
      height: 4px;
      bottom: -4px;
    }
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class App extends Component {
  render() {
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
          <div style={{ maxWidth: 400 }}>
            <H3>Hello! I’m Brent.</H3>
            <P>
              I'm a <strong>multidisciplinary developer</strong> from
              Charlottesville, Virginia where I do{" "}
              <strong>product design</strong> and{" "}
              <strong>machine learning</strong> at <strong>TwinThread</strong>,
              an IIoT analytics business.
            </P>
            <P>
              I am available to work with startups to develop and implement
              digital strategy.
            </P>
          </div>
        </Body>
        <Outline />
      </Flex>
    );
  }
}

export default App;
