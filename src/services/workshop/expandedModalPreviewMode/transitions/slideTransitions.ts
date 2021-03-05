import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION, ENTRANCE_TRANSITION_DELAY_MILLISECONDS } from '../utils/sharedConsts';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { ExitTransitionCallback } from '../../../../interfaces/modalTransitions';
import { BackdropProperties } from '../../../../interfaces/workshopComponent';
import TransitionsUtils from '../utils/transitionsUtils';

export default class SlideTransitions {

  private static SLIDE_IN_BACKDROP_TRANSITION_DURATION_SECONDS = '0.1s';
  private static SLIDE_OUT_BACKDROP_TRANSITION_DURATION_SECONDS = '0.15s';
  private static SLIDE_DISTANCE_NUMBER = 40;

  private static displayBackdrop(backdropElement: HTMLElement) {
    backdropElement.style.opacity = OPACITY_VISIBLE;
    backdropElement.style.transitionDuration = SlideTransitions.SLIDE_IN_BACKDROP_TRANSITION_DURATION_SECONDS;
  }

  public static initiate(transitionDuration: string, modalElement: HTMLElement,
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, backdropElement?: HTMLElement): void {
    if (backdropElement) SlideTransitions.displayBackdrop(backdropElement);
    const currentTopStyleValue = modalElement.style.top;
    const currentTopStyleValueNumber = Number.parseInt(currentTopStyleValue);
    expandedModalPreviewModeState.setCurrentExitTransitionModalDefaultPropertiesState({top: currentTopStyleValue});
    modalElement.style.top = `${currentTopStyleValueNumber - SlideTransitions.SLIDE_DISTANCE_NUMBER}px`;
    const pendingTransitionInit = window.setTimeout(() => {
      expandedModalPreviewModeState.setIsModeToggleInitialFadeOutTransitionInProgress(false);
      modalElement.style.opacity = OPACITY_VISIBLE;
      modalElement.style.transitionProperty = ALL_PROPERTIES;
      modalElement.style.top = currentTopStyleValue;
      modalElement.style.transitionDuration = transitionDuration;
      modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
      expandedModalPreviewModeState.markBeginningTimeOfTransitionState();
      const pendingTransitionEnding = window.setTimeout(() => {
        if (unsetTransitionPropertiesCallback) unsetTransitionPropertiesCallback(modalElement, backdropElement);
        // the reason why the states are set to false here, because there is no callback
        expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(false);
        expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(false);
      }, TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration));
      expandedModalPreviewModeState.setPendingTransitionEndingState(pendingTransitionEnding);
    }, ENTRANCE_TRANSITION_DELAY_MILLISECONDS);
    expandedModalPreviewModeState.setPendingTransitionInitState(pendingTransitionInit);
  }

  private static hideBackdrop(backdropElement: HTMLElement) {
    backdropElement.style.opacity = OPACITY_INVISIBLE;
    backdropElement.style.transitionDuration = SlideTransitions.SLIDE_OUT_BACKDROP_TRANSITION_DURATION_SECONDS;
  }

  public static exit(transitionDuration: string, modalElement: HTMLElement, exitTransitionCallback: ExitTransitionCallback, backdropElement: HTMLElement,
      backdropProperties: BackdropProperties, toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    const currentTopStyleValue = modalElement.style.top;
    const currentTopStyleValueNumber = Number.parseInt(currentTopStyleValue);
    expandedModalPreviewModeState.setCurrentExitTransitionModalDefaultPropertiesState({top: currentTopStyleValue});
    modalElement.style.transitionProperty = ALL_PROPERTIES;
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalElement.style.transitionDuration = transitionDuration;
    modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    modalElement.style.top = `${currentTopStyleValueNumber - SlideTransitions.SLIDE_DISTANCE_NUMBER}px`;
    expandedModalPreviewModeState.markBeginningTimeOfTransitionState();
    const pendingTransitionEnding = window.setTimeout(() => {
      if (backdropElement) SlideTransitions.hideBackdrop(backdropElement);
      exitTransitionCallback(modalElement, backdropElement, backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement);
    }, TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration));
    expandedModalPreviewModeState.setPendingTransitionEndingState(pendingTransitionEnding);
  }
}
