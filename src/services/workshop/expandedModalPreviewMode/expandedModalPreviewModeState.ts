import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../consts/toolbarClasses';
import { ElementStyleProperties } from '../../../interfaces/elementStyleProperties';

let beginningTimeOfTransitionState = 0;
let isModeToggleTransitionInProgressState = false;
let isModeToggleInitialFadeOutTransitionInProgress = false;
let isTransitionPreviewInProgressState = false;
let expandedModalModeToolbarContainerPositionState = EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.DEFAULT;
let currentExitTransitionModalDefaultPropertiesState = {};

let pendingToolbarEntranceFadeInTransitionState = null;
let pendingToolbarEntranceTransitionUnsetState = null;

let pendingModalTransitionStartState = null;
let pendingModalTransitionEndState = null;
let pendingModalTransitionPreviewUnsetState = null;

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
  clearTimeout(pendingToolbarEntranceFadeInTransitionState);
  clearTimeout(pendingToolbarEntranceTransitionUnsetState);
}

function setPendingToolbarEntranceFadeInTransitionState(state: number): void {
  pendingToolbarEntranceFadeInTransitionState = state;
}

function setPendingToolbarEntranceTransitionUnsetState(state: number): void {
  pendingToolbarEntranceTransitionUnsetState = state;
}

function removePendingExitTransitions(): void {
  clearTimeout(pendingModalTransitionStartState);
  clearTimeout(pendingModalTransitionEndState);
  clearTimeout(pendingModalTransitionPreviewUnsetState);
}

function setPendingModalTransitionStartState(state: number): void {
  pendingModalTransitionStartState = state;
}

function setPendingModalTransitionEndState(state: number): void {
  pendingModalTransitionEndState = state;
}

function setPendingModalTransitionPreviewUnsetState(state: number): void {
  pendingModalTransitionPreviewUnsetState = state;
}

function getCurrentExitTransitionModalDefaultPropertiesState(): ElementStyleProperties {
  return currentExitTransitionModalDefaultPropertiesState;
}

function setCurrentExitTransitionModalDefaultPropertiesState(state: ElementStyleProperties): void {
  currentExitTransitionModalDefaultPropertiesState = state;
}

export const expandedModalPreviewModeState = {
  removePendingEntraceTimeouts,
  setPendingToolbarEntranceFadeInTransitionState,
  setPendingToolbarEntranceTransitionUnsetState,
  markBeginningTimeOfTransitionState,
  getElapsedAnimationTime,
  getIsModeToggleTransitionInProgressState,
  setIsModeToggleTransitionInProgressState,
  setIsModeToggleInitialFadeOutTransitionInProgress,
  getIsModeToggleInitialFadeOutTransitionInProgress,
  getIsTransitionPreviewInProgressState,
  setIsPreviewTransitionInProgressState,
  removePendingExitTransitions,
  setPendingModalTransitionStartState,
  setPendingModalTransitionEndState,
  setPendingModalTransitionPreviewUnsetState,
  getCurrentExitTransitionModalDefaultPropertiesState,
  setCurrentExitTransitionModalDefaultPropertiesState,
  getExpandedModalModeToolbarContainerPositionState,
  setExpandedModalModeToolbarContainerPositionState,
}
