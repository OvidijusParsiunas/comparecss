import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_CONTAINER_GENERAL_CLASSES } from '../../../../consts/toolbarClasses';
import { OPACITY_INVISIBLE, OPACITY_VISIBLE, LINEAR_SPEED_TRANSITION, OPACITY_PROPERTY, UNSET } from './sharedConsts';
import { ExitCallback, ModalEntranceTransition, ModalExitTransition } from '../../../../interfaces/modalTransitions';
import { ElementStyleProperties } from '../../../../interfaces/elementStyleProperties';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { BackdropProperties } from '../../../../interfaces/workshopComponent';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';

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
  private static TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS = 'toolbar-modal-preview-active';
  private static START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS = 150;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS = 150;
  private static START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS = `${TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS = `${TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS / 1000}s`;
  private static EXIT_EXPANDED_MODAL_MODE_TRANSITION_DELAY_MILLISECONDS = 50;
  private static RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 400;
  private static EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 200;
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
    toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT);
    if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
    toolbarPositionToggleElement.style.display = 'none';
    setTimeout(() => {
      TransitionsService.unsetTransitionProperties(toolbarContainerElement);
    }, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
    TransitionsService.opacityFadeTransition(OPACITY_VISIBLE, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
  }
  
  private static unsetBackdropStyle(backdropElement: HTMLElement, backdropProperties: BackdropProperties): void {
    backdropElement.classList.replace(TransitionsService.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS, TransitionsService.BACKGROUND_ELEMENT_DEFAULT_CLASS);
    backdropProperties.visible = false;
  }

  private static exitPreviewTransition(backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement): void {
    this.unsetBackdropStyle(backdropElement, backdropProperties);
    TransitionsService.opacityFadeTransition(OPACITY_VISIBLE, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS,
      backdropElement, modalElement);
    setTimeout(() => {
      TransitionsService.unsetTransitionProperties(backdropElement);
      expandedModalPreviewModeState.setIsTransitionInProgressState(false);
    }, TransitionsService.EXIT_EXPANDED_MODAL_MODE_TRANSITION_DELAY_MILLISECONDS);
  }

  private static setModalPropertiesAfterExitTransition(modalElement: HTMLElement, modalProperties: ElementStyleProperties) {
    Object.keys(modalProperties).forEach((propertyKey) => {
      modalElement.style[propertyKey] = modalProperties[propertyKey];
    });
  }

  private static setCurrentExitTransitionModalPropertiesBackToDefault(modalElement: HTMLElement): void {
    const exitTransitionModalDefaultProperties = expandedModalPreviewModeState.getCurrentExitTransitionModalDefaultPropertiesState();
    TransitionsService.setModalPropertiesAfterExitTransition(modalElement, exitTransitionModalDefaultProperties);
  }

  private static exitCallback(setOptionToDefaultCallback: () => void, modalElement: HTMLElement, backdropElement: HTMLElement,
      backdropProperties: BackdropProperties, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    TransitionsService.toggleModalStaticPosition(modalElement, 'add');
    setOptionToDefaultCallback();
    const exitTransitionModalDefaultProperties = expandedModalPreviewModeState.getCurrentExitTransitionModalDefaultPropertiesState();
    TransitionsService.setModalPropertiesAfterExitTransition(modalElement, exitTransitionModalDefaultProperties);
    TransitionsService.exitPreviewTransition(backdropElement, backdropProperties, modalElement);
    if (toolbarContainerElement) TransitionsService.exitToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
  }

  public static exit(modalExitTransition: ModalExitTransition, transitionDuration: string, setOptionToDefaultCallback: () => void,
      backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, toolbarContainerElement?: HTMLElement,
      toolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
    TransitionsService.opacityFadeTransition(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    modalExitTransition(transitionDuration, modalElement, TransitionsService.exitCallback.bind(this, setOptionToDefaultCallback) as ExitCallback,
      backdropElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    expandedModalPreviewModeState.setIsTransitionInProgressState(true);
  }

  private static startToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    TransitionsService.opacityFadeTransition(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    setTimeout(() => {
      toolbarElement.classList.add(TransitionsService.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS);
      toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT, TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
      if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
        toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
      }
      toolbarPositionToggleElement.style.display = 'block';
      toolbarContainerElement.style.opacity = OPACITY_VISIBLE;
      setTimeout(() => {
        TransitionsService.unsetTransitionProperties(toolbarContainerElement);
      }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
    }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }

  /* UX - EXPANDED MODAL TOGGLE TRANSITION
    private static startToolbarTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, transitionDuration: string): void {
      TransitionsService.opacityFadeTransition(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
      setTimeout(() => {
        toolbarElement.classList.add(TransitionsService.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS);
        toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT, TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE);
        if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
          toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
        }
        toolbarPositionToggleElement.style.display = 'block';
        setTimeout(() => {
          TransitionsService.opacityFadeTransition(OPACITY_VISIBLE, transitionDuration, toolbarContainerElement);
          setTimeout(() => {
            TransitionsService.unsetTransitionProperties(toolbarContainerElement);
          }, TransitionsUtils.secondsStringToMillisecondsNumber(transitionDuration));
        }, ENTRANCE_TRANSITION_DELAY_MILLISECONDS);
      }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
    }
  */

  private static toggleModalStaticPosition(modalElement: HTMLElement, toggleName: 'add' | 'remove'): void {
    modalElement.classList[toggleName](STATIC_POSITION_CLASS);
  }

  private static setBackdropStyle(backdropElement: HTMLElement, backdropProperties: BackdropProperties): void {
    backdropElement.classList.replace(TransitionsService.BACKGROUND_ELEMENT_DEFAULT_CLASS, TransitionsService.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS);
    backdropProperties.visible = true;
  }

  private static startPreviewTransition(backdropElement: HTMLElement, modalElement: HTMLElement, backdropProperties: BackdropProperties,
      modalEntranceTransition: ModalEntranceTransition, transitionDuration: string): void {
    TransitionsService.opacityFadeTransition(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS,
      backdropElement, modalElement);
    setTimeout(() => {
      TransitionsService.toggleModalStaticPosition(modalElement, 'remove');
      TransitionsService.setBackdropStyle(backdropElement, backdropProperties);
      modalEntranceTransition(transitionDuration, modalElement, TransitionsService.unsetTransitionProperties, backdropElement);
    }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }

  private static setPropertiesThatAreNotInCustomCssButAreRequiredForTransitions(modalElement: HTMLElement): void {
    modalElement.style.top = modalElement.style.top === '' ? '0px' : modalElement.style.top;
  }

  public static initiate(modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, backdropProperties: BackdropProperties, modalElement: HTMLElement,
      backdropElement: HTMLElement, toolbarContainerElement?: HTMLElement, toolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
    TransitionsService.setPropertiesThatAreNotInCustomCssButAreRequiredForTransitions(modalElement);
    TransitionsService.startPreviewTransition(backdropElement, modalElement, backdropProperties, modalEntranceTransition, transitionDuration);
    if (toolbarContainerElement) TransitionsService.startToolbarTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
    expandedModalPreviewModeState.setIsTransitionInProgressState(true);
  }

  public static cancelCurrentExitTransition(modalElement: HTMLElement): void {
    if (expandedModalPreviewModeState.getIsTransitionInProgressState()) {
      TransitionsService.setCurrentExitTransitionModalPropertiesBackToDefault(modalElement);
      TransitionsService.unsetTransitionProperties(modalElement);
      expandedModalPreviewModeState.removePendingExitTransitionsState();
      expandedModalPreviewModeState.setIsTransitionInProgressState(false);
      modalElement.style.opacity = OPACITY_VISIBLE;
    }
  }

  public static initiateEntraceTransitionPreview(modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, modalElement: HTMLElement): void {
    TransitionsService.cancelCurrentExitTransition(modalElement);
    modalElement.style.opacity = OPACITY_INVISIBLE;
    expandedModalPreviewModeState.setIsTransitionInProgressState(true);
    modalEntranceTransition(transitionDuration, modalElement, TransitionsService.unsetTransitionProperties);
  }
  
  public static initiateExitTransitionPreviewCallback(modalElement: HTMLElement): void {
    const pendingPropertyResetAfterExitState = setTimeout(() => {
      TransitionsService.cancelCurrentExitTransition(modalElement);
    }, TransitionsService.RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS); 
    expandedModalPreviewModeState.setPendingPropertyResetAfterExitState(pendingPropertyResetAfterExitState);
  }

  public static initiateExitTransitionPreview(modalEntranceTransition: ModalExitTransition, transitionDuration: string, modalElement: HTMLElement): void {
    TransitionsService.cancelCurrentExitTransition(modalElement);
    expandedModalPreviewModeState.setIsTransitionInProgressState(true);
    const pendingTransitionInit = setTimeout(() => { 
      modalEntranceTransition(transitionDuration, modalElement, TransitionsService.initiateExitTransitionPreviewCallback)
    }, TransitionsService.EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS);
    expandedModalPreviewModeState.setPendingTransitionInitState(pendingTransitionInit);
  }

  public static toggleToolbarPosition(toolbarContainerElement: HTMLElement): void {
    TransitionsService.opacityFadeTransition(OPACITY_INVISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    setTimeout(() => {
      if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
        toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
        expandedModalPreviewModeState.setExpandedModalModeToolbarContainerPositionState(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.DEFAULT);
      } else {
        toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
        expandedModalPreviewModeState.setExpandedModalModeToolbarContainerPositionState(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
      }
      TransitionsService.opacityFadeTransition(OPACITY_VISIBLE, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    }, TransitionsService.START_EXPANDED_MODAL_MODE_TRANSITION_DURATION_MILLISECONDS);
  }
}
