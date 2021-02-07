import { OPACITY_INVISIBLE, OPACITY_VISIBLE, LINEAR_SPEED_TRANSITION, OPACITY_PROPERTY } from './sharedConsts';
import { ModalTransitions, ExitPreviewCallback } from '../../../../interfaces/modalTransitions';

export interface TransitionAnimationProperties {
  transitionDuration?: string;
  transitionProperty: string;
  transitionTimingFunction: string;
}

export default class ModeToggleTransitions {
  // TO-DO these values will probably need to be placed in a const area as they will be used to set everything back to normal
  private static BACKGROUND_ELEMENT_DEFAULT_CLASS = 'component-preview-container-default';
  private static BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS = 'component-preview-container-modal';
  private static TOOLBAR_ELEMENT_DEFAULT_CLASS = 'toolbar-container-default';
  private static TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS = 'toolbar-container-modal';
  private static TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS = 'toolbar-container-inner-modal';
  private static START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS = 150;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS = 150;
  private static START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS = `${ModeToggleTransitions.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS = `${ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static INTIIAL_EXPANDED_MODAL_TRANSITION_VALUES: TransitionAnimationProperties = {
    transitionProperty: OPACITY_PROPERTY,
    transitionTimingFunction: LINEAR_SPEED_TRANSITION,
  };

  private static opacityFadeAnimation(opacity: string, transitionDuration: string, ...elements: HTMLElement[]): void {
    const { transitionProperty, transitionTimingFunction } = ModeToggleTransitions.INTIIAL_EXPANDED_MODAL_TRANSITION_VALUES;
    elements.forEach((element) => {
      element.style.transitionDuration = transitionDuration;
      element.style.transitionProperty = transitionProperty;
      element.style.transitionTimingFunction = transitionTimingFunction;
      element.style.opacity = opacity;
    });
  }

  private static exitToolbarTransition(toolbarElement: HTMLElement, innerToolbarElement: HTMLElement): void {
      innerToolbarElement.classList.remove(ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS);
      toolbarElement.classList.replace(ModeToggleTransitions.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS, ModeToggleTransitions.TOOLBAR_ELEMENT_DEFAULT_CLASS);
      setTimeout(() => {
        ModeToggleTransitions.opacityFadeAnimation(OPACITY_VISIBLE, ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarElement);
      }, ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }

  private static exitPreviewTransition(backgroundElement: HTMLElement, modalElement: HTMLElement): void {
    backgroundElement.classList.replace(ModeToggleTransitions.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS, ModeToggleTransitions.BACKGROUND_ELEMENT_DEFAULT_CLASS);
    setTimeout(() => {
      ModeToggleTransitions.opacityFadeAnimation(OPACITY_VISIBLE, ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS,
        backgroundElement, modalElement);
    }, ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }

  private static exitPreviewCallback(backgroundElement: HTMLElement, modalElement: HTMLElement,
      toolbarElement: HTMLElement, innerToolbarElement: HTMLElement): void {
    ModeToggleTransitions.exitPreviewTransition(backgroundElement, modalElement);
    ModeToggleTransitions.exitToolbarTransition(toolbarElement, innerToolbarElement);
  }

  public static exitPreview(backgroundElement: HTMLElement, modalElement: HTMLElement,
      toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, modalTransitions: ModalTransitions): void {
    ModeToggleTransitions.opacityFadeAnimation(OPACITY_INVISIBLE, ModeToggleTransitions.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarElement);
    modalTransitions.exit(backgroundElement, modalElement, toolbarElement, innerToolbarElement, ModeToggleTransitions.exitPreviewCallback as ExitPreviewCallback);
  }

  private static startToolbarTransition(toolbarElement: HTMLElement, innerToolbarElement: HTMLElement): void {
    ModeToggleTransitions.opacityFadeAnimation(OPACITY_INVISIBLE, ModeToggleTransitions.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarElement);
    setTimeout(() => {
      innerToolbarElement.classList.add(ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS);
      toolbarElement.classList.replace(ModeToggleTransitions.TOOLBAR_ELEMENT_DEFAULT_CLASS, ModeToggleTransitions.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS);
      toolbarElement.style.opacity = OPACITY_VISIBLE;
    }, ModeToggleTransitions.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }
  
  private static startPreviewTransition(backgroundElement: HTMLElement, modalElement: HTMLElement, modalTransitions: ModalTransitions): void {
    ModeToggleTransitions.opacityFadeAnimation(OPACITY_INVISIBLE, ModeToggleTransitions.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS,
      backgroundElement, modalElement);
    setTimeout(() => {
      backgroundElement.classList.replace(ModeToggleTransitions.BACKGROUND_ELEMENT_DEFAULT_CLASS, ModeToggleTransitions.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS);
      modalTransitions.initiate(backgroundElement, modalElement);
    }, ModeToggleTransitions.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }

  public static startPreview(backgroundElement: HTMLElement, modalElement: HTMLElement,
      toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, modalTransitions: ModalTransitions): void {
    ModeToggleTransitions.startPreviewTransition(backgroundElement, modalElement, modalTransitions);
    ModeToggleTransitions.startToolbarTransition(toolbarElement, innerToolbarElement);
  }
}
