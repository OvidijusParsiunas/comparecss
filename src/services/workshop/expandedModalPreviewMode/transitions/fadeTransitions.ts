import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION, ENTRANCE_TRANSITION_DELAY_MILLISECONDS } from './sharedConsts';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { BackdropProperties } from '../../../../interfaces/workshopComponent';
import { ExitCallback } from '../../../../interfaces/modalTransitions';
import TransitionsUtils from './utils/transitionsUtils';

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
    const pendingTransitionInit = setTimeout(() => {
      modalElement.style.opacity = OPACITY_VISIBLE;
      modalElement.style.transitionProperty = ALL_PROPERTIES;
      modalElement.style.transitionDuration = transitionDuration;
      modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
      const pendingTransitionEnding = setTimeout(() => {
        if (unsetTransitionPropertiesCallback) unsetTransitionPropertiesCallback(modalElement, backdropElement);
        // the reason why the states are set to false here, because there is no callback
        expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(false);
        expandedModalPreviewModeState.setIsTransitionInProgressState(false);
      }, TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration));
      expandedModalPreviewModeState.setPendingTransitionEndingState(pendingTransitionEnding);
    }, ENTRANCE_TRANSITION_DELAY_MILLISECONDS);
    expandedModalPreviewModeState.setPendingTransitionInitState(pendingTransitionInit);
  }

  private static hideBackdrop(backdropElement: HTMLElement) {
    backdropElement.style.opacity = OPACITY_INVISIBLE;
    backdropElement.style.transitionDuration = FadeTransitions.SLIDE_OUT_BACKDROP_TRANSITION_DURATION_SECONDS;
  }

  public static exit(transitionDuration: string, modalElement: HTMLElement, exitCallback: ExitCallback, backdropElement: HTMLElement,
      backdropProperties: BackdropProperties, toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    modalElement.style.transitionProperty = ALL_PROPERTIES;
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalElement.style.transitionDuration = transitionDuration;
    modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    const pendingTransitionEnding = setTimeout(() => {
      if (backdropElement) FadeTransitions.hideBackdrop(backdropElement);
      exitCallback(modalElement, backdropElement, backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement);
    }, TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration));
    expandedModalPreviewModeState.setPendingTransitionEndingState(pendingTransitionEnding);
  }
}
