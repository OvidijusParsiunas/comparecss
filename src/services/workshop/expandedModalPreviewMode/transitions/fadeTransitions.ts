import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION, UNSET } from './sharedConsts';
import { ExitCallback } from '../../../../interfaces/modalTransitions';

export default class FadeTransitions {

  private static SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.1s';
  private static SLIDE_IN_MODAL_TRANSITION_DELAY_MILLISECONDS = 150;
  private static SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS = '0.3s';

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
    setTimeout(() => {
      modalElement.style.opacity = OPACITY_VISIBLE;
      modalElement.style.transitionProperty = ALL_PROPERTIES;
      modalElement.style.transitionDuration = FadeTransitions.SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS;
      modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
      setTimeout(() => {
        if (unsetTransitionPropertiesCallback) unsetTransitionPropertiesCallback(modalElement, backgroundElement);
      }, FadeTransitions.SLIDE_IN_MODAL_TRANSITION_DELAY_MILLISECONDS);
    }, FadeTransitions.SLIDE_IN_MODAL_TRANSITION_DELAY_MILLISECONDS);
  }

  // separate function for the background
  public static exit(backgroundElement: HTMLElement, modalElement: HTMLElement, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, exitCallback: ExitCallback): void {
    modalElement.style.transitionProperty = ALL_PROPERTIES;
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalElement.style.transitionDuration = FadeTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_SECONDS;
    modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    setTimeout(() => {
      backgroundElement.style.opacity = OPACITY_INVISIBLE;
      backgroundElement.style.transitionDuration = FadeTransitions.SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS;
      modalElement.style.marginTop = UNSET;
      modalElement.style.top = UNSET;
      exitCallback(backgroundElement, modalElement, toolbarElement, innerToolbarElement, toolbarPositionToggleElement);
    }, FadeTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS);
  }
}
