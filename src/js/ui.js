export function render(state) {
  const time = document.querySelector('#time');

  time.textContent = formatTime(state.session.timeLeft);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;

  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
