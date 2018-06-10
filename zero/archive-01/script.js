var words = [ "retaining", "all", "only", "quantum", "mechanical", "zero-point", "energy-induced", "particle", "motion", "nearly", "molecular", "motion", "ceases", "the", "internal", "lattice", "structure", "extends", "uninterrupted", "in", "directions", "ΔS = 0", "where S is the entropy", "T → 0", "temperatures", "near", "nearly", "molecular", "motion", "ceases", "and", "for", "any", "adiabatic", "process", "in", "such", "a", "circumstance", "pure", "substances", "can", "(ideally)", "form", "perfect", "crystals", "as", "strong", "form", "of", "the", "third", "law", "of", "thermodynamics", "states", "the", "entropy", "of", "a", "perfect", "crystal", "vanishes", "at", "absolute", "original", "heat", "theorem", "makes", "the", "weaker", "and", "less", "controversial", "claim", "that", "the", "entropy", "change", "for", "any", "isothermal", "process", "approaches","ΔG","ΔH", "ΔS", "ΔG","ΔH", "ΔS", "T 3", "T 4","(Guggenheim, p. 111)","T = 0","10 K","ΔG < 0","Principle of Thomsen and Berthelot","(Callen, pp. 186–187)","80,000 K", "19th century", "using", "the", "Debye", "model", "the", "specific", "heat", "and", "entropy", "of", "a", "pure", "crystal", "are", "proportional", "to", "while", "the", "enthalpy", "and", "chemical", "potential", "are", "proportional", "to", "these", "quantities", "drop", "toward", "their", "limiting", "values", "and", "approach", "with", "zero", "slopes", "for", "the", "specific", "heats", "at", "least", "the", "limiting", "value", "itself", "is", "definitely", "zero", "as", "borne", "out", "by", "experiments", "to", "below", "even", "the", "less", "detailed", "Einstein", "model", "shows", "this", "curious", "drop", "in", "specific", "heats", "in", "fact", "all", "specific", "heats", "vanish", "at", "absolute", "zero", "not", "just", "those", "of", "crystals", "likewise", "for", "the", "coefficient", "of", "thermal", "expansion","Maxwell's", "relations", "show", "that", "various", "other", "quantities", "also", "vanish", "these", "phenomena", "were", "unanticipated", "since", "the", "relation", "between", "changes", "in", "Gibbs", "free", "energy", "enthalpy", "and", "the", "entropy", "is", "thus", "as", "T", "decreases", "ΔG", "and", "ΔH", "approach", "each", "other", "so", "long", "as", "is", "bounded", "experimentally", "it", "is", "found", "that", "all", "spontaneous", "processes", "including", "chemical", "reactions", "result", "in", "a", "decrease", "in", "G", "as", "they", "proceed", "toward", "equilibrium", "if", "ΔS", "or", "T", "are", "small", "the", "condition", "may", "imply", "that", "ΔH", "<", "0", "which", "would", "indicate", "an", "exothermic", "reaction", "however", "this", "is", "not", "required", "endothermic", "reactions", "can", "proceed", "spontaneously", "if", "the", "TΔS", "term", "is", "large", "enough", "moreover", "the", "slopes", "of", "the", "derivatives", "of", "converge", "and", "are", "equal", "to", "zero", "at", "this", "ensures", "that", "ΔG", "and", "ΔH", "are", "nearly", "the", "same", "over", "a", "considerable", "range", "of", "temperatures", "and", "justifies", "the", "approximate", "empirical", "which", "states", "that", "the", "equilibrium", "state", "to", "which", "a", "system", "proceeds", "is", "the", "one", "that", "evolves", "the", "greatest", "amount", "of", "heat", "i.e.", "an", "actual", "process", "is", "the", "most", "exothermic", "one", "one", "model", "that", "estimates", "the", "properties", "of", "an", "electron", "gas", "at", "absolute", "zero", "in", "metals", "is", "the", "Fermi", "gas", "the", "electrons", "being", "Fermions", "must", "be", "in", "different", "quantum", "states", "which", "leads", "the", "electrons", "to", "get", "very", "high", "typical", "velocities", "even", "at", "absolute", "zero", "the", "maximum", "energy", "that", "electrons", "can", "have", "at", "absolute", "zero", "is", "called", "the", "Fermi", "energy", "the", "Fermi", "temperature", "is", "defined", "as", "this", "maximum", "energy", "divided", "by","Boltzmann's", "constant", "and", "is", "of", "the", "order", "of", "for", "typical", "electron", "densities", "found", "in", "metals", "for", "temperatures", "significantly", "below", "the", "Fermi", "temperature", "the", "electrons", "behave", "in", "almost", "the", "same", "way", "as", "at", "absolute", "zero", "this", "explains", "the", "failure", "of", "the", "classical", "equipartition", "theorem", "for", "metals", "that", "eluded", "classical", "physicists", "in", "the", "late" ]

var total = 273;

var text = document.getElementById("text-273");
var count = document.getElementById("count");
var wordsAvail = words.length;
var selectedWord;
var prevWord;
var safeWord = true;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createText() {
    document.body.innerHTML += '<p id="text-' + total + '"></p>';
    text = document.getElementById("text-" + total);
}

function appendText(int) {
    text.innerHTML += words[int] + " ";
}

function updateTotal() {
    total--;
    // console.log(count);
    count.innerHTML = "[" + total + "]";
}

function findNewWord() {
    prevWord = selectedWord;
    selectedWord = getRandomInt(wordsAvail);

    // attemt to prevent duplicate words appearing next to each other
    while (words[prevWord] == words[selectedWord]) {
        console.log("avoid " + words[selectedWord]);
        selectedWord = getRandomInt(wordsAvail);
    }

    if (!safeWord && getRandomInt(6) == 5) {
        updateTotal();
        createText();
        safeWord = true;
    } else {
        safeWord = false;
    }
    appendText(selectedWord);
    // console.log(safeWord);
}

function init() {
    // findNewWord();
    setInterval(() => findNewWord(), 500);
}

window.onload = init();
