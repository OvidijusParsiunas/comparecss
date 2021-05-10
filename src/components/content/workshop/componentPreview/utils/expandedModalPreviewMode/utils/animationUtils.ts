import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION } from '../consts/sharedConsts';
import { ElementStyleProperties } from '../../../../../../../interfaces/elementStyleProperties';
import { ExitAnimationCallback } from '../../../../../../../interfaces/modalAnimations';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import GeneralUtils from './generalUtils';

export default class AnimationUtils {

  private static readonly ENTRANCE_ANIMATION_PREVIEW_DELAY_MILLISECONDS = 150;
  private static readonly EXIT_ANIMATION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS = 420;

  public static cancelModalAnimationPreview(modalElement: HTMLElement): void {
    if (expandedModalPreviewModeState.getIsAnimationPreviewInProgressState()) {
      GeneralUtils.unsetAnimationProperties(modalElement);
      GeneralUtils.setModalPropertiesBackToDefault(modalElement);
      expandedModalPreviewModeState.cancelPendingModalAnimationFunctionality();
      expandedModalPreviewModeState.setIsAnimationPreviewInProgressState(false);
      modalElement.style.opacity = OPACITY_VISIBLE;
    }
  }

  private static finishModalEntranceAnimation(modalElement: HTMLElement,
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void): void {
    if (unsetAnimationPropertiesCallback) unsetAnimationPropertiesCallback(modalElement);
    // the reason why the states are set to false here, because there is no callback
    expandedModalPreviewModeState.setIsModeToggleAnimationInProgressState(false);
    expandedModalPreviewModeState.setIsAnimationPreviewInProgressState(false);
  }

  private static setModalAnimationProperties(modalElement: HTMLElement, opacity: string, transitionProperty: string,
      animationDuration: string, transitionTimingFunction: string, modalElementProperties?: ElementStyleProperties): void {
    modalElement.style.opacity = opacity;
    modalElement.style.transitionProperty = transitionProperty;
    modalElement.style.transitionDuration = animationDuration;
    modalElement.style.transitionTimingFunction = transitionTimingFunction;
    for (const key in (modalElementProperties || {})) {
      modalElement.style[key] = modalElementProperties[key];
    }
  }

  private static startModalEntranceAnimationAfterDelay(animationDuration: string, modalElement: HTMLElement, 
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, modalElementProperties?: ElementStyleProperties): void {
    expandedModalPreviewModeState.setIsWaitingAnimationDelayState(false);
    AnimationUtils.setModalAnimationProperties(modalElement, OPACITY_VISIBLE,
      ALL_PROPERTIES, animationDuration, LINEAR_SPEED_TRANSITION, modalElementProperties);
    expandedModalPreviewModeState.markBeginningTimeOfAnimationState();
    const pendingModalAnimationEnd = window.setTimeout(() => {
      AnimationUtils.finishModalEntranceAnimation(modalElement, unsetAnimationPropertiesCallback);
    }, GeneralUtils.secondsStringToMillisecondsNumber(animationDuration));
    expandedModalPreviewModeState.setPendingModalAnimationEndState(pendingModalAnimationEnd);
  }

  private static calculateAnimationDelay(componentPreviewContainerElement: HTMLElement, animationDelay?: string): number {
    // if the componentPreviewContainerElement is present - we can assume that this is an expand mode toggle animation
    if (componentPreviewContainerElement) {
      if (animationDelay) {
        return GeneralUtils.secondsStringToMillisecondsNumber(animationDelay);
      }
      return 0;
    }
    return AnimationUtils.ENTRANCE_ANIMATION_PREVIEW_DELAY_MILLISECONDS;
  }

  public static startModalEntranceAnimation(animationDuration: string, modalElement: HTMLElement, 
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentPreviewContainerElement?: HTMLElement,
      animationDelay?: string, modalElementProperties?: ElementStyleProperties): void {
    const modalAnimationDelay = window.setTimeout(() => { 
      AnimationUtils.startModalEntranceAnimationAfterDelay(
        animationDuration, modalElement, unsetAnimationPropertiesCallback, modalElementProperties); 
    }, AnimationUtils.calculateAnimationDelay(componentPreviewContainerElement, animationDelay));
    expandedModalPreviewModeState.setModalAnimationDelayState(modalAnimationDelay);
  }

  private static startBackdropHideAnimation(backdropProperties: BackdropProperties, animationDuration: string): void {
    if (backdropProperties) {
      backdropProperties.exitAnimationDuration = animationDuration;
      backdropProperties.opacity = 0;
    }
  }
  
  private static finishModalExitAnimation(modalElement: HTMLElement, exitAnimationCallback: ExitAnimationCallback,
      componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, modalOverlayElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    exitAnimationCallback(modalElement, componentPreviewContainerElement, backdropProperties, toolbarElement,
      innerToolbarElement, modalOverlayElement, toolbarPositionToggleElement);
  }

  private static calculateAnimationDurationMilliseconds(wasPreviousAnimationInterrupted: boolean, animationDuration: string): number {
    const animationDurationMilliseconds = GeneralUtils.secondsStringToMillisecondsNumber(animationDuration);
    return wasPreviousAnimationInterrupted
      ? animationDurationMilliseconds - AnimationUtils.EXIT_ANIMATION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS
      : animationDurationMilliseconds;
  }

  public static startModalAndBackdropExitAnimation(animationDuration: string, modalElement: HTMLElement,
      exitAnimationCallback: ExitAnimationCallback, componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties,
      toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, modalOverlayElement?: HTMLElement,
      wasPreviousAnimationInterrupted?: boolean, modalElementProperties?: ElementStyleProperties): void {
    AnimationUtils.startBackdropHideAnimation(backdropProperties, animationDuration);
    AnimationUtils.setModalAnimationProperties(modalElement, OPACITY_INVISIBLE, ALL_PROPERTIES, animationDuration,
      LINEAR_SPEED_TRANSITION, modalElementProperties);
    expandedModalPreviewModeState.markBeginningTimeOfAnimationState();
    const pendingModalAnimationEnd = window.setTimeout(() => {
      AnimationUtils.finishModalExitAnimation(modalElement, exitAnimationCallback, componentPreviewContainerElement, backdropProperties, toolbarElement,
        innerToolbarElement, modalOverlayElement, toolbarPositionToggleElement);
    }, AnimationUtils.calculateAnimationDurationMilliseconds(wasPreviousAnimationInterrupted, animationDuration));
    expandedModalPreviewModeState.setPendingModalAnimationEndState(pendingModalAnimationEnd);
  }
}
