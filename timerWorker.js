let startTime;
let elapsedTime = 0;
let timerInterval;

self.onmessage = function(e) {
  if (e.data.command === 'start') {
    startTimer();
  } else if (e.data.command === 'stop') {
    stopTimer();
  } else if (e.data.command === 'reset') {
    resetTimer();
  }
};

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  self.postMessage({time: elapsedTime});
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  self.postMessage({time: elapsedTime});
}
