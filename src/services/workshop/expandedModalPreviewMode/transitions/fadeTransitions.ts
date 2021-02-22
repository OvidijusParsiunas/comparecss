import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION, ENTRANCE_TRANSITION_DELAY_MILLISECONDS } from './sharedConsts';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { ExitCallback } from '../../../../interfaces/modalTransitions';

export default class FadeTransitions {

  private static SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.1s';
  private static SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS_MILLISECONDS = 300;
  private static SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS = `${FadeTransitions.SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS_MILLISECONDS / 1000}s`;

  private static SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS = 250;
  private static SLIDE_OUT_MODAL_TRANSITION_DURATION_SECONDS = `${FadeTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.15s';

  private static displayBackground(backgroundElement: HTMLElement) {
    backgroundElement.style.opacity = OPACITY_VISIBLE;
    backgroundElement.style.transitionDuration = FadeTransitions.SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS;
  }

  public static initiate(modalElement: HTMLElement, unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void,
      backgroundElement?: HTMLElement): void {
    if (backgroundElement) FadeTransitions.displayBackground(backgroundElement);
    const pendingTransitionInit = setTimeout(() => {
      modalElement.style.opacity = OPACITY_VISIBLE;
      modalElement.style.transitionProperty = ALL_PROPERTIES;
      modalElement.style.transitionDuration = FadeTransitions.SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS;
      modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
      const pendingTransitionEnding = setTimeout(() => {
        if (unsetTransitionPropertiesCallback) unsetTransitionPropertiesCallback(modalElement, backgroundElement);
        // the reason why the transition progress is set to false here, because there is no good callback
        expandedModalPreviewModeState.setIsTransitionInProgressState(false);
      }, FadeTransitions.SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS_MILLISECONDS);
      expandedModalPreviewModeState.setPendingTransitionEndingState(pendingTransitionEnding);
    }, ENTRANCE_TRANSITION_DELAY_MILLISECONDS);
    expandedModalPreviewModeState.setPendingTransitionInitState(pendingTransitionInit);
  }

  private static hideBackground(backgroundElement: HTMLElement) {
    backgroundElement.style.opacity = OPACITY_INVISIBLE;
    backgroundElement.style.transitionDuration = FadeTransitions.SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS;
  }

  public static exit(modalElement: HTMLElement, exitCallback: ExitCallback, backgroundElement: HTMLElement,
      toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    modalElement.style.transitionProperty = ALL_PROPERTIES;
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalElement.style.transitionDuration = FadeTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_SECONDS;
    modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    const pendingTransitionEnding = setTimeout(() => {
      if (backgroundElement) FadeTransitions.hideBackground(backgroundElement);
      exitCallback(modalElement, backgroundElement, toolbarElement, innerToolbarElement, toolbarPositionToggleElement);
    }, FadeTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS);
    expandedModalPreviewModeState.setPendingTransitionEndingState(pendingTransitionEnding);
  }
}
