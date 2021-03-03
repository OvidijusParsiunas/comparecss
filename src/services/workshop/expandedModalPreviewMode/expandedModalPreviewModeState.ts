import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../consts/toolbarClasses';
import { ElementStyleProperties } from '../../../interfaces/elementStyleProperties';

let isModeToggleTransitionInProgressState = false;
let isTransitionInProgressState = false;
let expandedModalModeToolbarContainerPositionState = EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.DEFAULT;
let currentExitTransitionModalDefaultPropertiesState = {};
let currentlyPendingTransitionInitState = null;
let currentlyPendingTransitionEndingState = null;
let currentlyPendingPropertyResetAfterExitState = null;

function getIsModeToggleTransitionInProgressState(): boolean {
  return isModeToggleTransitionInProgressState;
}

function setIsModeToggleTransitionInProgressState(state: boolean): void {
  isModeToggleTransitionInProgressState = state;
}

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
  clearTimeout(currentlyPendingTransitionInitState);
  clearTimeout(currentlyPendingTransitionEndingState);
  clearTimeout(currentlyPendingPropertyResetAfterExitState);
}

function setPendingTransitionInitState(state: any): void {
  currentlyPendingTransitionInitState = state;
}

function setPendingTransitionEndingState(state: any): void {
  currentlyPendingTransitionEndingState = state;
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
  getIsModeToggleTransitionInProgressState,
  setIsModeToggleTransitionInProgressState,
  getIsTransitionInProgressState,
  setIsTransitionInProgressState,
  removePendingExitTransitionsState,
  setPendingTransitionInitState,
  setPendingTransitionEndingState,
  setPendingPropertyResetAfterExitState,
  getCurrentExitTransitionModalDefaultPropertiesState,
  setCurrentExitTransitionModalDefaultPropertiesState,
  getExpandedModalModeToolbarContainerPositionState,
  setExpandedModalModeToolbarContainerPositionState,
}
