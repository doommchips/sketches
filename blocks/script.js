var view, ctx, gutterColour, drawColour, blockSize, blockGain, blockMargin, blockArea, pageMargin, graph, totalCols, totalRows, lgCol, lgRow, blockSetTimer, soundBg, soundPing;
var blockSet = [];

var viewW;
var viewH;
var counterX;
var counterY;
var state;

window.onload = function() {
    view = document.getElementById("view");
    ctx  = view.getContext("2d");
    gutterColour = "#ffffff";
    blockSize   = 32;
    blockGain   = 64;
    blockMargin = 8;
    blockArea   = blockSize + blockMargin;
    pageMargin  = 24;
    counterX = 0;
    counterY = 0;
    state = 0;

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
    view.onclick = function() {
        state++;
        if(state > 6) {
            state = 0;
        }
        console.log(state);
    }

    var fps = 24;
    setInterval(drawGrid, 1000/fps);
}

function drawGrid() {
    ctx.clearRect(0,0,viewW,viewH);
    counterY += 0.05;
    var currentXPos = 0;
    var currentYPos = -1 * counterY;
    var variance = 0;

    // draw basic border grid
    drawGutter(0, 0, blockMargin, viewH, gutterColour);
    drawGutter(viewW - blockMargin, 0, blockMargin, viewH, gutterColour);
    drawGutter(0, 0, viewW, blockMargin, gutterColour);
    drawGutter(0, viewH - blockMargin, viewW, blockMargin, gutterColour);

    // y values
    for (var row = 0; row < totalRows * 2; row++) {
        // if(row == Math.round(totalRows/2)) {
        //     currentYPos = viewW;
        //     console.log(currentYPos);
        // }

        currentYPos += ((viewH - blockMargin) / totalRows) + getSizeX(currentYPos, counterY) * 5;

        // if (row < totalRows/2) {
        //     currentYPos += ((viewH - blockMargin) / totalRows) + getSizeX(currentYPos, counterY) * 5;
        // } else {
        //     currentYPos -= ((viewH - blockMargin) / (totalRows - Math.round(totalRows/2))) + getSizeX(currentYPos, counterY) * 5;
        // }
        drawGutter(0, currentYPos, viewW, blockMargin, gutterColour);
        // console.log(currentYPos);
    }

    // x values
    if(state == 0) {
        for (var col = 0; col < totalCols; col++) {
            variance = parseFloat(getSizeX(0, counterX));
            currentXPos = (viewW - blockMargin) / 2 + variance * (viewW - blockMargin) / 2;
            drawGutter(currentXPos, 0, blockMargin, viewH, gutterColour);

            counterX += 0.005;
        }
    } else if (state == 1) {
        for (var col = 0; col < totalCols; col++) {
            variance = parseFloat(getSizeX(0, counterX));
            currentXPos = Math.round((viewW - blockMargin) / 2 + variance * (viewW - blockMargin) / 2);
            drawGutter(currentXPos, 0, blockMargin, viewH, gutterColour);

            counterX += 0.01;
        }
    } else if (state == 2) {
        for (var col = 0; col < totalCols; col++) {
            variance = parseFloat(getSizeX(0, counterX));
            currentXPos = (viewW - blockMargin) / 2 + variance * (viewW - blockMargin) / 2;
            drawGutter(currentXPos, 0, blockMargin, viewH, gutterColour);

            counterX += totalCols / 0.05;
        }
    } else if (state == 3) {
        for (var col = 0; col < totalCols; col++) {
           variance = parseFloat(getSizeX(0, counterX));
           currentXPos = (viewW - blockMargin) / 2 + variance * (viewW - blockMargin) / 2;
           drawGutter(currentXPos, 0, blockMargin, viewH, gutterColour);

           counterX += totalCols / 0.00001;
       }
    } else if (state == 4) {
       variance = parseFloat(getSizeX(0, counterX));
       currentXPos = (viewW - blockMargin) / 2 + variance * (viewW - blockMargin) / 2;

       if(Math.round(getNum(2) < 1)) {
           drawGutter(currentXPos, 0, blockMargin, viewH, gutterColour);
       } else {
           console.log("test");
       }

       counterX += 0.05;
   } else if (state == 5) {
       for (var col = 0; col < totalCols; col++) {
           currentXPos += ((viewW - blockMargin) / totalCols) + getSizeX(currentXPos, counterY) * 5;
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
