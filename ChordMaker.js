const svgNS = "http://www.w3.org/2000/svg";

const initXPos = 50;
const initYPos = 100;

const stringGap = 60;
const fretGap = 150;

const fingerRadius = 25;

const strokeWidth = 1;

const endXPos = initXPos + 5 * stringGap;

function createCircle(x, y, color) {
  const circle = document.createElementNS(svgNS, "circle");
  const colors = ["red", "green", "blue", "orange", "purple"];
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
  barre.setAttribute("rx", 10);
  barre.setAttribute("ry", 10);
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

function writeChordName(x, name) {
  const text = document.createElementNS(svgNS, "text");
  const fontSize = 80;
  const nameLength = name.length;
  text.style.fontSize = fontSize;
  text.setAttribute("fill", "black");
  text.setAttribute(
    "x",
    x - (fontSize / (nameLength == 2 ? 2.2 : 2.8)) * nameLength,
  );
  text.setAttribute("y", fontSize);
  text.innerHTML = name;
  return text;
}

function writePosition(position) {
  const text = document.createElementNS(svgNS, "text");
  const fontSize = 60;
  text.style.fontSize = fontSize;
  text.setAttribute("fill", "black");
  text.setAttribute("x", 40 - (fontSize / 2) * position.length);
  text.setAttribute("y", 130 + fontSize);
  text.innerHTML = position;
  return text;
}

function markStringMuted(string) {
  const text = document.createElementNS(svgNS, "text");
  const fontSize = 60;
  text.style.fontSize = fontSize;
  text.setAttribute("fill", "red");
  text.setAttribute("x", initXPos + string * stringGap - fontSize / 3);
  text.setAttribute("y", fontSize * 1.5);
  text.innerHTML = "X";
  return text;
}

export function createDiagram(parentObject, chordName, fingerPositions) {
  const width = 400;
  const height = 600;

  const initFingerYPos = initYPos + height / 8;

  parentObject.appendChild(createBackground(width, height));
  parentObject.appendChild(writeChordName(width / 2, chordName));
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

  let fingerColor = 0;
  fingerPositions.forEach((position) => {
    if (position[0] == "barre") {
      const barreStart = position[1] - 1;
      parentObject.appendChild(createBarre(barreStart, height));
      parentObject.appendChild(
        writeNumber(
          endXPos - (stringGap * (5 - barreStart)) / 2,
          initFingerYPos,
          1,
        ),
      );
      fingerColor++;
    } else if (position[0] == "muted") {
      const mutedString = position[1] - 1;
      parentObject.appendChild(markStringMuted(mutedString));
    } else if (position[0] == "position") {
      parentObject.appendChild(writePosition(position[1].toString()));
    } else if (position[0] == "empty") {
      fingerColor++;
    } else {
      let string = position[0] - 1;
      let fret = position[1] - 1;
      createFinger(
        parentObject,
        initXPos + stringGap * string,
        initFingerYPos + fretGap * fret,
        fingerColor + 1,
        fingerColor,
      );
      fingerColor++;
    }
  });
}
