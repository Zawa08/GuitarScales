import { Scales } from "./Scales.js";

const ScaleSelect = document.getElementById('scale-select')

function DisplayScale() {
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

        document.getElementById("scales").innerHTML = createList();
    });
}

DisplayScale();
