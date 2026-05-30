const svgNS = "http://www.w3.org/2000/svg";

// --- KONSTANTY A NASTAVENÍ PLÁTNA ---
const VIEW_WIDTH = 400;
const VIEW_HEIGHT = 650; // Mírně zvětšeno pro lepší prostor na text akordu

const GRID_INIT_X = 50;
const GRID_INIT_Y = 130; // Posunuto níže kvůli názvu akordu
const STRING_GAP = 60;
const FRET_GAP = 120;
const STROKE_WIDTH = 2;

const FINGER_RADIUS = 22;
const FINGER_COLORS = ["#a81b1b", "#3e8f36", "#203776", "#df9d2c", "#642a94"];

// --- POMOCNÉ FUNKCE PRO VYKRESLOVÁNÍ ---

function createCircle(x, y, colorIndex) {
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", FINGER_RADIUS);
  circle.setAttribute("stroke", "#111");
  circle.setAttribute("stroke-width", STROKE_WIDTH);
  circle.setAttribute("fill", FINGER_COLORS[colorIndex % FINGER_COLORS.length]);
  return circle;
}

function createLine(x1, y1, x2, y2, width = STROKE_WIDTH) {
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "#333");
  line.setAttribute("stroke-width", width);
  line.setAttribute("stroke-linecap", "round");
  return line;
}

function writeText(
  x,
  y,
  textContent,
  fontSize,
  color,
  anchor = "middle",
  fontWeight = "normal",
) {
  const text = document.createElementNS(svgNS, "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("fill", color);
  text.setAttribute("text-anchor", anchor); // Zásadní pro snadné centrování textu
  text.setAttribute("font-family", "Montserrat, sans-serif");
  text.setAttribute("font-weight", fontWeight);
  text.style.fontSize = `${fontSize}px`;
  text.textContent = textContent;
  return text;
}

function createFinger(parentObject, x, y, number, colorIndex) {
  parentObject.appendChild(createCircle(x, y, colorIndex));
  // Posun Y o čtvrtinu velikosti fontu pro vertikální centrování textu v kruhu
  parentObject.appendChild(
    writeText(x, y + 8, number, 24, "white", "middle", "bold"),
  );
}

function createBarre(barreStartString) {
  const barre = document.createElementNS(svgNS, "rect");
  barre.setAttribute(
    "x",
    GRID_INIT_X + STRING_GAP * barreStartString - FINGER_RADIUS,
  );
  barre.setAttribute("y", GRID_INIT_Y + FRET_GAP / 2 - FINGER_RADIUS);
  barre.setAttribute(
    "width",
    STRING_GAP * (5 - barreStartString) + FINGER_RADIUS * 2,
  );
  barre.setAttribute("height", FINGER_RADIUS * 2);
  barre.setAttribute("rx", FINGER_RADIUS);
  barre.setAttribute("ry", FINGER_RADIUS);
  barre.setAttribute("fill", FINGER_COLORS[0]);
  return barre;
}

// --- HLAVNÍ EXPORTOVANÁ FUNKCE ---

export function createDiagram(svgElement, chordName, fingerPositions) {
  // 1. Očištění předchozího obsahu a nastavení responzivity
  svgElement.innerHTML = "";

  // Tohle je to kouzlo, které chybělo. Umožní to SVG reagovat na CSS šířku rodiče.
  svgElement.setAttribute("viewBox", `0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`);
  svgElement.setAttribute("width", "100%");
  svgElement.setAttribute("height", "100%");

  // 2. Pozadí
  const background = document.createElementNS(svgNS, "rect");
  background.setAttribute("width", VIEW_WIDTH);
  background.setAttribute("height", VIEW_HEIGHT);
  background.setAttribute("fill", "white");
  background.setAttribute("rx", "10"); // Zaoblené rohy celého diagramu
  svgElement.appendChild(background);

  // 3. Název akordu (vycentrováno pomocí text-anchor="middle")
  let displayChordName = chordName.replace("Sharp", "#").replace("Flat", "♭");
  svgElement.appendChild(
    writeText(
      VIEW_WIDTH / 2,
      70,
      displayChordName,
      60,
      "#332f2b",
      "middle",
      "bold",
    ),
  );

  // 4. Vykreslení hmatníku (mřížky)
  // Pražce (horizontální linie)
  for (let i = 0; i <= 4; i++) {
    const fretY = GRID_INIT_Y + i * FRET_GAP;
    const isNut = i === 0; // Nultý pražec by měl být tlustší
    svgElement.appendChild(
      createLine(
        GRID_INIT_X,
        fretY,
        GRID_INIT_X + 5 * STRING_GAP,
        fretY,
        isNut ? 6 : STROKE_WIDTH,
      ),
    );
  }

  // Struny (vertikální linie)
  for (let i = 0; i < 6; i++) {
    const stringX = GRID_INIT_X + i * STRING_GAP;
    svgElement.appendChild(
      createLine(
        stringX,
        GRID_INIT_Y,
        stringX,
        GRID_INIT_Y + 4 * FRET_GAP,
        STROKE_WIDTH,
      ),
    );
  }

  // 5. Zpracování prstokladu
  let fingerColorIndex = 0;

  fingerPositions.forEach((position) => {
    const type = position[0];

    if (type === "barre") {
      const barreStart = position[1] - 1;
      svgElement.appendChild(createBarre(barreStart));
      // Číslo prstu pro barré (uprostřed barré)
      const barreCenter =
        GRID_INIT_X +
        STRING_GAP * barreStart +
        (STRING_GAP * (5 - barreStart)) / 2;
      svgElement.appendChild(
        writeText(
          barreCenter,
          GRID_INIT_Y + FRET_GAP / 2 + 8,
          "1",
          24,
          "white",
          "middle",
          "bold",
        ),
      );
      fingerColorIndex++;
    } else if (type === "muted") {
      const mutedString = position[1] - 1;
      svgElement.appendChild(
        writeText(
          GRID_INIT_X + mutedString * STRING_GAP,
          GRID_INIT_Y - 20,
          "X",
          35,
          "#d94a4a",
          "middle",
          "bold",
        ),
      );
    } else if (type === "position") {
      const fretPosition = position[1].toString();
      // Pozice pražce vlevo od hmatníku
      svgElement.appendChild(
        writeText(
          GRID_INIT_X - 25,
          GRID_INIT_Y + FRET_GAP / 2 + 10,
          fretPosition,
          35,
          "#5c3c1e",
          "end",
          "bold",
        ),
      );
    } else if (type === "empty") {
      // Skok v barvách pro prázdnou strunu, aby logicky sedělo číslování prstů
      fingerColorIndex++;
    } else {
      // Běžný hmat (struna, pražec)
      const string = position[0] - 1;
      const fret = position[1] - 1;
      createFinger(
        svgElement,
        GRID_INIT_X + STRING_GAP * string,
        GRID_INIT_Y + FRET_GAP / 2 + FRET_GAP * fret, // Umístění do poloviny pražce
        fingerColorIndex + 1,
        fingerColorIndex,
      );
      fingerColorIndex++;
    }
  });
}
