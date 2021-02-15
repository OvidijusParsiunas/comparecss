import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../consts/expandedModalToolbarContainerPositionClasses.enum';

let isTransitionInProgressState = false;
let expandedModalModeToolbarContainerPositionState = EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.TOP;

function getIsTransitionInProgressState(): boolean {
  return isTransitionInProgressState;
}

function setIsTransitionInProgressState(state: boolean): void {
  isTransitionInProgressState = state;
}

function getExpandedModalModeToolbarContainerPositionState(): EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES {
  return expandedModalModeToolbarContainerPositionState;
}

function setExpandedModalModeToolbarContainerPositionState(state: EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES): void {
  expandedModalModeToolbarContainerPositionState = state;
}

export const expandedModalPreviewModeState = {
  getIsTransitionInProgressState,
  setIsTransitionInProgressState,
  getExpandedModalModeToolbarContainerPositionState,
  setExpandedModalModeToolbarContainerPositionState,
}
