import { Scales } from "./Scales.js";

const ScaleSelect = document.getElementById("scale-select");

function DisplayScale() {
  ScaleSelect.addEventListener("change", () => {
    const Scale = Scales["Major"][ScaleSelect.value]["notes"];

    function createNoteList() {
      let noteList = "<ol class='scale-list'>";
      Scale.forEach((note) => {
        noteList += "<li>" + note + "</li>";
      });
      noteList += "</ol>";
      return noteList;
    }
    document.getElementById("scales").innerHTML = createNoteList();
  });
}

DisplayScale();
