var canvas, canvasContext;

window.onload = function() {
    canvas = document.getElementById('canvas');
    canvasContext = canvas.getContext('2d');

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    console.log(canvas.width + 'w ' + canvas.height + 'h');

    var framesPerSecond = 30;
    setInterval(drawAll, 1000/framesPerSecond);
}

function drawAll() {
  console.log('test');
}
