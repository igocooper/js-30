let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        // stop timer after it reaches 0
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
          }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;
    // handle prescending 0 
    if (remainderSeconds < 10) {
        remainderSeconds = `0${remainderSeconds}`;
    };
    const display = `${minutes}:${remainderSeconds}`;

    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);
    const hours = end.getHours();
    let minutes = end.getMinutes(); 
    if (minutes < 10) {
        minutes = `0${minutes}`;
    };
    const adjustedHours = hours > 12 ? hours - 12 : hours; 
    endTime.textContent = `Be back at ${adjustedHours}:${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    const seconds = minutes * 60;
    this.reset();
    timer(seconds);
});