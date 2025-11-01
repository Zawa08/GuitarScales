import { Scales } from "/Scales.js";

const ScaleSelect = document.getElementById("key-select");

let Interval = [];
let Key = structuredClone(Scales["Major"][ScaleSelect.value]["notes"]);
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
        const img = "<img class='chord-image' src='Images/Scales/Major/CMajor.svg' alt='C major'>"
        chordList += "<li>" + img + chord + "</li>";
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

function changeScale() {
    ScaleSelect.addEventListener("change", () => {
        Key = structuredClone(Scales["Major"][ScaleSelect.value]["notes"]);
        nameChords();
        UpdateList();
    });
}

function DisplayChords() {
    intervalButtons();
    RemoveChord();
    RemoveAllChords();
    nameChords();
    changeScale();
}

DisplayChords();
