import { ChordSet } from "./Scales.js";

let Difficulty = document.getElementById("difficulty").className;
let ChordImage = "Images/Chords/CMajor.svg";
let currentSet = 1;

let Chords = ChordSet[Difficulty]["chords" + currentSet];

const ChordSetCounter = document.getElementById("current-set");
const PreviousButton = document.getElementById("previous");
const NextButton = document.getElementById("next");

function updateCounter() {
  ChordSetCounter.innerHTML = "Current set: Chords " + currentSet;
}

function createList() {
  updateCounter();
  let chordList = "<ol class='chord-list'>";
  Chords.forEach((chord) => {
    ChordImage = "Images/Chords/" + chord + ".svg";
    const img =
      "<img class='chord-image' src=" + ChordImage + " alt=" + chord + ">";
    chordList += "<li>" + img + "</li>";
  });
  chordList += "</ol>";
  document.getElementById("chords").innerHTML = chordList;
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
