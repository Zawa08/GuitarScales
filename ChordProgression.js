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
    Key = getScale()
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

/*function DisplayChords(interval) {
    GetKey();
    getInterval(interval);
    Chords = [];
    getChords();

    document.getElementById("chords").innerHTML = chordList;
}
*/

function createList() {
    const Scale = Scales["Major"][ScaleSelect.value]["notes"]
    let chordList = "<ol class='chord-list'>";
    Scale.forEach(chord => {
        chordList += "<li>" + chord + "</li>";
    });
    chordList += "</ol>";
    return chordList
}

function DisplayChords() {
    ScaleSelect.addEventListener("change", (event) => {
        document.getElementById("chords").innerHTML = createList();
    });
}

DisplayChords()
