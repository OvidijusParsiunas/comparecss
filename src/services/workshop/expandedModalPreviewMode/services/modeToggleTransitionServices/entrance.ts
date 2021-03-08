import {
  TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS, TOOLBAR_CONTAINER_GENERAL_CLASSES,
  EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES,
} from '../../../../../consts/toolbarClasses';
import {
  MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, ENTRANCE_TRANSITION_DELAY_MILLISECONDS,
  OPACITY_INVISIBLE, OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS,
  TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS, TOOLBAR_FADE_TRANSITION_DURATION_SECONDS, 
} from '../../utils/sharedConsts';
import { COMPONENT_PREVIEW_CLASSES } from '../../../../../consts/componentPreviewClasses';
import { ModalEntranceTransition } from '../../../../../interfaces/modalTransitions';
import { expandedModalPreviewModeState } from '../../expandedModalPreviewModeState';
import { BackdropProperties } from '../../../../../interfaces/workshopComponent';
import GeneralUtils from '../../utils/generalUtils';

export default class ModeToggleEntranceTransitionService {

  // UX - EXPANDED MODAL TOGGLE TRANSITION
  // private static toolbarFadeInTransition(toolbarContainerElement: HTMLElement, transitionDuration: string): void {
  //   GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, transitionDuration, toolbarContainerElement);
  //   const pendingToolbarEntranceTransitionUnset = window.setTimeout(() => {
  //     GeneralUtils.unsetTransitionProperties(toolbarContainerElement);
  //   }, GeneralUtils.secondsStringToMillisecondsNumber(transitionDuration));
  //   expandedModalPreviewModeState.setPendingToolbarEntranceTransitionUnsetState(pendingToolbarEntranceTransitionUnset);
  // }

  // private static startToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, transitionDuration: string): void {
  //   toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
  //   toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT, TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
  //   if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
  //     toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
  //   }
  //   toolbarPositionToggleElement.style.display = 'block';
  //   ModeToggleEntranceTransitionService.toolbarFadeInTransition(toolbarContainerElement, transitionDuration);
  // }

  private static toolbarFadeInTransition(toolbarContainerElement: HTMLElement): void {
    GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, TOOLBAR_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    const pendingToolbarEntranceTransitionUnset = window.setTimeout(() => {
      GeneralUtils.unsetTransitionProperties(toolbarContainerElement);
    }, TOOLBAR_FADE_TRANSITION_DURATION_MILLISECONDS);
    expandedModalPreviewModeState.setPendingToolbarEntranceTransitionUnsetState(pendingToolbarEntranceTransitionUnset);
  }

  private static startToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
    toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT, TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
    if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
    toolbarPositionToggleElement.style.display = 'block';
    const pendingToolbarEntranceFadeInTransition = window.setTimeout(() => {
      ModeToggleEntranceTransitionService.toolbarFadeInTransition(toolbarContainerElement);
    }, ENTRANCE_TRANSITION_DELAY_MILLISECONDS);
    expandedModalPreviewModeState.setPendingToolbarEntranceFadeInTransitionState(pendingToolbarEntranceFadeInTransition);
  }

  private static startToolbarTransitionWithFadeOut(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    window.setTimeout(() => {
      ModeToggleEntranceTransitionService.startToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  private static setBackdropStyle(backdropElement: HTMLElement, backdropProperties: BackdropProperties): void {
    backdropElement.classList.replace(COMPONENT_PREVIEW_CLASSES.DEFAULT, COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
    backdropProperties.visible = true;
  }

  private static startModalAndBackdropTransition(backdropElement: HTMLElement, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
      backdropProperties: BackdropProperties, modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, transitionDelay?: string): void {
    GeneralUtils.toggleModalStaticPosition(modalElement, modalOverlayElement, 'remove');
    ModeToggleEntranceTransitionService.setBackdropStyle(backdropElement, backdropProperties);
    setTimeout(() => { modalEntranceTransition(transitionDuration, modalElement, GeneralUtils.unsetTransitionProperties, backdropElement, transitionDelay); });
  }

  private static startModalAndBackdropTransitionWithFadeOut(backdropElement: HTMLElement, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
      backdropProperties: BackdropProperties, modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, transitionDelay?: string): void {
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS,  backdropElement, modalElement);
    window.setTimeout(() => {
      ModeToggleEntranceTransitionService.startModalAndBackdropTransition(backdropElement, modalElement, modalOverlayElement,
        backdropProperties, modalEntranceTransition, transitionDuration, transitionDelay);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  public static start(modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, transitionDelay: string, backdropProperties: BackdropProperties,
      modalElement: HTMLElement, modalOverlayElement: HTMLElement, backdropElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
      GeneralUtils.cancelAllPendingTransitionFunctionality(modalElement);
      const newTransitionDuration = GeneralUtils.getNewTransitionDuration();
      ModeToggleEntranceTransitionService.startModalAndBackdropTransition(backdropElement, modalElement, modalOverlayElement,
        backdropProperties, modalEntranceTransition, newTransitionDuration);
      ModeToggleEntranceTransitionService.startToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    } else {
      expandedModalPreviewModeState.setIsModeToggleInitialFadeOutTransitionInProgress(true);
      ModeToggleEntranceTransitionService.startModalAndBackdropTransitionWithFadeOut(backdropElement, modalElement, modalOverlayElement,
        backdropProperties, modalEntranceTransition, transitionDuration, transitionDelay);
      ModeToggleEntranceTransitionService.startToolbarTransitionWithFadeOut(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    }
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
  }
}
