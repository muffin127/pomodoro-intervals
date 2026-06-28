const sounds = {
  workEnd: new Audio('/focus-time/sounds/work-end.ogg'),
  breakEnd: new Audio('/focus-time/sounds/break-end.ogg'),
  dayComplete: new Audio('/focus-time/sounds/day-complete.ogg'),
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
