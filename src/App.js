import React, { Component } from "react";
import ReactTimeout from "react-timeout";
import { BackgroundAnimation } from "./Background";
import logo from "./logo.svg";
import styled from "styled-components";
import "./App.css";
import { Header } from "./Header";

const Main = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Outline = styled.div`
  position: fixed;
  z-index: 0;
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
  pointer-events: none;
  line-height: 1.6;
  color: rgba(244, 250, 255, 0.95);
  padding: 25vh 5%;
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
const ScrollBlock = styled.div`
  position: fixed;
  content: "▼ Scroll ▼";
  opacity: ${props => props.o};
  bottom: 2.5rem;
  z-index: 1;
  left: 0;
  right: 0;
  width: 20rem;
  pointer-events: none;
  text-align: center;
  margin: 0 auto;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0px;
  text-indent: 2px;
  color: white;
  font-weight: bold;
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
  font-weight: 300;
`;

const S = styled.strong`
  font-weight: 400;
  color: rgba(244, 250, 255, 0.95);
  position: relative;
  white-space: nowrap;
  transition: color 300ms;
  &:after {
    content: " ";
    height: 3px;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    background-color: rgba(255, 255, 255, 0.7);
    transition: background-color 300ms, bottom 300ms, height 300ms;
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
    display: ${props => props.d};
  }
`;

const F = styled.span`
  transition: opacity 300ms;
`;

const Section = Flex.extend`
  pointer-events: none;
  justify-content: center;
  align-items: center;
  position: relative;
  height: ${props => (props.height ? props.height + "vh" : "100vh")};
  min-height: ${props => (props.minHeight ? props.minHeight : "auto")};
  margin-top: ${props => (props.marginTop ? props.marginTop + "vh" : "0")};
  width: 100vw;
  color: white;
  font-size: 1.4rem;
  @media (max-width: 700px) {
    font-size: 1.2rem;
  }
`;

const SectionInner = Flex.extend`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip: rect(auto auto auto auto);
  overflow: hidden;
`;

const Card = styled.a`
  display: block;
  text-decoration: none;
  cursor: pointer;
  background: white;
  border-radius: 0px;
  padding: 2rem 2rem 2.5rem;
  transition: transform 300ms, box-shadow 300ms;
  flex: 1;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  }
  margin-left: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 700px) {
    padding: 1.5rem 1.5rem 2rem;
  }
`;
const CardTitle = styled.div`
  color: #2c343f;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
`;
const CardBody = styled.div`
  color: #2c343f;
  font-size: 1.2rem;
  font-weight: 300;
`;

const CardRow = styled.div`
  display: flex;
  z-index: 5;
  width: 100%;
  max-width: 66rem;
  align-items: stretch;
  @media (max-width: 700px) {
    flex-direction: column;
    padding: 0 3rem 0 1.5rem;
  }
`;

const ProjectBackground = styled.div`
  position: absolute;
  height: 30vh;
  left: -25%;
  right: -25%;
  margin-top: 5vh;
  z-index: 4;
  transform: rotate(-10deg);
  background: #f5c156;
