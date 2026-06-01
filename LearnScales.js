import { Scales } from "./Scales.js";

const scaleSelect = document.getElementById("scale-select");
const scalesContainer = document.getElementById("scales");

if (scaleSelect && scalesContainer) {
  scaleSelect.addEventListener("change", (e) => {
    // Použití volitelného řetězení (?.) pro bezpečný přístup
    const selectedScale = Scales.Major[e.target.value]?.notes || [];

    scalesContainer.innerHTML = `<ol class='scale-list'>
      ${selectedScale.map((note) => `<li>${note}</li>`).join("")}
    </ol>`;
  });
}

DisplayScale();
