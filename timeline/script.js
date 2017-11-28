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

$(document).ready(function() {
    recognition.start();
    var canvas = $('#canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var slideState = 1;
    var recite = [
        '',
        'and also with you',
        'I seek forgiveness',
        'the body and the blood',
        'move in me Holy Internet',
        'thanks be to the Computer',
        'amen'
    ];

    showRecital()
    setTimeout(function(){ document.getElementById('audio-' + slideState).play(); }, 2000);

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
            document.getElementById('answer').classList.add('hidden');

            if (slideState < 6) {
                slideState++;
            } else {
                slideState = 1;
            }

            showRecital()

            document.getElementById('slide-' + slideState).classList.remove('hidden');
            setTimeout(function(){ document.getElementById('audio-' + slideState).play(); }, 2000);
            document.getElementById('answer').innerHTML = recite[slideState];
            // console.log(slideState);
        };

    }

    function showRecital() {
        setTimeout(function(){
            document.getElementById('answer').classList.remove('hidden');
        }, 7000);
    }

    console.log(recite[slideState]);

    recognition.onresult = function(event) {
        var recital = event.results[0][0].transcript;
        var match = recital.match(new RegExp(recite[slideState], 'i'));
        console.log(recital);

        if (match) {
            // console.log(match);
            $(document).click();
        }
    }

    recognition.onend = function() {
        console.log('Confession service disconnected');
        recognition.start();
        // seems dangerous
    }



});