`;

const ProjectCard = ({ title, body, img = null, href = "" }) => (
  <Card href={href}>
    <CardTitle>{title}</CardTitle>
    <CardBody>{body}</CardBody>
    {img && <img src={img} />}
  </Card>
);

const ProjectRow = ({ cards }) => <CardRow>{cards}</CardRow>;

const L = ({
  onChange,
  color,
  children,
  selected,
  onSelect,
  position,
  d,
  o
}) => (
  <React.Fragment>
    <F
      onMouseLeave={() => onChange({ color: "white" })}
      onMouseEnter={() => onChange({ color })}
      onClick={e => {
        //onChange({ o: 0, selected: color });
        //onSelect(e);
      }}
      style={{
        display: d,
        opacity: o,
        pointerEvents: "auto"
      }}
    >
      <S color={color}>{children}</S>
    </F>
    {selected === color && (
      <F
        style={{
          color: "white",
          opacity: 1,
          position: "fixed",
          top: position.y - 5,
          left: position.x,
          transition: "top 800ms, left 800ms"
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
  state = { color: "white", o: 0.95, selected: null };
  yellow = "#f5c156";
  red = "#e6616b";
  green = "#5cd3ad";
  blue = "#70bfff";

  onChange = change => this.setState(change);

  L = (color, text) => {
    const { setTimeout } = this.props;
    const { d, o } = this.state;
    const component = (
      <L
        d={d}
        o={o}
        color={color}
        onChange={this.onChange}
        selected={this.state.selected}
        onSelect={e => {
          this.setState({
            position: e.target.getBoundingClientRect()
          });
          setTimeout(() => {
            this.setState({
              position: {
                x: window.innerWidth * 0.1,
                y: 120
              },
              d: "none"
            });
          }, 300);
        }}
        position={this.state.position}
      >
        {text}
      </L>
    );
    return component;
  };
  render() {
    const { d, o } = this.state;
    return (
      <Main id="main" o={1}>
        <Flex
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            bottom: "1.5rem",
            left: "1.5rem"
          }}
        >
          <Body style={{ flex: 1, width: "100%" }}>
            <Intro o={o}>
              <H3>
                <span>Hello! I’m Brent.</span>
              </H3>
              <P>
                <F d={d}>I'm a </F>
                {this.L(this.yellow, "developer")}{" "}
                <F>from Charlottesville, Virginia where I do </F>
                {this.L(this.red, "product design")}{" "}
                <F o={o} d={d}>
                  and{" "}
                </F>
                {this.L(this.green, "research")}{" "}
                <F o={o} d={d}>
                  at{" "}
                </F>
                {this.L(this.blue, "TwinThread")}
                <F>, an IIoT analytics business.</F>
              </P>
              <P>
                <F>I create technologies that empower, not replace, humans.</F>
              </P>
            </Intro>
          </Body>
          <Outline color={this.state.selected || this.state.color || "#f1f1f2"}>
            <BackgroundAnimation selected={this.state.selected} />
          </Outline>
        </Flex>
        <Section>
          <SectionInner>
            <ScrollBlock>▼ Scroll ▼</ScrollBlock>
          </SectionInner>
        </Section>
        <Section
          height={"60"}
          minHeight="420px"
          marginTop={40}
          style={{ pointerEvents: "auto" }}
        >
          <ProjectBackground />
          <H3
            style={{
              width: "100%",
              maxWidth: "68.5rem",
              padding: "1.5rem 3rem"
            }}
          >
            Recent work
          </H3>
          <ProjectRow
            cards={[
              <ProjectCard
                title={"TwinThread Web Application"}
                body={
                  "Create a data-dense interface to drive insights through machine learning in the Industrial IoT."
                }
                href={"https://app.twinthread.com"}
              />,
              <ProjectCard
                title={"Launch Coding Bootcamp"}
                body={
                  "Teach 20 students to code in 6 weeks. The results? 17 job placements after graduation."
                }
                href={
                  "https://hackcville.com/launch-track/software-engineering/"
                }
              />
            ]}
          />
          <ProjectRow
            cards={[
              <ProjectCard
                title={"Contraline.com"}
                body={
                  "Presenting the future of contraception with a corporate, scientific brand."
                }
                href={"http://www.contraline.com"}
              />,
              <ProjectCard
                title={"Roots Operational Management"}
                body={
                  "Preparing a promising business for growth through data collection and optimization."
                }
                href={"http://www.rootsnaturalkitchen.com"}
              />
            ]}
          />
        </Section>
        <Section>
          <span style={{ zIndex: 20 }}>
            Contact me at <S className="selected">brent@brentbaum.com</S>
          </span>
        </Section>
      </Main>
    );
  }
}

export default ReactTimeout(App);
