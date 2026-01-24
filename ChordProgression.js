import { Keys, ChordDiagrams, Preset } from "./Scales.js";
import { createDiagram } from "./ChordMaker.js";

const KeySelect = document.getElementById("key-select");

let SevenChecked = false;
let Key = structuredClone(Keys["Major"][KeySelect.value]["chords"]);

function getInterval(interval) {
  const button = document.getElementById(interval);
  button.addEventListener("click", () => {
    if (SevenChecked) {
      let newInterval = interval + 7;
      if (Key[newInterval].length === 2) {
        createChord(
          Key[newInterval],
          ChordDiagrams[Key[newInterval]]["seventh"],
        );
      } else if (Key[newInterval].length === 3) {
        createChord(
          Key[newInterval],
          ChordDiagrams[Key[newInterval]]["minorSeventh"],
        );
      } else {
        createChord(
          Key[newInterval],
          ChordDiagrams[Key[newInterval]]["diminishedSeventh"],
        );
      }
    } else {
      if (Key[interval].length === 1) {
        createChord(Key[interval], ChordDiagrams[Key[interval]]["major"]);
      } else if (Key[interval].length === 2) {
        createChord(Key[interval], ChordDiagrams[Key[interval]]["minor"]);
      } else {
        createChord(Key[interval], ChordDiagrams[Key[interval]]["diminished"]);
      }
    }
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

function nameChords() {
  Key[1] += "m";
  Key[2] += "m";
  Key[5] += "m";
  Key[6] += "dim";
  Key[7] += "7";
  Key[8] += "m7";
  Key[9] += "m7";
  Key[10] += "7";
  Key[11] += "7";
  Key[12] += "m7";
  Key[13] += "dim7";
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

function updateList() {}
function intervalButtons() {
  getInterval(0);
  getInterval(1);
  getInterval(2);
  getInterval(3);
  getInterval(4);
  getInterval(5);
  getInterval(6);
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
    nameChords();
    updateList();
  });
}

function DisplayChords() {
  intervalButtons();
  presetButtons();
  switches();
  RemoveChord();
  RemoveAllChords();
  nameChords();
  changeScale();
}

DisplayChords();
