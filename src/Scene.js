import styled, { keyframes } from "styled-components";
import React from "react";

const BladeTop = styled.div`
  top: -5px;
  position: relative;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 ${props => props.edges};
  border-color: transparent transparent #6e87a2 transparent;
`;

const translations = {
  0: "translate(-3px) translateY(-2px)",
  60: "translate(-29px) translateY(-22px)",
  120: "translate(-29px) translateY(5px)"
};

const Blade = styled.div`
  background: #556677;
  width: 40px;
  height: 4px;
  transform: ${props => translations[props.rotate]}
    rotate(${props => props.rotate || 0}deg);
  transform-origin: center center 0px;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const TurbineBody = styled.div`
  height: 80px;
  width: 6px;
  margin-left: -3px;
  left: 50%;
  bottom: 0;
  background: #556677;
  position: relative;
`;

const TurbineHead = styled.div`
  position: absolute;
  left: -13px;
  bottom: 30px;
  width: 0px;
  height: 0px;
  position: relative;
  transition: animation 300ms;
  animation: ${rotate360} ${props => props.speed}s linear infinite;
  transform-origin: center center 0px;
  padding: 2rem 1rem;
  z-index: 1;
`;

const TurbineAll = styled.div`
  position: absolute;
  bottom: 0;
  right: 10%;
  transform-origin: bottom center;
`;

export const Turbine = ({ scale, position, speed }) => (
  <TurbineAll style={{ ...position, transform: `scale(${scale})` }}>
    <TurbineBody>
      <TurbineHead speed={speed}>
        <Blade rotate={0}>
          <BladeTop edges="15px 5px 25px" />
        </Blade>
        <Blade rotate={60}>
          <BladeTop
            style={{ transform: "rotate(180deg)", top: 4 }}
            edges="15px 5px 25px"
          />
        </Blade>
        <Blade rotate={120}>
          <BladeTop style={{ transform: "scaleX(-1)" }} edges="25px 5px 15px" />
        </Blade>
      </TurbineHead>
    </TurbineBody>
  </TurbineAll>
);

export const Scene = () => (
  <div>
    <Turbine position={{ right: "10%" }} scale="1.0" speed={4} />
    <Turbine position={{ right: "30%" }} scale="1.2" speed={5} />
    <Turbine position={{ right: "50%" }} scale=".9" speed={3.5} />
  </div>
);
