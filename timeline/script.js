$(document).ready(function() {
    var canvas = $('#canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var slideState = 1;

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width + 0.2 * canvas.height;
        var h = canvas.height;
        // ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.strokeStyle = 'rgba(0, 17, 160, 0.5)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';


        var init = [];
        var maxParts = 500;
        for(var a = 0; a < maxParts; a++) {
            init.push({
                x: Math.random() * w,
                y: Math.random() * h,
                l: Math.random() * 0.4,
                xs: Math.random() * 1 - 4,
                ys: Math.random() * 10 + 20
            })
        }

        var randRainShow = 0;
        var randRainTime = 0;

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
                if(p.x > w || p.y > h) {
                    p.x = Math.random() * w;
                    p.y = -20;
                }
            }
            // showHide();

        }

        function showHide() {
            if (randRainShow < 1) {
                canvas.classList.add('hidden');
                // console.log('hide')
                randRainShow = randNum();
                if (randRainShow > 98) {
                    randRainTime = randNum();
                } else {
                    randRainShow = 0;
                }
            } else {
                canvas.classList.remove('hidden');
                // console.log('show')
                if (randRainTime < 1) {
                    randRainShow = 0;
                } else {
                    randRainTime--;
                }
            }
            // console.log(randRainTime);
            // console.log(randRainShow);
        }

        function randNum() {
            return Math.random() * 100;
        }

        setInterval(draw, 1);

        document.onclick = function() {

            document.getElementById('slide-' + slideState).classList.add('hidden');

            if (slideState < 6) {
                slideState++;
            } else {
                slideState = 1;
            }

            document.getElementById('slide-' + slideState).classList.remove('hidden');
            console.log(slideState);
        };

    }
});
