import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION } from '../consts/sharedConsts';
import { ElementStyleProperties } from '../../../../../../../interfaces/elementStyleProperties';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { ExitAnimationCallback } from '../../../../../../../interfaces/animations';
import { animationState } from '../state';
import GeneralUtils from './generalUtils';

export default class AnimationUtils {

  private static readonly ENTRANCE_ANIMATION_PREVIEW_DELAY_MILLISECONDS = 150;
  private static readonly EXIT_ANIMATION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS = 420;

  public static cancelAnimationPreview(componentElement: HTMLElement): void {
    if (animationState.getIsAnimationPreviewInProgressState()) {
      GeneralUtils.unsetAnimationProperties(componentElement);
      GeneralUtils.setComponentPropertiesBackToDefault(componentElement);
      animationState.cancelPendingAnimationFunctionality();
      animationState.setIsAnimationPreviewInProgressState(false);
      componentElement.style.opacity = OPACITY_VISIBLE;
    }
  }

  private static finishEntranceAnimation(componentElement: HTMLElement, unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void): void {
    if (unsetAnimationPropertiesCallback) unsetAnimationPropertiesCallback(componentElement);
    // the reason why the states are set to false here, because there is no callback
    animationState.setIsModeToggleAnimationInProgressState(false);
    animationState.setIsAnimationPreviewInProgressState(false);
  }

  private static setAnimationProperties(componentElement: HTMLElement, opacity: string, transitionProperty: string,
      animationDuration: string, transitionTimingFunction: string, componentElementProperties?: ElementStyleProperties): void {
    componentElement.style.opacity = opacity;
    componentElement.style.transitionProperty = transitionProperty;
    componentElement.style.transitionDuration = animationDuration;
    componentElement.style.transitionTimingFunction = transitionTimingFunction;
    for (const key in (componentElementProperties || {})) {
      componentElement.style[key] = componentElementProperties[key];
    }
  }

  private static startEntranceAnimationAfterDelay(animationDuration: string, componentElement: HTMLElement, 
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentElementProperties?: ElementStyleProperties): void {
    animationState.setIsWaitingAnimationDelayState(false);
    AnimationUtils.setAnimationProperties(componentElement, OPACITY_VISIBLE,
      ALL_PROPERTIES, animationDuration, LINEAR_SPEED_TRANSITION, componentElementProperties);
    animationState.markBeginningTimeOfAnimationState();
    const pendingModalAnimationEnd = window.setTimeout(() => {
      AnimationUtils.finishEntranceAnimation(componentElement, unsetAnimationPropertiesCallback);
    }, GeneralUtils.secondsStringToMillisecondsNumber(animationDuration));
    animationState.setPendingAnimationEndState(pendingModalAnimationEnd);
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

  public static startModalEntranceAnimation(animationDuration: string, componentElement: HTMLElement, 
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentPreviewContainerElement?: HTMLElement,
      animationDelay?: string, componentElementProperties?: ElementStyleProperties): void {
    const modalAnimationDelay = window.setTimeout(() => { 
      AnimationUtils.startEntranceAnimationAfterDelay(
        animationDuration, componentElement, unsetAnimationPropertiesCallback, componentElementProperties); 
    }, AnimationUtils.calculateAnimationDelay(componentPreviewContainerElement, animationDelay));
    animationState.setAnimationDelayState(modalAnimationDelay);
  }

  private static startBackdropHideAnimation(backdropProperties: BackdropProperties, animationDuration: string): void {
    if (backdropProperties) {
      backdropProperties.exitAnimationDuration = animationDuration;
      backdropProperties.opacity = 0;
    }
  }
  
  private static finishModalExitAnimation(componentElement: HTMLElement, exitAnimationCallback: ExitAnimationCallback,
      componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, modalOverlayElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    exitAnimationCallback(componentElement, componentPreviewContainerElement, backdropProperties, toolbarElement,
      innerToolbarElement, modalOverlayElement, toolbarPositionToggleElement);
  }

  private static calculateAnimationDurationMilliseconds(wasPreviousAnimationInterrupted: boolean, animationDuration: string): number {
    const animationDurationMilliseconds = GeneralUtils.secondsStringToMillisecondsNumber(animationDuration);
    return wasPreviousAnimationInterrupted
      ? animationDurationMilliseconds - AnimationUtils.EXIT_ANIMATION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS
      : animationDurationMilliseconds;
  }

  public static startModalAndBackdropExitAnimation(animationDuration: string, componentElement: HTMLElement,
      exitAnimationCallback: ExitAnimationCallback, componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties,
      toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, modalOverlayElement?: HTMLElement,
      wasPreviousAnimationInterrupted?: boolean, componentElementProperties?: ElementStyleProperties): void {
    AnimationUtils.startBackdropHideAnimation(backdropProperties, animationDuration);
    AnimationUtils.setAnimationProperties(componentElement, OPACITY_INVISIBLE, ALL_PROPERTIES, animationDuration,
      LINEAR_SPEED_TRANSITION, componentElementProperties);
    animationState.markBeginningTimeOfAnimationState();
    const pendingModalAnimationEnd = window.setTimeout(() => {
      AnimationUtils.finishModalExitAnimation(componentElement, exitAnimationCallback, componentPreviewContainerElement, backdropProperties, toolbarElement,
        innerToolbarElement, modalOverlayElement, toolbarPositionToggleElement);
    }, AnimationUtils.calculateAnimationDurationMilliseconds(wasPreviousAnimationInterrupted, animationDuration));
    animationState.setPendingAnimationEndState(pendingModalAnimationEnd);
  }
}
