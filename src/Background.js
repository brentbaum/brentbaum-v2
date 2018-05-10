import React from "react";

function resize(deltaX = 0, deltaY = 0) {
  var c = document.getElementById("box-canvas");
  var box = c.getBoundingClientRect();
  c.width = box.width + deltaX;
  c.height = box.height + deltaY;
}

export const start = () => {
  var c = document.getElementById("box-canvas");
  var ctx = c.getContext("2d");

  var box = c.getBoundingClientRect();
  var light = {
    x: box.width * 0.5,
    y: box.height * 0.8
  };

  var colors = ["#f5c156", "#e6616b", "#5cd3ad", "#70bfff"];

  function drawLight() {
    ctx.beginPath();
    ctx.arc(light.x, light.y, 5000, 0, 2 * Math.PI);
    var gradient = ctx.createRadialGradient(
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

  function otherClose(x, y, others) {
    const distances = others.map(
      box =>
        Math.pow((box.x - x) / c.width, 2) + Math.pow((box.y - y) / c.height, 2)
    );
    return distances.some(d => d < 0.03);
    return false;
  }

  let iterations = 0;

  function Box(others, index) {
    this.scale = 0.00001;
    this.half_size = Math.floor(Math.random() * c.height / 20 + c.height / 40);
    this.x = -1;
    this.y = -1;
    this.target = 0;
    if (c.width < 500) {
      while (
        this.x < 0 ||
        this.y < 0 ||
        (this.x < 1.0 * c.width &&
          this.y < 0.6 * c.height &&
          this.y > 0.15 * c.height) ||
        otherClose(this.x, this.y, others)
      ) {
        iterations++;
        if (iterations > 10000) {
          window.location = "/";
        }
        this.x = Math.floor(Math.random() * c.width * 0.85 + 0.075 * c.width);
        this.y = Math.floor(Math.random() * c.height * 0.85 + 0.075 * c.height);
      }
    } else {
      while (
        this.x < 0 ||
        this.y < 0 ||
        (this.x < 0.5 * c.width &&
          this.y < 0.7 * c.height &&
          this.y > 0.25 * c.height) ||
        otherClose(this.x, this.y, others)
      ) {
        iterations++;
        if (iterations > 10000) {
          window.location = "/";
        }
        this.x = Math.floor(Math.random() * c.width * 0.8 + 0.1 * c.width);
        this.y = Math.floor(Math.random() * c.height * 0.9 + 0.05 * c.height);
      }
    }
    this.r = (2 + Math.random()) * Math.PI;
    this.shadow_length = 2000;
    this.color = colors[index % colors.length];

    this.getDots = function() {
      if (this.scale < 1) {
        this.scale *= 1.3;
      }
      var full = Math.PI * 2 / 4;
      var half_size = this.half_size * this.scale;
      var x = this.x;
      var y = this.y - document.getElementById("main").scrollTop * 0.75;

      var p1 = {
        x: x + half_size * Math.sin(this.r),
        y: y + half_size * Math.cos(this.r)
      };
      var p2 = {
        x: x + half_size * Math.sin(this.r + full),
        y: y + half_size * Math.cos(this.r + full)
      };
      var p3 = {
        x: x + half_size * Math.sin(this.r + full * 2),
        y: y + half_size * Math.cos(this.r + full * 2)
      };
      var p4 = {
        x: x + half_size * Math.sin(this.r + full * 3),
        y: y + half_size * Math.cos(this.r + full * 3)
      };

      return {
        p1: p1,
        p2: p2,
        p3: p3,
        p4: p4
      };
    };
    this.rotate = function() {
      var speed = (60 - this.half_size) / 20;
      this.r += speed * 0.002;
      //this.x += speed;
      //this.y += speed;
    };
    this.draw = function() {
      var dots = this.getDots();
      ctx.beginPath();
      ctx.moveTo(dots.p1.x, dots.p1.y);
      ctx.lineTo(dots.p2.x, dots.p2.y);
      ctx.lineTo(dots.p3.x, dots.p3.y);
      ctx.lineTo(dots.p4.x, dots.p4.y);
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
      var dots = this.getDots();
      var angles = [];
      var points = [];

      for (let dot in dots) {
        var angle = Math.atan2(light.y - dots[dot].y, light.x - dots[dot].x);
        var endX =
          dots[dot].x + this.shadow_length * Math.sin(-angle - Math.PI / 2);
        var endY =
          dots[dot].y + this.shadow_length * Math.cos(-angle - Math.PI / 2);
        angles.push(angle);
        points.push({
          endX: endX,
          endY: endY,
          startX: dots[dot].x,
          startY: dots[dot].y
        });
      }

      for (var i = points.length - 1; i >= 0; i--) {
        var n = i == 3 ? 0 : i + 1;
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

  var boxes = [];

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawLight();

    for (var i = 0; i < boxes.length; i++) {
      boxes[i].rotate();
      boxes[i].drawShadow();
    }
    for (var i = 0; i < boxes.length; i++) {
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
  c.onmousemove = function(e) {
    light.x = e.offsetX == undefined ? e.layerX : e.offsetX;
    light.y = e.offsetY == undefined ? e.layerY : e.offsetY;
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
