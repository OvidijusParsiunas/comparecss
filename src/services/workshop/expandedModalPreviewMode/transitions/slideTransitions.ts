import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION, UNSET } from './sharedConsts';
import { ExitCallback } from '../../../../interfaces/modalTransitions';

export default class SlideTransitions {

  private static MODAL_TOP_POSITION_DELTA = '-50.4vh';

  private static SLIDE_IN_INITIAL_MODAL_TOP_POSITION = '0px';
  private static SLIDE_IN_FINAL_MODAL_TOP_POSITION = '40px';
  private static SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.1s';
  private static SLIDE_IN_MODAL_TRANSITION_DELAY_MILLISECONDS = 150;
  private static SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS = '0.3s';

  private static SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS = 250;
  private static SLIDE_OUT_MODAL_TRANSITION_DURATION_SECONDS = `${SlideTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.15s';

  public static initiate(modalElement: HTMLElement, unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void,
      backgroundElement?: HTMLElement): void {
    backgroundElement.style.opacity = OPACITY_VISIBLE;
    backgroundElement.style.transitionDuration = SlideTransitions.SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS;
    modalElement.style.marginTop = SlideTransitions.MODAL_TOP_POSITION_DELTA;
    modalElement.style.top = SlideTransitions.SLIDE_IN_INITIAL_MODAL_TOP_POSITION;
    setTimeout(() => {
      modalElement.style.opacity = OPACITY_VISIBLE;
      modalElement.style.transitionProperty = ALL_PROPERTIES;
      modalElement.style.top = SlideTransitions.SLIDE_IN_FINAL_MODAL_TOP_POSITION;
      modalElement.style.transitionDuration = SlideTransitions.SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS;
      modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
      unsetTransitionPropertiesCallback(modalElement, backgroundElement);
    }, SlideTransitions.SLIDE_IN_MODAL_TRANSITION_DELAY_MILLISECONDS);
  }

  public static exit(backgroundElement: HTMLElement, modalElement: HTMLElement, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, exitCallback: ExitCallback): void {
    modalElement.style.transitionProperty = ALL_PROPERTIES;
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalElement.style.top = SlideTransitions.SLIDE_IN_INITIAL_MODAL_TOP_POSITION;
    modalElement.style.transitionDuration = SlideTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_SECONDS;
    modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    setTimeout(() => {
      backgroundElement.style.opacity = OPACITY_INVISIBLE;
      backgroundElement.style.transitionDuration = SlideTransitions.SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS;
      modalElement.style.marginTop = UNSET;
      modalElement.style.top = UNSET;
      exitCallback(backgroundElement, modalElement, toolbarElement, innerToolbarElement, toolbarPositionToggleElement);
    }, SlideTransitions.SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS);
  }
}
