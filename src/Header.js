import React from "react";
import styled from "styled-components";
import { Logo } from "./Logo";

const Pad = styled.div`
  padding-top: ${props => props.v || 0}rem;
  padding-bottom: ${props => props.v || 0}rem;
  padding-left: ${props => props.v || 0}rem;
  padding-right: ${props => props.v || 0}rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: ${props => props.justify || "space-between"};
  align-items: ${props => props.align || "center"};
  flex-direction: ${props => props.direction || "row"};
`;

const Content = styled.div`
  max-width: 72rem;
  width: 100%;
  z-index: 1;
`;

const Nav = () => <div />;

export const Header = () => (
  <Pad v={3}>
    <Flex justify="center">
      <Content>
        <div
          style={{
            color: "rgba(23, 63, 103, .85)",
            fontSize: "1.2rem",
            letterSpacing: 2,
            cursor: "default"
          }}
        >
          <b>BRENT</b>
          <span style={{ paddingLeft: 3 }}>BAUM</span>
        </div>
        <Nav />
      </Content>
    </Flex>
  </Pad>
);
