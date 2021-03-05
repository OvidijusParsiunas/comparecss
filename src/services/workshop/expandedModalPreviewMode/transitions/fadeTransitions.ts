import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION, ENTRANCE_TRANSITION_DELAY_MILLISECONDS } from '../utils/sharedConsts';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { ExitTransitionCallback } from '../../../../interfaces/modalTransitions';
import { BackdropProperties } from '../../../../interfaces/workshopComponent';
import TransitionsUtils from '../utils/transitionsUtils';

export default class FadeTransitions {

  private static SLIDE_IN_BACKDROP_TRANSITION_DURATION_SECONDS = '0.1s';
  private static SLIDE_OUT_BACKDROP_TRANSITION_DURATION_SECONDS = '0.15s';

  private static displayBackdrop(backdropElement: HTMLElement) {
    backdropElement.style.opacity = OPACITY_VISIBLE;
    backdropElement.style.transitionDuration = FadeTransitions.SLIDE_IN_BACKDROP_TRANSITION_DURATION_SECONDS;
  }

  public static initiate(transitionDuration: string, modalElement: HTMLElement, unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void,
      backdropElement?: HTMLElement): void {
    if (backdropElement) FadeTransitions.displayBackdrop(backdropElement);
    const pendingModalTransitionStart = window.setTimeout(() => {
      expandedModalPreviewModeState.setIsModeToggleInitialFadeOutTransitionInProgress(false);
      modalElement.style.opacity = OPACITY_VISIBLE;
      modalElement.style.transitionProperty = ALL_PROPERTIES;
      modalElement.style.transitionDuration = transitionDuration;
      modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
      expandedModalPreviewModeState.markBeginningTimeOfTransitionState();
      const pendingModalTransitionEnd = window.setTimeout(() => {
        if (unsetTransitionPropertiesCallback) unsetTransitionPropertiesCallback(modalElement, backdropElement);
        // the reason why the states are set to false here, because there is no callback
        expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(false);
        expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(false);
      }, TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration));
      expandedModalPreviewModeState.setPendingModalTransitionEndState(pendingModalTransitionEnd);
    }, ENTRANCE_TRANSITION_DELAY_MILLISECONDS);
    expandedModalPreviewModeState.setPendingModalTransitionStartState(pendingModalTransitionStart);
  }

  private static hideBackdrop(backdropElement: HTMLElement) {
    backdropElement.style.opacity = OPACITY_INVISIBLE;
    backdropElement.style.transitionDuration = FadeTransitions.SLIDE_OUT_BACKDROP_TRANSITION_DURATION_SECONDS;
  }

  public static exit(transitionDuration: string, modalElement: HTMLElement, exitTransitionCallback: ExitTransitionCallback, backdropElement: HTMLElement,
      backdropProperties: BackdropProperties, toolbarElement: HTMLElement, innerToolbarElement: HTMLElement,
      toolbarPositionToggleElement: HTMLElement, wasPreviousTransitionInterrupted?: boolean): void {
    modalElement.style.transitionProperty = ALL_PROPERTIES;
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalElement.style.transitionDuration = transitionDuration;
    modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    expandedModalPreviewModeState.markBeginningTimeOfTransitionState();
    const transitionDurationMilliseconds = TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration);
    const pendingModalTransitionEnd = window.setTimeout(() => {
      if (backdropElement) FadeTransitions.hideBackdrop(backdropElement);
      exitTransitionCallback(modalElement, backdropElement, backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement);
      // use const
    }, wasPreviousTransitionInterrupted ? transitionDurationMilliseconds - 420 : transitionDurationMilliseconds);
    expandedModalPreviewModeState.setPendingModalTransitionEndState(pendingModalTransitionEnd);
  }
}
