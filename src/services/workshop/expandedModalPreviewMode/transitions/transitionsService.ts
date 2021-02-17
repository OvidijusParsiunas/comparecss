import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../../consts/expandedModalToolbarContainerPositionClasses.enum';
import { ExitCallback, ModalEntranceTransition, ModalExitTransition } from '../../../../interfaces/modalTransitions';
import { OPACITY_INVISIBLE, OPACITY_VISIBLE, LINEAR_SPEED_TRANSITION, OPACITY_PROPERTY } from './sharedConsts';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';

export interface TransitionAnimationProperties {
  transitionDuration?: string;
  transitionProperty: string;
  transitionTimingFunction: string;
}

export default class TransitionsService {
  // TO-DO these values will probably need to be placed in a const area as they will be used to set everything back to normal
  private static BACKGROUND_ELEMENT_DEFAULT_CLASS = 'component-preview-container-default';
  private static BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS = 'component-preview-container-modal';
  private static TOOLBAR_CONTAINER_ELEMENT_DEFAULT_CLASS = 'toolbar-container-default';
  private static TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS = 'toolbar-container-modal-preview-active';
  private static TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS = 'toolbar-modal-preview-active';
  private static START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS = 150;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS = 150;
  private static START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS = `${TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS = `${TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DELAY_MILLISECONDS = 50;
  private static INTIIAL_EXPANDED_MODAL_TRANSITION_VALUES: TransitionAnimationProperties = {
    transitionProperty: OPACITY_PROPERTY,
    transitionTimingFunction: LINEAR_SPEED_TRANSITION,
  };

  private static opacityFadeAnimation(opacity: string, transitionDuration: string, ...elements: HTMLElement[]): void {
    const { transitionProperty, transitionTimingFunction } = TransitionsService.INTIIAL_EXPANDED_MODAL_TRANSITION_VALUES;
    elements.forEach((element) => {
      element.style.transitionDuration = transitionDuration;
      element.style.transitionProperty = transitionProperty;
      element.style.transitionTimingFunction = transitionTimingFunction;
      element.style.opacity = opacity;
    });
  }

  private static exitToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    toolbarElement.classList.remove(TransitionsService.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS);
    toolbarContainerElement.classList.replace(TransitionsService.TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS, TransitionsService.TOOLBAR_CONTAINER_ELEMENT_DEFAULT_CLASS);
    if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.replace(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM, EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.TOP);
    }
    toolbarPositionToggleElement.style.display = 'none';
    TransitionsService.opacityFadeAnimation(OPACITY_VISIBLE, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
  }

  private static exitPreviewTransition(backgroundElement: HTMLElement, modalElement: HTMLElement): void {
    backgroundElement.classList.replace(TransitionsService.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS, TransitionsService.BACKGROUND_ELEMENT_DEFAULT_CLASS);
    TransitionsService.opacityFadeAnimation(OPACITY_VISIBLE, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS,
      backgroundElement, modalElement);
    setTimeout(() => {
      expandedModalPreviewModeState.setIsTransitionInProgressState(false);
    }, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DELAY_MILLISECONDS);
  }

  private static exitCallback(backgroundElement: HTMLElement, modalElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    TransitionsService.exitPreviewTransition(backgroundElement, modalElement);
    TransitionsService.exitToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
  }

  public static exit(backgroundElement: HTMLElement, modalElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, modalExitTransition: ModalExitTransition): void {
    TransitionsService.opacityFadeAnimation(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    modalExitTransition(backgroundElement, modalElement, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, TransitionsService.exitCallback as ExitCallback);
  }

  private static startToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    TransitionsService.opacityFadeAnimation(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    setTimeout(() => {
      toolbarElement.classList.add(TransitionsService.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS);
      toolbarContainerElement.classList.replace(TransitionsService.TOOLBAR_CONTAINER_ELEMENT_DEFAULT_CLASS, TransitionsService.TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS);
      if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
        toolbarContainerElement.classList.replace(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.TOP, EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
      }
      toolbarPositionToggleElement.style.display = 'block';
      toolbarContainerElement.style.opacity = OPACITY_VISIBLE;
    }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }
  
  private static startPreviewTransition(backgroundElement: HTMLElement, modalElement: HTMLElement, modalEntranceTransition: ModalEntranceTransition): void {
    TransitionsService.opacityFadeAnimation(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS,
      backgroundElement, modalElement);
    setTimeout(() => {
      backgroundElement.classList.replace(TransitionsService.BACKGROUND_ELEMENT_DEFAULT_CLASS, TransitionsService.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS);
      modalEntranceTransition(backgroundElement, modalElement);
    }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }

  public static initiate(backgroundElement: HTMLElement, modalElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, modalEntranceTransition: ModalEntranceTransition): void {
    TransitionsService.startPreviewTransition(backgroundElement, modalElement, modalEntranceTransition);
    TransitionsService.startToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    expandedModalPreviewModeState.setIsTransitionInProgressState(true);
  }

  public static toggleToolbarPosition(toolbarContainerElement: HTMLElement): void {
    const newExpandedModalModeToolbarContainerPositionState = expandedModalPreviewModeState.
      getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM
      ? EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.TOP
      : EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM;
    TransitionsService.opacityFadeAnimation(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    setTimeout(() => {
      toolbarContainerElement.classList.replace(expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState(),
      newExpandedModalModeToolbarContainerPositionState);
      expandedModalPreviewModeState.setExpandedModalModeToolbarContainerPositionState(newExpandedModalModeToolbarContainerPositionState);
      TransitionsService.opacityFadeAnimation(OPACITY_VISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }
}
