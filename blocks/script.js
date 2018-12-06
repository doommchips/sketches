var view, ctx, gutterColour, drawColour, blockSize, blockGain, blockMargin, blockArea, pageMargin, graph, totalCols, totalRows, lgCol, lgRow, blockSetTimer, soundBg, soundPing;
var blockSet = [];

var viewW;
var viewH;
var counter;

window.onload = function() {
    view = document.getElementById("view");
    ctx  = view.getContext("2d");
    gutterColour = "#ffffff";
    blockSize   = 32;
    blockGain   = 64;
    blockMargin = 8;
    blockArea   = blockSize + blockMargin;
    pageMargin  = 24;
    counter = 0;

    // set view to w and h of document with margin
    view.style.left = pageMargin + "px";
    view.style.top  = pageMargin + "px";
    view.width  = document.documentElement.clientWidth  - pageMargin * 2;
    view.height = document.documentElement.clientHeight - pageMargin * 2;
    viewW = view.width;
    viewH = view.height;

    // calcualte total columns and rows
    totalCols = Math.floor(viewW / blockArea);
    totalRows = Math.floor(viewH / blockArea);

    console.log("view: " + viewW + "w " + viewH + "h");

    var fps = 24;
    setInterval(drawGrid, 1000/fps);
}

function drawGrid() {
    ctx.clearRect(0,0,viewW,viewH);
    counter += 0.05;
    var currentXPos = 0;
    var currentYPos = 0;

    for (var row = 0; row < totalRows; row++) {

        currentYPos += ((viewH - blockMargin) / totalRows) + getSizeX(currentYPos, counter) * 5;
        // currentYPos += getSizeX(currentYPos, counter) * 5;
        drawGutter(0, currentYPos, viewW, blockMargin, gutterColour);

        for (var col = 0; col < totalCols; col++) {
            currentXPos += ((viewW - blockMargin) / totalCols) + getSizeX(currentXPos, counter) * 5;
            // currentXPos += getSizeX(currentXPos, counter) * 5;
            drawGutter(currentXPos, 0, blockMargin, viewH, gutterColour);
        }
    }
}

function drawGutter(x, y, w, h, fillColour) {
    ctx.fillStyle = fillColour;
    ctx.fillRect(x, y, w, h);
}

function getNum(max) {
    return Math.floor(Math.random()*max);
}


function getSizeX(x, a) {
    return Math.sin((Math.PI / 1000) * x + a).toFixed(5);
}
