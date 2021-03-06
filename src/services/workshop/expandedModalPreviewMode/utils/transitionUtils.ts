import {
  ENTRANCE_TRANSITION_DELAY_MILLISECONDS, OPACITY_INVISIBLE, OPACITY_VISIBLE, BACKDROP_FADE_OUT_TRANSITION_DURATION_SECONDS, ALL_PROPERTIES,
  LINEAR_SPEED_TRANSITION, BACKDROP_FADE_IN_TRANSITION_DURATION_SECONDS, EXIT_TRANSITION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS,
} from './sharedConsts';
import { ElementStyleProperties } from '../../../../interfaces/elementStyleProperties';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { ExitTransitionCallback } from '../../../../interfaces/modalTransitions';
import { BackdropProperties } from '../../../../interfaces/workshopComponent';
import GeneralUtils from './generalUtils';

export default class TransitionUtils {

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
    expandedModalPreviewModeState.setIsModeToggleInitialFadeOutTransitionInProgress(false);
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
    backdropElement.style.transitionDuration = BACKDROP_FADE_IN_TRANSITION_DURATION_SECONDS;
  }

  public static startModalAndBackdropEntranceTransition(transitionDuration: string, modalElement: HTMLElement, 
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void,
      backdropElement?: HTMLElement, modalElementProperties?: ElementStyleProperties): void {
    if (backdropElement) TransitionUtils.startBackdropDisplayTransition(backdropElement);
    const pendingModalEntranceTransition = window.setTimeout(() => {
      TransitionUtils.startModalEntranceTransition(
        transitionDuration, modalElement, unsetTransitionPropertiesCallback, backdropElement, modalElementProperties);  
    }, ENTRANCE_TRANSITION_DELAY_MILLISECONDS);
    expandedModalPreviewModeState.setPendingModalTransitionStartState(pendingModalEntranceTransition);
  }

  private static startBackdropHideTransition(backdropElement: HTMLElement) {
    backdropElement.style.opacity = OPACITY_INVISIBLE;
    backdropElement.style.transitionDuration = BACKDROP_FADE_OUT_TRANSITION_DURATION_SECONDS;
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
      ? transitionDurationMilliseconds - EXIT_TRANSITION_DURATION_REDUCTION_ON_NEW_DURATION_MILLISECONDS
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
