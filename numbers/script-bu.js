var can01, ctx, numColour, numBlockSize, screenCol, screenRow;

window.onload = function() {
    can01 = document.getElementById("c-count");
    ctx = can01.getContext("2d");
    numColour = "#B5B5B5";
    numBlockSize = 20;

    // set canvas to w and h of document
    can01.width = document.documentElement.clientWidth;
    can01.height = document.documentElement.clientHeight;
    console.log(can01.width + "w " + can01.height + "h");

    // caclulate rows and cols needed for screensize
    screenCol = Math.floor(can01.width/numBlockSize);
    screenRow = Math.floor(can01.height/numBlockSize);
    console.log(screenCol + "c " + screenRow + "r");

    // center canvas in document
    var canRowGap = (can01.width-screenCol*numBlockSize)/2;
    var canColGap = (can01.height-screenRow*numBlockSize)/2;
    can01.style.left = canRowGap + "px";
    can01.style.top = canColGap + "px";

    // var fps = 30;
    // setInterval(drawAll, 1000/fps);
    drawAll();
}

function drawAll() {
    for (var row = 0; row < screenRow; row++) {
        for (var col = 0; col < screenCol; col++) {
            // ctx.beginPath()
            // ctx.rect(col*numBlockSize,row*numBlockSize,numBlockSize,numBlockSize);
            // ctx.fillStyle = numColour;
            // ctx.fill();
            drawNum(col*numBlockSize, row*numBlockSize);
        }
    }

    // var path = new Path2D('M 500,500 h 50 v 50 h 50');
    // ctx.strokeStyle="red";
    // ctx.lineWidth=5;
    // ctx.stroke(path);

}

function drawNum(x, y) {
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, x, y, numBlockSize, numBlockSize);
        // ctx.fillStyle = "red";
    }
    img.src = "_img/number-0.svg";
}
