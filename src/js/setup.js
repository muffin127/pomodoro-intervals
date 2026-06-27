import { state } from './state.js';
import { saveState } from './storage.js';

export function initSetup(onGoalSelected) {
  const setupScreen = document.getElementById('setup-screen');

  setupScreen.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    const goal = Number(e.target.dataset.goal);
    if (!goal) return;

    state.day.goal = goal;
    state.day.completed = 0;
    state.day.failed = 0;

    saveState(state);

    onGoalSelected();
  });
}
