function getScale(selectedScale) {
    switch (selectedScale) {
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

function DisplayScale(scale) {
    let scaleWithNotes = getScale(scale);
    let text = "<ul class='scale-list'>";
    scaleWithNotes.forEach(note => {
        text += "<li>" + note + "</li>";
    });
    text += "</ul>";

    document.getElementById("scales").innerHTML = text;

}
