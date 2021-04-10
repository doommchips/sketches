let start = Date.now();
let time = 0;
let countMillisecond = document.getElementById("msec");
let countSecond = document.getElementById("secs");
let countMinute = document.getElementById("mins");
let countHour = document.getElementById("hour");

window.setInterval((function(){
    return function() {
        time = (Date.now()-start)/100;
        countMillisecond.innerText = Math.floor(time).toLocaleString("en-GB", {minimumIntegerDigits: 3});
        // countSecond.innerText = Math.floor(time / 100).toLocaleString(undefined, {minimumIntegerDigits: 2});
        // countMinute.innerText = Math.floor(time / 6000).toLocaleString(undefined, {minimumIntegerDigits: 2});
        // countHour.innerText = Math.floor(time / 60000).toLocaleString(undefined, {minimumIntegerDigits: 2});
        };
}()), 100);
