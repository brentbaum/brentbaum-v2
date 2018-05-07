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

const Nav = Flex.extend`
  justify-content: flex-start;
`;

const NavItem = styled.div`
  font-size: 1.2rem;
  color: white;
  padding-right: 2rem;

  @media (max-width: 700px) {
    padding-right: 1rem;
    font-size: 1.1rem;
  }
  @media (max-width: 500px) {
    padding-right: 0.5rem;
    font-size: 1rem;
  }
`;

export const Header = () => (
  <div
    style={{
      position: "absolute",
      top: "3rem",
      right: "3rem",
      left: "10vw",
      zIndex: 5
    }}
  >
    <Flex justify="center">
      <Content>
        <Nav>
          <NavItem>Development</NavItem>
          <NavItem>Product Design</NavItem>
          <NavItem>Research</NavItem>
        </Nav>
      </Content>
    </Flex>
  </div>
);
