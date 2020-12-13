let isDoNotShowAgainTickedState = false;

function getIsDoNotShowAgainTickedState(): boolean {
  return isDoNotShowAgainTickedState;
}

function setIsDoNotShowAgainTickedState(state: boolean): void {
  isDoNotShowAgainTickedState = state;
}

export {
  getIsDoNotShowAgainTickedState,
  setIsDoNotShowAgainTickedState,
}