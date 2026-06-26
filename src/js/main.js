import '../css/style.css';

import { startTimer, pauseTimer, resumeTimer } from './timer.js';
import { state } from './state.js';
import { render } from './ui.js';
import { saveState } from './storage.js';

// start session
export function handleStart() {
  startTimer(render, handleComplete);
}

// complete logic
export function handleComplete() {
  const { session, day, settings } = state;

  if (session.mode === 'work') {
    day.completed++;
    session.cycle++;

    if (session.cycle >= settings.longBreakAfter) {
      session.mode = 'longBreak';
      session.timeLeft = settings.longBreakTime * 60;
      session.cycle = 0;
    } else {
      session.mode = 'break';
      session.timeLeft = settings.breakTime * 60;
    }
  } else {
    session.mode = 'work';
    session.timeLeft = settings.workTime * 60;
  }

  session.isRunning = false;

  render(state);
  saveState(state);
}

// pause
export function handlePause() {
  pauseTimer();
  render(state);
  saveState(state);
}

// resume
export function handleResume() {
  resumeTimer(render, handleComplete);
  saveState(state);
}
