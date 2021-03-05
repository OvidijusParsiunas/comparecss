import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_CONTAINER_GENERAL_CLASSES, TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS } from '../../../../../consts/toolbarClasses';
import { OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS } from '../../utils/sharedConsts';
import { ExitTransitionCallback, ModalExitTransition } from '../../../../../interfaces/modalTransitions';
import { ElementStyleProperties } from '../../../../../interfaces/elementStyleProperties';
import { COMPONENT_PREVIEW_CLASSES } from '../../../../../consts/componentPreviewClasses';
import { expandedModalPreviewModeState } from '../../expandedModalPreviewModeState';
import { BackdropProperties } from '../../../../../interfaces/workshopComponent';
import TransitionsUtils from '../../utils/transitionsUtils';

export default class ModeToggleExitTransitionService {

  private static setTransitionStateToFalse(): void {
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(false);
    expandedModalPreviewModeState.setIsModeToggleInitialFadeOutTransitionInProgress(false);
  }

  private static toolbarFadeInTransition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    toolbarElement.classList.remove(TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS);
    toolbarContainerElement.classList.replace(TOOLBAR_CONTAINER_GENERAL_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT);
    if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
    toolbarPositionToggleElement.style.display = 'none';
    window.setTimeout(() => {
      TransitionsUtils.unsetTransitionProperties(toolbarContainerElement);
      ModeToggleExitTransitionService.setTransitionStateToFalse();
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
    TransitionsUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
  }
  
  private static unsetBackdropStyle(backdropElement: HTMLElement, backdropProperties: BackdropProperties): void {
    backdropElement.classList.replace(COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, COMPONENT_PREVIEW_CLASSES.DEFAULT);
    backdropProperties.visible = false;
  }

  private static modalAndBackdropFadeInTransition(backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement): void {
    this.unsetBackdropStyle(backdropElement, backdropProperties);
    TransitionsUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS,
      backdropElement, modalElement);
    window.setTimeout(() => {
      TransitionsUtils.unsetTransitionProperties(backdropElement);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  private static resetModalElementProperties(modalElement: HTMLElement, modalProperties: ElementStyleProperties) {
    Object.keys(modalProperties).forEach((propertyKey) => {
      modalElement.style[propertyKey] = modalProperties[propertyKey];
    });
  }

  private static exitTransitionCallback(setOptionToDefaultCallback: () => void, modalElement: HTMLElement, backdropElement: HTMLElement,
      backdropProperties: BackdropProperties, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    expandedModalPreviewModeState.setIsModeToggleInitialFadeOutTransitionInProgress(true);
    TransitionsUtils.toggleModalStaticPosition(modalElement, 'add');
    setOptionToDefaultCallback();
    const exitTransitionModalDefaultProperties = expandedModalPreviewModeState.getCurrentExitTransitionModalDefaultPropertiesState();
    ModeToggleExitTransitionService.resetModalElementProperties(modalElement, exitTransitionModalDefaultProperties);
    ModeToggleExitTransitionService.modalAndBackdropFadeInTransition(backdropElement, backdropProperties, modalElement);
    ModeToggleExitTransitionService.toolbarFadeInTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
  }

  public static cancelPendingTransitionFunctionality(): void {
    // are both needed here
    expandedModalPreviewModeState.removePendingExitTransitions();
    expandedModalPreviewModeState.removePendingEntraceTimeouts();
  }

  public static start(modalExitTransition: ModalExitTransition, transitionDuration: string, setOptionToDefaultCallback: () => void,
      backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    let wasPreviousTransitionInterrupted = false;
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
      ModeToggleExitTransitionService.cancelPendingTransitionFunctionality();
      transitionDuration = TransitionsUtils.getNewTransitionDuration();
      wasPreviousTransitionInterrupted = true;
    }
    TransitionsUtils.opacityFadeTransition(OPACITY_INVISIBLE, transitionDuration, toolbarContainerElement);
    modalExitTransition(transitionDuration, modalElement, ModeToggleExitTransitionService.exitTransitionCallback.bind(this, setOptionToDefaultCallback) as ExitTransitionCallback,
      backdropElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, wasPreviousTransitionInterrupted);
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
  }
}
