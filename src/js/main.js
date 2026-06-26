import '../css/style.css';

import { startTimer, pauseTimer, resumeTimer } from './timer.js';
import { state } from './state.js';
import { render } from './ui.js';
import { saveState } from './storage.js';

const btn = document.querySelector('#main-btn');

console.log('BTN:', btn);

// init
render(state);
updateButton();

btn.addEventListener('click', () => {
  if (state.session.isRunning) {
    handlePause();
  } else {
    handleStartOrResume();
  }
});

// start / resume
function handleStartOrResume() {
  // якщо таймер вже йде — нічого не робимо
  if (state.session.isRunning) return;

  resumeTimer(onTick, handleComplete, state);

  updateButton();
}

// pause
function handlePause() {
  pauseTimer(state);

  render(state);
  saveState(state);
  updateButton();
}

// tick callback
function onTick() {
  render(state);
  saveState(state);
}

// complete
function handleComplete() {
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
  updateButton();
}

// button ui
function updateButton() {
  btn.textContent = state.session.isRunning ? 'Pause' : 'Start';
}
