import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_CONTAINER_GENERAL_CLASSES, TOOLBAR_ELEMENT_ACTIVE_EXPANDED_MODAL_MODE_CLASS } from '../../../../../consts/toolbarClasses';
import { OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS, TOOLBAR_FADE_IN_TRANSITION_DURATION_SECONDS } from '../../utils/sharedConsts';
import { ExitTransitionCallback, ModalExitTransition } from '../../../../../interfaces/modalTransitions';
import { COMPONENT_PREVIEW_CLASSES } from '../../../../../consts/componentPreviewClasses';
import { expandedModalPreviewModeState } from '../../expandedModalPreviewModeState';
import { BackdropProperties } from '../../../../../interfaces/workshopComponent';
import GeneralUtils from '../../utils/generalUtils';

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
      GeneralUtils.unsetTransitionProperties(toolbarContainerElement);
      ModeToggleExitTransitionService.setTransitionStateToFalse();
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
    GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
  }
  
  private static unsetBackdropStyle(backdropElement: HTMLElement, backdropProperties: BackdropProperties): void {
    backdropElement.classList.replace(COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE, COMPONENT_PREVIEW_CLASSES.DEFAULT);
    backdropProperties.visible = false;
  }

  private static modalAndBackdropFadeInTransition(backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement): void {
    this.unsetBackdropStyle(backdropElement, backdropProperties);
    GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS,
      backdropElement, modalElement);
    window.setTimeout(() => {
      GeneralUtils.unsetTransitionProperties(backdropElement);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }


  private static exitTransitionCallback(setOptionToDefaultCallback: () => void, modalElement: HTMLElement, backdropElement: HTMLElement,
      backdropProperties: BackdropProperties, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      modalOverlayElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    expandedModalPreviewModeState.setIsModeToggleInitialFadeOutTransitionInProgress(true);
    GeneralUtils.toggleModalStaticPosition(modalElement, modalOverlayElement, 'add');
    setOptionToDefaultCallback();
    const exitTransitionModalDefaultProperties = expandedModalPreviewModeState.getCurrentExitTransitionModalDefaultPropertiesState();
    GeneralUtils.setModalProperties(modalElement, exitTransitionModalDefaultProperties);
    ModeToggleExitTransitionService.modalAndBackdropFadeInTransition(backdropElement, backdropProperties, modalElement);
    ModeToggleExitTransitionService.toolbarFadeInTransition(toolbarContainerElement, toolbarElement, toolbarPositionToggleElement);
  }

  // UX - EXPANDED MODAL TOGGLE TRANSITION
  // public static start(modalExitTransition: ModalExitTransition, transitionDuration: string, setOptionToDefaultCallback: () => void,
  //     backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
  //     toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
  //   let wasPreviousTransitionInterrupted = false;
  //   if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
  //     GeneralUtils.cancelAllPendingTransitionFunctionality(modalElement);
  //     transitionDuration = GeneralUtils.getNewTransitionDuration();
  //     wasPreviousTransitionInterrupted = true;
  //   }
  //   GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, transitionDuration, toolbarContainerElement);
  //   modalExitTransition(transitionDuration, modalElement, ModeToggleExitTransitionService.exitTransitionCallback.bind(this, setOptionToDefaultCallback) as ExitTransitionCallback,
  //     backdropElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, modalOverlayElement, wasPreviousTransitionInterrupted);
  //   expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
  // }

  public static start(modalExitTransition: ModalExitTransition, transitionDuration: string, setOptionToDefaultCallback: () => void,
      backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement): void {
    let wasPreviousTransitionInterrupted = false;
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) {
      GeneralUtils.cancelAllPendingTransitionFunctionality(modalElement);
      transitionDuration = GeneralUtils.getNewTransitionDuration();
      wasPreviousTransitionInterrupted = true;
    }
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, TOOLBAR_FADE_IN_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    modalExitTransition(transitionDuration, modalElement, ModeToggleExitTransitionService.exitTransitionCallback.bind(this, setOptionToDefaultCallback) as ExitTransitionCallback,
      backdropElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, modalOverlayElement, wasPreviousTransitionInterrupted);
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
  }
}
