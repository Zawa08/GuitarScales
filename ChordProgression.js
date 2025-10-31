import { Scales } from "/Scales.js";

let Interval = [];
let Key = [];
let Chords = [];


function getScale() {
    let scale = document.getElementById('scale-select').value
    switch (scale) {
        case "CMajor":
            return ["C", "D", "E", "F", "G", "A", "B"];

        case "CSharpMajor":
            return ["C#", "D#", "E#", "F#", "G#", "A#", "B#"];

        case "DFlatMajor":
            return ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"];

        case "DMajor":
            return ["D", "E", "F#", "G", "A", "B", "C#"];

        case "DSharpMajor":
            return ["D#", "E#", "F##", "G#", "A#", "B#", "C##"];

        case "EFlatMajor":
            return ["Eb", "F", "G", "Ab", "Bb", "C", "D"];

        case "EMajor":
            return ["E", "F#", "G#", "A", "B", "C#", "D#"];

        case "FMajor":
            return ["F", "G", "A", "Bb", "C", "D", "E"];

        case "FSharpMajor":
            return ["F#", "G#", "A#", "B", "C#", "D#", "E#"];

        case "GFlatMajor":
            return ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"];

        case "GMajor":
            return ["G", "A", "B", "C", "D", "E", "F#"];

        case "GSharpMajor":
            return ["G#", "A#", "B#", "C#", "D#", "E#", "F##"];

        case "AFlatMajor":
            return ["Ab", "Bb", "C", "Db", "Eb", "F", "G"];

        case "AMajor":
            return ["A", "B", "C#", "D", "E", "F#", "G#"];

        case "ASharpMajor":
            return ["A#", "B#", "C##", "D#", "E#", "F##", "G##"];

        case "BFlatMajor":
            return ["Bb", "C", "D", "Eb", "F", "G", "A"];

        case "BMajor":
            return ["B", "C#", "D#", "E", "F#", "G#", "A#"];

        default:
            return ["", "", "", "", "", "", ""];
    }
}


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

function DisplayChords(interval) {
    GetKey();
    getInterval(interval);
    Chords = [];
    getChords();
    let chordList = "<ol class='chord-list'>";
    Chords.forEach(chord => {
        chordList += "<li>" + chord + "</li>";
    });
    chordList += "</ol>";
    document.getElementById("chords").innerHTML = chordList;
}

const ScaleSelect = document.getElementById("key-select")

ScaleSelect.addEventListener("change", (event) => {
    const Scale = Scales["Major"][event.target.value]["notes"]

    function createList() {
        let noteList = "<ol class='scale-list'>";
        Scale.forEach(note => {
            noteList += "<li>" + note + "</li>";
        });
        noteList += "</ol>";
        return noteList
    }

    document.getElementById("chords").innerHTML = createList();
});