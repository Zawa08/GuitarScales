const svgFiles = [
  "F-dur.svg",
  "G-dur.svg",
  "D-moll.svg",
  "D-dur.svg",
  "E-moll.svg",
];

const folderPath = "images/";
const wrapper = document.getElementById("svg-wrapper");
let lastIndex = -1;

function showRandomChord() {
  let randomIndex;

  // Zajistíme, aby se nevybral stejný akord dvakrát po sobě
  do {
    randomIndex = Math.floor(Math.random() * svgFiles.length);
  } while (randomIndex === lastIndex && svgFiles.length > 1);

  lastIndex = randomIndex;
  const fileName = svgFiles[randomIndex];

  // Odstraníme příponu .svg pro nadpis a nahradíme pomlčky mezerami
  const cleanName = fileName.replace(".svg", "").replace("-", " ");

  // Reset animace
  wrapper.classList.remove("slide-in");
  void wrapper.offsetWidth;

  // Změna obsahu - vložíme <img> tag s cestou k SVG
  wrapper.innerHTML = `<img src="${folderPath}${fileName}" alt="${cleanName}" fetchpriority="high" loading="eager">`;

  wrapper.classList.add("slide-in");
}

// Spustit hned po načtení
showRandomChord();

// Automaticky se mění každé 4 sekundy
setInterval(showRandomChord, 5000);
