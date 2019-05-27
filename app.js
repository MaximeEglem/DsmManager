/* global document, setInterval, clearInterval */
const dsmSessionSeconds = 70;

var leftTime = dsmSessionSeconds;
var seconds = document.getElementById("seconds");
var minutes = document.getElementById("minutes");
var action = document.getElementById("action");
var reset = document.getElementById("reset");

action.addEventListener("click", onAction);
reset.addEventListener("click", onReset);

var interval = null;

var state = {
    start: "START",
    pause: "PAUSE",
    reset: "RESET"
}

function onAction(){
    if(interval){
        changeState(state.pause);
    } else {
        changeState(state.start);
    }
}

function onReset(){
    changeState(state.reset);
}

function changeState(st){
    switch (st) {
        case state.start:
            startTimer();
            break;
        case state.pause:
            stopTimer();
            break;
        case state.reset:
            stopTimer();
            resetTime();
            break;
        default:
            throw new Error("Unknown state")
    }
    updateActionButton();
}

function getString(n) {
    if (n < 10) {
        return "0" + String(n);
    } else {
        return String(n);
    }
}

function setTime(m, s) {
    minutes.innerText = getString(m);
    seconds.innerText = getString(s);
}

function updateTime() {

    var hronoMinutes = Math.floor(leftTime / 60);
    var hronoSeconds = (leftTime % 60);
    setTime(hronoMinutes >= 0 ? hronoMinutes : 0, 
        hronoSeconds >= 0 ? hronoSeconds : 0)
    leftTime --;

    if (leftTime < 0)
    {
        document.getElementById("timeoutBanner").style.display = 'block';
        stopTimer();
        resetTime();
    }
}

function resetTime(){
    leftTime = dsmSessionSeconds;
    seconds.innerHTML = "00";
    minutes.innerHTML = "00";
}

function startTimer() {
    document.getElementById("timeoutBanner").style.display = 'none';
    leftTime = leftTime == 0 ? dsmSessionSeconds : leftTime; 
    interval = setInterval(updateTime, 1000);
    reset.disabled = true;
}

function updateActionButton(){
    if (interval){
        action.innerText = "Pause";
    } else if (leftTime > 0) {
        action.innerText = "Continue";
    } else {
        action.innerText = "Start";
    }
}

function stopTimer(){
    clearInterval(interval);
    interval = null;
    updateActionButton();
    reset.disabled = false;
    
}