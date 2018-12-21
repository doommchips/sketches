var view, viewCtx, noise, noiseCtx, fps, viewW, viewH, noiseUnit, noiseW,
    noiseH, canvasOffset, drawX, drawY, maxDrops, viewTerm, lineNum, txtEntry,
    fillTxt, eraseTxt, typeTxt, linesToRun, lineToType, charToType, currentChar,
    rectAng, rectW, rectH, numFieldFrame, frameDrawTime, fieldRepetitions,
    summaryP, colour00, colour01, colour02, colour03, colour04, colour05,
    colour06, colour07, colour08, colour09, colour10, glitchAnim, styleStatus;

window.onload = function() {
    view    = document.getElementById("view");
    viewCtx = view.getContext("2d");

    noise    = document.getElementById("noise");
    noiseCtx = noise.getContext("2d");
    noiseUnit = 5;

    glitch = document.getElementById("glitch");
    glitchCtx = glitch.getContext("2d");

    canvasOffset = 20;
    maxDrops = 50;

    frameDrawTime = 1500;
    styleStatus = 0;

    // set glitch colours
    colour00 = "#97d07b";
    colour01 = "#9bd87d";
    colour02 = "#92c579";
    colour03 = "#020d12";

    // set widths
    viewW  = document.documentElement.clientWidth;
    viewH  = document.documentElement.clientHeight;
    noiseW = document.documentElement.clientWidth + canvasOffset * 2;
    noiseH = document.documentElement.clientHeight + canvasOffset * 2;

    // set width and position of canvas = view
    view.width  = viewW;
    view.height = viewH;
    view.style.left = 0 + "px";
    view.style.top  = 0 + "px";

    // set width and position of canvas = noise
    noise.width  = noiseW;
    noise.height = noiseH;
    noise.style.left = -1 * canvasOffset + "px";
    noise.style.top  = -1 * canvasOffset + "px";

    // set width and position of canvas = glitch
    glitch.width  = noiseW;
    glitch.height = noiseH;
    glitch.style.left = -1 * canvasOffset + "px";
    glitch.style.top  = -1 * canvasOffset + "px";

    // set frame rate and draw
    fps = 24;
    setInterval(draw, 1000/fps);
    init();
}

function init() {
    var createTerm = document.createElement("div");
    var createTxtEntry = document.createElement("p");

    createTerm.id = "view-terminal";
    createTxtEntry.id = "text-entry";

    document.body.appendChild(createTerm);
    createTerm.appendChild(createTxtEntry).innerText = "> ";

    // terminal phase
    viewTerm = document.getElementById("view-terminal");
    txtEntry = document.getElementById("text-entry");

    lineNum = 0;
    fieldRepetitions = 0;

    write();
}

// glitch transtion for between phases
function glitchTrans() {
    clearCanvas(glitchCtx, 0, 0, noiseW, noiseH);

    for (var i = 0; i < 20; i++) {
        var w = getNum(700);
        var h = getNum(700);
        var x = getNum(noiseW);
        var y = getNum(noiseH);
        var getColour = getNum(5);

        if (getColour == 0) {
            var colour = colour00;
        } else if (getColour == 1) {
            var colour = colour01;
        } else if (getColour == 2) {
            var colour = colour02;
        } else if (getColour == 3) {
            var colour = colour03;
        } else if (getColour == 4) {
            var colour = colour04;
        }

        drawFillRect(glitchCtx, colour, x, y, w, h)
    }
}

// text writing
function write() {
    linesToRun = Math.ceil(viewH / 20) * 3;
    fillTxt = setInterval(writeLine, 1000/fps);
}

function writeLine() {
    var char;
    var txtLine = "";
    var lineLength = 50 + getNum(5);
    var addLine = document.createElement("p");
    addLine.id = "line-" + lineNum;
    txtLine = "";

    for (var j = 0; j < lineLength; j++) {
        // only want character from 33—126 inclusive
        char = getNum(94) + 33;
        // convert num code to character
        char = String.fromCharCode(char);
        // set value of txtLine
        txtLine = txtLine.concat(char);
    }

    viewTerm.appendChild(addLine).innerText = txtLine;

    if (lineNum == linesToRun) {
        clearInterval(fillTxt)
        setTimeout(typeLine, 1000, "i do not trust myself and i feel scared")
    } else {
        lineNum++;
    }
}

