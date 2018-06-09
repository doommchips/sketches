var line = [
    "hi welcome to my channel",
    "I'm so excited",
    "I will add all this information in the description below",
    "this is how it looks when we open the box",
    "I wanted to share my thoughts with you",
    "WOOOOOWOW!",
    "oh wow",
    "I think this is an instruction manual?",
    "the biggest reason for me getting this over the other models was...",
    "for me so far, I'm really impressed by this",
    "let's get into what sets this apart",
    "it looks like this piece of paper is protecting the glass",
    "so many cables!",
    "looks like a bit of paper work",
    "I like the lighter and solid construction",
    "that looks like the serial number",
    "oh wow, check this out",
    "it looks to all be there",
    "it feels so good",
    "I like the weight",
    "for what I need it for this seems perfect",
    "let's get this plastic wrapping out of the way"
]

var btn = document.getElementById("btn");
var linesAvail = line.length;
var selectedLine;
var lineH;
var lineW;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function findNewLine() {
    selectedLine = getRandomInt(linesAvail);
    btn.innerText = line[selectedLine];
    // lineH = setTimeout(btn.offsetHeight, 5000);
    // lineW = setTimeout(btn.offsetWidth, 5000);
    btn.style.left = getRandomInt(1000) + 'px';
    btn.style.top = getRandomInt(900) + 'px';
}

btn.addEventListener("click", function( event ) {
    findNewLine();
}, false);

window.onload = findNewLine();
