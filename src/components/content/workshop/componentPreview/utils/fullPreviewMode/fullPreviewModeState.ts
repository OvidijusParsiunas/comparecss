let isTransitionInProgress = false;
let isExpandedModalPreviewModeActivated = false;

function setIsTransitionInProgress(state: boolean): void {
  isTransitionInProgress = state;
}

function getIsTransitionInProgress(): boolean {
  return isTransitionInProgress;
}

function setIsExpandedModalPreviewModeActivated(state: boolean): void {
  isExpandedModalPreviewModeActivated = state;
}

function getIsExpandedModalPreviewModeActivated(): boolean {
  return isExpandedModalPreviewModeActivated;
}

function resetState(): void {
  setIsTransitionInProgress(false);
  setIsExpandedModalPreviewModeActivated(false);
}

export const fulPreviewModeState = {
  resetState,
  setIsTransitionInProgress,
  getIsTransitionInProgress,
  setIsExpandedModalPreviewModeActivated,
  getIsExpandedModalPreviewModeActivated,
}
