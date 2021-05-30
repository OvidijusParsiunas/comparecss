import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
import { CloseAnimationCallback } from '../../../../../../../../interfaces/animations';
import AnimationUtils from '../animationUtils';

export default class FadeAnimations {

  public static startOpenAnimation(animationDuration: string, componentElement: HTMLElement,
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentContainerElement?: HTMLElement,
      animationDelay?: string): void {
    AnimationUtils.startOpenAnimation(animationDuration, componentElement, unsetAnimationPropertiesCallback,
      componentContainerElement, animationDelay);  
  }

  public static startCloseAnimation(animationDuration: string, componentElement: HTMLElement, closeAnimationCallback: CloseAnimationCallback,
      componentContainerElement: HTMLElement, backdropProperties?: BackdropProperties, toolbarElement?: HTMLElement,
      innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement, componentOverlayElement?: HTMLElement,
      wasPreviousAnimationInterrupted?: boolean): void {
    AnimationUtils.startCloseAnimation(animationDuration, componentElement, closeAnimationCallback, componentContainerElement,
      backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement, componentOverlayElement, wasPreviousAnimationInterrupted);
  }
}
