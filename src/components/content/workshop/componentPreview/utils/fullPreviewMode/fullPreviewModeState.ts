let isAnimationInProgress = false;
let isExpandedModalPreviewModeActivated = false;

function setIsAnimationInProgress(state: boolean): void {
  isAnimationInProgress = state;
}

function getIsAnimationInProgress(): boolean {
  return isAnimationInProgress;
}

function setIsExpandedModalPreviewModeActivated(state: boolean): void {
  isExpandedModalPreviewModeActivated = state;
}

function getIsExpandedModalPreviewModeActivated(): boolean {
  return isExpandedModalPreviewModeActivated;
}

function resetState(): void {
  setIsAnimationInProgress(false);
  setIsExpandedModalPreviewModeActivated(false);
}

export const fulPreviewModeState = {
  resetState,
  setIsAnimationInProgress,
  getIsAnimationInProgress,
  setIsExpandedModalPreviewModeActivated,
  getIsExpandedModalPreviewModeActivated,
}
