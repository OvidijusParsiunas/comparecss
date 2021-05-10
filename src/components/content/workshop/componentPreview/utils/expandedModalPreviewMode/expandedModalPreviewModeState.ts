import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../../../../consts/toolbarClasses';
import { ElementStyleProperties } from '../../../../../../interfaces/elementStyleProperties';

let beginningTimeOfAnimationState = 0;
let isModeToggleAnimationInProgressState = false;
let isToolbarFadeAnimationInProgress = false;
let isAnimationPreviewInProgressState = false;
let isWaitingAnimationDelayState = false;
let expandedModalModeToolbarContainerPositionState = EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.DEFAULT;
let currentExitAnimationModalDefaultPropertiesState = {};

let pendingToolbarEntranceFadeInAnimationState = null;
let pendingToolbarEntranceAnimationUnsetState = null;

let modalAnimationDelayState = null;
let pendingModalAnimationStartState = null;
let pendingModalAnimationEndState = null;
let pendingModalAnimationPreviewUnsetState = null;

function markBeginningTimeOfAnimationState(): void {
  beginningTimeOfAnimationState = performance.now();
}

function getElapsedAnimationTime(): number {
  return performance.now() - beginningTimeOfAnimationState;
}

function getIsModeToggleAnimationInProgressState(): boolean {
  return isModeToggleAnimationInProgressState;
}

function setIsModeToggleAnimationInProgressState(state: boolean): void {
  isModeToggleAnimationInProgressState = state;
}

function getIsToolbarFadeAnimationInProgressState(): boolean {
  return isToolbarFadeAnimationInProgress;
}

function setIsToolbarFadeAnimationInProgressState(state: boolean): void {
  isToolbarFadeAnimationInProgress = state;
}

function getIsAnimationPreviewInProgressState(): boolean {
  return isAnimationPreviewInProgressState;
}

function setIsAnimationPreviewInProgressState(state: boolean): void {
  isAnimationPreviewInProgressState = state;
}

function getExpandedModalModeToolbarContainerPositionState(): EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES {
  return expandedModalModeToolbarContainerPositionState;
}

function setExpandedModalModeToolbarContainerPositionState(state: EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES): void {
  expandedModalModeToolbarContainerPositionState = state;
}

function setIsPreviewAnimationInProgressState(): ElementStyleProperties {
  return currentExitAnimationModalDefaultPropertiesState;
}

function setCurrentExitAnimationModalDefaultPropertiesState(state: ElementStyleProperties): void {
  currentExitAnimationModalDefaultPropertiesState = state;
}

function setPendingToolbarEntranceFadeInAnimationState(state: number): void {
  pendingToolbarEntranceFadeInAnimationState = state;
}

function setPendingToolbarEntranceAnimationUnsetState(state: number): void {
  pendingToolbarEntranceAnimationUnsetState = state;
  setIsToolbarFadeAnimationInProgressState(true);
}

function cancelPendingToolbarAnimationFunctionality(): void {
  clearTimeout(pendingToolbarEntranceFadeInAnimationState);
  clearTimeout(pendingToolbarEntranceAnimationUnsetState);
}

function setModalAnimationDelayState(state: number): void {
  modalAnimationDelayState = state;
  setIsWaitingAnimationDelayState(true);
}

function getIsWaitingAnimationDelayState(): boolean {
  return isWaitingAnimationDelayState;
}

function setIsWaitingAnimationDelayState(state: boolean): void {
  isWaitingAnimationDelayState = state;
}

function setPendingModalAnimationStartState(state: number): void {
  pendingModalAnimationStartState = state;
}

function setPendingModalAnimationEndState(state: number): void {
  pendingModalAnimationEndState = state;
}

function setPendingModalAnimationPreviewUnsetState(state: number): void {
  pendingModalAnimationPreviewUnsetState = state;
}

function cancelPendingModalAnimationFunctionality(): void {
  clearTimeout(pendingModalAnimationStartState);
  clearTimeout(pendingModalAnimationEndState);
  clearTimeout(pendingModalAnimationPreviewUnsetState);
  clearTimeout(modalAnimationDelayState);
}

export const expandedModalPreviewModeState = {
  markBeginningTimeOfAnimationState,
  getElapsedAnimationTime,
  getIsModeToggleAnimationInProgressState,
  setIsModeToggleAnimationInProgressState,
  getIsToolbarFadeAnimationInProgressState,
  setIsToolbarFadeAnimationInProgressState,
  getIsAnimationPreviewInProgressState,
  setIsAnimationPreviewInProgressState,
  getExpandedModalModeToolbarContainerPositionState,
  setExpandedModalModeToolbarContainerPositionState,
  setIsPreviewAnimationInProgressState,
  setCurrentExitAnimationModalDefaultPropertiesState,
  setPendingToolbarEntranceFadeInAnimationState,
  setPendingToolbarEntranceAnimationUnsetState,
  cancelPendingToolbarAnimationFunctionality,
  setModalAnimationDelayState,
  getIsWaitingAnimationDelayState,
  setIsWaitingAnimationDelayState,
  setPendingModalAnimationStartState,
  setPendingModalAnimationEndState,
  setPendingModalAnimationPreviewUnsetState,
  cancelPendingModalAnimationFunctionality,
}
