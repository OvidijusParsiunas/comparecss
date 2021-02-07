import { OPACITY_INVISIBLE, OPACITY_VISIBLE, ALL_PROPERTIES, LINEAR_SPEED_TRANSITION, UNSET } from './sharedConsts';
import { ModalTransitions, ExitPreviewCallback } from '../../../../interfaces/modalTransitions';

export default class SlideTransitions implements ModalTransitions {

  private MODAL_TOP_POSITION_DELTA = '-50.4vh';

  private SLIDE_IN_INITIAL_MODAL_TOP_POSITION = '0px';
  private SLIDE_IN_FINAL_MODAL_TOP_POSITION = '40px';
  private SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.1s';
  private SLIDE_IN_MODAL_TRANSITION_DELAY_MILLISECONDS = 150;
  private SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS = '0.3s';

  private SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS = 250;
  private SLIDE_OUT_MODAL_TRANSITION_DURATION_SECONDS = `${this.SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS = '0.15s';

  public initiate(backgroundElement: HTMLElement, modalElement: HTMLElement): void {
    backgroundElement.style.opacity = OPACITY_VISIBLE;
    backgroundElement.style.transitionDuration = this.SLIDE_IN_BACKGROUND_TRANSITION_DURATION_SECONDS;
    modalElement.style.marginTop = this.MODAL_TOP_POSITION_DELTA;
    modalElement.style.top = this.SLIDE_IN_INITIAL_MODAL_TOP_POSITION;
    setTimeout(() => {
      modalElement.style.opacity = OPACITY_VISIBLE;
      modalElement.style.transitionProperty = ALL_PROPERTIES;
      modalElement.style.top = this.SLIDE_IN_FINAL_MODAL_TOP_POSITION;
      modalElement.style.transitionDuration = this.SLIDE_IN_MODAL_TRANSITION_DURATION_SECONDS;
      modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    }, this.SLIDE_IN_MODAL_TRANSITION_DELAY_MILLISECONDS);
  }

  public exit(backgroundElement: HTMLElement, modalElement: HTMLElement, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, exitPreviewCallback: ExitPreviewCallback): void {
    modalElement.style.transitionProperty = ALL_PROPERTIES;
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalElement.style.top = this.SLIDE_IN_INITIAL_MODAL_TOP_POSITION;
    modalElement.style.transitionDuration = this.SLIDE_OUT_MODAL_TRANSITION_DURATION_SECONDS;
    modalElement.style.transitionTimingFunction = LINEAR_SPEED_TRANSITION;
    setTimeout(() => {
      backgroundElement.style.opacity = OPACITY_INVISIBLE;
      backgroundElement.style.transitionDuration = this.SLIDE_OUT_BACKGROUND_TRANSITION_DURATION_SECONDS;
      modalElement.style.marginTop = UNSET;
      modalElement.style.top = UNSET;
      exitPreviewCallback(backgroundElement, modalElement, toolbarElement, innerToolbarElement);
    }, this.SLIDE_OUT_MODAL_TRANSITION_DURATION_MILLISECONDS);
  }
}
