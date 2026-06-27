import '../css/style.css';
import { resumeTimer, pauseTimer } from './timer.js';
import { state } from './state.js';
import { render } from './ui.js';
import { saveState } from './storage.js';
import { initSetup } from './setup.js';
import { initSidebar, updateSidebar } from './sidebar.js';
import { playWorkEnd, playBreakEnd, playDayComplete } from './sounds.js';

const btn = document.querySelector('#main-btn');

function updateScreens() {
  const setupScreen = document.getElementById('setup-screen');
  const app = document.getElementById('app');
  const burgerBtn = document.getElementById('burger-btn');

  if (state.day.goal > 0) {
    setupScreen.classList.add('hidden');
    app.classList.remove('hidden');
    burgerBtn.classList.remove('hidden');
  } else {
    setupScreen.classList.remove('hidden');
    app.classList.add('hidden');
    burgerBtn.classList.add('hidden');
  }
}

function updateButton() {
  btn.textContent = state.session.isRunning ? 'Pause' : 'Start';
}

function start() {
  console.log('start called, isRunning:', state.session.isRunning);
  resumeTimer(onTick, onComplete, state);
  updateButton();
}

function pause() {
  console.log('pause called, isRunning:', state.session.isRunning);
  pauseTimer(state);
  console.log('after pause, isRunning:', state.session.isRunning);
  render(state);
  saveState(state);
  updateButton();
}

function onTick() {
  render(state);
  saveState(state);
}

function onComplete() {
  const { session, day, settings } = state;

  if (session.mode === 'work') {
    day.completed++;
    session.cycle++;

    if (day.completed >= day.goal) {
      playDayComplete();
    } else {
      playWorkEnd();
    }

    if (session.cycle >= settings.longBreakAfter) {
      session.mode = 'longBreak';
      session.timeLeft = settings.longBreakTime * 60;
      session.cycle = 0;
    } else {
      session.mode = 'break';
      session.timeLeft = settings.breakTime * 60;
    }
  } else {
    playBreakEnd();
    session.mode = 'work';
    session.timeLeft = settings.workTime * 60;
  }

  session.isRunning = false;
  render(state);
  saveState(state);
  updateButton();
  updateSidebar();
}

btn.addEventListener('click', () => {
  state.session.isRunning ? pause() : start();
});

render(state);
updateButton();
updateScreens();
initSidebar();
updateSidebar();

initSetup(() => {
  updateScreens();
  render(state);
  updateButton();
  updateSidebar();
});
