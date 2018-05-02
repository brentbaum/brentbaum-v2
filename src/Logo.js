import React from "react";
import styled from "styled-components";

const BaseBox = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  border: 2px solid black;
  width: 3rem;
  height: 3rem;
  color: white;
  font-size: 1.2rem;
  transition: transform 400ms;
  cursor: default;
  .text {
    transition: transform 400ms;
    cursor: default;
  }
`;

const ForeBox = BaseBox.extend`
  z-index: -1;
  background: none;
`;

const BackBox = BaseBox.extend``;

const LogoContainer = styled.div`
  position: relative;
  &:hover {
    .fore {
      transform: rotate(-10deg);
    }
    .back {
      transform: rotate(10deg);
      .text {
        transform: rotate(-10deg);
      }
    }
  }
`;

export const Logo = () => (
  <LogoContainer>
    <BackBox className="back">
      <span className="text">B</span>
    </BackBox>
    <ForeBox className="fore" />
  </LogoContainer>
);
