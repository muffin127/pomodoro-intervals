const sounds = {
  workEnd: new Audio('/pomodoro-intervals/sounds/work-end.mp3'),
  breakEnd: new Audio('/pomodoro-intervals/sounds/break-end.mp3'),
  dayComplete: new Audio('/pomodoro-intervals/sounds/day-complete.mp3'),
};

export function playWorkEnd() {
  sounds.workEnd.currentTime = 0;
  sounds.workEnd.play();
}

export function playBreakEnd() {
  sounds.breakEnd.currentTime = 0;
  sounds.breakEnd.play();
}

export function playDayComplete() {
  sounds.dayComplete.currentTime = 0;
  sounds.dayComplete.play();
}
