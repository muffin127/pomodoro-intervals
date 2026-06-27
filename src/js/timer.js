let intervalId = null;

function tick(onTick, onComplete, state) {
  state.session.timeLeft = Math.max(0, state.session.timeLeft - 1);
  onTick(state);
  if (state.session.timeLeft <= 0) {
    clearInterval(intervalId);
    intervalId = null;
    onComplete(state);
  }
}

export function startTimer(onTick, onComplete, state) {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  state.session.isRunning = true;
  state.session.lastPauseTime = null;
  intervalId = setInterval(() => tick(onTick, onComplete, state), 1000);
  console.log('startTimer, intervalId:', intervalId);
}

export function pauseTimer(state) {
  console.log('pauseTimer called, intervalId:', intervalId);
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
  state.session.isRunning = false;
  state.session.lastPauseTime = Date.now();
}

export function resumeTimer(onTick, onComplete, state) {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  state.session.isRunning = true;
  state.session.lastPauseTime = null;
  intervalId = setInterval(() => tick(onTick, onComplete, state), 1000);
  console.log('resumeTimer, intervalId:', intervalId);
}
