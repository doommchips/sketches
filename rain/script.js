$(document).ready(function() {
    var canvas = $('#canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width + 0.2 * canvas.height;
        var h = canvas.height;
        ctx.strokeStyle = 'rgba(225, 224, 232, 0.7)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';


        var init = [];
        var maxParts = 2000;
        for(var a = 0; a < maxParts; a++) {
            init.push({
                x: Math.random() * w,
                y: Math.random() * h,
                l: Math.random() * 0.8,
                xs: Math.random() * 1 - 4,
                ys: Math.random() * 10 + 20
            })
        }

        var particles = [];
        for(var b = 0; b < maxParts; b++) {
            particles[b] = init[b];
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for(var c = 0; c < particles.length; c++) {
                var p = particles[c];
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                ctx.stroke();
            }
            move();
        }

        function move() {
            for(var b = 0; b < particles.length; b++) {
                var p = particles[b];
                p.x += p.xs;
                p.y += p.ys;
                if (500 > p.y && p.y > 480) {
                    p.x = Math.random() * w;
                    p.y = 0;
                    splash(p.x);
                    // console.log('hit');
                }
                if(p.x > w || p.y > h) {
                    p.x = Math.random() * w;
                    p.y = -20;
                }
                // splash(p, p.y);
            }

        }

        function splash(xpos) {
            ctx.rect(xpos,480, 1,1);
            ctx.stroke();
        }

        setInterval(draw, 15);

    }
});
