var view, ctx, blockColour, drawColour, blockSize, blockGain, blockMargin, blockArea, minPageMargin, graph, totalCols, totalRows, lgCol, lgRow, blockSetTimer, soundBg, soundPing;
var blockSet = [];

var colsToRig;
var colsToLef;
var colTotalW;
var rowsToBot;
var rowsToTop;
var rowTotalH;

window.onload = function() {
    view = document.getElementById("view");
    ctx = view.getContext("2d");
    // soundBg = document.getElementById("noise");
    // soundPing = document.getElementById("ping");
    blockColour = "#111111";
    blockSize   = 32;
    blockGain   = 64;
    blockMargin = 8;
    blockArea   = blockSize + blockMargin;
    minPageMargin = 8;

    // y = -0.666(x-31)^2 +62
    // size = -0.666(x - lgCol)^2 + 62


    // set view to w and h of document with margin
    view.width  = document.documentElement.clientWidth  - minPageMargin * 2;
    view.height = document.documentElement.clientHeight - minPageMargin * 2;

    // caclulate rows and cols needed for screensize
    totalCols = Math.floor((view.width  - blockMargin) / (blockArea));
    totalRows = Math.floor((view.height - blockMargin) / (blockArea));

    // reset view height and width after calculating rows and cols needed
    view.width  = ((blockArea) * totalCols) + blockMargin;
    view.height = ((blockArea) * totalRows) + blockMargin

    // center view in document
    var viewColGap = document.documentElement.clientWidth  - (view.width  + (minPageMargin * 2));
    var viewRowGap = document.documentElement.clientHeight - (view.height + (minPageMargin * 2));
    view.style.left = parseFloat(viewColGap / 2 + minPageMargin) + "px";
    view.style.top  = parseFloat(viewRowGap / 2 + minPageMargin) + "px";

    console.log("view: " + view.width + "w " + view.height + "h");

    drawGrid();

    // ctx.fillStyle = "#00FF00";
    // ctx.fillRect(blockMargin, blockMargin, blockSize, blockSize);

    // var fps = 120;
    // blockSetTimer = setInterval(updateBlock, 1000/fps);
}

function drawGrid() {
    // lgCol = getNum(totalCols);
    // lgRow = getNum(totalRows);
    lgCol = Math.floor(totalCols/2);
    lgRow = Math.floor(totalRows/2);
    // console.log(lgCol);
    // console.log(lgRow);

    // colsToRig = totalCols - lgCol;
    // colsToLef = totalCols - colsToRig - 1;
    // colTotalW = blockSize * totalCols;
    // console.log("cols: " + totalCols + ", w: " + colTotalW);
    // console.log("to right: " + colsToRig + ", area: " + colsToRig*blockSize);
    // console.log("to left: "  + colsToLef + ", area: " + colsToLef*blockSize);
    //
    // rowsToBot = totalRows - lgRow;
    // rowsToTop = totalRows - rowsToBot - 1;
    // rowTotalH = blockSize * totalRows;
    // console.log("rows: " + totalRows);
    // console.log("to bottom: " + rowsToBot);
    // console.log("to top: " + rowsToTop);

    drawColour = blockColour;
    var elementCount = 0;
    var currentXPos = 0;
    var currentYPos = 0;
    var blockSizeX  = blockSize;
    var blockSizeY  = blockSize;
    var currentW = 0;
    var currentH = 0;
    var blockPercX;
    var blockPercY;

    for (var row = 0; row < totalRows; row++) {
        blockPercY = getSizeY(row)
        blockSizeY = (blockSize * blockPercY) + blockSize;
        currentYPos = (row + 1) * blockMargin + currentH;

        for (var col = 0; col < totalCols; col++) {

            if(col == 0) {
                currentW = 0;
            }
            // set colour of special rows and cols for testing
            // if((col + 1) == lgCol && (row + 1) == lgRow) {
            //     drawColour = "red";
            // } else if ((col + 1) == lgCol) {
            //     drawColour = "green";
            // } else if((row + 1) == lgRow) {
            //     drawColour = "blue";
            // } else {
            //     drawColour = blockColour;
            // }

            blockPercX = getSizeX(col + 1)
            blockSizeX = (blockSize * blockPercX) + blockSize;
            currentXPos = (col + 1) * blockMargin + currentW;

            drawBlock(currentXPos, currentYPos, blockSizeX, blockSizeY, drawColour);

            if((row + 1) == lgRow) {
                // console.log(blockSizeX + "s, " + currentW + "t");
                // console.log(blockSizeX + "x");
            }
            if((col + 1) == lgCol) {
                console.log(currentH);
                // console.log(blockSizeY + "y");
            }

            // update width after col completes
            currentW += blockSizeX;
            elementCount++;
        }

        // update height after row completes
        currentH += blockSizeY
    }
    console.log(elementCount + " blocks");
}

function drawBlock(x, y, w, h, fillColour) {
    ctx.fillStyle = fillColour;
    ctx.fillRect(x, y, w, h);
}

function getNum(max) {
    return Math.floor(Math.random()*max);
}

function getSizeX(x) {
    return -1 * Math.cos((2 * Math.PI) / totalCols * x).toFixed(5);
    // return blockGain * Math.sin(Math.PI / totalCols * x).toFixed(5);
    // return -1 * blockGain * Math.cos(Math.PI / totalCols * x).toFixed(5);

    // return Math.sqrt((1 - Math.pow(x - (totalCols / 2), 2) / Math.pow((totalCols / 2), 2)) * Math.pow(blockGain, 2))
    // return Math.sqrt(Math.pow(blockGain, 2) * (1 - Math.pow(x, 2) / Math.pow(totalCols, 2)))

    // return (-0.07111 * Math.pow(x - lgCol, 2) + blockGain);
    // return (-0.06666 * Math.pow(x - lgCol, 2) + 0.0026);


}

function getSizeY(x) {
    return -1 * Math.cos((2 * Math.PI) / totalRows * x).toFixed(5);
}
