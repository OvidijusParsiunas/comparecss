import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION } from '../consts/sharedConsts';
import { ElementStyleProperties } from '../../../../../../../interfaces/elementStyleProperties';
import { ExitTransitionCallback } from '../../../../../../../interfaces/modalTransitions';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import GeneralUtils from './generalUtils';

export default class TransitionUtils {

  private static readonly ENTRANCE_TRANSITION_PREVIEW_DELAY_MILLISECONDS = 150;
  private static readonly BACKDROP_FADE_IN_TRANSITION_DURATION_SECONDS = '0.1s';
  private static readonly BACKDROP_FADE_OUT_TRANSITION_DURATION_SECONDS = '0.15s';
  private static readonly EXIT_TRANSITION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS = 420;

  public static cancelModalTransitionPreview(modalElement: HTMLElement): void {
    if (expandedModalPreviewModeState.getIsTransitionPreviewInProgressState()) {
      GeneralUtils.unsetTransitionProperties(modalElement);
      GeneralUtils.setModalPropertiesBackToDefault(modalElement);
      expandedModalPreviewModeState.cancelPendingModalTransitionFunctionality();
      expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(false);
      modalElement.style.opacity = OPACITY_VISIBLE;
    }
  }

  private static finishModalEntranceTransition(modalElement: HTMLElement,
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, backdropElement?: HTMLElement): void {
    if (unsetTransitionPropertiesCallback) unsetTransitionPropertiesCallback(modalElement, backdropElement);
    // the reason why the states are set to false here, because there is no callback
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(false);
    expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(false);
  }

  private static setModalTransitionProperties(modalElement: HTMLElement, opacity: string, transitionProperty: string,
      transitionDuration: string, transitionTimingFunction: string, modalElementProperties?: ElementStyleProperties): void {
    modalElement.style.opacity = opacity;
    modalElement.style.transitionProperty = transitionProperty;
    modalElement.style.transitionDuration = transitionDuration;
    modalElement.style.transitionTimingFunction = transitionTimingFunction;
    for (const key in (modalElementProperties || {})) {
      modalElement.style[key] = modalElementProperties[key];
    }
  }

  private static startModalEntranceTransition(transitionDuration: string, modalElement: HTMLElement, 
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void,
      backdropElement?: HTMLElement, modalElementProperties?: ElementStyleProperties): void {
    expandedModalPreviewModeState.setIsWaitingTransitionDelayState(false);
    TransitionUtils.setModalTransitionProperties(modalElement, OPACITY_VISIBLE,
      ALL_PROPERTIES, transitionDuration, LINEAR_SPEED_TRANSITION, modalElementProperties);
    expandedModalPreviewModeState.markBeginningTimeOfTransitionState();
    const pendingModalTransitionEnd = window.setTimeout(() => {
      TransitionUtils.finishModalEntranceTransition(modalElement, unsetTransitionPropertiesCallback, backdropElement);
    }, GeneralUtils.secondsStringToMillisecondsNumber(transitionDuration));
    expandedModalPreviewModeState.setPendingModalTransitionEndState(pendingModalTransitionEnd);
  }

  private static startBackdropDisplayTransition(backdropElement: HTMLElement) {
    backdropElement.style.opacity = OPACITY_VISIBLE;
    backdropElement.style.transitionDuration = TransitionUtils.BACKDROP_FADE_IN_TRANSITION_DURATION_SECONDS;
  }

  private static calculateTransitionDelay(backdropElement: HTMLElement, transitionDelay?: string): number {
    // if the backdrop element is present - we can assume that this is a mode toggle transition
    if (backdropElement) {
      if (transitionDelay) {
        return GeneralUtils.secondsStringToMillisecondsNumber(transitionDelay);
      }
      return 0;
    }
    return TransitionUtils.ENTRANCE_TRANSITION_PREVIEW_DELAY_MILLISECONDS;
  }

  public static startModalAndBackdropEntranceTransition(transitionDuration: string, modalElement: HTMLElement, 
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, backdropElement?: HTMLElement,
      transitionDelay?: string, modalElementProperties?: ElementStyleProperties): void {
    if (backdropElement) TransitionUtils.startBackdropDisplayTransition(backdropElement);
    const modalTransitionDelay = window.setTimeout(() => { 
      TransitionUtils.startModalEntranceTransition(
        transitionDuration, modalElement, unsetTransitionPropertiesCallback, backdropElement, modalElementProperties); 
    }, TransitionUtils.calculateTransitionDelay(backdropElement, transitionDelay));
    expandedModalPreviewModeState.setModalTransitionDelayState(modalTransitionDelay);
  }

  private static startBackdropHideTransition(backdropElement: HTMLElement) {
    backdropElement.style.opacity = OPACITY_INVISIBLE;
    backdropElement.style.transitionDuration = TransitionUtils.BACKDROP_FADE_OUT_TRANSITION_DURATION_SECONDS;
  }
  
  private static finishModalExitTransition(modalElement: HTMLElement, exitTransitionCallback: ExitTransitionCallback,
      backdropElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, modalOverlayElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    if (backdropElement) TransitionUtils.startBackdropHideTransition(backdropElement);
    exitTransitionCallback(modalElement, backdropElement, backdropProperties, toolbarElement,
      innerToolbarElement, modalOverlayElement, toolbarPositionToggleElement);
  }

  private static calculateTransitionDurationMilliseconds(wasPreviousTransitionInterrupted: boolean, transitionDuration: string): number {
    const transitionDurationMilliseconds = GeneralUtils.secondsStringToMillisecondsNumber(transitionDuration);
    return wasPreviousTransitionInterrupted
      ? transitionDurationMilliseconds - TransitionUtils.EXIT_TRANSITION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS
      : transitionDurationMilliseconds;
  }

  public static startModalAndBackdropExitTransition(transitionDuration: string, modalElement: HTMLElement, exitTransitionCallback: ExitTransitionCallback,
      backdropElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement, innerToolbarElement: HTMLElement,
      toolbarPositionToggleElement: HTMLElement, modalOverlayElement?: HTMLElement, wasPreviousTransitionInterrupted?: boolean,
      modalElementProperties?: ElementStyleProperties): void {
    TransitionUtils.setModalTransitionProperties(modalElement, OPACITY_INVISIBLE, ALL_PROPERTIES, transitionDuration,
      LINEAR_SPEED_TRANSITION, modalElementProperties);
    expandedModalPreviewModeState.markBeginningTimeOfTransitionState();
    const pendingModalTransitionEnd = window.setTimeout(() => {
      TransitionUtils.finishModalExitTransition(modalElement, exitTransitionCallback, backdropElement, backdropProperties, toolbarElement,
        innerToolbarElement, modalOverlayElement, toolbarPositionToggleElement);
    }, TransitionUtils.calculateTransitionDurationMilliseconds(wasPreviousTransitionInterrupted, transitionDuration));
    expandedModalPreviewModeState.setPendingModalTransitionEndState(pendingModalTransitionEnd);
  }
}
