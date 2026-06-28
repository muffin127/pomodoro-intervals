import { state } from './state.js';

export function initSidebar() {
  const btn = document.getElementById('burger-btn');
  const sidebar = document.getElementById('sidebar');

  btn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    updateSidebar();
  });
}

export function updateSidebar() {
  const { goal, completed } = state.day;

  document.getElementById('stat-goal').textContent = goal || '—';
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-left').textContent = goal
    ? Math.max(0, goal - completed)
    : '—';
}
