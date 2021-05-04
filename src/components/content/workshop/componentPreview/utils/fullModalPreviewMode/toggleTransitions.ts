import { ExitTransitionCallback, ModalEntranceTransition, ModalExitTransition } from '../../../../../../interfaces/modalTransitions';
import { OPACITY_INVISIBLE, TOOLBAR_FADE_TRANSITION_DURATION_SECONDS } from '../expandedModalPreviewMode/consts/sharedConsts';
import ModeToggleEntranceTransition from '../expandedModalPreviewMode/modeToggleTransitions/entrance';
import ModeToggleExitTransition from '../expandedModalPreviewMode/modeToggleTransitions/exit';
import { BackdropProperties } from '../../../../../../interfaces/workshopComponent';
import GeneralUtils from '../expandedModalPreviewMode/utils/generalUtils';
  
export default class ToggleTransitions {

  private static readonly ENTRANCE_TRANSITION_INITIAL_FADEOUT_DURATION = '0s';

  public static toggleEntranceTransition(modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, transitionDelay: string,
      backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement, backdropElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, ToggleTransitions.ENTRANCE_TRANSITION_INITIAL_FADEOUT_DURATION,
      backdropElement, modalElement, toolbarContainerElement);
    window.setTimeout(() => {
      ModeToggleEntranceTransition.startModalAndBackdropTransition(backdropElement, modalElement, modalOverlayElement,
        backdropProperties, modalEntranceTransition, transitionDuration, transitionDelay);
      ModeToggleEntranceTransition.startToolbarTransition(toolbarContainerElement, toolbarElement, undefined, transitionDelay);
    });
  }

  public static toggleExitTransition(modalExitTransition: ModalExitTransition, transitionDuration: string, setOptionToDefaultCallback: () => void,
      backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, TOOLBAR_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    modalExitTransition(transitionDuration, modalElement, ModeToggleExitTransition.exitTransitionCallback.bind(this, setOptionToDefaultCallback) as ExitTransitionCallback,
      backdropElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, modalOverlayElement);
  }
}
  