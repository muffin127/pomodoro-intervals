import { loadState } from './storage.js';

const defaultState = {
  session: {
    mode: 'work',
    timeLeft: 25 * 60,
    isRunning: false,
    cycle: 0,
    lastPauseTime: null,
  },
  day: {
    completed: 0,
    failed: 0,
    goal: 0,
  },
  settings: {
    workTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    longBreakAfter: 4,
  },
};

export const state = (() => {
  const loaded = loadState();
  if (loaded) {
    loaded.session.isRunning = false;
    loaded.session.lastPauseTime = null;
  }
  return loaded || defaultState;
})();
