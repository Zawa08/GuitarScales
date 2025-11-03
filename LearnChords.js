import { Keys } from "./Scales.js";

const EasyButton = document.getElementById("easy");
const MediumButton = document.getElementById("medium");
const HardButton = document.getElementById("hard");

let Difficulty = "none";
let Key = structuredClone(Keys["Major"]["C"]["chords"]);
let Chords = Key[0, 3, 4]
let ChordImage = "Images/Chords/CMajor.svg";


function getButtons() {
    EasyButton.addEventListener("click", (event) => {
        Difficulty = event.target.id;
    });

    MediumButton.addEventListener("click", (event) => {
        Difficulty = event.target.id;
    });

    HardButton.addEventListener("click", (event) => {
        Difficulty = event.target.id;
    });
}

function nameChords() {
    Key[0] += "Major";
    Key[1] += "Minor";
    Key[2] += "Minor";
    Key[3] += "Major";
    Key[4] += "Major";
    Key[5] += "Minor";
    Key[6] += "Dim";
    Key[7] += "7Major";
    Key[8] += "Minor7";
    Key[9] += "Minor7";
    Key[10] += "7Major";
    Key[11] += "7Major";
    Key[12] += "Minor7";
    Key[13] += "Dim7";
}

function getChords() {
    
}

function createList() {
    let chordList = "<ol class='chord-list'>";
    Chords.forEach(chord => {
        ChordImage = "Images/Chords/" + chord + ".svg"
        const img = "<img class='chord-image' src=" + ChordImage + " alt=" + chord + ">";
        chordList += "<li>" + img + "</li>";
    });
    chordList += "</ol>";
    return chordList;
}


function PracticeChords() {
    getButtons();
    nameChords();
    console.log(createList());
}

PracticeChords();