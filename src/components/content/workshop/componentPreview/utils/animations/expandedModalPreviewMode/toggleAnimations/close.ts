import { COMPONENT_PREVIEW_CLASSES } from '../../../../../../../../consts/componentPreviewClasses';
import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
import { CloseAnimationCallback } from '../../../../../../../../interfaces/animations';
import { AssembleAnimationValues } from '../utils/assembleAnimationValues';
import GeneralUtils from '../../utils/generalUtils';
import { animationState } from '../../state';
import { ComponentOptions } from 'vue';
import {
  TOOLBAR_FADE_ANIMATION_DURATION_SECONDS, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS,
  OPACITY_INVISIBLE, OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS,
  POINTER_EVENTS_REMOVE, POINTER_EVENTS_NONE, CLASSLIST_METHODS,
} from '../../consts/sharedConsts';
import {
  EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_CONTAINER_GENERAL_CLASSES,
  TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS,
} from '../../../../../../../../consts/toolbarClasses';

export default class ModeToggleCloseAnimation {

  private static readonly TOOLBAR_FADE_DURATION_ON_DELAY_CANCEL_SECONDS = '0.6s';

  private static toolbarFadeInAnimation(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    toolbarElement.classList.remove(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
    toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT);
    if (animationState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
    if (toolbarPositionToggleElement) toolbarPositionToggleElement.style.display = 'none';
    window.setTimeout(() => {
      GeneralUtils.unsetAnimationProperties(toolbarContainerElement);
      animationState.setIsModeToggleAnimationInProgressState(false);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
    GeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
  }
  
  private static hideBackdrop(backdropProperties: BackdropProperties): void {
    backdropProperties.visible = false;
    delete backdropProperties.closeAnimationDuration;
  }

  private static setComponentPreviewContainerToDefault(modalContainerElement: HTMLElement): void {
    modalContainerElement.classList.replace(COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, COMPONENT_PREVIEW_CLASSES.DEFAULT);
  }

  private static modalAndBackdropFadeInAnimation(modalContainerElement: HTMLElement, backdropProperties: BackdropProperties,
      modalElement: HTMLElement): void {
    ModeToggleCloseAnimation.setComponentPreviewContainerToDefault(modalContainerElement);
    ModeToggleCloseAnimation.hideBackdrop(backdropProperties);
    GeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, modalElement);
  }

  public static closeAnimationCallback(setOptionToDefaultCallback: () => void, modalElement: HTMLElement, modalContainerElement: HTMLElement,
      backdropProperties: BackdropProperties, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      modalOverlayElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    GeneralUtils.toggleModalStaticPosition(modalElement, modalOverlayElement, CLASSLIST_METHODS.ADD);
    setOptionToDefaultCallback();
    const closeAnimationModalDefaultProperties = animationState.setIsPreviewAnimationInProgressState();
    GeneralUtils.setComponentElementProperties(modalElement, closeAnimationModalDefaultProperties);
    ModeToggleCloseAnimation.modalAndBackdropFadeInAnimation(modalContainerElement, backdropProperties, modalElement);
    ModeToggleCloseAnimation.toolbarFadeInAnimation(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
  }

  private static cancelOpenAnimationFunctionality(modalElement: HTMLElement): string {
    GeneralUtils.startModalAndToolbarAnimationWithFadeOut(modalElement);
    if (animationState.getIsWaitingAnimationDelayState()) {
      animationState.setIsWaitingAnimationDelayState(false);
      return ModeToggleCloseAnimation.TOOLBAR_FADE_DURATION_ON_DELAY_CANCEL_SECONDS;
    } else {
      return GeneralUtils.getNewAnimationDuration();
    }
  }

  // UX - EXPANDED MODAL TOGGLE ANIMATION
  // public static start(modalCloseAnimation: CloseAnimation, animationDuration: string, setOptionToDefaultCallback: () => void,
  //     modalContainerElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
  //     toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
  //   let wasPreviousAnimationInterrupted = false;
  //   if (animationState.getIsModeToggleAnimationInProgressState()) {
  //     const cancelResult = ModeToggleCloseAnimation.cancelOpenAnimationFunctionality(modalElement);
  //     if (cancelResult) { animationDuration = cancelResult; }
  //     wasPreviousAnimationInterrupted = true;
  //   }
  //   GeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, animationDuration, toolbarContainerElement);
  //   modalCloseAnimation(animationDuration, modalElement, ModeToggleCloseAnimation.closeAnimationCallback.bind(this, setOptionToDefaultCallback) as CloseAnimationCallback,
  //     modalContainerElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, modalOverlayElement, wasPreviousAnimationInterrupted);
  //   animationState.setIsModeToggleAnimationInProgressState(true);
  // }

  private static toolbarFadeOutAnimation(toolbarContainerElement: HTMLElement): void {
    GeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, TOOLBAR_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
    animationState.setIsToolbarFadeAnimationInProgressState(true);
    window.setTimeout(() => {
      animationState.setIsToolbarFadeAnimationInProgressState(false);
    }, GeneralUtils.secondsStringToMillisecondsNumber(TOOLBAR_FADE_ANIMATION_DURATION_SECONDS));
  }

  public static start(componentPreviewComponent: ComponentOptions, closeAnimationCallback: () => void,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    let wasPreviousAnimationInterrupted = false;
    let reducedAnimationDuration: string;
    const { modalCloseAnimation, animationDuration, setOptionToDefaultCallback, modalContainerElement, backdropProperties,
      modalElement, modalOverlayElement } = AssembleAnimationValues.assembleClosetAnimationValues(componentPreviewComponent, closeAnimationCallback);
    if (animationState.getIsModeToggleAnimationInProgressState()) {
      reducedAnimationDuration = ModeToggleCloseAnimation.cancelOpenAnimationFunctionality(modalElement);
      wasPreviousAnimationInterrupted = true;
    }
    ModeToggleCloseAnimation.toolbarFadeOutAnimation(toolbarContainerElement);
    modalCloseAnimation(reducedAnimationDuration || animationDuration, modalElement,
      ModeToggleCloseAnimation.closeAnimationCallback.bind(this, setOptionToDefaultCallback) as CloseAnimationCallback,
      modalContainerElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement,
      modalOverlayElement, wasPreviousAnimationInterrupted);
    animationState.setIsModeToggleAnimationInProgressState(true);
  }
}
