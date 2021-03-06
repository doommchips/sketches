let main = document.getElementById("main");
let ctx = main.getContext("2d");
let dpi = window.devicePixelRatio;
let pixelCount = 40;
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
let scale = 1.25;

// freq A minor scale in 3 octaves
let usableFreq = [
    65.41, 73.42, 82.41, 87.31, 98.00, 110.00, 123.47,
    130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94,
    261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88
];

// create web audio api context
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let gainNode = audioCtx.createGain();
// let synthDelay = audioCtx.createDelay(10.0);
let distortion = audioCtx.createWaveShaper();

window.onload = init();

function init() {
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
            }
            if (coordArr[i].yPos > viewH || coordArr[i].yPos < 0) {
                coordArr[i].yVel = coordArr[i].yVel * -1;
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
    }

    callback();
}

function reduceLife() {
    lineArr.forEach(function(item, i) {
        if (item.lifespan < 1) {
            // if life span of line is up remove from lineArr
            lineArr.splice(i, 1);
            // stop playing sound
            audioArr[i].sound.stop();
            // push back into array of usable frequencies
            // round back to two decimals because some frequencies were showing a large amount of decimal points
            usableFreq.push(roundTwoDec(audioArr[i].sound.frequency.value));
            // be sure to remove from array last
            audioArr.splice(i, 1);
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
    // random new note / freq
    var note = usableFreq[rand(usableFreq.length)];

    oscillator.type = 'saw';
    oscillator.frequency.setValueAtTime(note, audioCtx.currentTime); // value in hertz
    gainNode.gain.value = 0.15;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();

    // push audio object to array
    audioArr.push(Object.create({sound: oscillator, lifespan: x}));

    // remove chosen freq from list of available frequencies
    usableFreq.splice(usableFreq.indexOf(note), 1);
    console.log(usableFreq.length);
}

function drawPixel(i) {
    // round coords to give more retro look
    let x = Math.round(coordArr[i].xPos);
    let y = Math.round(coordArr[i].yPos);

    ctx.fillRect(x - (pixelSize / 2), y - (pixelSize / 2), pixelSize, pixelSize);
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
}

function setCanvas(ratio) {
    viewW = viewW * ratio;
    viewH = viewH * ratio;
    main.style.left = (viewW * (ratio - 1) / 2) * -1 + "px";
    main.style.top = (viewH * (ratio - 1) / 2) * -1 + "px";

    main.width  = viewW;
    main.height = viewH;
}

function enlargeCanvas(ratio) {
    // set main to w and h of document
    void ctx.scale(ratio, ratio);
}

function roundTwoDec(x) {
    return Math.round(x * 100) / 100;
}

function rand(max){
    return Math.floor(Math.random() * max);
}

function randSign(){
    return Math.round(Math.random()) * 2 - 1;
}
