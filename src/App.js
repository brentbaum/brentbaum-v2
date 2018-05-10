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

  &:after {
    content: "▼ Scroll ▼";
    position: opacity: ${props => props.o};
    bottom: 2.5rem;
    z-index: 1;
    left: 0;
    right: 0;
    width: 8em;
    text-align: center;
    margin: 0 auto;
    font-size: 0.75em;
    text-transform: uppercase;
    letter-spacing: 0px;
    text-indent: 2px;
    color: white;
    font-weight: bold;
  }
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
  justify-content: center;
  align-items: center;
  height: ${props => (props.height ? props.height + "vh" : "100vh")};
  margin-top: ${props => (props.marginTop ? props.marginTop + "vh" : "0")};
  width: 100vw;
  color: white;
  font-size: 1.4rem;
`;

const Card = styled.a`
  display: block;
  text-decoration: none;
  cursor: pointer;
  background: white;
  border-radius: 0px;
  padding: 2rem 2rem 2.5rem;
  transition: transform 300ms;
  &:hover {
    transform: scale(1.03);
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
  max-width: 64rem;
  margin-bottom: 1rem;
  align-items: stretch;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ProjectCard = ({ title, body, img = null, href = "" }) => (
  <Card href={href}>
    <CardTitle>{title}</CardTitle>
    <CardBody>{body}</CardBody>
    {img && <img src={img} />}
  </Card>
);

const ProjectRow = ({ cards }) => (
  <CardRow>
    {cards.map(card => (
      <React.Fragment>
        <span style={{ flex: 1 }} key={"spacer" + card.title} />
        <span style={{ flex: 20 }} key={"card" + card.title}>
          {card}
        </span>
      </React.Fragment>
    ))}
    <span style={{ flex: 1 }} />
  </CardRow>
);

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
      <Main id="main">
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
                <F>
                  I work with startups to develop and implement technology
                  strategy.
                </F>
              </P>
            </Intro>
          </Body>
          <Outline color={this.state.selected || this.state.color || "#f1f1f2"}>
            <BackgroundAnimation selected={this.state.selected} />
          </Outline>
        </Flex>
        <Section />
        <Section height={50} marginTop={30}>
          <H3
            style={{ width: "100%", maxWidth: "61rem", marginBottom: "2rem" }}
          >
            Recent work
          </H3>
          <ProjectRow
            cards={[
              <ProjectCard
                title={"TwinThread Web Application"}
                body={
                  "Create a data-dense interface to display million row + data and drive the user to insights."
                }
                href={"https://app.twinthread.com"}
              />,
              <ProjectCard
                title={"Launch Coding Bootcamp"}
                body={
                  "Teach 20 students to code in 6 weeks. The results? Nothing short of spectacular."
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
                href={"https://rootsnk.com"}
              />
            ]}
          />
        </Section>
        <Section>
          <span style={{ zIndex: 20 }}>Contact me at brent@brentbaum.com</span>
        </Section>
      </Main>
    );
  }
}

export default ReactTimeout(App);
