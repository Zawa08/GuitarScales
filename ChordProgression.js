import { Scales } from "/Scales.js";

const ScaleSelect = document.getElementById("key-select")

let Interval = [];
let Key = [];
let Chords = [];

function nameChords() {
    Key[1] += "m";
    Key[2] += "m";
    Key[5] += "m";
    Key[6] += "dim";
}

function GetKey() {
    Key = Scales["Major"][ScaleSelect.value]["notes"]
    nameChords()
}


function getInterval(interval) {
    if (interval !== false) {
        Interval.push(interval);
    }
}

function getChords() {
    for (let i = 0; i < Interval.length; i++) {
        Chords.push(Key[Interval[i]]);
    }
}

function RemoveChord() {
    Interval.pop()
    DisplayChords(false)
}

function RemoveAllChords() {
    Interval = [];
    DisplayChords(false);
}

function createList() {
    let chordList = "<ol class='chord-list'>";
    Chords.forEach(chord => {
        chordList += "<li>" + chord + "</li>";
    });
    chordList += "</ol>";
    return chordList
}

function DisplayChords() {
    ScaleSelect.addEventListener("change", (event) => {
        GetKey();
        getInterval(interval);
        Chords = [];
        getChords();
        document.getElementById("chords").innerHTML = createList();
    });
}

DisplayChords()
