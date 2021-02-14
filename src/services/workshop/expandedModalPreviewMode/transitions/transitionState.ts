let isTransitionInProgressState = false;

function getIsTransitionInProgressState(): boolean {
  return isTransitionInProgressState;
}

function setIsTransitionInProgressState(state: boolean): void {
  isTransitionInProgressState = state;
}

export const transitionState = {
  getIsTransitionInProgressState,
  setIsTransitionInProgressState,
}
