import { ExitTransitionCallback } from '../../../../../../../interfaces/modalTransitions';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import TransitionUtils from '../utils/transitionUtils';

export default class FadeTransitions {

  public static startEntranceTransition(transitionDuration: string, modalElement: HTMLElement,
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, backdropElement?: HTMLElement, transitionDelay?: string): void {
    TransitionUtils.startModalAndBackdropEntranceTransition(transitionDuration, modalElement, unsetTransitionPropertiesCallback, backdropElement, transitionDelay);  
  }

  public static startExitTransition(transitionDuration: string, modalElement: HTMLElement, exitTransitionCallback: ExitTransitionCallback,
      backdropElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement, innerToolbarElement: HTMLElement,
      toolbarPositionToggleElement: HTMLElement, modalOverlayElement: HTMLElement, wasPreviousTransitionInterrupted?: boolean): void {
    TransitionUtils.startModalAndBackdropExitTransition(transitionDuration, modalElement, exitTransitionCallback, backdropElement,
      backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement, modalOverlayElement, wasPreviousTransitionInterrupted);
  }
}
