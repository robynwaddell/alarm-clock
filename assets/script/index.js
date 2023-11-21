'use strict';

function onEvent(event, element, callback) {
    element.addEventListener(event, callback);
}

function clock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    let time = hours + ':' + minutes;

    document.querySelector('.clock').innerText = time;

    return time;
}

onEvent('load', window, clock);
setInterval(clock, 1000);

const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");

function validateMinutes(input) {
    let regex = /^(0[0-9]|[1-5][0-9])$/;
    return regex.test(input);
}

function validateHours(input) {
    let regex = /^(0?[0-9]|1[0-9]|2[0-3])$/;
    return regex.test(input);
}

function getAlarmTime() {
    let alarmHours = hoursInput.value;
    let alarmMinutes = minutesInput.value;

    if (validateHours(alarmHours) && validateMinutes(alarmMinutes)) {
        let alarmTime = `${alarmHours}:${alarmMinutes}`;
        document.querySelector('.confirmation').innerText = alarmTime;
        hoursInput.value = "";
        minutesInput.value = "";
        return alarmTime;
    } else {
        hoursInput.value = "";
        minutesInput.value = "";
        return null;
    }
}

const button = document.querySelector('#button');
onEvent('click', button, function () {
    const alarmTime = getAlarmTime();
    if (alarmTime !== null) {
        compare(clock(), alarmTime);
    }
});

const alarm = new Audio('./assets/alarm-sound.mp3')

function compare(currentTime, alarmTime) {
    if (currentTime === alarmTime) {
        alarm.play();
    }
}
