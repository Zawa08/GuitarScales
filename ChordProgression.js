import { Keys, Preset } from "./Scales.js";

const KeySelect = document.getElementById("key-select");

let SevenChecked = false;
let Interval = [];
let Key = structuredClone(Keys["Major"][KeySelect.value]["chords"]);
let Chords = [];
let ChordImage = "Images/Chords/CMajor.svg";


function getInterval(interval) {
    const button = document.getElementById(interval);
    button.addEventListener("click", () => {
        if (!SevenChecked) {
            Interval.push(interval);
            UpdateList();
        }

        else {
            interval += 7
            Interval.push(interval);
            UpdateList();
        }
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

function isChecked() {
    const CheckBoxSeven = document.getElementById("checkbox-seven")
    CheckBoxSeven.addEventListener("change", () => {
        
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
    Key[7] += "7Major";
    Key[8] += "Minor7";
    Key[9] += "Minor7";
    Key[10] += "7Major";
    Key[11] += "7Major";
    Key[12] += "Minor7";
    Key[13] += "Dim7";
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

function changeScale() {
    KeySelect.addEventListener("change", () => {
        Key = structuredClone(Keys["Major"][KeySelect.value]["chords"]);
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
