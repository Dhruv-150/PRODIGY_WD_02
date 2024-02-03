const watch = document.querySelector('#watch');
const lapList = document.querySelector('#lapList');
let milliseconds = 0;
let timer;
let lapCount = 1;

function startWatch() {
    watch.classList.remove('paused');
    clearInterval(timer);
    timer = setInterval(() => {
        milliseconds += 10;
        updateWatch();
    }, 10);
}

function pauseWatch() {
    watch.classList.add('paused');
    clearInterval(timer);
}

function resetWatch() {
    watch.classList.remove('paused');
    clearInterval(timer);
    milliseconds = 0;
    watch.innerHTML = '00:00:00:00';
    lapCount = 1;
    lapList.innerHTML = ''; // Clear lap list on reset
}

function lapWatch() {
    const lapTime = formatTime(milliseconds);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCount++;
}

function updateWatch() {
    let dateTimer = new Date(milliseconds);
    watch.innerHTML =
        ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
        ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
        ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
        ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);
}

document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.id === 'start') startWatch();
    if (el.id === 'pause') pauseWatch();
    if (el.id === 'lap') lapWatch();
    if (el.id === 'reset') resetWatch();
});

function formatTime(ms) {
    let dateTimer = new Date(ms);
    return (
        ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
        ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
        ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
        ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1)
    );
}
