import { createDiagram } from "./chord-maker.js";
import { ChordDiagrams } from "./scales.js";

const CHORDS = [
  ["F", "major"],
  ["G", "major"],
  ["D", "major"],
  ["D", "minor"],
  ["E", "minor"],
  ["A", "major"],
  ["A", "minor"],
  ["B", "minor"],
];

const wrapper = document.getElementById("svg-wrapper");
let lastIndex = -1;

export function showRandomChord() {
  if (!wrapper) return;

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * CHORDS.length);
  } while (randomIndex === lastIndex && CHORDS.length > 1);

  lastIndex = randomIndex;
  const [chordKey, chordType] = CHORDS[randomIndex];
  const chordName = chordType === "minor" ? `${chordKey}m` : chordKey;

  wrapper.classList.remove("slide-in");
  void wrapper.offsetWidth;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  createDiagram(svg, chordName, ChordDiagrams[chordKey][chordType]);

  wrapper.replaceChildren(svg);
  wrapper.classList.add("slide-in");
}

// Spustí se hned po načtení
showRandomChord();

// Automaticky se mění každých 5 sekund
setInterval(showRandomChord, 5000);
