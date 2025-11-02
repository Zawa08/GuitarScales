import { Scales, Preset } from "/Scales.js";

const KeySelect = document.getElementById("key-select");

let Interval = [];
let Key = structuredClone(Scales["Major"][KeySelect.value]["notes"]);
let Chords = [];
let ChordImage = "Images/Chords/CMajor.svg";


function getInterval(interval) {
    const button = document.getElementById(interval);
    button.addEventListener("click", () => {
        Interval.push(interval);
        UpdateList();
    })
}

function getPreset(preset) {
    const button = document.getElementById(preset);
    button.addEventListener("click", () => {
        const ChordPreset = structuredClone(Preset[preset]["intervals"]);
        Interval = ChordPreset
        UpdateList();
    })
}

function nameChords() {
    Key[0] += "Major";
    Key[1] += "Minor";
    Key[2] += "Minor";
    Key[3] += "Major";
    Key[4] += "Major";
    Key[5] += "Minor";
    Key[6] += "Dim";
}

function getChords() {
    Chords = [];
    for (let i = 0; i < Interval.length; i++) {
        Chords.push(Key[Interval[i]]);
    }
}

function RemoveChord() {
    const button = document.getElementById("remove-btn");
    button.addEventListener("click", () => {
        Interval.pop();
        UpdateList();
    })
}

function RemoveAllChords() {
    const button = document.getElementById("remove-all-btn");
    button.addEventListener("click", () => {
        Interval = [];
        UpdateList();
    })
}

function UpdateList() {
    ChordImage = [];
    getChords();
    document.getElementById("chords").innerHTML = createList();
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

function intervalButtons() {
    getInterval("0");
    getInterval("1");
    getInterval("2");
    getInterval("3");
    getInterval("4");
    getInterval("5");
    getInterval("6");
}

function presetButtons() {
    getPreset("Major");
    getPreset("MajorMinor");
    getPreset("BluesTwelve");
}

function changeScale() {
    KeySelect.addEventListener("change", () => {
        Key = structuredClone(Scales["Major"][KeySelect.value]["notes"]);
        nameChords();
        UpdateList();
    });
}

function DisplayChords() {
    intervalButtons();
    presetButtons();
    RemoveChord();
    RemoveAllChords();
    nameChords();
    changeScale();
}

DisplayChords();
