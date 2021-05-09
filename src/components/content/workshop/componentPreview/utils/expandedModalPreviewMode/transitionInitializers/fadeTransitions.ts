import { ExitTransitionCallback } from '../../../../../../../interfaces/modalTransitions';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import TransitionUtils from '../utils/transitionUtils';

export default class FadeTransitions {

  public static startEntranceTransition(transitionDuration: string, modalElement: HTMLElement,
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, componentPreviewContainerElement?: HTMLElement,
      transitionDelay?: string): void {
    TransitionUtils.startModalEntranceTransition(transitionDuration, modalElement, unsetTransitionPropertiesCallback,
      componentPreviewContainerElement, transitionDelay);  
  }

  public static startExitTransition(transitionDuration: string, modalElement: HTMLElement, exitTransitionCallback: ExitTransitionCallback,
      componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, modalOverlayElement: HTMLElement,
      wasPreviousTransitionInterrupted?: boolean): void {
    TransitionUtils.startModalAndBackdropExitTransition(transitionDuration, modalElement, exitTransitionCallback, componentPreviewContainerElement,
      backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement, modalOverlayElement, wasPreviousTransitionInterrupted);
  }
}
