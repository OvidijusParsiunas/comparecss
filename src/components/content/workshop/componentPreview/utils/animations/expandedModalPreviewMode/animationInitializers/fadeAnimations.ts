import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
import { ExitAnimationCallback } from '../../../../../../../../interfaces/animations';
import AnimationUtils from '../../utils/animationUtils';

export default class FadeAnimations {

  public static startModalEntranceAnimation(animationDuration: string, modalElement: HTMLElement,
      unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentPreviewContainerElement?: HTMLElement,
      animationDelay?: string): void {
    AnimationUtils.startModalEntranceAnimation(animationDuration, modalElement, unsetAnimationPropertiesCallback,
      componentPreviewContainerElement, animationDelay);  
  }

  public static startModalExitAnimation(animationDuration: string, modalElement: HTMLElement, exitAnimationCallback: ExitAnimationCallback,
      componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, toolbarElement: HTMLElement,
      innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, modalOverlayElement: HTMLElement,
      wasPreviousAnimationInterrupted?: boolean): void {
    AnimationUtils.startModalAndBackdropExitAnimation(animationDuration, modalElement, exitAnimationCallback, componentPreviewContainerElement,
      backdropProperties, toolbarElement, innerToolbarElement, toolbarPositionToggleElement, modalOverlayElement, wasPreviousAnimationInterrupted);
  }
}
