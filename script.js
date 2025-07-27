let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = [];
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startTimer() {
  startTime = new Date().getTime() - (difference || 0);
  timerInterval = setInterval(updateTime, 100);
  running = true;
  startPauseBtn.textContent = 'Pause';
}

function pauseTimer() {
  clearInterval(timerInterval);
  difference = new Date().getTime() - startTime;
  running = false;
  startPauseBtn.textContent = 'Start';
}

function resetTimer() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00';
  difference = 0;
  running = false;
  startPauseBtn.textContent = 'Start';
  laps = [];
  lapsList.innerHTML = '';
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  let hours = Math.floor(updatedTime / 3600000);
  let minutes = Math.floor((updatedTime % 3600000) / 60000);
  let seconds = Math.floor((updatedTime % 60000) / 1000);

  display.textContent =
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds;
}

function addLap() {
  if (!running) return;
  const lapTime = display.textContent;
  laps.push(lapTime);
  const li = document.createElement('li');
  li.textContent = `Lap ${laps.length}: ${lapTime}`;
  lapsList.appendChild(li);
}

startPauseBtn.onclick = () => running ? pauseTimer() : startTimer();
resetBtn.onclick = resetTimer;
lapBtn.onclick = addLap;
