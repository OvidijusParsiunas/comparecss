import { BackdropProperties } from '../../../../../../../interfaces/workshopComponent';
import { ExitAnimationCallback } from '../../../../../../../interfaces/animations';
import AnimationUtils from '../utils/animationUtils';
import { animationState } from '../state';

export default class SlideAnimations {

  private static readonly SLIDE_DISTANCE_NUMBER = 40;

  private static prepareEntranceAnimation(modalElement: HTMLElement): string {
    const currentTopStyleValue = modalElement.style.top || '0px';
    const currentTopStyleValueNumber = Number.parseInt(currentTopStyleValue);
    animationState.setCurrentExitAnimationDefaultPropertiesState({top: currentTopStyleValue});
    modalElement.style.top = `${currentTopStyleValueNumber - SlideAnimations.SLIDE_DISTANCE_NUMBER}px`;
    return currentTopStyleValue;
  }

  public static startModalEntranceAnimation(animationDuration: string, modalElement: HTMLElement,
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentPreviewContainerElement?: HTMLElement, animationDelay?: string): void {
    const currentTopValue = SlideAnimations.prepareEntranceAnimation(modalElement);
    const modalElementProperties = { top: currentTopValue };
    AnimationUtils.startModalEntranceAnimation(
      animationDuration, modalElement, unsetAnimationPropertiesCallback, componentPreviewContainerElement, animationDelay, modalElementProperties);
  }

  private static prepareExitAnimation(modalElement: HTMLElement): number {
    const currentTopStyleValue = modalElement.style.top || '0px';
    animationState.setCurrentExitAnimationDefaultPropertiesState({top: currentTopStyleValue});
    return Number.parseInt(currentTopStyleValue);
  }

  public static startModalExitAnimation(animationDuration: string, modalElement: HTMLElement, exitAnimationCallback: ExitAnimationCallback,
      componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, modalOverlayElement: HTMLElement,
      wasPreviousAnimationInterrupted?: boolean): void {
    const currentTopStyleValueNumber = SlideAnimations.prepareExitAnimation(modalElement);
    const modalElementProperties = { top: `${currentTopStyleValueNumber - SlideAnimations.SLIDE_DISTANCE_NUMBER}px` };
    AnimationUtils.startModalAndBackdropExitAnimation(animationDuration, modalElement, exitAnimationCallback,
      componentPreviewContainerElement, backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement, modalOverlayElement,
      wasPreviousAnimationInterrupted, modalElementProperties);
  }
}
