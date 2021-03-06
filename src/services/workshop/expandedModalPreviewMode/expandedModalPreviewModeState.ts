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

function getElapsedTransitionTime(): number {
  return performance.now() - beginningTimeOfTransitionState;
}

function getIsModeToggleTransitionInProgressState(): boolean {
  return isModeToggleTransitionInProgressState;
}

function setIsModeToggleTransitionInProgressState(state: boolean): void {
  isModeToggleTransitionInProgressState = state;
}

function getIsModeToggleInitialFadeOutTransitionInProgress(): boolean {
  return isModeToggleInitialFadeOutTransitionInProgress;
}

function setIsModeToggleInitialFadeOutTransitionInProgress(state: boolean): void {
  isModeToggleInitialFadeOutTransitionInProgress = state;
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

function getCurrentExitTransitionModalDefaultPropertiesState(): ElementStyleProperties {
  return currentExitTransitionModalDefaultPropertiesState;
}

function setCurrentExitTransitionModalDefaultPropertiesState(state: ElementStyleProperties): void {
  currentExitTransitionModalDefaultPropertiesState = state;
}

function setPendingToolbarEntranceFadeInTransitionState(state: number): void {
  pendingToolbarEntranceFadeInTransitionState = state;
}

function setPendingToolbarEntranceTransitionUnsetState(state: number): void {
  pendingToolbarEntranceTransitionUnsetState = state;
}

function cancelPendingToolbarTransitionFunctionality(): void {
  clearTimeout(pendingToolbarEntranceFadeInTransitionState);
  clearTimeout(pendingToolbarEntranceTransitionUnsetState);
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

function cancelPendingModalTransitionFunctionality(): void {
  clearTimeout(pendingModalTransitionStartState);
  clearTimeout(pendingModalTransitionEndState);
  clearTimeout(pendingModalTransitionPreviewUnsetState);
}

export const expandedModalPreviewModeState = {
  markBeginningTimeOfTransitionState,
  getElapsedTransitionTime,
  getIsModeToggleTransitionInProgressState,
  setIsModeToggleTransitionInProgressState,
  setIsModeToggleInitialFadeOutTransitionInProgress,
  getIsModeToggleInitialFadeOutTransitionInProgress,
  getIsTransitionPreviewInProgressState,
  setIsPreviewTransitionInProgressState,
  getExpandedModalModeToolbarContainerPositionState,
  setExpandedModalModeToolbarContainerPositionState,
  getCurrentExitTransitionModalDefaultPropertiesState,
  setCurrentExitTransitionModalDefaultPropertiesState,
  setPendingToolbarEntranceFadeInTransitionState,
  setPendingToolbarEntranceTransitionUnsetState,
  cancelPendingToolbarTransitionFunctionality,
  setPendingModalTransitionStartState,
  setPendingModalTransitionEndState,
  setPendingModalTransitionPreviewUnsetState,
  cancelPendingModalTransitionFunctionality,
}
