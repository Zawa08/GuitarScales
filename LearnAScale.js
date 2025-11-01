import { Scales } from "./Scales.js";

const ScaleSelect = document.getElementById('scale-select');

function DisplayScale() {
    const Scale = Scales["Major"][ScaleSelect.value]["notes"];

    function createList() {
        let noteList = "<ol class='scale-list'>";
        Scale.forEach(note => {
            noteList += "<li>" + note + "</li>";
        });
        noteList += "</ol>";
        return noteList;
    }
    ScaleSelect.addEventListener("change", () => {
        document.getElementById("scales").innerHTML = createList();
    });
}

DisplayScale();
