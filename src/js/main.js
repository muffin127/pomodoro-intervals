import '../css/style.css';
import { resumeTimer, pauseTimer } from './timer.js';
import { state } from './state.js';
import { render } from './ui.js';
import { saveState } from './storage.js';
import { initSidebar, updateSidebar } from './sidebar.js';
import { playWorkEnd, playBreakEnd, playDayComplete } from './sounds.js';
import { showModal, hideModal, initModal } from './modal.js';
import { initGoalSelector } from './goalSelector.js';

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

function updateButton() {}

function start() {
  document.getElementById('timer-display').classList.remove('paused');
  resumeTimer(onTick, onComplete, state);
  updateButton();
}

function pause() {
  document.getElementById('timer-display').classList.add('paused');
  pauseTimer(state);
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
    if (
      session.mode === 'break' &&
      day.completed === Math.floor(day.goal / 2)
    ) {
      showModal();
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

document.getElementById('timer-display').addEventListener('click', () => {
  state.session.isRunning ? pause() : start();
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'Enter') {
    e.preventDefault();
    if (state.day.goal === 0) return;

    const display = document.getElementById('timer-display');
    display.classList.add('pressing');
    setTimeout(() => display.classList.remove('pressing'), 150);

    state.session.isRunning ? pause() : start();
  }
});
render(state);
updateButton();
updateScreens();
initSidebar(() => {
  state.day.goal = 0;
  state.day.completed = 0;
  state.day.failed = 0;
  state.session.isRunning = false;
  state.session.mode = 'work';
  state.session.timeLeft = state.settings.workTime * 60;
  state.session.cycle = 0;
  saveState(state);
  render(state);
  updateScreens();
  updateSidebar();
});
updateSidebar();

initGoalSelector((goal) => {
  state.day.goal = goal;
  state.day.completed = 0;
  state.day.failed = 0;
  saveState(state);
  updateScreens();
  render(state);
  updateButton();
  updateSidebar();
});

initModal(
  () => {
    state.session.mode = 'longBreak';
    state.session.timeLeft = state.settings.longBreakTime * 60;
    render(state);
    saveState(state);
    start();
  },
  () => {
    start();
  },
);
