import React from "react";

function resize(deltaX = 0, deltaY = 0) {
  const c = document.getElementById("box-canvas");
  const box = c.getBoundingClientRect();
  c.width = box.width + deltaX;
  c.height = box.height + deltaY;
}

const otherClose = (c, x, y, others) => {
  const distances = others.map(
    box =>
      Math.pow((box.x - x) / c.width, 2) + Math.pow((box.y - y) / c.height, 2)
  );
  return distances.some(d => d < 0.03);
};

// maxX, minX, maxY, minY define the area that shapes aren't allowed into.
const mobilePositionOptions = {
  maxX: 1,
  maxY: 0.6,
  minY: 0.15,
  rangeX: 0.85,
  baseX: 0.075,
  rangeY: 0.85,
  baseY: 0.075
};

const desktopPositionOptions = {
  maxX: 0.5,
  maxY: 0.7,
  minY: 0.25,
  rangeX: 0.8,
  baseX: 0.1,
  rangeY: 0.9,
  baseY: 0.05
};

let iterations = 0;
const generatePositions = (c, box, others, opts) => {
  while (
    box.x < 0 ||
    box.y < 0 ||
    (box.x < opts.maxX * c.width &&
      box.y < opts.maxY * c.height &&
      box.y > opts.minY * c.height) ||
    otherClose(c, box.x, box.y, others)
  ) {
    iterations++;
    if (iterations > 10000) {
      window.location = "/";
    }
    box.x = Math.floor(
      Math.random() * c.width * opts.rangeX + opts.baseX * c.width
    );
    box.y = Math.floor(
      Math.random() * c.height * opts.rangeY + opts.baseY * c.height
    );
  }
  opts = {};
};

export const start = () => {
  const c = document.getElementById("box-canvas");
  const ctx = c.getContext("2d");

  let box = c.getBoundingClientRect();
  let light = {
    x: box.width * 0.5,
    y: box.height * 0.8
  };

  const colors = ["#f5c156", "#e6616b", "#5cd3ad", "#70bfff"];

  function drawLight() {
    ctx.beginPath();
    ctx.arc(light.x, light.y, 5000, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(
      light.x,
      light.y,
      0,
      light.x,
      light.y,
      750
    );
    gradient.addColorStop(0, "#3b4654");
    gradient.addColorStop(1, "#2c343f");
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function Box(others, index) {
    this.scale = 0.00001;
    this.half_size = Math.floor(
      (Math.random() * c.height) / 20 + c.height / 40
    );
    this.x = -1;
    this.y = -1;
    this.target = 0;
    if (c.width < 500) {
      generatePositions(c, this, others, mobilePositionOptions);
    } else {
      generatePositions(c, this, others, desktopPositionOptions);
    }
    this.rotation = (2 + Math.random()) * Math.PI;
    this.shadow_length = 2000;
    this.color = colors[index % colors.length];

    this.getCorners = function() {
      if (this.scale < 1) {
        this.scale *= 1.3;
      }
      const full = (Math.PI * 2) / 4;
      const half_size = this.half_size * this.scale;
      const x = this.x;
      const y = this.y - document.getElementById("main").scrollTop * 0.75;

      const getCorner = (half_size, angle) => ({
        x: x + half_size * Math.sin(angle),
        y: y + half_size * Math.cos(angle)
      });

      return {
        p1: getCorner(half_size, this.rotation),
        p2: getCorner(half_size, this.rotation + full),
        p3: getCorner(half_size, this.rotation + full * 2),

        p4: getCorner(half_size, this.rotation + full * 3)
      };
    };
    this.rotate = function() {
      const speed = (60 - this.half_size) / 20;
      this.rotation += speed * 0.002;
    };
    this.draw = function() {
      const corners = this.getCorners();
      ctx.beginPath();
      ctx.moveTo(corners.p1.x, corners.p1.y);
      ctx.lineTo(corners.p2.x, corners.p2.y);
      ctx.lineTo(corners.p3.x, corners.p3.y);
      ctx.lineTo(corners.p4.x, corners.p4.y);
      ctx.fillStyle = this.color;
      ctx.fill();

      if (this.y - this.half_size > c.height) {
        this.y -= c.height + 100;
      }
      if (this.x - this.half_size > c.width) {
        this.x -= c.width + 100;
      }
    };
    this.checkTarget = function() {
      if (this.target > 1 || this.target < -1) {
        let d = this.target / 80;
        this.target += -d;
        this.y += d;
      }
    };
    this.drawShadow = function() {
      const corners = this.getCorners();
      let points = [];

      for (let key in corners) {
        const corner = corners[key];
        const angle = Math.atan2(light.y - corner.y, light.x - corner.x),
          endX = corner.x + this.shadow_length * Math.sin(-angle - Math.PI / 2),
          endY = corner.y + this.shadow_length * Math.cos(-angle - Math.PI / 2),
          startX = corner.x,
          startY = corner.y;
        points.push({ endX, endY, startX, startY });
      }
      console;

      for (let i = points.length - 1; i >= 0; i--) {
        const n = i == 3 ? 0 : i + 1;
        ctx.beginPath();
        ctx.moveTo(points[i].startX, points[i].startY);
        ctx.lineTo(points[n].startX, points[n].startY);
        ctx.lineTo(points[n].endX, points[n].endY);
        ctx.lineTo(points[i].endX, points[i].endY);
        ctx.fillStyle = "#2c343f";
        ctx.fill();
      }
    };
  }

  let boxes = [];

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawLight();

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].rotate();
      boxes[i].drawShadow();
    }
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].checkTarget();
      boxes[i].draw();
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();

  let numBoxes = c.width < 500 ? 10 : 16;
  let index = 0;
  while (boxes.length < numBoxes) {
    boxes.push(new Box(boxes, index));
    index++;
  }

  window.onresize = () => resize();
  window.onmousemove = function(e) {
    light.x = e.clientX - 24;
    light.y = e.clientY - 24;
  };

  return { boxes, resize, draw };
};

export class BackgroundAnimation extends React.Component {
  componentDidMount() {
    const { boxes, resize, draw } = start();
    this.resize = resize;
    this.draw = draw;
    this.boxes = boxes;
  }
  componentWillUpdate() {
    return false;
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected && !!nextProps.selected) {
      this.boxes.forEach(box => {
        box.target = -350 + Math.floor(Math.random() * 100);
      });
      this.resize();
      this.draw();
    }
  }
  render() {
    return [<canvas id="box-canvas" key="boxes" />];
  }
}
