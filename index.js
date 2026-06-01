import { createDiagram } from "./ChordMaker.js";
import { ChordDiagrams } from "./Scales.js";

const chords = [
  ["F", "major"],
  ["G", "major"],
  ["D", "major"],
  ["D", "minor"],
  ["E", "minor"],
  ["A", "major"],
  ["A", "minor"],
  ["B", "minor"],
];

const folderPath = "images/";
const wrapper = document.getElementById("svg-wrapper");
let lastIndex = -1;

function showRandomChord() {
  wrapper.innerHTML = "";
  let randomIndex;

  // Zajistíme, aby se nevybral stejný akord dvakrát po sobě
  do {
    randomIndex = Math.floor(Math.random() * chords.length);
  } while (randomIndex === lastIndex && chords.length > 1);

  lastIndex = randomIndex;
  const chordKey = chords[randomIndex][0];
  const chordType = chords[randomIndex][1];
  let chordName = chordKey;
  if (chordType === "minor") {
    chordName += "m";
  }

  // Reset animace
  wrapper.classList.remove("slide-in");
  void wrapper.offsetWidth;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  createDiagram(svg, chordName, ChordDiagrams[chordKey][chordType]);
  wrapper.appendChild(svg);
  wrapper.classList.add("slide-in");
}

// Spustit hned po načtení
showRandomChord();

// Automaticky se mění každé 4 sekundy
setInterval(showRandomChord, 5000);
