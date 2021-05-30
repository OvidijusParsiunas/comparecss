import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../../../../consts/toolbarClasses';
import { ElementStyleProperties } from '../../../../../../interfaces/elementStyleProperties';

let beginningTimeOfAnimationState = 0;
let isModeToggleAnimationInProgressState = false;
let isToolbarFadeAnimationInProgress = false;
let isAnimationPreviewInProgressState = false;
let isWaitingAnimationDelayState = false;
let expandedModalModeToolbarContainerPositionState = EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.DEFAULT;
let currentCloseAnimationDefaultPropertiesState = {};

let pendingToolbarOpenFadeInAnimationState = null;
let pendingToolbarOpenAnimationUnsetState = null;

let animationDelayState = null;
let pendingAnimationEndState = null;
let pendingAnimationPreviewUnsetState = null;

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
  return currentCloseAnimationDefaultPropertiesState;
}

function setCurrentCloseAnimationDefaultPropertiesState(state: ElementStyleProperties): void {
  currentCloseAnimationDefaultPropertiesState = state;
}

function setPendingToolbarOpenFadeInAnimationState(state: number): void {
  pendingToolbarOpenFadeInAnimationState = state;
}

function setPendingToolbarOpenAnimationUnsetState(state: number): void {
  pendingToolbarOpenAnimationUnsetState = state;
  setIsToolbarFadeAnimationInProgressState(true);
}

function cancelPendingToolbarAnimationFunctionality(): void {
  clearTimeout(pendingToolbarOpenFadeInAnimationState);
  clearTimeout(pendingToolbarOpenAnimationUnsetState);
}

function setAnimationDelayState(state: number): void {
  animationDelayState = state;
  setIsWaitingAnimationDelayState(true);
}

function getIsWaitingAnimationDelayState(): boolean {
  return isWaitingAnimationDelayState;
}

function setIsWaitingAnimationDelayState(state: boolean): void {
  isWaitingAnimationDelayState = state;
}

function setPendingAnimationEndState(state: number): void {
  pendingAnimationEndState = state;
}

function setPendingAnimationPreviewUnsetState(state: number): void {
  pendingAnimationPreviewUnsetState = state;
}

function cancelPendingAnimationFunctionality(): void {
  clearTimeout(pendingAnimationEndState);
  clearTimeout(pendingAnimationPreviewUnsetState);
  clearTimeout(animationDelayState);
}

export const animationState = {
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
  setCurrentCloseAnimationDefaultPropertiesState,
  setPendingToolbarOpenFadeInAnimationState,
  setPendingToolbarOpenAnimationUnsetState,
  cancelPendingToolbarAnimationFunctionality,
  setAnimationDelayState,
  getIsWaitingAnimationDelayState,
  setIsWaitingAnimationDelayState,
  setPendingAnimationEndState,
  setPendingAnimationPreviewUnsetState,
  cancelPendingAnimationFunctionality,
}