function returnLine() {
    var addLine = document.createElement("p");
    addLine.id = "line-" + lineNum;
    viewTerm.appendChild(addLine).innerText = lineToType;
    txtEntry.innerText = "> "

    // prep for next phase
    summaryP = document.createElement("div");
    summaryP.id = "short-p";
    document.body.appendChild(summaryP);

    setTimeout(eraseTxtLines, 4000);
    setTimeout(drawField, 8000);
}

function typeLine(line) {
    lineToType = line;
    charToType = lineToType.length;
    currentChar = 0;
    console.log("type: (" + charToType + ") " + lineToType);
    typeTxt = setInterval(typeChar, 1000/fps, currentChar);
}

function typeChar() {
    var lineToChange;
    var lineArray = [];

    if (getNum(10) == 1) {

        // testing
        if (lineToType[currentChar] != " ") {
            for (var i = 0; i < 50; i++) {
                lineToChange = lineNum - getNum(Math.ceil(viewH / 20));
                lineToChange = document.getElementById("line-" + lineToChange);
                var charToChange = getNum(lineToChange.innerText.length);

                for (var i = 0; i < lineToChange.innerText.length; i++) {
                    if (i == charToChange) {
                        lineArray[i] = lineToType[currentChar];
                    } else {
                        lineArray[i] = lineToChange.innerText[i];
                    }
                }

                lineToChange.innerText = lineArray.join("");
            }
        }

        txtEntry.innerText += lineToType[currentChar];
        ++currentChar;
    }

    if (currentChar == charToType) {
        clearInterval(typeTxt);
        setTimeout(returnLine, 1000);
    }
}

function eraseTxtLines() {
    var lineArray = [];
    for (var i = 0; i < 90; i++) {
        lineArray.push(String.fromCharCode(219));
    }
    var newTxt = lineArray.join("");

    lineToType = lineNum - Math.ceil(viewH / 20)
    eraseTxt = setInterval(eraseLine, 1000/fps, newTxt);
}

function eraseLine(newTxt) {
    var lineElChange;
    lineElChange = document.getElementById("line-" + lineToType);
    lineElChange.innerText = newTxt;
    ++lineToType;

    if (lineNum + 1 == lineToType) {
        clearTimeout(eraseTxt);
    }

    // initiate glitch transition
    if (lineToType == lineNum) {
        glitchAnim = setInterval(glitchTrans, 1000/fps);
    }
}

function removeViewTerm() {
    viewTerm.remove();
}

function removeGlitchAnim() {
    clearInterval(glitchAnim);
    clearCanvas(glitchCtx, 0, 0, noiseW, noiseH);
}

// rectangle field
function drawField() {
    setTimeout(removeGlitchAnim, 200);
    setTimeout(removeViewTerm, 200);
    clearCanvas(viewCtx, 0, 0, viewW, viewH);
    var xOffSet = 0;
    var yOffSet = 0;
    var angIncrement = 20;

    // set dimensions for rect
    rectW = 800 + ((800 * 20 * fieldRepetitions) / 100);
    rectH = 600 + ((600 * 20 * fieldRepetitions) / 100);

    rectAng = 25;
    viewCtx.translate(viewW/2, viewH/2);
    numFieldFrame = 0;

    // adding lines of text
    if (fieldRepetitions == 0) {
        // flip style
        changeDocStyle();
    } else if (fieldRepetitions == 2) {
        var p = document.createElement("p");
        p.innerText = "120gsm textured Fabriano";
        summaryP.appendChild(p);
    } else if (fieldRepetitions == 3) {
        var p = document.createElement("p");
        p.innerText = "small off white bumps";
        summaryP.appendChild(p);
    } else if (fieldRepetitions == 4) {
        var p = document.createElement("p");
        p.innerText = "reflect light";
        summaryP.appendChild(p);
    } else if (fieldRepetitions == 5) {
        var p = document.createElement("p");
        p.innerText = "I can see it in my head";
        summaryP.appendChild(p);
        // these marks are wrong
    } else if (fieldRepetitions == 6) {
        var p = document.createElement("p");
        p.innerText = "roots tighten around me";
        summaryP.appendChild(p);
    } else if (fieldRepetitions == 7) {
        var p = document.createElement("p");
        p.innerText = "these marks are wrong";
        summaryP.appendChild(p);
    }

    setTimeout(nextFieldFrame, frameDrawTime, xOffSet, yOffSet, angIncrement);
}

