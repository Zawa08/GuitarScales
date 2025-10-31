import {Scales} from "Scales.js";

function getScale() {
    const scale = document.getElementById('scale-select').value
}

function DisplayScale() {
    const scale = getScale();
    let noteList = "<ul class='scale-list'>";
    scale.forEach(note => {
        noteList += "<li>" + note + "</li>";
    });
    noteList += "</ul>";

    document.getElementById("scales").innerHTML = noteList;

}
