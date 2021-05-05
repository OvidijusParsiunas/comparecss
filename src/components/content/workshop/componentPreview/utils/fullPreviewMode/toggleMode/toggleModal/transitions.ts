import { ExitTransitionCallback, ModalEntranceTransition, ModalExitTransition } from '../../../../../../../../interfaces/modalTransitions';
import { OPACITY_INVISIBLE, TOOLBAR_FADE_TRANSITION_DURATION_SECONDS } from '../../../expandedModalPreviewMode/consts/sharedConsts';
import { expandedModalPreviewModeState } from '../../../expandedModalPreviewMode/expandedModalPreviewModeState';
import ModeToggleEntranceTransition from '../../../expandedModalPreviewMode/modeToggleTransitions/entrance';
import ModeToggleExitTransition from '../../../expandedModalPreviewMode/modeToggleTransitions/exit';
import ExpandedModalModeGeneralUtils from '../../../expandedModalPreviewMode/utils/generalUtils';
import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
import GeneralUtils from '../generalUtils';
  
export default class Transitions {

  private static readonly ENTRANCE_TRANSITION_INITIAL_FADEOUT_DURATION = '0s';

  public static entranceTransition(modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, transitionDelay: string,
      backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement, backdropElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    ExpandedModalModeGeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, Transitions.ENTRANCE_TRANSITION_INITIAL_FADEOUT_DURATION,
      backdropElement, modalElement, toolbarContainerElement);
    window.setTimeout(() => {
      ModeToggleEntranceTransition.startModalAndBackdropTransition(backdropElement, modalElement, modalOverlayElement,
        backdropProperties, modalEntranceTransition, transitionDuration, transitionDelay);
      ModeToggleEntranceTransition.startToolbarTransition(toolbarContainerElement, toolbarElement, undefined, transitionDelay);
    });
    // the timeout is used to fix a bug where upon clicking the button - the mouse leave and mouse up events do not change back the css correctly
    // as the setter here also prevents mouse events on subcomponents (required to prevent the transition animation from being stopped)
    setTimeout(() => {
      expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
    }, GeneralUtils.VIEW_CHANGE_MILLISECONDS);
  }

  public static exitTransition(modalExitTransition: ModalExitTransition, transitionDuration: string, setOptionToDefaultCallback: () => void,
      backdropElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    ExpandedModalModeGeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, TOOLBAR_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    modalExitTransition(transitionDuration, modalElement, ModeToggleExitTransition.exitTransitionCallback.bind(this, setOptionToDefaultCallback) as ExitTransitionCallback,
      backdropElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, modalOverlayElement);
    expandedModalPreviewModeState.setIsModeToggleTransitionInProgressState(true);
  }
}
  