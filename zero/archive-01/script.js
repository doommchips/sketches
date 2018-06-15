var words = [
    "retaining",
    "only",
    "quantum",
    "mechanical",
    "zero-point",
    "energy-induced",
    "particle",
    "motion",
    "nearly",
    "all",
    "molecular",
    "motion",
    "ceases",
    "the",
    "internal",
    "lattice",
    "structure",
    "extends",
    "uninterrupted",
    "in",
    "all",
    "directions",
    "ΔS = 0",
    "where S is the entropy",
    "T → 0",
    "temperatures",
    "near",
    "nearly",
    "all",
    "molecular",
    "motion",
    "ceases",
    "and",
    "for",
    "any",
    "adiabatic",
    "process",
    "in",
    "such",
    "a",
    "circumstance",
    "pure",
    "substances",
    "can",
    "(ideally)",
    "form",
    "perfect",
    "crystals",
    "as",
    "strong",
    "form",
    "of",
    "the",
    "third",
    "law",
    "of",
    "thermodynamics",
    "states",
    "the",
    "entropy",
    "of",
    "a",
    "perfect",
    "crystal",
    "vanishes",
    "at",
    "absolute",
    "original",
    "heat",
    "theorem",
    "makes",
    "the",
    "weaker",
    "and",
    "less",
    "controversial",
    "claim",
    "that",
    "the",
    "entropy",
    "change",
    "for",
    "any",
    "isothermal",
    "process",
    "approaches"
]

var total = 273;

var text = document.getElementById("text");
var count = document.getElementById("count");
var wordsAvail = words.length;
var selectedWord;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function findNewWord() {
    selectedWord = getRandomInt(wordsAvail);
    if (getRandomInt(6) != 1) {
        text.innerText += " " + words[selectedWord];
    } else {
        text.innerText = " " + words[selectedWord];
    }
}

function findNewNumber() {
    total -= 1;
    count.innerHTML = total;
}

window.onload = setInterval(() => findNewWord(), 500);
window.onload = setInterval(() => findNewNumber(), 3000);
