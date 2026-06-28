const goals = [
  { value: 4, label: 'Легкий день', color: '#4caf50' },
  { value: 5, label: 'Стандартний', color: '#2196f3' },
  { value: 6, label: 'Продуктивний', color: '#ff9800' },
  { value: 7, label: 'Інтенсивний', color: '#e91e63' },
  { value: 8, label: 'Максимальний фокус', color: '#9c27b0' },
];

let currentIndex = 0;

function updateUI() {
  const goal = goals[currentIndex];

  document.getElementById('goal-number').textContent = goal.value;
  document.getElementById('goal-text').textContent = goal.label;
  document.getElementById('goal-dot').style.background = goal.color;
  document.getElementById('goal-number').style.textShadow = `
    0 0 8px ${goal.color},
    0 0 20px ${goal.color}80,
    0 0 40px ${goal.color}40
  `;

  document.getElementById('goal-prev').style.opacity =
    currentIndex === 0 ? '0.2' : '1';
  document.getElementById('goal-next').style.opacity =
    currentIndex === goals.length - 1 ? '0.2' : '1';
}

export function initGoalSelector(onConfirm) {
  updateUI();

  document.getElementById('goal-prev').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateUI();
    }
  });

  document.getElementById('goal-next').addEventListener('click', () => {
    if (currentIndex < goals.length - 1) {
      currentIndex++;
      updateUI();
    }
  });

  document.getElementById('goal-confirm').addEventListener('click', () => {
    onConfirm(goals[currentIndex].value);
  });
}
