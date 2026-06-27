const KEY = 'pomodoro-state';

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadState() {
  const data = localStorage.getItem(KEY);
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    if (!parsed?.session || !parsed?.day) return null;
    return parsed;
  } catch {
    return null;
  }
}
