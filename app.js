const dsmSessionSeconds = 70;

let leftTime = 0;
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const action = document.getElementById("action");
const next = document.getElementById("next");
const currentPresenter = document.getElementById("current-presenters-name");
const nextPresenter = document.getElementById("next-presenters-name");
var timeoutBannerDisplay = document.getElementById("timeoutBanner").style;
action.addEventListener("click", onAction);
next.addEventListener("click", onNext);

var partisipantsLocal = [ "Tony", "Maxime", "Guillaume", "Serguei", "Kirill", "Taysir", "Sandy"];
var partisipantsDevDistance = ["Pierre Christophe", "Laurentiu",];
var otherParticipants = ["Marie", "John", "Matthieu", "Victor", "Shivani"];
let interval = null;

var participantIndex = Math.floor(Math.random() * partisipantsLocal.length);
currentPresenter.innerHTML = partisipantsLocal[participantIndex];
partisipantsLocal.splice(participantIndex, 1);

const state = {
    start: "START",
    next: "NEXT",
};


function onAction(){
    startTimer();
}

function onNext(){
    currentPresenter.innerHTML = getParticipentName();
    removeParticipent();
    stopTimer();
    resetTime();
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
        timeoutBannerDisplay.display = 'block';
        stopTimer();
    }
}

function updateTimer() {
    var hronoMinutes = Math.floor(leftTime / 60);
    var hronoSeconds = (leftTime % 60);
    setTime(hronoMinutes >= 0 ? hronoMinutes : 0, hronoSeconds >= 0 ? hronoSeconds : 0);
}

function resetTime(){

    timeoutBannerDisplay.display = 'none';
    leftTime = dsmSessionSeconds;
    seconds.innerHTML = "00";
    minutes.innerHTML = "00";
}

function startTimer() {
    timeoutBannerDisplay.display = 'none';
    getParticipentIndex();
    nextPresenter.innerHTML = getParticipentName();
    leftTime = leftTime == 0 ? dsmSessionSeconds : leftTime; 
    updateTimer();
    interval = setInterval(updateTime, 1000);
}

function getParticipentName()
{
    if (partisipantsLocal.length > 0)
        return partisipantsLocal[participantIndex];
    else if (partisipantsDevDistance.length > 0)
        return partisipantsDevDistance[participantIndex];
    else if (otherParticipants.length > 0)
        return otherParticipants[participantIndex];
}

function removeParticipent()
{
    nextPresenter.innerHTML = "";

    if (partisipantsLocal.length > 0)
        partisipantsLocal.splice(participantIndex, 1);
    else if (partisipantsDevDistance.length > 0)
        partisipantsDevDistance.splice(participantIndex, 1);
    else if (otherParticipants.length > 0)
        otherParticipants.splice(participantIndex, 1);
}

function getParticipentIndex()
{
    if (partisipantsLocal.length > 0)
        participantIndex = Math.floor(Math.random() * partisipantsLocal.length);
    else if (partisipantsDevDistance.length > 0)
        participantIndex = Math.floor(Math.random() * partisipantsDevDistance.length);
    else if (otherParticipants.length > 0)
        participantIndex = Math.floor(Math.random() * otherParticipants.length);
}

function stopTimer(){
    clearInterval(interval);
    interval = null;
}