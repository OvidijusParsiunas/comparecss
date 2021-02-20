import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../../consts/expandedModalToolbarContainerPositionClasses.enum';
import { OPACITY_INVISIBLE, OPACITY_VISIBLE, LINEAR_SPEED_TRANSITION, OPACITY_PROPERTY, UNSET } from './sharedConsts';
import { ExitCallback, ModalEntranceTransition, ModalExitTransition } from '../../../../interfaces/modalTransitions';
import { ElementStyleProperties } from '../../../../interfaces/elementStyleProperties';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';

export interface TransitionProperties {
  transitionDuration?: string;
  transitionProperty: string;
  transitionTimingFunction: string;
}

// the initial modal entrance transition should maybe be the same as the toolbar to look good
// fix exit - change margin to Position and figure out a way to set it
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
  private static RESET_MODAL_AFTER_EXIT_TRANSITION_TIMEOUT_MILLISECONDS = 400;
  private static EXIT_TRANSITION_TIMEOUT_AFTER_TRANSITION_PROPERTIES_UNSET_MILLISECONDS = 5;
  private static INITIAL_EXPANDED_MODAL_TRANSITION_VALUES: TransitionProperties = {
    transitionProperty: OPACITY_PROPERTY,
    transitionTimingFunction: LINEAR_SPEED_TRANSITION,
  };

  // the modal transition animation gets unset by subcomponentMouseEnter event handler
  // should be private and functionality moved here from component previews
  public static unsetTransitionProperties(...elements: HTMLElement[]): void {
    elements.forEach((element) => {
      if (!element) return;
      element.style.transitionDuration = UNSET;
      element.style.transitionProperty = UNSET;
      element.style.transitionTimingFunction = UNSET;
    });
  }

  private static opacityFadeTransition(opacity: string, transitionDuration: string, ...elements: HTMLElement[]): void {
    const { transitionProperty, transitionTimingFunction } = TransitionsService.INITIAL_EXPANDED_MODAL_TRANSITION_VALUES;
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
    setTimeout(() => {
      TransitionsService.unsetTransitionProperties(toolbarContainerElement);
    }, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
    TransitionsService.opacityFadeTransition(OPACITY_VISIBLE, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
  }

  private static exitPreviewTransition(backgroundElement: HTMLElement, modalElement: HTMLElement): void {
    backgroundElement.classList.replace(TransitionsService.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS, TransitionsService.BACKGROUND_ELEMENT_DEFAULT_CLASS);
    TransitionsService.opacityFadeTransition(OPACITY_VISIBLE, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS,
      backgroundElement, modalElement);
    setTimeout(() => {
      TransitionsService.unsetTransitionProperties(backgroundElement);
      expandedModalPreviewModeState.setIsTransitionInProgressState(false);
    }, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DELAY_MILLISECONDS);
  }

  private static setModalPropertiesAfterExitTransition(modalElement: HTMLElement, modalProperties: ElementStyleProperties) {
    Object.keys(modalProperties).forEach((propertyKey) => {
      modalElement.style[propertyKey] = modalProperties[propertyKey];
    });
  }

  private static setCurrentExitTransitionModalPropertiesBackToDefault(modalElement: HTMLElement, numberOfCurrentlyInstantiatedExitTransitions: number): void {
    if (numberOfCurrentlyInstantiatedExitTransitions > 0) {
      const exitTransitionModalDefaultProperties = expandedModalPreviewModeState.getCurrentExitTransitionModalDefaultPropertiesState();
      TransitionsService.setModalPropertiesAfterExitTransition(modalElement, exitTransitionModalDefaultProperties);
    }
  }

  private static exitCallback(modalElement: HTMLElement, backgroundElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    const exitTransitionModalDefaultProperties = expandedModalPreviewModeState.getCurrentExitTransitionModalDefaultPropertiesState();
    TransitionsService.setModalPropertiesAfterExitTransition(modalElement, exitTransitionModalDefaultProperties);
    TransitionsService.exitPreviewTransition(backgroundElement, modalElement);
    if (toolbarContainerElement) TransitionsService.exitToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
  }

  public static exit(modalExitTransition: ModalExitTransition, backgroundElement: HTMLElement, modalElement: HTMLElement,
      toolbarContainerElement?: HTMLElement, toolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    const numberOfCurrentlyInstantiatedExitTransitions = expandedModalPreviewModeState.getNumberOfCurrentlyInstantiatedExitTransitionsState();
    TransitionsService.setCurrentExitTransitionModalPropertiesBackToDefault(modalElement, numberOfCurrentlyInstantiatedExitTransitions);
    TransitionsService.opacityFadeTransition(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    modalExitTransition(modalElement, TransitionsService.exitCallback as ExitCallback, backgroundElement, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    expandedModalPreviewModeState.setIsTransitionInProgressState(true);
  }

  private static startToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    TransitionsService.opacityFadeTransition(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    setTimeout(() => {
      toolbarElement.classList.add(TransitionsService.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS);
      toolbarContainerElement.classList.replace(TransitionsService.TOOLBAR_CONTAINER_ELEMENT_DEFAULT_CLASS, TransitionsService.TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS);
      if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
        toolbarContainerElement.classList.replace(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.TOP, EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
      }
      toolbarPositionToggleElement.style.display = 'block';
      toolbarContainerElement.style.opacity = OPACITY_VISIBLE;
      setTimeout(() => {
        TransitionsService.unsetTransitionProperties(toolbarContainerElement);
      }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
    }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }

  private static startPreviewTransition(backgroundElement: HTMLElement, modalElement: HTMLElement, modalEntranceTransition: ModalEntranceTransition): void {
    TransitionsService.opacityFadeTransition(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS,
      backgroundElement, modalElement);
    setTimeout(() => {
      backgroundElement.classList.replace(TransitionsService.BACKGROUND_ELEMENT_DEFAULT_CLASS, TransitionsService.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS);
      modalEntranceTransition(modalElement, TransitionsService.unsetTransitionProperties, backgroundElement);
    }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }

  public static initiate(modalEntranceTransition: ModalEntranceTransition, modalElement: HTMLElement, backgroundElement: HTMLElement,
      toolbarContainerElement?: HTMLElement, toolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    TransitionsService.startPreviewTransition(backgroundElement, modalElement, modalEntranceTransition);
    if (toolbarContainerElement) TransitionsService.startToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    expandedModalPreviewModeState.setIsTransitionInProgressState(true);
  }

  public static initiateEntraceTransitionPreview(modalEntranceTransition: ModalEntranceTransition, modalElement: HTMLElement): void {
    modalElement.style.opacity = OPACITY_INVISIBLE;
    modalEntranceTransition(modalElement, TransitionsService.unsetTransitionProperties)
  }

  public static initiateExitTransitionPreviewCallback(modalElement: HTMLElement): void {
    setTimeout(() => {
      const numberOfCurrentlyInstantiatedExitTransitions = expandedModalPreviewModeState.getNumberOfCurrentlyInstantiatedExitTransitionsState();
      TransitionsService.setCurrentExitTransitionModalPropertiesBackToDefault(modalElement, numberOfCurrentlyInstantiatedExitTransitions);
      if (numberOfCurrentlyInstantiatedExitTransitions === 1) {
        TransitionsService.unsetTransitionProperties(modalElement);
        expandedModalPreviewModeState.setIsTransitionInProgressState(false);
        modalElement.style.opacity = OPACITY_VISIBLE;
      }
      expandedModalPreviewModeState.setNumberOfCurrentlyInstantiatedExitTransitionsState(numberOfCurrentlyInstantiatedExitTransitions - 1);
    }, TransitionsService.RESET_MODAL_AFTER_EXIT_TRANSITION_TIMEOUT_MILLISECONDS); 
  }

  public static initiateExitTransitionPreview(modalEntranceTransition: ModalExitTransition, modalElement: HTMLElement): void {
    expandedModalPreviewModeState.setIsTransitionInProgressState(true);
    const numberOfCurrentlyInstantiatedExitTransitions = expandedModalPreviewModeState.getNumberOfCurrentlyInstantiatedExitTransitionsState();
    TransitionsService.setCurrentExitTransitionModalPropertiesBackToDefault(modalElement, numberOfCurrentlyInstantiatedExitTransitions);
    TransitionsService.unsetTransitionProperties(modalElement);
    expandedModalPreviewModeState.setNumberOfCurrentlyInstantiatedExitTransitionsState(numberOfCurrentlyInstantiatedExitTransitions + 1);
    modalElement.style.opacity = OPACITY_VISIBLE;
    setTimeout(() => {
      modalEntranceTransition(modalElement, TransitionsService.initiateExitTransitionPreviewCallback);
    }, TransitionsService.EXIT_TRANSITION_TIMEOUT_AFTER_TRANSITION_PROPERTIES_UNSET_MILLISECONDS);
  }

  public static toggleToolbarPosition(toolbarContainerElement: HTMLElement): void {
    const newExpandedModalModeToolbarContainerPositionState = expandedModalPreviewModeState.
      getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM
      ? EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.TOP
      : EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM;
    TransitionsService.opacityFadeTransition(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    setTimeout(() => {
      toolbarContainerElement.classList.replace(expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState(),
        newExpandedModalModeToolbarContainerPositionState);
      expandedModalPreviewModeState.setExpandedModalModeToolbarContainerPositionState(newExpandedModalModeToolbarContainerPositionState);
      TransitionsService.opacityFadeTransition(OPACITY_VISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }
}
