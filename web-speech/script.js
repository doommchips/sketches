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


    document.getElementById('translation').innerText = dream;
    // diagnostic.textContent = 'Result received: ' + dream;
    // bg.style.backgroundColor = dream;
}
