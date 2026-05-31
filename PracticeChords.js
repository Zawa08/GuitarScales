import { ChordDiagrams, ChordSet } from "./Scales.js";
import { createDiagram } from "./ChordMaker.js";

let Difficulty = document.getElementById("difficulty").className;
let currentSet = 1;

let Chords = ChordSet[Difficulty]["chords" + currentSet];

const ChordSetCounter = document.getElementById("current-set");
const PreviousButton = document.getElementById("previous");
const NextButton = document.getElementById("next");

function updateCounter() {
  ChordSetCounter.innerHTML = "Current set: Chords " + currentSet;
}

function getChordAttributes(chord) {
  let chordName = "";
  const chordKey = chord.slice(0, 1);

  if (chord.includes("major")) {
    chordName = chordKey;
  } else if (chord.includes("minor")) {
    chordName = chord.slice(0, 2);
  } else {
    chordName = chord.slice(0, 4);
  }

  const chordType = chord.slice(1);
  const fingerPositions = ChordDiagrams[chordKey][chordType];
  return [chordName, fingerPositions];
}

function createList() {
  updateCounter();
  const chordList = document.getElementById("chords");
  chordList.innerHTML = "";
  Chords.forEach((chord) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const li = document.createElement("li");
    const chordAttributes = getChordAttributes(chord);
    createDiagram(svg, chordAttributes[0], chordAttributes[1]);
    li.appendChild(svg);
    chordList.appendChild(li);
  });
}

function getCurrentSet() {
  PreviousButton.addEventListener("click", () => {
    if (currentSet > 1) {
      currentSet -= 1;
      Chords = ChordSet[Difficulty]["chords" + currentSet];
      createList();
    }
  });
  NextButton.addEventListener("click", () => {
    if (currentSet < 3) {
      currentSet++;
      Chords = ChordSet[Difficulty]["chords" + currentSet];
      createList();
    }
  });
}

function PracticeChords() {
  createList();
  getCurrentSet();
}

PracticeChords();
