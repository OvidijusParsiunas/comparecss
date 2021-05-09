import {
  TOOLBAR_FADE_TRANSITION_DURATION_SECONDS, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS,
  OPACITY_INVISIBLE, OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS,
  ADD_CLASS, POINTER_EVENTS_REMOVE, POINTER_EVENTS_NONE,
} from '../consts/sharedConsts';
import {
  EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_CONTAINER_GENERAL_CLASSES,
  TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS,
} from '../../../../../../../consts/toolbarClasses';
import { ExitTransitionCallback, ModalExitTransition } from '../../../../../../../interfaces/modalTransitions';
import { COMPONENT_PREVIEW_CLASSES } from '../../../../../../../consts/componentPreviewClasses';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import GeneralUtils from '../utils/generalUtils';

export default class ModeToggleExitTransition {

  private static readonly TOOLBAR_FADE_DURATION_ON_DELAY_CANCEL_SECONDS = '0.6s';

  private static toolbarFadeInTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    toolbarElement.classList.remove(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
    toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT);
    if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
    if (toolbarPositionToggleElement) toolbarPositionToggleElement.style.display = 'none';
    window.setTimeout(() => {
      GeneralUtils.unsetTransitionProperties(toolbarContainerElement);
      expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(false);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
    GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
  }
  
  private static hideBackdrop(backdropProperties: BackdropProperties): void {
    backdropProperties.visible = false;
  }

  private static setComponentPreviewContainerToDefault(componentPreviewContainerElement: HTMLElement): void {
    componentPreviewContainerElement.classList.replace(COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, COMPONENT_PREVIEW_CLASSES.DEFAULT);
  }

  private static modalAndBackdropFadeInTransition(componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties,
      modalElement: HTMLElement): void {
    ModeToggleExitTransition.setComponentPreviewContainerToDefault(componentPreviewContainerElement);
    ModeToggleExitTransition.hideBackdrop(backdropProperties);
    GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, modalElement);
  }

  public static exitTransitionCallback(setOptionToDefaultCallback: () => void, modalElement: HTMLElement, componentPreviewContainerElement: HTMLElement,
      backdropProperties: BackdropProperties, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      modalOverlayElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    GeneralUtils.toggleModalStaticPosition(modalElement, modalOverlayElement, ADD_CLASS);
    setOptionToDefaultCallback();
    const exitTransitionModalDefaultProperties = expandedModalPreviewModeState.getCurrentExitTransitionModalDefaultPropertiesState();
    GeneralUtils.setModalProperties(modalElement, exitTransitionModalDefaultProperties);
    ModeToggleExitTransition.modalAndBackdropFadeInTransition(componentPreviewContainerElement, backdropProperties, modalElement);
    ModeToggleExitTransition.toolbarFadeInTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
  }

  private static cancelEntranceTransitionFunctionality(modalElement: HTMLElement): string {
    GeneralUtils.cancelAllPendingTransitionFunctionality(modalElement);
    if (expandedModalPreviewModeState.getIsWaitingTransitionDelayState()) {
      expandedModalPreviewModeState.setIsWaitingTransitionDelayState(false);
      return ModeToggleExitTransition.TOOLBAR_FADE_DURATION_ON_DELAY_CANCEL_SECONDS;
    } else {
      return GeneralUtils.getNewTransitionDuration();
    }
  }

  // UX - EXPANDED MODAL TOGGLE TRANSITION
  // public static start(modalExitTransition: ModalExitTransition, transitionDuration: string, setOptionToDefaultCallback: () => void,
  //     componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
  //     toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
  //   let wasPreviousTransitionInterrupted = false;
  //   if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
  //     const cancelResult = ModeToggleExitTransition.cancelEntranceTransitionFunctionality(modalElement);
  //     if (cancelResult) { transitionDuration = cancelResult; }
  //     wasPreviousTransitionInterrupted = true;
  //   }
  //   GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, transitionDuration, toolbarContainerElement);
  //   modalExitTransition(transitionDuration, modalElement, ModeToggleExitTransition.exitTransitionCallback.bind(this, setOptionToDefaultCallback) as ExitTransitionCallback,
  //     componentPreviewContainerElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, modalOverlayElement, wasPreviousTransitionInterrupted);
  //   expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
  // }

  private static toolbarFadeOutTransition(toolbarContainerElement: HTMLElement): void {
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, TOOLBAR_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
    expandedModalPreviewModeState.setIsToolbarFadeTransitionInProgressState(true);
    window.setTimeout(() => {
      expandedModalPreviewModeState.setIsToolbarFadeTransitionInProgressState(false);
    }, GeneralUtils.secondsStringToMillisecondsNumber(TOOLBAR_FADE_TRANSITION_DURATION_SECONDS));
  }

  public static start(modalExitTransition: ModalExitTransition, transitionDuration: string, setOptionToDefaultCallback: () => void,
      componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    let wasPreviousTransitionInterrupted = false;
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
      transitionDuration = ModeToggleExitTransition.cancelEntranceTransitionFunctionality(modalElement);
      wasPreviousTransitionInterrupted = true;
    }
    ModeToggleExitTransition.toolbarFadeOutTransition(toolbarContainerElement);
    modalExitTransition(transitionDuration, modalElement, ModeToggleExitTransition.exitTransitionCallback.bind(this, setOptionToDefaultCallback) as ExitTransitionCallback,
      componentPreviewContainerElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement,
      modalOverlayElement, wasPreviousTransitionInterrupted);
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
  }
}
