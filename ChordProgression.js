import { Keys, ChordDiagrams, Preset } from "./Scales.js";
import { createDiagram } from "./ChordMaker.js";

const KeySelect = document.getElementById("key-select");

let SevenChecked = false;
let Key = structuredClone(Keys["Major"][KeySelect.value]["chords"]);
let ChordIntervals = [];

function getChordNameAndPositions(interval) {
  let position = [];
  let name = "";
  if (interval > 6) {
    interval -= 7;
    SevenChecked = true;
  } else {
    SevenChecked = false;
  }
  if (interval === 0 || interval === 3 || interval === 4) {
    name = Key[interval] + (SevenChecked ? "7" : "");
    position = ChordDiagrams[Key[interval]][SevenChecked ? "seventh" : "major"];
  } else if (interval === 1 || interval === 2 || interval === 5) {
    name = Key[interval] + (SevenChecked ? "m7" : "m");
    position =
      ChordDiagrams[Key[interval]][SevenChecked ? "minorSeventh" : "minor"];
  } else {
    name = Key[interval] + (SevenChecked ? "dim7" : "dim");
    position =
      ChordDiagrams[Key[interval]][
        SevenChecked ? "diminishedSeventh" : "diminished"
      ];
  }
  return [name, position];
}

function getChord(interval) {
  const button = document.getElementById(interval);
  button.addEventListener("click", () => {
    const chordInterval = SevenChecked ? interval + 7 : interval;
    ChordIntervals.push(chordInterval);
    const chordNameAndPosition = getChordNameAndPositions(chordInterval);
    createChord(chordNameAndPosition[0], chordNameAndPosition[1]);
  });
}

function getPreset(preset) {
  const button = document.getElementById(preset);
  button.addEventListener("click", () => {
    const ChordPreset = structuredClone(Preset[preset]["intervals"]);
    ChordIntervals = ChordPreset;
    updateList();
  });
}

function isChecked(element) {
  const checkBox = document.getElementById(element);
  checkBox.addEventListener("change", () => {
    if (SevenChecked) {
      SevenChecked = false;
    } else {
      SevenChecked = true;
    }
  });
}

function removeChordButton() {
  const button = document.getElementById("remove-btn");
  const chordItems = document.getElementsByClassName("chord-item");
  button.addEventListener("click", () => {
    [...chordItems].at(-1).remove();
  });
}

function removeAllChordsButton() {
  const button = document.getElementById("remove-all-btn");
  const chordItems = document.getElementsByClassName("chord-item");
  button.addEventListener("click", () => {
    [...chordItems].forEach((chordItem) => {
      chordItem.remove();
      ChordIntervals = [];
    });
  });
}

function removeAllChords() {
  const chordItems = document.getElementsByClassName("chord-item");
  [...chordItems].forEach((chordItem) => {
    chordItem.remove();
  });
}

function createChord(chordName, fingerPositions) {
  const chordList = document.getElementById("chord-list");
  const li = document.createElement("li");
  li.setAttribute("class", "chord-item");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  createDiagram(svg, chordName, fingerPositions);
  li.appendChild(svg);
  chordList.appendChild(li);
}

function updateList() {
  removeAllChords();
  ChordIntervals.forEach((interval) => {
    const chordNameAndPositions = getChordNameAndPositions(interval);
    createChord(chordNameAndPositions[0], chordNameAndPositions[1]);
  });
}
function intervalButtons() {
  getChord(0);
  getChord(1);
  getChord(2);
  getChord(3);
  getChord(4);
  getChord(5);
  getChord(6);
}

function presetButtons() {
  getPreset("Major");
  getPreset("MajorMinor");
  getPreset("BluesTwelve");
}

function switches() {
  isChecked("checkbox-seven");
}

function changeScale() {
  KeySelect.addEventListener("change", () => {
    Key = structuredClone(Keys["Major"][KeySelect.value]["chords"]);
    updateList();
  });
}

function displayChords() {
  intervalButtons();
  presetButtons();
  switches();
  removeChordButton();
  removeAllChordsButton();
  changeScale();
}

displayChords();
