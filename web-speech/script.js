// var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
var recognition = new webkitSpeechRecognition();
var speechRecognitionList = new webkitSpeechGrammarList();

// speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');

document.body.onclick = function() {
    recognition.start();
    console.log('Ready to receive a dream command.');
}

recognition.onresult = function(event) {
    var dream = event.results[0][0].transcript;

    // dream = dream.charAt(0);
    dream = dream.replace(/m/g, 'mn');
    dream = dream.replace(/c/g, 'n');
    dream = dream.replace(/d/g, 'm');
    dream = dream.replace(/f/g, 'b');
    dream = dream.replace(/g/g, 'm');
    dream = dream.replace(/j/g, 'n');
    dream = dream.replace(/k/g, 'n');
    dream = dream.replace(/l/g, 'r');
    dream = dream.replace(/p/g, 'b');
    dream = dream.replace(/q/g, 'b');
    dream = dream.replace(/r/g, 'm');
    dream = dream.replace(/s/g, 'n');
    dream = dream.replace(/t/g, 'n');
    dream = dream.replace(/v/g, 'm');
    dream = dream.replace(/w/g, 'nm');
    dream = dream.replace(/x/g, 'n');
    dream = dream.replace(/y/g, 'm');
    dream = dream.replace(/z/g, 'b');

    console.log(dream);

    document.getElementById('sound-long').play();
    document.getElementById('translation').innerText = dream;
    // diagnostic.textContent = 'Result received: ' + dream;
    // bg.style.backgroundColor = dream;
}

recognition.onend = function() {
    console.log('Confession service disconnected');
    recognition.start();
    // seems dangerous
}

var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		fps = 60,
		fov = 200,
		waveHeight = 15,
		cols = 40,
		rows = 40,
		offsetX = 0,
		offsetY = 0,
		inc = 0.01,
		mesh = [];

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight
}

function generateMesh(){

	mesh=[];
	var gridWidth = (canvas.width*2)/cols;
	var gridHeight = (canvas.height*2)/rows;
	var gridDepth = fov/rows;

	for(var col=0; col < cols; col++){
		for(var row=0; row < rows; row++){
			mesh.push([
				{
					x: col * gridWidth,
					y: row * gridHeight+gridHeight,
					z: fov - (row * gridDepth+gridDepth),
				},
				{
					x: col * gridWidth,
					y: row * gridHeight,
					z: fov - (row * gridDepth),
				},
				{
					x: col * gridWidth+gridWidth,
					y: row * gridHeight,
					z: fov - (row * gridDepth)
				}
			]);
			// Reflext
			mesh.push([
				{
					x: col * gridWidth+gridWidth,
					y: row * gridHeight,
					z: fov - (row * gridDepth)
				},
				{
					x: col * gridWidth+gridWidth,
					y: row * gridHeight+gridHeight,
					z: fov - (row * gridDepth+gridDepth),
				},
				{
					x: col * gridWidth,
					y: row * gridHeight+gridHeight,
					z: fov - (row * gridDepth+gridDepth),
				}
			]);
		}
	}

}

function drawMesh(){

	ctx.strokeStyle = 'rgba(255,255,255,0.05)';
	ctx.fillStyle   = 'rgba(255,255,255,0.5)';
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for(var m=0; m < mesh.length; m++){
		var poly = mesh[m];
		ctx.beginPath();
		ctx.moveTo(poly[0].x, poly[0].y);
		for(var p=0; p < poly.length; p++){
			ctx.lineTo(poly[p].x, poly[p].y);
		}
		ctx.closePath();
		ctx.stroke();
		//ctx.fill();	// This really impacts performance
	}
}

function addNoise(offsetX,offsetY){
	// You could do all sorts of things to cause different motion
	for(var m=0; m < mesh.length; m++){
		var poly = mesh[m];
		for(var p=0; p < poly.length; p++){
			poly[p].y = poly[p].y + (waveHeight * noise((poly[p].x/50)+offsetX,(poly[p].y/50)+offsetY) );
		}
	}

}

// Helper funtion for projection
function clip(x,w){
	return x-w;
}

// Tihs is a little crude
function projectMesh(){
	for(var m=0; m < mesh.length; m++){
		var poly = mesh[m];
		for(var p=0; p < poly.length; p++){
			var scale = fov/(fov+poly[p].z);
			poly[p].x = clip(poly[p].x, canvas.width) * scale + canvas.width/2;
			poly[p].y = clip(poly[p].y, canvas.height) * scale + canvas.height/3;

		}
	}

}

function draw() {

	// ToDo: inc should not be tied to framerate
	offsetX += inc;
	offsetY -= inc;

	generateMesh();	// ToDo: Probably don't need to do this every frame
	addNoise(offsetX,offsetY);
	projectMesh();
	drawMesh();

}

// Initialise and set frame rate.
(function(){
	var now;
	var then = Date.now();
	var interval = 1000/fps;
	var delta;
	function tick() {

			now = Date.now();
			delta = now - then;

			if (delta > interval) {
					then = now - (delta % interval);
					draw();
			}
			requestAnimationFrame(tick);
	}
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
	tick();
})();
