import { toolbarPositionDuringModalPreviewState, TOOLBAR_POSITIONS_DURING_MODAL_PREVIEW } from '../../../../components/content/workshop/toolbar/positionDuringModalPreviewModeState/positionDuringModalPreviewModeState';
import { OPACITY_INVISIBLE, OPACITY_VISIBLE, LINEAR_SPEED_TRANSITION, OPACITY_PROPERTY } from './sharedConsts';
import { ModalTransitions, ExitCallback } from '../../../../interfaces/modalTransitions';

export interface TransitionAnimationProperties {
  transitionDuration?: string;
  transitionProperty: string;
  transitionTimingFunction: string;
}

export default class ModeToggleTransitions {
  // TO-DO these values will probably need to be placed in a const area as they will be used to set everything back to normal
  private static BACKGROUND_ELEMENT_DEFAULT_CLASS = 'component-preview-container-default';
  private static BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS = 'component-preview-container-modal';
  private static TOOLBAR_CONTAINER_ELEMENT_DEFAULT_CLASS = 'toolbar-container-default';
  private static TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS = 'toolbar-container-modal-preview-active';
  private static TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS = 'toolbar-modal-preview-active';
  private static TOOLBAR_CONTAINER_ELEMENT_POSITION_TOP_CLASS = 'toolbar-container-position-top';
  private static TOOLBAR_CONTAINER_ELEMENT_POSITION_BOTTOM_CLASS = 'toolbar-container-modal-preview-active-position-bottom';
  private static START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS = 150;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS = 150;
  private static START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS = `${ModeToggleTransitions.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS = `${ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DELAY_MILLISECONDS = 50; // if this value is increased, will need to prevent highlighting of subcomponents (test with fade)
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

  private static exitToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    toolbarElement.classList.remove(ModeToggleTransitions.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS);
    toolbarContainerElement.classList.replace(ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS, ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_DEFAULT_CLASS);
    if (toolbarPositionDuringModalPreviewState.getToolbarPositionDuringModalPreviewState() === TOOLBAR_POSITIONS_DURING_MODAL_PREVIEW.BOTTOM) {
      toolbarContainerElement.classList.replace(ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_POSITION_BOTTOM_CLASS, ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_POSITION_TOP_CLASS);
    }
    setTimeout(() => {
      ModeToggleTransitions.opacityFadeAnimation(OPACITY_VISIBLE, ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    }, ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DELAY_MILLISECONDS);
  }

  private static exitPreviewTransition(backgroundElement: HTMLElement, modalElement: HTMLElement): void {
    backgroundElement.classList.replace(ModeToggleTransitions.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS, ModeToggleTransitions.BACKGROUND_ELEMENT_DEFAULT_CLASS);
    setTimeout(() => {
      ModeToggleTransitions.opacityFadeAnimation(OPACITY_VISIBLE, ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS,
        backgroundElement, modalElement);
    }, ModeToggleTransitions.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DELAY_MILLISECONDS);
  }

  private static exitCallback(backgroundElement: HTMLElement, modalElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    ModeToggleTransitions.exitPreviewTransition(backgroundElement, modalElement);
    ModeToggleTransitions.exitToolbarTransition(toolbarContainerElement, toolbarElement);
  }

  public static exit(backgroundElement: HTMLElement, modalElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, modalTransitions: ModalTransitions): void {
    ModeToggleTransitions.opacityFadeAnimation(OPACITY_INVISIBLE, ModeToggleTransitions.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    modalTransitions.exit(backgroundElement, modalElement, toolbarContainerElement, toolbarElement, ModeToggleTransitions.exitCallback as ExitCallback);
  }

  private static startToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    ModeToggleTransitions.opacityFadeAnimation(OPACITY_INVISIBLE, ModeToggleTransitions.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    setTimeout(() => {
      toolbarElement.classList.add(ModeToggleTransitions.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS);
      toolbarContainerElement.classList.replace(ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_DEFAULT_CLASS, ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS);
      if (toolbarPositionDuringModalPreviewState.getToolbarPositionDuringModalPreviewState() === TOOLBAR_POSITIONS_DURING_MODAL_PREVIEW.BOTTOM) {
        toolbarContainerElement.classList.replace(ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_POSITION_TOP_CLASS, ModeToggleTransitions.TOOLBAR_CONTAINER_ELEMENT_POSITION_BOTTOM_CLASS);
      }
      toolbarContainerElement.style.opacity = OPACITY_VISIBLE;
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

  public static initiate(backgroundElement: HTMLElement, modalElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, modalTransitions: ModalTransitions): void {
    ModeToggleTransitions.startPreviewTransition(backgroundElement, modalElement, modalTransitions);
    ModeToggleTransitions.startToolbarTransition(toolbarContainerElement, toolbarElement);
  }
}
