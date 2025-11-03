import { ChordSet } from "./Scales.js";

let Difficulty = document.getElementById("difficulty").className;
let ChordImage = "Images/Chords/CMajor.svg";
let currentSet = 1;



let Chords = ChordSet[Difficulty]["chords" + currentSet];
const PreviousButton = document.getElementById("previous");
const NextButton = document.getElementById("next");

function createList() {
    let chordList = "<ol class='chord-list'>";
    Chords.forEach(chord => {
        ChordImage = "Images/Chords/" + chord + ".svg";
        const img = "<img class='chord-image' src=" + ChordImage + " alt=" + chord + ">";
        chordList += "<li>" + img + "</li>";
    });
    chordList += "</ol>";
    return chordList;
}

function getCurrentSet() {
    PreviousButton.addEventListener("click", () => {
        currentSet -= 1;
        document.getElementById("chords").innerHTML = createList();
    })
    NextButton.addEventListener("click", () => {
        currentSet++;
        document.getElementById("chords").innerHTML = createList();
    })
}

function PracticeChords() {
    document.getElementById("chords").innerHTML = createList();
    getCurrentSet();
}

PracticeChords();