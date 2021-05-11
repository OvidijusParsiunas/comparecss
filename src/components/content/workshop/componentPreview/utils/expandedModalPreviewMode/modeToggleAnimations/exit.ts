import { ExitAnimationCallback, ModalExitAnimation } from '../../../../../../../interfaces/modalAnimations';
import { COMPONENT_PREVIEW_CLASSES } from '../../../../../../../consts/componentPreviewClasses';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import GeneralUtils from '../utils/generalUtils';
import {
  TOOLBAR_FADE_ANIMATION_DURATION_SECONDS, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS,
  OPACITY_INVISIBLE, OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS,
  POINTER_EVENTS_REMOVE, POINTER_EVENTS_NONE, CLASSLIST_METHODS,
} from '../consts/sharedConsts';
import {
  EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_CONTAINER_GENERAL_CLASSES,
  TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS,
} from '../../../../../../../consts/toolbarClasses';

export default class ModeToggleExitAnimation {

  private static readonly TOOLBAR_FADE_DURATION_ON_DELAY_CANCEL_SECONDS = '0.6s';

  private static toolbarFadeInAnimation(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    toolbarElement.classList.remove(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
    toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT);
    if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
    if (toolbarPositionToggleElement) toolbarPositionToggleElement.style.display = 'none';
    window.setTimeout(() => {
      GeneralUtils.unsetAnimationProperties(toolbarContainerElement);
      expandedModalPreviewModeState.setIsModeToggleAnimationInProgressState(false);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
    GeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
  }
  
  private static hideBackdrop(backdropProperties: BackdropProperties): void {
    backdropProperties.visible = false;
    delete backdropProperties.exitAnimationDuration;
  }

  private static setComponentPreviewContainerToDefault(componentPreviewContainerElement: HTMLElement): void {
    componentPreviewContainerElement.classList.replace(COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, COMPONENT_PREVIEW_CLASSES.DEFAULT);
  }

  private static modalAndBackdropFadeInAnimation(componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties,
      modalElement: HTMLElement): void {
    ModeToggleExitAnimation.setComponentPreviewContainerToDefault(componentPreviewContainerElement);
    ModeToggleExitAnimation.hideBackdrop(backdropProperties);
    GeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, modalElement);
  }

  public static exitAnimationCallback(setOptionToDefaultCallback: () => void, modalElement: HTMLElement, componentPreviewContainerElement: HTMLElement,
      backdropProperties: BackdropProperties, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      modalOverlayElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    GeneralUtils.toggleModalStaticPosition(modalElement, modalOverlayElement, CLASSLIST_METHODS.ADD);
    setOptionToDefaultCallback();
    const exitAnimationModalDefaultProperties = expandedModalPreviewModeState.setIsPreviewAnimationInProgressState();
    GeneralUtils.setModalProperties(modalElement, exitAnimationModalDefaultProperties);
    ModeToggleExitAnimation.modalAndBackdropFadeInAnimation(componentPreviewContainerElement, backdropProperties, modalElement);
    ModeToggleExitAnimation.toolbarFadeInAnimation(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
  }

  private static cancelEntranceAnimationFunctionality(modalElement: HTMLElement): string {
    GeneralUtils.startModalAndToolbarAnimationWithFadeOut(modalElement);
    if (expandedModalPreviewModeState.getIsWaitingAnimationDelayState()) {
      expandedModalPreviewModeState.setIsWaitingAnimationDelayState(false);
      return ModeToggleExitAnimation.TOOLBAR_FADE_DURATION_ON_DELAY_CANCEL_SECONDS;
    } else {
      return GeneralUtils.getNewAnimationDuration();
    }
  }

  // UX - EXPANDED MODAL TOGGLE ANIMATION
  // public static start(modalExitAnimation: ModalExitAnimation, animationDuration: string, setOptionToDefaultCallback: () => void,
  //     componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
  //     toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
  //   let wasPreviousAnimationInterrupted = false;
  //   if (expandedModalPreviewModeState.getIsModeToggleAnimationInProgressState()) {
  //     const cancelResult = ModeToggleExitAnimation.cancelEntranceAnimationFunctionality(modalElement);
  //     if (cancelResult) { animationDuration = cancelResult; }
  //     wasPreviousAnimationInterrupted = true;
  //   }
  //   GeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, animationDuration, toolbarContainerElement);
  //   modalExitAnimation(animationDuration, modalElement, ModeToggleExitAnimation.exitAnimationCallback.bind(this, setOptionToDefaultCallback) as ExitAnimationCallback,
  //     componentPreviewContainerElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, modalOverlayElement, wasPreviousAnimationInterrupted);
  //   expandedModalPreviewModeState.setIsModeToggleAnimationInProgressState(true);
  // }

  private static toolbarFadeOutAnimation(toolbarContainerElement: HTMLElement): void {
    GeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, TOOLBAR_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
    expandedModalPreviewModeState.setIsToolbarFadeAnimationInProgressState(true);
    window.setTimeout(() => {
      expandedModalPreviewModeState.setIsToolbarFadeAnimationInProgressState(false);
    }, GeneralUtils.secondsStringToMillisecondsNumber(TOOLBAR_FADE_ANIMATION_DURATION_SECONDS));
  }

  public static start(modalExitAnimation: ModalExitAnimation, animationDuration: string, setOptionToDefaultCallback: () => void,
      componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    let wasPreviousAnimationInterrupted = false;
    if (expandedModalPreviewModeState.getIsModeToggleAnimationInProgressState()) {
      animationDuration = ModeToggleExitAnimation.cancelEntranceAnimationFunctionality(modalElement);
      wasPreviousAnimationInterrupted = true;
    }
    ModeToggleExitAnimation.toolbarFadeOutAnimation(toolbarContainerElement);
    modalExitAnimation(animationDuration, modalElement, ModeToggleExitAnimation.exitAnimationCallback.bind(this, setOptionToDefaultCallback) as ExitAnimationCallback,
      componentPreviewContainerElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement,
      modalOverlayElement, wasPreviousAnimationInterrupted);
    expandedModalPreviewModeState.setIsModeToggleAnimationInProgressState(true);
  }
}
