const text1 = document.getElementById("text-1");
const text2 = document.getElementById("text-2");
const text3 = document.getElementById("text-3");
const btnNew = document.getElementById("btn-new");
const btnCopy = document.getElementById("btn-copy");
const tooltip = document.getElementById("tooltip");
const wordsAvail = words.length;
let LINE = [];
let wordKey = 0;
let prevKey = -1;
let syllableTotal = 0;
let buildQueue = [];
var copyText = "";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function clearLINE() {
    LINE = [];
    syllableTotal = 0;
    // console.log("cleared : " + LINE.length);
}

function setKey() {
    prevKey = wordKey;
    wordKey = getRandomInt(wordsAvail);
}

function showWord(key) {
    return words[key]["word"];
}

function showSyllable(key) {
    return words[key]["syllables"];
}

function printLine(destination, key) {
    destination.innerHTML += showWord(key) + " ";
    // destination.innerHTML += showWord(key) + "(" + showSyllable(key) + ")" + " ";
}

function fillCopyText(key) {
    if (key) {
        copyText += showWord(key) + " ";
    } else {
        copyText += "\n";
    }
    // console.log("to copy: " + copyText);
}

function buildLine(destination, requiredSyllables) {
    do {
        setKey();

        // check if word is same as previous word
        if (showWord(prevKey) == showWord(wordKey)) {
            console.log("duplicate \"" + showWord(wordKey) + "\"");
        } else {
            // total syllables
            syllableTotal += showSyllable(wordKey);
            console.log(syllableTotal);
            // push word to array
            LINE.push(wordKey);
        }

        // exceeds required numner of syllables = reset
        while (syllableTotal > requiredSyllables) {
            console.log(syllableTotal + " : overstepped");
            clearLINE();
        }

        // meets required numner of syllables
        if (syllableTotal == requiredSyllables) {
            // console.log(requiredSyllables + " : " + destination + " : " + LINE);
            for (var i = 0; i < LINE.length; i++) {
                printLine(destination, LINE[i]);
                fillCopyText(LINE[i]);
            }
        }
    } while (syllableTotal < requiredSyllables)
    fillCopyText(); // to add new line
    clearLINE();
    console.log("completed");
}

function writeHaiku() {
    // Function wrapping code.
    // fn       - reference to function.
    // context  - what you want "this" to be.
    // params   - array of parameters to pass to function.
    var wrapFunction = function(fn, context, params) {
        return function() {
            fn.apply(context, params);
        };
    }

    // Wrap the function.  Make sure that the params are an array.
    var fun1 = wrapFunction(buildLine, this, [text1, 5]);
    var fun2 = wrapFunction(buildLine, this, [text2, 7]);
    var fun3 = wrapFunction(buildLine, this, [text3, 5]);

    buildQueue.push(fun1);
    buildQueue.push(fun2);
    buildQueue.push(fun3);

    // Remove and execute all items in the array
    while (buildQueue.length > 0) {
        (buildQueue.shift())();
        // console.log(LINE.length);
    }
}

window.onload = writeHaiku();

btnNew.addEventListener("click", function( event ) {
    copyText = "";
    text1.innerHTML = "";
    text2.innerHTML = "";
    text3.innerHTML = "";
    writeHaiku()
}, false);

// copy to clipboard stuff
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

btnCopy.addEventListener("click", function( event ) {
    tooltip.classList.remove("hidden");
    setTimeout(function(){ tooltip.classList.add("hidden") }, 3000);
    copyToClipboard();
    copyText = "";
}, false);
