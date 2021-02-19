import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION, UNSET } from './sharedConsts';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { ExitCallback } from '../../../../interfaces/modalTransitions';

export default class SlideTransitions {

  private static MODAL_TOP_POSITION_DELTA = '-50.4vh';

  private static SLIDE_IN_INITIAL_MODAL_TOP_POSITION = '0px';
  private static SLIDE_IN_FINAL_MODAL_TOP_POSITION = '40px';
  private static SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.1s';
  private static SLIDE_IN_MODAL_TRANSITION_DELAY_MILLISECONDS = 150;
  private static SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS_MILLISECONDS = 300;
  private static SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS = `${SlideTransitions.SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS_MILLISECONDS / 1000}s`;

  private static SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS = 250;
  private static SLIDE_OUT_MODAL_TRANSITION_DURATION_SECONDS = `${SlideTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.15s';

  private static displayBackground(backgroundElement: HTMLElement) {
    backgroundElement.style.opacity = OPACITY_VISIBLE;
    backgroundElement.style.transitionDuration = SlideTransitions.SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS;
  }
  
  public static initiate(modalElement: HTMLElement, unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void,
      backgroundElement?: HTMLElement): void {
    if (backgroundElement) SlideTransitions.displayBackground(backgroundElement);
    modalElement.style.top = '-40px';
    // modalElement.style.marginTop = SlideTransitions.MODAL_TOP_POSITION_DELTA;
    // modalElement.style.top = SlideTransitions.SLIDE_IN_INITIAL_MODAL_TOP_POSITION;
    setTimeout(() => {
      modalElement.style.opacity = OPACITY_VISIBLE;
      modalElement.style.transitionProperty = ALL_PROPERTIES;
      modalElement.style.top = '0px';
      modalElement.style.transitionDuration = SlideTransitions.SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS;
      modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
      setTimeout(() => {
        if (unsetTransitionPropertiesCallback) unsetTransitionPropertiesCallback(modalElement, backgroundElement);
        expandedModalPreviewModeState.setIsTransitionInProgressState(false);
      }, SlideTransitions.SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS_MILLISECONDS);
    }, SlideTransitions.SLIDE_IN_MODAL_TRANSITION_DELAY_MILLISECONDS);
  }

  private static hideBackground(backgroundElement: HTMLElement) {
    backgroundElement.style.opacity = OPACITY_INVISIBLE;
    backgroundElement.style.transitionDuration = SlideTransitions.SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS;
  }
  
  public static exit(modalElement: HTMLElement, exitCallback: ExitCallback, backgroundElement: HTMLElement,
      toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    expandedModalPreviewModeState.setCurrentExitTransitionModalDefaultPropertiesState({top: UNSET});
    modalElement.style.transitionProperty = ALL_PROPERTIES;
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalElement.style.transitionDuration = SlideTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_SECONDS;
    modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    modalElement.style.top = '-40px';
    setTimeout(() => {
      if (backgroundElement) SlideTransitions.hideBackground(backgroundElement);
      exitCallback(modalElement, backgroundElement, toolbarElement, innerToolbarElement, toolbarPositionToggleElement);
    }, SlideTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS);
  }
}
