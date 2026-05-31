const svgNS = "http://www.w3.org/2000/svg";

// --- KONFIGURACE ---
const CONFIG = {
  width: 400,
  height: 650,
  gridX: 50,
  gridY: 130,
  stringGap: 60,
  fretGap: 120,
  strokeWidth: 2,
  fingerRadius: 22,
  colors: ["#a81b1b", "#3e8f36", "#203776", "#df9d2c", "#642a94"],
};

// --- POMOCNÉ FUNKCE PRO VYKRESLOVÁNÍ ---

// Zásadní zjednodušení: univerzální tvůrce elementů
const createEl = (tag, attributes = {}, text = "") => {
  const el = document.createElementNS(svgNS, tag);
  Object.entries(attributes).forEach(([key, val]) => el.setAttribute(key, val));
  if (text) el.textContent = text;
  return el;
};

const drawLine = (x1, y1, x2, y2, width = CONFIG.strokeWidth) =>
  createEl("line", {
    x1,
    y1,
    x2,
    y2,
    stroke: "#333",
    "stroke-width": width,
    "stroke-linecap": "round",
  });

const drawText = (
  x,
  y,
  text,
  size,
  color,
  anchor = "middle",
  weight = "normal",
) =>
  createEl(
    "text",
    {
      x,
      y,
      fill: color,
      "text-anchor": anchor,
      "font-family": "Montserrat, sans-serif",
      "font-weight": weight,
      "font-size": `${size}px`,
    },
    text,
  );

// --- HLAVNÍ EXPORTOVANÁ FUNKCE ---

export function createDiagram(
  svgElement,
  chordName,
  fingerPositions,
  scale = 1.0,
) {
  if (!svgElement) return; // Ochrana proti chybějícímu kontejneru

  svgElement.innerHTML = "";

  // 1. Nastavení plátna a škálování
  const scaledWidth = CONFIG.width * scale;
  const scaledHeight = CONFIG.height * scale;

  Object.entries({
    viewBox: `0 0 ${CONFIG.width} ${CONFIG.height}`,
    width: `${scaledWidth}px`,
    height: `${scaledHeight}px`,
    style: "max-width: 100%; height: auto;", // Zajištění responzivity i při velkém scale
  }).forEach(([k, v]) => svgElement.setAttribute(k, v));

  // 2. Pozadí
  svgElement.appendChild(
    createEl("rect", {
      width: CONFIG.width,
      height: CONFIG.height,
      fill: "white",
      rx: 10,
    }),
  );

  // 3. Název akordu
  const displayName = chordName.replace(/Sharp/g, "#").replace(/Flat/g, "♭");
  svgElement.appendChild(
    drawText(
      CONFIG.width / 2,
      70,
      displayName,
      60,
      "#332f2b",
      "middle",
      "bold",
    ),
  );

  // 4. Vykreslení hmatníku
  for (let i = 0; i <= 4; i++) {
    const fretY = CONFIG.gridY + i * CONFIG.fretGap;
    svgElement.appendChild(
      drawLine(
        CONFIG.gridX,
        fretY,
        CONFIG.gridX + 5 * CONFIG.stringGap,
        fretY,
        i === 0 ? 6 : CONFIG.strokeWidth,
      ),
    );
  }
  for (let i = 0; i < 6; i++) {
    const stringX = CONFIG.gridX + i * CONFIG.stringGap;
    svgElement.appendChild(
      drawLine(
        stringX,
        CONFIG.gridY,
        stringX,
        CONFIG.gridY + 4 * CONFIG.fretGap,
      ),
    );
  }

  // 5. Zpracování prstokladu
  let fingerColorIndex = 0;

  fingerPositions.forEach(([type, val]) => {
    const color = CONFIG.colors[fingerColorIndex % CONFIG.colors.length];

    if (type === "barre") {
      const start = val - 1;
      const width = CONFIG.stringGap * (5 - start) + CONFIG.fingerRadius * 2;
      const x = CONFIG.gridX + CONFIG.stringGap * start - CONFIG.fingerRadius;
      const y = CONFIG.gridY + CONFIG.fretGap / 2 - CONFIG.fingerRadius;

      svgElement.appendChild(
        createEl("rect", {
          x,
          y,
          width,
          height: CONFIG.fingerRadius * 2,
          rx: CONFIG.fingerRadius,
          ry: CONFIG.fingerRadius,
          fill: CONFIG.colors[0],
        }),
      );

      const centerX =
        CONFIG.gridX +
        CONFIG.stringGap * start +
        (CONFIG.stringGap * (5 - start)) / 2;
      svgElement.appendChild(
        drawText(
          centerX,
          y + CONFIG.fingerRadius + 8,
          "1",
          24,
          "white",
          "middle",
          "bold",
        ),
      );
      fingerColorIndex++;
    } else if (type === "muted") {
      svgElement.appendChild(
        drawText(
          CONFIG.gridX + (val - 1) * CONFIG.stringGap,
          CONFIG.gridY - 20,
          "X",
          35,
          "#d94a4a",
          "middle",
          "bold",
        ),
      );
    } else if (type === "position") {
      svgElement.appendChild(
        drawText(
          CONFIG.gridX - 25,
          CONFIG.gridY + CONFIG.fretGap / 2 + 10,
          val.toString(),
          35,
          "#5c3c1e",
          "end",
          "bold",
        ),
      );
    } else if (type === "empty") {
      fingerColorIndex++;
    } else {
      // Běžný hmat: 'type' je v tomto kontextu struna, 'val' je pražec
      const cx = CONFIG.gridX + CONFIG.stringGap * (type - 1);
      const cy = CONFIG.gridY + CONFIG.fretGap / 2 + CONFIG.fretGap * (val - 1);
      const fingerNum = (fingerColorIndex + 1).toString();

      svgElement.appendChild(
        createEl("circle", {
          cx,
          cy,
          r: CONFIG.fingerRadius,
          stroke: "#111",
          "stroke-width": CONFIG.strokeWidth,
          fill: color,
        }),
      );
      svgElement.appendChild(
        drawText(cx, cy + 8, fingerNum, 24, "white", "middle", "bold"),
      );
      fingerColorIndex++;
    }
  });
}
