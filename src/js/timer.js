let intervalId = null;

function tick(onTick, onComplete, state) {
  state.session.timeLeft = Math.max(0, state.session.timeLeft - 1);

  onTick(state);

  if (state.session.timeLeft <= 0) {
    stop(state);
    onComplete(state);
  }
}

// start
export function startTimer(onTick, onComplete, state) {
  stop(state);

  state.session.isRunning = true;
  state.session.lastPauseTime = null;

  intervalId = setInterval(() => {
    tick(onTick, onComplete, state);
  }, 1000);
}

// pause
export function pauseTimer(state) {
  if (!intervalId) return;

  clearInterval(intervalId);
  intervalId = null;

  state.session.isRunning = false;
  state.session.lastPauseTime = Date.now();
}

// resume
export function resumeTimer(onTick, onComplete, state) {
  stop(state);

  state.session.isRunning = true;
  state.session.lastPauseTime = null;

  intervalId = setInterval(() => {
    tick(onTick, onComplete, state);
  }, 1000);
}

// stop
function stop(state) {
  clearInterval(intervalId);
  intervalId = null;
}
