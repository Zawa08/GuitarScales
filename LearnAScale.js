import {Scales} from "Scales.js";

function getScale() {
    const scaleId = document.getElementById('scale-select').value
    return Scales["Major"][scaleId]["notes"]
}

function DisplayScale() {
    const scale = getScale();
    let noteList = "<ol class='scale-list'>";
    scale.forEach(note => {
        noteList += "<li>" + note + "</li>";
    });
    noteList += "</ol>";

    document.getElementById("scales").innerHTML = noteList;

}