function nextFieldFrame(xOffSet, yOffSet, angIncrement) {
    if (numFieldFrame != 0) {
        rectAng -= (rectAng * 10) / 100;
        viewCtx.rotate(rectAng * Math.PI / 180);
    }

    if (numFieldFrame == 7) {
        if (fieldRepetitions != 7) {
            ++fieldRepetitions;
            drawField();
        } else {
            // end field phase
            endFieldPhase();
        }
    } else {
        drawStrokeRect(viewCtx, colour00, xOffSet, yOffSet);
        xOffSet -= 20;
        yOffSet -= 10;
        rectW -= ((rectW * 10) / 100);
        rectH -= ((rectH * 10) / 100);
        ++numFieldFrame;
        setTimeout(nextFieldFrame, frameDrawTime, xOffSet, yOffSet, angIncrement);
    }
}

function endFieldPhase() {
    console.log("end");
    setTimeout(clearCanvas, 5000, viewCtx, 0, 0, viewW, viewH);
    setTimeout(removeSummaryP, 6000);
    setTimeout(changeDocStyle, 6000);
    setTimeout(init, 10000);
}

function removeSummaryP() {
    summaryP.remove();
}

// digital snow
function draw() {
    clearCanvas(noiseCtx, 0, 0, noiseW, noiseH);
    for (var i = 0; i < maxDrops; i++) {
        drawDrop();
    }
}

function drawDrop() {
    // get x and y coords to draw to
    drawX = getNum(noiseW);
    drawY = getNum(noiseH);

    // vary colour
    if (getNum(2) == 1) {
        noiseCtx.fillStyle = "rgba(145, 222, 145, 1)";
    } else {
        noiseCtx.fillStyle = "rgba(154, 59, 102, 0.1)";
    }

    // draw fill
    noiseCtx.fillRect(drawX, drawY, noiseUnit, noiseUnit);
}

// helpers
function clearCanvas(context, xStart, yStart, xEnd, yEnd) {
    context.resetTransform();
    context.clearRect(xStart, yStart, xEnd, yEnd);
}

function getNum(max) {
    return Math.floor(Math.random()*max);
}

function drawStrokeRect(ctx, colour, xOff, yOff) {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = colour;
    ctx.rect((-rectW / 2 + xOff), (-rectH / 2 + yOff), rectW, rectH);
    ctx.stroke();
}

function drawFillRect(ctx, colour, x, y, w, h) {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, w, h);
}

function changeDocStyle() {
    if (styleStatus == 0) {
        document.body.style.backgroundColor = colour03;
        document.body.style.color = colour00;
        styleStatus = 1;
    } else {
        document.body.style.backgroundColor = colour00;
        document.body.style.color = colour03;
        styleStatus = 0;
    }
}

// no use now
function glitchTxt() {
    if (getNum(1000) == 2) {
        viewTerm.style.left = getNum(50) + "px";
        viewTerm.style.bottom = getNum(50) + "px";
        viewTerm.style.transform = "scale(" + ((getNum(30) + 90) / 100) + ")";
        setTimeout(resetGlitchTxt, 200);
    }
}

function resetGlitchTxt() {
    console.log("reset");
    viewTerm.style.color = "#020d12";
    viewTerm.style.transform = "scale(1)";
    viewTerm.style.left = "16px";
    viewTerm.style.bottom = "16px";
}

function cloneTxt() {
    console.log("cloned");
    document.body.appendChild(viewTerm.cloneNode(true));
}

function removeLine() {
    if (lineNum > Math.ceil(viewH / 20) && document.getElementById("line-" + lineNum)) {
        console.log("removed");
        viewTerm.removeChild(document.getElementById("line-" + lineNum));
    }
}

// colour00 = "#020d12";
// colour01 = "#73f140";
// colour02 = "#5ff0a0";
// colour03 = "#97d07b";

// colour01 = "blue";
// colour02 = "#945189";
// colour03 = "#1b0c68";
// colour04 = "#b85700";
// colour05 = "#5f87a2";
// colour07 = "#6c001d";
// colour08 = "#ca976a";
