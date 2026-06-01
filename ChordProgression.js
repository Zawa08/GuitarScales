import { Keys, ChordDiagrams, Preset } from "./Scales.js";
import { createDiagram } from "./ChordMaker.js";

// --- DOM ELEMENTY ---
const keySelect = document.getElementById("key-select");
const chordList = document.getElementById("chord-list");
const checkboxSeven = document.getElementById("checkbox-seven");
const removeBtn = document.getElementById("remove-btn");
const removeAllBtn = document.getElementById("remove-all-btn");

// --- STAV APLIKACE (STATE) ---
// Udržuje čistě pole čísel (0-6 = běžné akordy, 7-13 = sedmičkové)
let chordIntervals = [];
// Tónina jako rychlé lokální pole
let currentKeyChords = [...Keys["Major"][keySelect.value]["chords"]];

// --- ČISTÁ LOGIKA (PURE FUNCTIONS) ---
function getChordData(intervalValue) {
  // Funkce už neovlivňuje žádné globální proměnné
  const isSeventh = intervalValue > 6;
  const normalizedInterval = isSeventh ? intervalValue - 7 : intervalValue;
  const baseChord = currentKeyChords[normalizedInterval];

  let type = "major";
  let suffix = "";

  if ([1, 2, 5].includes(normalizedInterval)) {
    type = isSeventh ? "minorSeventh" : "minor";
    suffix = isSeventh ? "m7" : "m";
  } else if (normalizedInterval === 6) {
    type = isSeventh ? "diminishedSeventh" : "diminished";
    suffix = isSeventh ? "dim7" : "dim";
  } else {
    type = isSeventh ? "seventh" : "major";
    suffix = isSeventh ? "7" : "";
  }

  return {
    name: baseChord + suffix,
    positions: ChordDiagrams[baseChord][type],
  };
}

// --- VYKRESLOVÁNÍ (DOM MANIPULACE) ---
function renderChord(chordName, fingerPositions) {
  if (!chordList) return;
  const li = document.createElement("li");
  li.className = "chord-item";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  createDiagram(svg, chordName, fingerPositions);

  li.appendChild(svg);
  chordList.appendChild(li);
}

function reRenderAllChords() {
  // Nejčistší způsob vymazání prvků rodiče (rychlejší než innerHTML = "")
  chordList.replaceChildren();

  chordIntervals.forEach((intervalValue) => {
    const { name, positions } = getChordData(intervalValue);
    renderChord(name, positions);
  });
}

// --- INICIALIZACE A EVENT LISTENERY ---
function setupApp() {
  // 1. Změna tóniny (zaktualizuje stav a VŠE překreslí)
  keySelect.addEventListener("change", () => {
    currentKeyChords = [...Keys["Major"][keySelect.value]["chords"]];
    reRenderAllChords();
  });

  // 2. Tlačítka pro jednotlivé intervaly (I, ii, iii...)
  for (let i = 0; i <= 6; i++) {
    const btn = document.getElementById(i.toString());
    if (btn) {
      btn.addEventListener("click", () => {
        // Kontrola aktuálního stavu switche PŘÍMO z elementu
        const finalInterval = checkboxSeven.checked ? i + 7 : i;

        chordIntervals.push(finalInterval);
        const { name, positions } = getChordData(finalInterval);
        renderChord(name, positions);
      });
    }
  }

  // 3. Preset tlačítka
  ["Major", "MajorMinor", "BluesTwelve"].forEach((presetId) => {
    const btn = document.getElementById(presetId);
    if (btn) {
      btn.addEventListener("click", () => {
        // Zkopírování pole do stavu a kompletní překreslení
        chordIntervals = [...Preset[presetId]["intervals"]];
        reRenderAllChords();
      });
    }
  });

  // 4. Odstranění POSLEDNÍHO akordu (Oprava zombie bugu)
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      if (chordIntervals.length > 0) {
        chordIntervals.pop(); // Nejdřív odstranit záznam ze stavové proměnné!
        chordList.lastElementChild?.remove(); // Pak smazat vizuál z DOMu
      }
    });
  }

  // 5. Odstranění VŠECH akordů
  if (removeAllBtn) {
    removeAllBtn.addEventListener("click", () => {
      chordIntervals = []; // Čistě vyprázdnit stav
      chordList.replaceChildren(); // Efektivně vyčistit vizuál
    });
  }
}

// Spuštění
setupApp();
