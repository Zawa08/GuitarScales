import { Scales } from "/Scales.js";

const ScaleSelect = document.getElementById("key-select");

let Interval = [];
let Key = [];
let Chords = [];

function nameChords() {
    Key[1] += "m";
    Key[2] += "m";
    Key[5] += "m";
    Key[6] += "dim";
}

function getInterval(interval) {
    if (interval !== false) {
        const button = document.getElementById(interval);
        button.addEventListener("click", (event) => {
            interval = event.target.id;
            Interval.push(interval);
            UpdateList();
        })
    }
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
    getChords();
    document.getElementById("chords").innerHTML = createList();
}

function createList() {
    let chordList = "<ol class='chord-list'>";
    Chords.forEach(chord => {
        chordList += "<li>" + chord + "</li>";
    });
    chordList += "</ol>";
    return chordList;
}

function initialize() {
    Key = Scales["Major"][ScaleSelect.value]["notes"];
    nameChords();
}

function changeScale() {
    ScaleSelect.addEventListener("change", (event) => {
        Key = Scales["Major"][event.target.value]["notes"];
        nameChords();
        UpdateList();
    });
}

function DisplayChords() {
    initialize();

    getInterval("0");
    getInterval("1");
    getInterval("2");
    getInterval("3");
    getInterval("4");
    getInterval("5");
    getInterval("6");
    RemoveChord();
    RemoveAllChords();
    changeScale();
}

DisplayChords()
