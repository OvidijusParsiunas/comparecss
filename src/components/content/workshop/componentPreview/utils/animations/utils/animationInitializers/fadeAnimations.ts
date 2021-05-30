import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
import { ExitAnimationCallback } from '../../../../../../../../interfaces/animations';
import AnimationUtils from '../animationUtils';

export default class FadeAnimations {

  public static startEntranceAnimation(animationDuration: string, componentElement: HTMLElement,
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentContainerElement?: HTMLElement,
      animationDelay?: string): void {
    AnimationUtils.startEntranceAnimation(animationDuration, componentElement, unsetAnimationPropertiesCallback,
      componentContainerElement, animationDelay);  
  }

  public static startExitAnimation(animationDuration: string, componentElement: HTMLElement, exitAnimationCallback: ExitAnimationCallback,
      componentContainerElement: HTMLElement, backdropProperties?: BackdropProperties, toolbarElement?: HTMLElement,
      innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement, componentOverlayElement?: HTMLElement,
      wasPreviousAnimationInterrupted?: boolean): void {
    AnimationUtils.startExitAnimation(animationDuration, componentElement, exitAnimationCallback, componentContainerElement,
      backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement, componentOverlayElement, wasPreviousAnimationInterrupted);
  }
}
