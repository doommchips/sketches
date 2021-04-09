let main = document.getElementById("main");
let ctx = main.getContext("2d");
let dpi = window.devicePixelRatio;
let pixelCount = 20;
let pixelSize = 8;
let pixelColour = "white";
let lineColour = "white";

let maxVel = 5;
let maxLife = 200;
let chanceToLive = 40;

let coordArr = new Array(pixelCount);
let pixel = {
    // pixel template object
    xPos: 0,
    yPos: 0,
    xVel: 0,
    yVel: 0
}
let lineArr = new Array();
let audioArr = new Array();
let viewW = document.documentElement.clientWidth;
let viewH = document.documentElement.clientHeight;
let scale = 1;
// let range = {
//     xAxis: [0 - (viewW / 2), viewW + (viewW / 2)],
//     yAxis: [0 - (viewH / 2), viewH + (viewH / 2)],
// }

// freq a minor scale in 3 octaves
let audioScale = [
    65.41, 73.42, 82.41, 87.31, 98.00, 110.00, 123.47,
    130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94,
    261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88
];

// create web audio api context
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// let synthDelay = audioCtx.createDelay(10.0);
// let distortion = audioCtx.createWaveShaper();

window.onload = init();

function init() {
    console.log("start");
    setCanvas(scale);
    // set styles
    ctx.fillStyle = pixelColour;
    ctx.lineWidth = pixelSize / 2;
    ctx.strokeStyle = pixelColour;

    // call animate function at set interval
    window.setInterval(animate, 50);
}

function animate() {
    // clear canvas
    ctx.clearRect(0, 0, viewW, viewH);
    // calculate grid and then draw
    calcGrid(draw);
}

function calcGrid(callback) {
    let i = 0;

    // check if grid exists yet
    if (coordArr[0]) {
        while (i < pixelCount) {
            // check if pixel has reached edge of view
            if (coordArr[i].xPos > viewW || coordArr[i].xPos < 0) {
                coordArr[i].xVel = coordArr[i].xVel * -1;
                // console.log("bounce");
            }
            if (coordArr[i].yPos > viewH || coordArr[i].yPos < 0) {
                coordArr[i].yVel = coordArr[i].yVel * -1;
                // console.log("bounce");
            }

            // calculate coords
            coordArr[i].xPos = coordArr[i].xPos + coordArr[i].xVel;
            coordArr[i].yPos = coordArr[i].yPos + coordArr[i].yVel;

            i++;
        }
    } else {
        // randomise grid
        while (i < pixelCount) {
            // randomise coords
            x = rand(viewW);
            y = rand(viewH);

            // create new object for each pixel based on template
            var pixelInst = Object.create(pixel);
            pixelInst.xPos = x;
            pixelInst.yPos = y;
            pixelInst.xVel = (Math.random() * maxVel).toFixed(2) * randSign();
            pixelInst.yVel = (Math.random() * maxVel).toFixed(2) * randSign();

            // populate array with pixel objects
            coordArr[i] = pixelInst;
            i++;
        }
        // create line here so canvas always starts with at least one line
        createLine();
    }

    // check if there are line items in lineArr
    if (lineArr.length > 0) {
        reduceLife();
    }

    // random chance to create new line
    if (rand(chanceToLive) == 0) {
        createLine();
        // console.log("line");
    }

    callback();
}

function reduceLife() {
    lineArr.forEach(function(item, i) {
        if (item.lifespan < 1) {
            // if life span of line is up remove from lineArr
            // line
            lineArr.splice(i, 1);
            // sound
            audioArr[i].sound.stop();
            audioArr.splice(i, 1);
            // console.log("no line");
        } else {
            // reduce life of line
            item.lifespan--;
        }
    })
}

function draw() {
    let i = 0;
    let j = 0;
    let x1;
    let y1;
    let lines = lineArr.length;

    // draw pixels
    while (i < pixelCount) {
        drawPixel(i);
        i++;
    }

    // draw lines
    while (j < lines) {
        drawLine(j);
        j++;
    }
}

function createLine() {
    var life = rand(maxLife);
    lineArr.push(Object.create({start: coordArr[rand(pixelCount)], end: coordArr[rand(pixelCount)], lifespan: life}));
    createSound(life);
}

function createSound(x) {
    // create Oscillator node
    var oscillator = audioCtx.createOscillator();
    // select random note / freq from array
    var note = rand(audioScale.length);

    oscillator.type = 'saw';
    oscillator.frequency.setValueAtTime(audioScale[note], audioCtx.currentTime); // value in hertz
    // oscillator.buffer = buffers[2];
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    // audioArr.push(oscillator);
    audioArr.push(Object.create({sound: oscillator, lifespan: x}));
    console.log(audioScale[note]);
    console.log(audioArr);
}

function drawPixel(i) {
    // round coords to give more retro look
    let x = Math.round(coordArr[i].xPos);
    let y = Math.round(coordArr[i].yPos);

    ctx.fillRect(x - (pixelSize / 2), y - (pixelSize / 2), pixelSize, pixelSize);
    // console.log("drawn: pixel x" + x + " y" + y);
}

function drawLine(i) {
    let x1 = lineArr[i].start.xPos;
    let y1 = lineArr[i].start.yPos;
    let x2 = lineArr[i].end.xPos;
    let y2 = lineArr[i].end.yPos;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    // console.log("drawn: line");
}

function setCanvas(ratio) {
    // set main to w and h ratio of document
    main.width  = viewW / ratio;
    main.height = viewH / ratio;
    // console.log(main.width + "w " + main.height + "h");
}

function enlargeCanvas(ratio) {
    // set main to w and h of document
    void ctx.scale(ratio, ratio);
    // console.log(main.width + "w " + main.height + "h");
}

function rand(max){
    return Math.floor(Math.random() * max);
}
function randSign(){
    return Math.round(Math.random()) * 2 - 1;
}
