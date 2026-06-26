import { state } from './state.js';

let intervalId = null;

// start, stop, tick
export function startTimer(onTick, onComplete) {
  if (intervalId) return;

  state.session.isRunning = true;

  intervalId = setInterval(() => {
    tick(onTick, onComplete);
  }, 1000);
}

export function stopTimer(state) {
  clearInterval(intervalId);
  intervalId = null;

  state.session.isRunning = false;
}

function tick(onTick, onComplete) {
  state.session.timeLeft = Math.max(0, state.session.timeLeft - 1);

  onTick(state);

  if (state.session.timeLeft <= 0) {
    stopTimer();
    onComplete(state);
  }
}

state.session.timeLeft = Math.max(0, state.session.timeLeft - 1);

// pause, resume
export function pauseTimer() {
  if (!intervalId) return;

  clearInterval(intervalId);
  intervalId = null;

  state.session.isRunning = false;
}

export function resumeTimer(onTick, onComplete) {
  if (intervalId) return;

  state.session.isRunning = true;

  intervalId = setInterval(() => {
    tick(onTick, onComplete);
  }, 1000);
}
