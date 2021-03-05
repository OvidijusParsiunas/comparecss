import {
  TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS, TOOLBAR_CONTAINER_GENERAL_CLASSES,
  EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES,
} from '../../../../../consts/toolbarClasses';
import {
  MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, ENTRANCE_TRANSITION_DELAY_MILLISECONDS,
  OPACITY_INVISIBLE, OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS, 
} from '../../utils/sharedConsts';
import { COMPONENT_PREVIEW_CLASSES } from '../../../../../consts/componentPreviewClasses';
import { ModalEntranceTransition } from '../../../../../interfaces/modalTransitions';
import { expandedModalPreviewModeState } from '../../expandedModalPreviewModeState';
import { BackdropProperties } from '../../../../../interfaces/workshopComponent';
import TransitionsUtils from '../../utils/transitionsUtils';

export default class ModeToggleEntranceTransitionService {

  // private static startToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
  //   ModeToggleEntranceTransitionService.opacityFadeTransition(OPACITY_INVISIBLE, ModeToggleEntranceTransitionService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
  //   setTimeout(() => {
  //     toolbarElement.classList.add(ModeToggleEntranceTransitionService.TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
  //     toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT, TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
  //     if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
  //       toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
  //     }
  //     toolbarPositionToggleElement.style.display = 'block';
  //     setTimeout(() => {
  //       ModeToggleEntranceTransitionService.opacityFadeTransition(OPACITY_VISIBLE, '3s', toolbarContainerElement);
  //       setTimeout(() => {
  //         ModeToggleEntranceTransitionService.unsetTransitionProperties(toolbarContainerElement);
  //       }, 3000);
  //     }, 150);
  //   }, ModeToggleEntranceTransitionService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  // }

  private static toolbarFadeInTransition(toolbarContainerElement: HTMLElement, transitionDuration: string): void {
    TransitionsUtils.opacityFadeTransition(OPACITY_VISIBLE, transitionDuration, toolbarContainerElement);
    const pendingToolbarEntranceTransitionUnset = window.setTimeout(() => {
      TransitionsUtils.unsetTransitionProperties(toolbarContainerElement);
    }, TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration));
    expandedModalPreviewModeState.setPendingToolbarEntranceTransitionUnsetState(pendingToolbarEntranceTransitionUnset);
  }

  // UX - EXPANDED MODAL TOGGLE TRANSITION
  private static startToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, transitionDuration: string): void {
    toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
    toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT, TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
    if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
    toolbarPositionToggleElement.style.display = 'block';
    const pendingToolbarEntranceFadeInTransition = window.setTimeout(() => {
      ModeToggleEntranceTransitionService.toolbarFadeInTransition(toolbarContainerElement, transitionDuration);
    }, ENTRANCE_TRANSITION_DELAY_MILLISECONDS);
    expandedModalPreviewModeState.setPendingToolbarEntranceFadeInTransitionState(pendingToolbarEntranceFadeInTransition);
  }

  private static startToolbarTransitionWithFadeOut(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, transitionDuration: string): void {
    TransitionsUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    window.setTimeout(() => {
      ModeToggleEntranceTransitionService.startToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, transitionDuration);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  private static setBackdropStyle(backdropElement: HTMLElement, backdropProperties: BackdropProperties): void {
    backdropElement.classList.replace(COMPONENT_PREVIEW_CLASSES.DEFAULT, COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
    backdropProperties.visible = true;
  }

  private static startModalAndBackdropTransition(backdropElement: HTMLElement, modalElement: HTMLElement, backdropProperties: BackdropProperties,
      modalEntranceTransition: ModalEntranceTransition, transitionDuration: string): void {
    TransitionsUtils.toggleModalStaticPosition(modalElement, 'remove');
    ModeToggleEntranceTransitionService.setBackdropStyle(backdropElement, backdropProperties);
    modalEntranceTransition(transitionDuration, modalElement, TransitionsUtils.unsetTransitionProperties, backdropElement);
  }

  private static startModalAndBackdropTransitionWithFadeOut(backdropElement: HTMLElement, modalElement: HTMLElement, backdropProperties: BackdropProperties,
      modalEntranceTransition: ModalEntranceTransition, transitionDuration: string): void {
    TransitionsUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS,  backdropElement, modalElement);
    window.setTimeout(() => {
      ModeToggleEntranceTransitionService.startModalAndBackdropTransition(backdropElement, modalElement, backdropProperties, modalEntranceTransition, transitionDuration);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  private static setPropertiesThatAreNotInCustomCssButAreRequiredForTransitions(modalElement: HTMLElement): void {
    modalElement.style.top = modalElement.style.top === '' ? '0px' : modalElement.style.top;
  }

  public static start(modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, backdropProperties: BackdropProperties, modalElement: HTMLElement,
      backdropElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    ModeToggleEntranceTransitionService.setPropertiesThatAreNotInCustomCssButAreRequiredForTransitions(modalElement);
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
      // check if both are needed
      expandedModalPreviewModeState.removePendingExitTransitions();
      expandedModalPreviewModeState.removePendingEntraceTimeouts();
      transitionDuration = TransitionsUtils.getNewTransitionDuration();
      ModeToggleEntranceTransitionService.startModalAndBackdropTransition(backdropElement, modalElement, backdropProperties, modalEntranceTransition, transitionDuration);
      ModeToggleEntranceTransitionService.startToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, transitionDuration);
    } else {
      expandedModalPreviewModeState.setIsModeToggleInitialFadeOutTransitionInProgress(true);
      ModeToggleEntranceTransitionService.startModalAndBackdropTransitionWithFadeOut(backdropElement, modalElement, backdropProperties, modalEntranceTransition, transitionDuration);
      ModeToggleEntranceTransitionService.startToolbarTransitionWithFadeOut(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, transitionDuration);
    }
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
  }
}
