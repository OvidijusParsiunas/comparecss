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
      componentElement.style.display = 'block';
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
    const pendingAnimationEnd = window.setTimeout(() => {
      AnimationUtils.finishEntranceAnimation(componentElement, unsetAnimationPropertiesCallback);
    }, GeneralUtils.secondsStringToMillisecondsNumber(animationDuration));
    animationState.setPendingAnimationEndState(pendingAnimationEnd);
  }

  private static calculateAnimationDelay(componentContainerElement: HTMLElement, animationDelay?: string): number {
    // if componentContainerElement is present - we can assume that this is an expand modal mode toggle animation
    if (componentContainerElement) {
      if (animationDelay) {
        return GeneralUtils.secondsStringToMillisecondsNumber(animationDelay);
      }
      return 0;
    }
    return AnimationUtils.ENTRANCE_ANIMATION_PREVIEW_DELAY_MILLISECONDS;
  }

  public static startEntranceAnimation(animationDuration: string, componentElement: HTMLElement, 
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentContainerElement?: HTMLElement,
      animationDelay?: string, componentElementProperties?: ElementStyleProperties): void {
    const componentAnimationDelay = window.setTimeout(() => { 
      AnimationUtils.startEntranceAnimationAfterDelay(
        animationDuration, componentElement, unsetAnimationPropertiesCallback, componentElementProperties); 
    }, AnimationUtils.calculateAnimationDelay(componentContainerElement, animationDelay));
    animationState.setAnimationDelayState(componentAnimationDelay);
  }

  private static startBackdropHideAnimation(backdropProperties: BackdropProperties, animationDuration: string): void {
    if (backdropProperties) {
      backdropProperties.exitAnimationDuration = animationDuration;
      backdropProperties.opacity = 0;
    }
  }
  
  private static finishExitAnimation(componentElement: HTMLElement, exitAnimationCallback: ExitAnimationCallback,
      componentContainerElement: HTMLElement, backdropProperties?: BackdropProperties, toolbarElement?: HTMLElement,
      innerToolbarElement?: HTMLElement, componentOverlayElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    exitAnimationCallback(componentElement, componentContainerElement, backdropProperties, toolbarElement,
      innerToolbarElement, componentOverlayElement, toolbarPositionToggleElement);
  }

  private static calculateAnimationDurationMilliseconds(wasPreviousAnimationInterrupted: boolean, animationDuration: string): number {
    const animationDurationMilliseconds = GeneralUtils.secondsStringToMillisecondsNumber(animationDuration);
    return wasPreviousAnimationInterrupted
      ? animationDurationMilliseconds - AnimationUtils.EXIT_ANIMATION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS
      : animationDurationMilliseconds;
  }

  public static startExitAnimation(animationDuration: string, componentElement: HTMLElement, exitAnimationCallback: ExitAnimationCallback,
      componentContainerElement: HTMLElement, backdropProperties?: BackdropProperties, toolbarElement?: HTMLElement,
      innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement, componentOverlayElement?: HTMLElement,
      wasPreviousAnimationInterrupted?: boolean, componentElementProperties?: ElementStyleProperties): void {
    if (backdropProperties) AnimationUtils.startBackdropHideAnimation(backdropProperties, animationDuration);
    AnimationUtils.setAnimationProperties(componentElement, OPACITY_INVISIBLE, ALL_PROPERTIES, animationDuration,
      LINEAR_SPEED_TRANSITION, componentElementProperties);
    animationState.markBeginningTimeOfAnimationState();
    const pendingAnimationEnd = window.setTimeout(() => {
      AnimationUtils.finishExitAnimation(componentElement, exitAnimationCallback, componentContainerElement, backdropProperties, toolbarElement,
        innerToolbarElement, componentOverlayElement, toolbarPositionToggleElement);
    }, AnimationUtils.calculateAnimationDurationMilliseconds(wasPreviousAnimationInterrupted, animationDuration));
    animationState.setPendingAnimationEndState(pendingAnimationEnd);
  }
}
