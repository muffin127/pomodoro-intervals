const KEY = 'pomodoro-state';

export function saveState(state) {
  const data = {
    ...state,
    savedDate: new Date().toDateString(),
  };
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadState() {
  const data = localStorage.getItem(KEY);
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);
    if (!parsed?.session || !parsed?.day) return null;

    if (parsed.savedDate !== new Date().toDateString()) return null;

    return parsed;
  } catch {
    return null;
  }
}
