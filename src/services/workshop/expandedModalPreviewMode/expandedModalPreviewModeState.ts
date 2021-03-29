import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../consts/toolbarClasses';
import { ElementStyleProperties } from '../../../interfaces/elementStyleProperties';

let beginningTimeOfTransitionState = 0;
let isModeToggleTransitionInProgressState = false;
let isToolbarFadeTransitionInProgress = false;
let isTransitionPreviewInProgressState = false;
let isWaitingTransitionDelayState = false;
let expandedModalModeToolbarContainerPositionState = EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.DEFAULT;
let currentExitTransitionModalDefaultPropertiesState = {};

let pendingToolbarEntranceFadeInTransitionState = null;
let pendingToolbarEntranceTransitionUnsetState = null;

let modalTransitionDelayState = null;
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

function getIsToolbarFadeTransitionInProgressState(): boolean {
  return isToolbarFadeTransitionInProgress;
}

function setIsToolbarFadeTransitionInProgressState(state: boolean): void {
  isToolbarFadeTransitionInProgress = state;
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
  setIsToolbarFadeTransitionInProgressState(true);
}

function cancelPendingToolbarTransitionFunctionality(): void {
  clearTimeout(pendingToolbarEntranceFadeInTransitionState);
  clearTimeout(pendingToolbarEntranceTransitionUnsetState);
}

function setModalTransitionDelayState(state: number): void {
  modalTransitionDelayState = state;
  setIsWaitingTransitionDelayState(true);
}

function getIsWaitingTransitionDelayState(): boolean {
  return isWaitingTransitionDelayState;
}

function setIsWaitingTransitionDelayState(state: boolean): void {
  isWaitingTransitionDelayState = state;
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
  clearTimeout(modalTransitionDelayState);
}

export const expandedModalPreviewModeState = {
  markBeginningTimeOfTransitionState,
  getElapsedTransitionTime,
  getIsModeToggleTransitionInProgressState,
  setIsModeToggleTransitionInProgressState,
  getIsToolbarFadeTransitionInProgressState,
  setIsToolbarFadeTransitionInProgressState,
  getIsTransitionPreviewInProgressState,
  setIsPreviewTransitionInProgressState,
  getExpandedModalModeToolbarContainerPositionState,
  setExpandedModalModeToolbarContainerPositionState,
  getCurrentExitTransitionModalDefaultPropertiesState,
  setCurrentExitTransitionModalDefaultPropertiesState,
  setPendingToolbarEntranceFadeInTransitionState,
  setPendingToolbarEntranceTransitionUnsetState,
  cancelPendingToolbarTransitionFunctionality,
  setModalTransitionDelayState,
  getIsWaitingTransitionDelayState,
  setIsWaitingTransitionDelayState,
  setPendingModalTransitionStartState,
  setPendingModalTransitionEndState,
  setPendingModalTransitionPreviewUnsetState,
  cancelPendingModalTransitionFunctionality,
}
