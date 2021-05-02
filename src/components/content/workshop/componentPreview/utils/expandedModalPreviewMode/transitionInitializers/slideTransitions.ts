import { ExitTransitionCallback } from '../../../../../../../interfaces/modalTransitions';
import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import TransitionUtils from '../utils/transitionUtils';

export default class SlideTransitions {

  private static readonly SLIDE_DISTANCE_NUMBER = 40;

  private static prepareEntranceTransition(modalElement: HTMLElement): string {
    const currentTopStyleValue = modalElement.style.top || '0px';
    const currentTopStyleValueNumber = Number.parseInt(currentTopStyleValue);
    expandedModalPreviewModeState.setCurrentExitTransitionModalDefaultPropertiesState({top: currentTopStyleValue});
    modalElement.style.top = `${currentTopStyleValueNumber - SlideTransitions.SLIDE_DISTANCE_NUMBER}px`;
    return currentTopStyleValue;
  }

  public static startEntranceTransition(transitionDuration: string, modalElement: HTMLElement,
      unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, backdropElement?: HTMLElement, transitionDelay?: string): void {
    const currentTopValue = SlideTransitions.prepareEntranceTransition(modalElement);
    const modalElementProperties = { top: currentTopValue };
    TransitionUtils.startModalAndBackdropEntranceTransition(
      transitionDuration, modalElement, unsetTransitionPropertiesCallback, backdropElement, transitionDelay, modalElementProperties);
  }

  private static prepareExitTransition(modalElement: HTMLElement): number {
    const currentTopStyleValue = modalElement.style.top || '0px';
    expandedModalPreviewModeState.setCurrentExitTransitionModalDefaultPropertiesState({top: currentTopStyleValue});
    return Number.parseInt(currentTopStyleValue);
  }

  public static startExitTransition(transitionDuration: string, modalElement: HTMLElement, exitTransitionCallback: ExitTransitionCallback,
      backdropElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement, innerToolbarElement: HTMLElement,
      toolbarPositionToggleElement: HTMLElement, modalOverlayElement: HTMLElement, wasPreviousTransitionInterrupted?: boolean): void {
    const currentTopStyleValueNumber = SlideTransitions.prepareExitTransition(modalElement);
    const modalElementProperties = { top: `${currentTopStyleValueNumber - SlideTransitions.SLIDE_DISTANCE_NUMBER}px` };
    TransitionUtils.startModalAndBackdropExitTransition(transitionDuration, modalElement, exitTransitionCallback,
      backdropElement, backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement, modalOverlayElement,
      wasPreviousTransitionInterrupted, modalElementProperties);
  }
}
