/* global document, setInterval, clearInterval */
const dsmSessionSeconds = 70;

let leftTime = dsmSessionSeconds;
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const action = document.getElementById("action");
const reset = document.getElementById("reset");

action.addEventListener("click", onAction);
reset.addEventListener("click", onReset);

let interval = null;

const state = {
    start: "START",
    pause: "PAUSE",
    reset: "RESET"
};

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

    leftTime --;
    updateTimer();

    if (leftTime < 0)
    {
        document.getElementById("timeoutBanner").style.display = 'block';
        stopTimer();
        resetTime();
    }
}

function updateTimer() {
    var hronoMinutes = Math.floor(leftTime / 60);
    var hronoSeconds = (leftTime % 60);
    setTime(hronoMinutes >= 0 ? hronoMinutes : 0, hronoSeconds >= 0 ? hronoSeconds : 0);
}

function resetTime(){
    leftTime = dsmSessionSeconds;
    seconds.innerHTML = "00";
    minutes.innerHTML = "00";
}

function startTimer() {
    document.getElementById("timeoutBanner").style.display = 'none';
    leftTime = leftTime == 0 ? dsmSessionSeconds : leftTime; 
    updateTimer();
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