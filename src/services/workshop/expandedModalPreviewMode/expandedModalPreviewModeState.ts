import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../consts/expandedModalToolbarContainerPositionClasses.enum';
import { ElementStyleProperties } from '../../../interfaces/elementStyleProperties';

let isTransitionInProgressState = false;
let expandedModalModeToolbarContainerPositionState = EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.TOP;
let numberOfCurrentlyInstantiatedExitTransitions = 0;
let currentExitTransitionModalDefaultPropertiesState = {};

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

function getNumberOfCurrentlyInstantiatedExitTransitionsState(): number {
  return numberOfCurrentlyInstantiatedExitTransitions;
}

function setNumberOfCurrentlyInstantiatedExitTransitionsState(state: number): void {
  numberOfCurrentlyInstantiatedExitTransitions = state;
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
  getNumberOfCurrentlyInstantiatedExitTransitionsState,
  setNumberOfCurrentlyInstantiatedExitTransitionsState,
  getCurrentExitTransitionModalDefaultPropertiesState,
  setCurrentExitTransitionModalDefaultPropertiesState,
  getExpandedModalModeToolbarContainerPositionState,
  setExpandedModalModeToolbarContainerPositionState,
}
