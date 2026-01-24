import { Keys } from "./Scales.js";

const svgNS = "http://www.w3.org/2000/svg";

const initXPos = 50;
const initYPos = 50;

const stringGap = 60;
const fretGap = 150;

const fingerRadius = 25;

const strokeWidth = 1;

const endXPos = initXPos + 5 * stringGap;

function createCircle(x, y, color) {
  const circle = document.createElementNS(svgNS, "circle");
  const colors = ["red", "green", "blue", "orange", "purple", "black"];
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", fingerRadius);
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", 1);
  circle.setAttribute("fill", colors[color]);

  return circle;
}

function createLine(x1, y1, x2, y2, strokeWidth) {
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", strokeWidth);

  return line;
}

function writeNumber(x, y, number) {
  const text = document.createElementNS(svgNS, "text");
  const fontSize = 30;
  text.style.fontSize = fontSize;
  text.setAttribute("fill", "white");
  text.setAttribute("x", x - fontSize / 4);
  text.setAttribute("y", y + fontSize / 3);
  text.innerHTML = number;

  return text;
}

function createFinger(parentObject, x, y, number, color) {
  parentObject.appendChild(createCircle(x, y, color));
  parentObject.appendChild(writeNumber(x, y, number));
}

function createBarre(barreStart, height) {
  const barre = document.createElementNS(svgNS, "rect");
  barre.setAttribute("fill", "red");
  barre.setAttribute("x", initXPos + stringGap * barreStart);
  barre.setAttribute("y", initYPos + height / 8 - fingerRadius);
  barre.setAttribute("width", stringGap * (5 - barreStart));
  barre.setAttribute("height", fingerRadius * 2);

  return barre;
}

function createBackground(width, height) {
  const background = document.createElementNS(svgNS, "rect");
  background.setAttribute("fill", "white");
  background.setAttribute("x", 0);
  background.setAttribute("y", 0);
  background.setAttribute("width", width);
  background.setAttribute("height", height);
  return background;
}

export function createDiagram(parentObject, chord) {
  const width = 400;
  const height = 600;

  const initFingerYPos = initYPos + height / 8;

  parentObject.appendChild(createBackground(width, height));

  for (let i = 0; i < 4; i++) {
    let fretYPos = initYPos + i * (height / 4);
    parentObject.appendChild(
      createLine(
        initXPos - strokeWidth / 2,
        fretYPos,
        width - 50 + strokeWidth / 2,
        fretYPos,
        strokeWidth,
      ),
    );
  }

  for (let i = 0; i < 6; i++) {
    let stringXPos = initXPos + i * stringGap;
    parentObject.appendChild(
      createLine(
        stringXPos,
        initYPos,
        stringXPos,
        height + initYPos - height / 4,
        strokeWidth,
      ),
    );
  }

  for (let i = 0; i < fingerPositions.length; i++) {
    if (fingerPositions[i][0] == "barre") {
      const barreStart = fingerPositions[i][1];
      parentObject.appendChild(createBarre(barreStart, height));
      parentObject.appendChild(
        writeNumber(
          endXPos - (stringGap * (5 - barreStart)) / 2,
          initFingerYPos,
          1,
        ),
      );
    } else {
      let fingerX = fingerPositions[i][0];
      let fingerY = fingerPositions[i][1];
      createFinger(
        parentObject,
        initXPos + stringGap * fingerX,
        initFingerYPos + fretGap * fingerY,
        i + 1,
        i,
      );
    }
  }
}
