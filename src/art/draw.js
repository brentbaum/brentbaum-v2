import "./styles.css";

var white = "#F2F5F1";
var colors = ["#D40920", "#1356A2", "#F7D842"];

function draw(context, squares) {
  for (var i = 0; i < colors.length; i++) {
    squares[Math.floor(Math.random() * squares.length)].color = colors[i];
  }
  for (var i = 0; i < squares.length; i++) {
    context.beginPath();
    context.rect(
      squares[i].x,
      squares[i].y,
      squares[i].width,
      squares[i].height
    );
    if (squares[i].color) {
      context.fillStyle = squares[i].color;
    } else {
      context.fillStyle = white;
    }
    context.fill();
    context.stroke();
  }
}

function splitOnY(squares, square, splitAt) {
  var squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - splitAt + square.y)
  };

  var squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt + square.y
  };

  squares.push(squareA);
  squares.push(squareB);
}

function splitOnX(squares, square, splitAt) {
  var squareA = {
    x: square.x,
    y: square.y,
    width: square.width - (square.width - splitAt + square.x),
    height: square.height
  };

  var squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height
  };

  squares.push(squareA);
  squares.push(squareB);
}

function splitSquaresWith(squares, coordinates) {
  const { x, y } = coordinates;

  for (var i = squares.length - 1; i >= 0; i--) {
    const square = squares[i];

    if (x && x > square.x && x < square.x + square.width) {
      if (Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnX(squares, square, x);
      }
    }

    if (y && y > square.y && y < square.y + square.height) {
      if (Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnY(squares, square, y);
      }
    }
  }
}

export const go = () => {
  console.log("Hello!");

  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  console.log("Hello!");
  var sizeX = window.innerWidth;
  var sizeY = window.innerHeight;

  var dpr = window.devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  context.scale(dpr, dpr);
  context.lineWidth = 8;
  var step = sizeX / 12;

  var squares = [
    {
      x: 0,
      y: 0,
      width: sizeX,
      height: sizeY
    }
  ];

  for (var i = 0; i < sizeX; i += step) {
    splitSquaresWith(squares, { y: i });
    splitSquaresWith(squares, { x: i });
  }

  draw(context, squares);
};
