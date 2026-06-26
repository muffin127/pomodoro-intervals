const KEY = 'pomodoro-state';

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadState() {
  const data = localStorage.getItem(KEY);

  if (!data) return null;

  return JSON.parse(data);
}