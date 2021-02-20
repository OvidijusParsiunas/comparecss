import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../consts/expandedModalToolbarContainerPositionClasses.enum';
import { ElementStyleProperties } from '../../../interfaces/elementStyleProperties';

let isTransitionInProgressState = false;
let expandedModalModeToolbarContainerPositionState = EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.TOP;
let currentExitTransitionModalDefaultPropertiesState = {};
let currentlyPendingExitTransitionState = null;
let currentlyPendingDefaultTransitionAfterExitState = null;
let currentlyPendingPropertyResetAfterExitState = null;

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

function removePendingExitTransitionsState(): void {
  clearTimeout(currentlyPendingExitTransitionState);
  clearTimeout(currentlyPendingDefaultTransitionAfterExitState);
  clearTimeout(currentlyPendingPropertyResetAfterExitState);
}

function setPendingExitTransitionState(state: any): void {
  currentlyPendingExitTransitionState = state;
}

function setPendingDefaultTransitionAfterExitState(state: any): void {
  currentlyPendingDefaultTransitionAfterExitState = state;
}

function setPendingPropertyResetAfterExitState(state: any): void {
  currentlyPendingPropertyResetAfterExitState = state;
}

function getCurrentExitTransitionModalDefaultPropertiesState(): ElementStyleProperties {
  return currentExitTransitionModalDefaultPropertiesState;
}

function setCurrentExitTransitionModalDefaultPropertiesState(state: ElementStyleProperties): void {
  currentExitTransitionModalDefaultPropertiesState = state;
}

export const expandedModalPreviewModeState = {
  getIsTransitionInProgressState,
  setIsTransitionInProgressState,
  removePendingExitTransitionsState,
  setPendingExitTransitionState,
  setPendingDefaultTransitionAfterExitState,
  setPendingPropertyResetAfterExitState,
  getCurrentExitTransitionModalDefaultPropertiesState,
  setCurrentExitTransitionModalDefaultPropertiesState,
  getExpandedModalModeToolbarContainerPositionState,
  setExpandedModalModeToolbarContainerPositionState,
}
