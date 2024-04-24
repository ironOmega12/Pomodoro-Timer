const buttons = document.querySelectorAll(".form-check-input");
const startBtn = document.getElementById("pomodoro-start");
const pomodoroTimer = document.querySelector(".pomodoro-timer");
const radioButtons = document.querySelectorAll('input[name="timerType"]');


let POMODORO_TIME;
let pomodoroValue;

//buttons checked property
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        removeChecked(btn);
        btn.checked = true;
    });
});

function removeChecked(btn) {
    btn.checked = false;
}

radioButtons.forEach(button => {
    button.addEventListener('change', () => {
        pomodoroValue = button.value;
    });
});

//timer

function updateTimer() {

    const minutes = Math.floor(POMODORO_TIME / 60);
    const seconds = POMODORO_TIME % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    pomodoroTimer.textContent = `${formattedMinutes}:${formattedSeconds}`;

    if (POMODORO_TIME === 0) {
        clearInterval(timerInterval);
        POMODORO_TIME = 1500;
    } else {
        POMODORO_TIME--;
    }
}

let clickCount = 0;

function startTimer() {
    clickCount++;
    if (clickCount == 1) {
        switch (pomodoroValue) {
            case 'pomodoro':
                POMODORO_TIME = 1500;
                break;
            case 'short':
                POMODORO_TIME = 300;
                break;
            case 'long':
                POMODORO_TIME = 900;
                break;
            default:
                POMODORO_TIME = 1500;
        }
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    } else if (clickCount == 2) {
        clearInterval(timerInterval);
        clickCount = 0;
    }
}

startBtn.addEventListener('click', startTimer);