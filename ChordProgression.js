import { Keys, ChordDiagrams, Preset } from "./Scales.js";
import { createDiagram } from "./ChordMaker.js";

const KeySelect = document.getElementById("key-select");

let SevenChecked = false;
let Key = structuredClone(Keys["Major"][KeySelect.value]["chords"]);
let ChordIntervals = [];

function getChord(interval) {
  const button = document.getElementById(interval);
  let chordName = "";
  let chordPosition = [];
  button.addEventListener("click", () => {
    if (interval === 0 || interval === 3 || interval === 4) {
      chordName = Key[interval] + (SevenChecked ? "7" : "");
      chordPosition =
        ChordDiagrams[Key[interval]][SevenChecked ? "seventh" : "major"];
    } else if (interval === 1 || interval === 2 || interval === 5) {
      chordName = Key[interval] + (SevenChecked ? "m7" : "m");
      chordPosition =
        ChordDiagrams[Key[interval]][SevenChecked ? "minorSeventh" : "minor"];
    } else {
      chordName = Key[interval] + (SevenChecked ? "dim7" : "dim");
      chordPosition =
        ChordDiagrams[Key[interval]][
          SevenChecked ? "diminishedSeventh" : "diminished"
        ];
    }

    ChordIntervals.push(SevenChecked ? interval + 7 : interval);
    createChord(chordName, chordPosition);
    console.log(ChordNames, ChordPositions);
  });
}

function getPreset(preset) {
  const button = document.getElementById(preset);
  button.addEventListener("click", () => {
    const ChordPreset = structuredClone(Preset[preset]["intervals"]);
    Interval = ChordPreset;
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

function RemoveChord() {
  const button = document.getElementById("remove-btn");
  const chordItems = document.getElementsByClassName("chord-item");
  button.addEventListener("click", () => {
    [...chordItems].at(-1).remove();
  });
}

function RemoveAllChords() {
  const button = document.getElementById("remove-all-btn");
  const chordItems = document.getElementsByClassName("chord-item");
  button.addEventListener("click", () => {
    [...chordItems].forEach((chordItem) => {
      chordItem.remove();
    });
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
  ChordNames.forEach((chordName) => {
    createChord(chordName);
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

function DisplayChords() {
  intervalButtons();
  presetButtons();
  switches();
  RemoveChord();
  RemoveAllChords();
  changeScale();
}

DisplayChords();
