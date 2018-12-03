var view, can01, ctx, numColour, numBlockSize, screenCol, screenRow, blockToUpdate, blueCount, numSetTimer, soundBg, soundPing;
var numSet = [];
var blueSet = [];

window.onload = function() {
    view = document.getElementById("container");
    can01 = document.getElementById("c-count");
    soundBg = document.getElementById("noise");
    soundPing = document.getElementById("ping");
    ctx = can01.getContext("2d");
    numColour = "#B5B5B5";
    numBlockSize = 16;
    blueCount = 0;

    // set view to w and h of document
    view.width  = document.documentElement.clientWidth;
    view.height = document.documentElement.clientHeight;
    console.log(view.width + "w " + view.height + "h");

    // caclulate rows and cols needed for screensize
    screenCol = Math.floor(view.width/numBlockSize);
    screenRow = Math.floor(view.height/numBlockSize);

    // center view in document
    var canRowGap = (view.width-screenCol*numBlockSize)/2;
    var canColGap = (view.height-screenRow*numBlockSize)/2;
    view.style.left = canRowGap + "px";
    view.style.top  = canColGap + "px";

    // center canvas
    can01.width  = document.documentElement.clientWidth - (canRowGap * 2);
    can01.height = document.documentElement.clientHeight - (canColGap * 2);
    can01.style.left = canRowGap + "px";
    can01.style.top  = canColGap + "px";

    drawBlocks();
    drawLinePrelim();
    var fps = 120;
    numSetTimer = setInterval(updateBlock, 1000/fps);
}

function drawBlocks() {
    var elementCount = 0;
    for (var row = 0; row < screenRow; row++) {
        for (var col = 0; col < screenCol; col++) {
            drawNum(col*numBlockSize, row*numBlockSize, col, row);
            elementCount++;
            numSet.push("c" + col + "r" + row);
        }
    }
    console.log(elementCount + " blocks");
    setTimeout(() => {
        soundBg.play();
    }, 500)
}

function updateBlock() {
    if(numSet.length > 0) {
        blockToUpdate = getNum(numSet.length); //chose random item in array to change
        var el = document.getElementById(numSet[blockToUpdate]);

        if(getNum(96) < 1) {
            el.classList.add("bg-blue");
            blueSet.push(numSet[blockToUpdate]);
            if(blueSet.length > 1) {
                drawLine();     // testing
            }
            // el.textContent = "";
        } else {
            el.classList.add("no-colour");
            // el.textContent = getNum(2);
        }
        numSet.splice(blockToUpdate, 1); // remove changed item from array
    } else {
        clearInterval(numSetTimer);
        // shuffle(blueSet);
        // console.log("shuffle");
        // connectPoints();
    }
}

function drawNum(x, y, c, r) {
    var numDiv = document.createElement("div");
    // var num = getNum(10);
    numDiv.className = "num-block";
    numDiv.id = "c" + c + "r" + r;
    numDiv.style.left = x + "px";
    numDiv.style.top = y + "px";
    numDiv.style.height = numBlockSize + "px";
    numDiv.style.width = numBlockSize + "px";
    // numDiv.textContent = num;

    view.appendChild(numDiv);
}

function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = getNum(currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function drawLinePrelim() {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
}

function drawLine() {
    // console.log(blueCount);
    var x1 = document.getElementById(blueSet[blueSet.length-2]).style.left;
    var y1 = document.getElementById(blueSet[blueSet.length-2]).style.top;
    var x2 = document.getElementById(blueSet[blueSet.length-1]).style.left;
    var y2 = document.getElementById(blueSet[blueSet.length-1]).style.top;

    // trim the last two char "px" from the co-ords
    x1 = (x1.slice(0, -2));
    y1 = (y1.slice(0, -2));
    x2 = (x2.slice(0, -2));
    y2 = (y2.slice(0, -2));

    // adjust to center of point
    x1 = parseFloat(x1) + numBlockSize/2;
    y1 = parseFloat(y1) + numBlockSize/2;
    x2 = parseFloat(x2) + numBlockSize/2;
    y2 = parseFloat(y2) + numBlockSize/2;

    if(getNum(3) < 2) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        console.log("move: " + x1 + "x -> " + x2 + "x, " + y1 + "y -> " + y2 + "y");
        // soundPing.play();
    }
    // else {
    //     ctx.lineTo(x1, y1);
    //     ctx.lineTo(x2, y2);
    //     ctx.stroke();
    //     console.log("line: " + x1 + "x -> " + x2 + "x, " + y1 + "y -> " + y2 + "y");
    // }
}

function connectPoints() {
    ctx.beginPath();
    for (var i = 0; i < blueSet.length; i++) {
        var x = document.getElementById(blueSet[i]).style.left;
        var y = document.getElementById(blueSet[i]).style.top;

        // trim the last two char "px" from the co-ords
        x = (x.slice(0, -2));
        y = (y.slice(0, -2));

        // adjust to center of point
        x = parseFloat(x) + numBlockSize/2;
        y = parseFloat(y) + numBlockSize/2;

        if(getNum(2) == 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        console.log(x + "x, " + y + "y");
    }
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.stroke();
}

function getNum(max) {
    return Math.floor(Math.random()*max);
}
