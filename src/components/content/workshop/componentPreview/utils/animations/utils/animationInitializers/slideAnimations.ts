import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
import { CloseAnimationCallback } from '../../../../../../../../interfaces/animations';
import AnimationUtils from '../animationUtils';
import { animationState } from '../../state';

export default class SlideAnimations {

  private static readonly SLIDE_DISTANCE_NUMBER = 40;

  private static prepareOpenAnimation(componentElement: HTMLElement): string {
    const currentTopStyleValue = componentElement.style.top || '0px';
    const currentTopStyleValueNumber = Number.parseInt(currentTopStyleValue);
    animationState.setCurrentCloseAnimationDefaultPropertiesState({top: currentTopStyleValue});
    componentElement.style.top = `${currentTopStyleValueNumber - SlideAnimations.SLIDE_DISTANCE_NUMBER}px`;
    return currentTopStyleValue;
  }

  public static startOpenAnimation(animationDuration: string, componentElement: HTMLElement,
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentContainerElement?: HTMLElement, animationDelay?: string): void {
    const currentTopValue = SlideAnimations.prepareOpenAnimation(componentElement);
    const componentElementProperties = { top: currentTopValue };
    AnimationUtils.startOpenAnimation(
      animationDuration, componentElement, unsetAnimationPropertiesCallback, componentContainerElement, animationDelay, componentElementProperties);
  }

  private static prepareCloseAnimation(componentElement: HTMLElement): number {
    const currentTopStyleValue = componentElement.style.top || '0px';
    animationState.setCurrentCloseAnimationDefaultPropertiesState({top: currentTopStyleValue});
    return Number.parseInt(currentTopStyleValue);
  }

  public static startCloseAnimation(animationDuration: string, componentElement: HTMLElement, closeAnimationCallback: CloseAnimationCallback,
      componentContainerElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, componentOverlayElement: HTMLElement,
      wasPreviousAnimationInterrupted?: boolean): void {
    const currentTopStyleValueNumber = SlideAnimations.prepareCloseAnimation(componentElement);
    const componentElementProperties = { top: `${currentTopStyleValueNumber - SlideAnimations.SLIDE_DISTANCE_NUMBER}px` };
    AnimationUtils.startCloseAnimation(animationDuration, componentElement, closeAnimationCallback, componentContainerElement,
      backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement, componentOverlayElement,
      wasPreviousAnimationInterrupted, componentElementProperties);
  }
}
