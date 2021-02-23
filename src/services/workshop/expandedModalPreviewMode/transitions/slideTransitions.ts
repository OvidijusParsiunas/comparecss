import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION, ENTRANCE_TRANSITION_DELAY_MILLISECONDS } from './sharedConsts';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { ExitCallback } from '../../../../interfaces/modalTransitions';
import TransitionsUtils from './utils/transitionsUtils';

export default class SlideTransitions {

  private static SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.1s';
  private static SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.15s';
  private static SLIDE_DISTANCE_NUMBER = 40;

  private static displayBackground(backgroundElement: HTMLElement) {
    backgroundElement.style.opacity = OPACITY_VISIBLE;
    backgroundElement.style.transitionDuration = SlideTransitions.SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS;
  }

  public static initiate(transitionDuration: string, modalElement: HTMLElement,
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, backgroundElement?: HTMLElement): void {
    if (backgroundElement) SlideTransitions.displayBackground(backgroundElement);
    const currentTopStyleValue = modalElement.style.top;
    const currentTopStyleValueNumber = Number.parseInt(currentTopStyleValue);
    expandedModalPreviewModeState.setCurrentExitTransitionModalDefaultPropertiesState({top: currentTopStyleValue});
    modalElement.style.top = `${currentTopStyleValueNumber - SlideTransitions.SLIDE_DISTANCE_NUMBER}px`;
    const pendingTransitionInit = setTimeout(() => {
      modalElement.style.opacity = OPACITY_VISIBLE;
      modalElement.style.transitionProperty = ALL_PROPERTIES;
      modalElement.style.top = currentTopStyleValue;
      modalElement.style.transitionDuration = transitionDuration;
      modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
      const pendingTransitionEnding = setTimeout(() => {
        if (unsetTransitionPropertiesCallback) unsetTransitionPropertiesCallback(modalElement, backgroundElement);
        // the reason why the transition progress is set to false here, because there is no good callback
        expandedModalPreviewModeState.setIsTransitionInProgressState(false);
      }, TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration));
      expandedModalPreviewModeState.setPendingTransitionEndingState(pendingTransitionEnding);
    }, ENTRANCE_TRANSITION_DELAY_MILLISECONDS);
    expandedModalPreviewModeState.setPendingTransitionInitState(pendingTransitionInit);
  }

  private static hideBackground(backgroundElement: HTMLElement) {
    backgroundElement.style.opacity = OPACITY_INVISIBLE;
    backgroundElement.style.transitionDuration = SlideTransitions.SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS;
  }

  public static exit(transitionDuration: string, modalElement: HTMLElement, exitCallback: ExitCallback, backgroundElement: HTMLElement,
      toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    const currentTopStyleValue = modalElement.style.top;
    const currentTopStyleValueNumber = Number.parseInt(currentTopStyleValue);
    expandedModalPreviewModeState.setCurrentExitTransitionModalDefaultPropertiesState({top: currentTopStyleValue});
    modalElement.style.transitionProperty = ALL_PROPERTIES;
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalElement.style.transitionDuration = transitionDuration;
    modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    modalElement.style.top = `${currentTopStyleValueNumber - SlideTransitions.SLIDE_DISTANCE_NUMBER}px`;
    const pendingTransitionEnding = setTimeout(() => {
      if (backgroundElement) SlideTransitions.hideBackground(backgroundElement);
      exitCallback(modalElement, backgroundElement, toolbarElement, innerToolbarElement, toolbarPositionToggleElement);
    }, TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration));
    expandedModalPreviewModeState.setPendingTransitionEndingState(pendingTransitionEnding);
  }
}
