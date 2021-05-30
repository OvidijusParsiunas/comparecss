import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
import { ExitAnimationCallback } from '../../../../../../../../interfaces/animations';
import AnimationUtils from '../animationUtils';
import { animationState } from '../../state';

export default class SlideAnimations {

  private static readonly SLIDE_DISTANCE_NUMBER = 40;

  private static prepareEntranceAnimation(componentElement: HTMLElement): string {
    const currentTopStyleValue = componentElement.style.top || '0px';
    const currentTopStyleValueNumber = Number.parseInt(currentTopStyleValue);
    animationState.setCurrentExitAnimationDefaultPropertiesState({top: currentTopStyleValue});
    componentElement.style.top = `${currentTopStyleValueNumber - SlideAnimations.SLIDE_DISTANCE_NUMBER}px`;
    return currentTopStyleValue;
  }

  public static startEntranceAnimation(animationDuration: string, componentElement: HTMLElement,
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentContainerElement?: HTMLElement, animationDelay?: string): void {
    const currentTopValue = SlideAnimations.prepareEntranceAnimation(componentElement);
    const componentElementProperties = { top: currentTopValue };
    AnimationUtils.startEntranceAnimation(
      animationDuration, componentElement, unsetAnimationPropertiesCallback, componentContainerElement, animationDelay, componentElementProperties);
  }

  private static prepareExitAnimation(componentElement: HTMLElement): number {
    const currentTopStyleValue = componentElement.style.top || '0px';
    animationState.setCurrentExitAnimationDefaultPropertiesState({top: currentTopStyleValue});
    return Number.parseInt(currentTopStyleValue);
  }

  public static startExitAnimation(animationDuration: string, componentElement: HTMLElement, exitAnimationCallback: ExitAnimationCallback,
      componentContainerElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, componentOverlayElement: HTMLElement,
      wasPreviousAnimationInterrupted?: boolean): void {
    const currentTopStyleValueNumber = SlideAnimations.prepareExitAnimation(componentElement);
    const componentElementProperties = { top: `${currentTopStyleValueNumber - SlideAnimations.SLIDE_DISTANCE_NUMBER}px` };
    AnimationUtils.startExitAnimation(animationDuration, componentElement, exitAnimationCallback, componentContainerElement,
      backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement, componentOverlayElement,
      wasPreviousAnimationInterrupted, componentElementProperties);
  }
}
