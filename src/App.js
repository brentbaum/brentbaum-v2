import React, { Component } from "react";
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
  background-color: #edf2f7;

  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  z-index: 1;
  font-size: 1.3rem;
  line-height: 1.6;
  color: rgba(23, 63, 103, 0.95);
  padding: 15vh 3rem;
  max-width: 72rem;
  margin: 0 auto;
`;

const H3 = styled.h3`
  margin-bottom: 1rem;
`;

const P = styled.p`
  margin-bottom: 0.5rem;
  margin-top: 0;
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
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Header />
        <Body style={{ flex: 1, width: "100%" }}>
          <div style={{ maxWidth: 400 }}>
            <H3>Hello! I’m Brent.</H3>
            <P>
              I'm a multidisciplinary developer from Charlottesville, Virginia
              where I do product design and machine learning at TwinThread, an
              IIoT analytics business.
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
