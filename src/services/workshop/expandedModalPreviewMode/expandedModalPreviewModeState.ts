import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../consts/toolbarClasses';
import { ElementStyleProperties } from '../../../interfaces/elementStyleProperties';

let beginningTimeOfTransitionState = 0;
let isModeToggleTransitionInProgressState = false;
let isModeToggleInitialFadeOutTransitionInProgress = false;
let isTransitionPreviewInProgressState = false;
let expandedModalModeToolbarContainerPositionState = EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.DEFAULT;
let currentExitTransitionModalDefaultPropertiesState = {};

let pendingToolbarStyleChangesState = null;
let pendingToolbarTransitionState = null;
let pendingToolbarStyleUnsetState = null;

let pendingTransitionInitState = null;
let pendingTransitionEndingState = null;
let pendingPropertyResetAfterExitState = null;

function markBeginningTimeOfTransitionState(): void {
  beginningTimeOfTransitionState = performance.now();
}

function getElapsedAnimationTime(): number {
  return performance.now() - beginningTimeOfTransitionState;
}

function getIsModeToggleTransitionInProgressState(): boolean {
  return isModeToggleTransitionInProgressState;
}

function setIsModeToggleTransitionInProgressState(state: boolean): void {
  isModeToggleTransitionInProgressState = state;
}

function setIsModeToggleInitialFadeOutTransitionInProgress(state: boolean): void {
  isModeToggleInitialFadeOutTransitionInProgress = state;
}

function getIsModeToggleInitialFadeOutTransitionInProgress(): boolean {
  return isModeToggleInitialFadeOutTransitionInProgress;
}

function getIsTransitionPreviewInProgressState(): boolean {
  return isTransitionPreviewInProgressState;
}

function setIsPreviewTransitionInProgressState(state: boolean): void {
  isTransitionPreviewInProgressState = state;
}

function getExpandedModalModeToolbarContainerPositionState(): EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES {
  return expandedModalModeToolbarContainerPositionState;
}

function setExpandedModalModeToolbarContainerPositionState(state: EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES): void {
  expandedModalModeToolbarContainerPositionState = state;
}

function removePendingEntraceTimeouts(): void {
  clearTimeout(pendingToolbarStyleChangesState);
  clearTimeout(pendingToolbarTransitionState);
  clearTimeout(pendingToolbarStyleUnsetState);
}

function setPendingToolbarStyleChangesState(state: number): void {
  pendingToolbarStyleChangesState = state;
}

function setPendingToolbarTransitionState(state: number): void {
  pendingToolbarTransitionState = state;
}

function setPendingToolbarStyleUnsetState(state: number): void {
  pendingToolbarStyleUnsetState = state;
}

function removePendingExitTransitions(): void {
  clearTimeout(pendingTransitionInitState);
  clearTimeout(pendingTransitionEndingState);
  clearTimeout(pendingPropertyResetAfterExitState);
}

function setPendingTransitionInitState(state: number): void {
  pendingTransitionInitState = state;
}

function setPendingTransitionEndingState(state: number): void {
  pendingTransitionEndingState = state;
}

function setPendingPropertyResetAfterExitState(state: number): void {
  pendingPropertyResetAfterExitState = state;
}

function getCurrentExitTransitionModalDefaultPropertiesState(): ElementStyleProperties {
  return currentExitTransitionModalDefaultPropertiesState;
}

function setCurrentExitTransitionModalDefaultPropertiesState(state: ElementStyleProperties): void {
  currentExitTransitionModalDefaultPropertiesState = state;
}

export const expandedModalPreviewModeState = {
  removePendingEntraceTimeouts,
  setPendingToolbarStyleChangesState,
  setPendingToolbarTransitionState,
  setPendingToolbarStyleUnsetState,
  markBeginningTimeOfTransitionState,
  getElapsedAnimationTime,
  getIsModeToggleTransitionInProgressState,
  setIsModeToggleTransitionInProgressState,
  setIsModeToggleInitialFadeOutTransitionInProgress,
  getIsModeToggleInitialFadeOutTransitionInProgress,
  getIsTransitionPreviewInProgressState,
  setIsPreviewTransitionInProgressState,
  removePendingExitTransitions,
  setPendingTransitionInitState,
  setPendingTransitionEndingState,
  setPendingPropertyResetAfterExitState,
  getCurrentExitTransitionModalDefaultPropertiesState,
  setCurrentExitTransitionModalDefaultPropertiesState,
  getExpandedModalModeToolbarContainerPositionState,
  setExpandedModalModeToolbarContainerPositionState,
}
