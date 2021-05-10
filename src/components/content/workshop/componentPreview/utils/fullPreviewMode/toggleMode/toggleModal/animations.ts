import { OPACITY_INVISIBLE, TOOLBAR_FADE_ANIMATION_DURATION_SECONDS, ELEMENT_CSS_CHANGE_MILLISECONDS } from '../../../expandedModalPreviewMode/consts/sharedConsts';
import { ExitAnimationCallback, ModalEntranceAnimation, ModalExitAnimation } from '../../../../../../../../interfaces/modalAnimations';
import { expandedModalPreviewModeState } from '../../../expandedModalPreviewMode/expandedModalPreviewModeState';
import ModeToggleEntranceAnimation from '../../../expandedModalPreviewMode/modeToggleAnimations/entrance';
import ModeToggleExitAnimation from '../../../expandedModalPreviewMode/modeToggleAnimations/exit';
import ExpandedModalModeGeneralUtils from '../../../expandedModalPreviewMode/utils/generalUtils';
import { BackdropProperties } from '../../../../../../../../interfaces/workshopComponent';
  
export default class Animations {

  private static readonly ENTRANCE_ANIMATION_INITIAL_FADEOUT_DURATION = '0s';

  public static entranceAnimation(modalEntranceAnimation: ModalEntranceAnimation, animationDuration: string, animationDelay: string,
      backdropProperties: BackdropProperties, modalElement: HTMLElement, modalOverlayElement: HTMLElement,
      componentPreviewContainerElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    componentPreviewContainerElement.style.opacity = OPACITY_INVISIBLE;
    ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, Animations.ENTRANCE_ANIMATION_INITIAL_FADEOUT_DURATION,
      modalElement, toolbarContainerElement);
    window.setTimeout(() => {
      ModeToggleEntranceAnimation.startModalAndBackdropAnimation(componentPreviewContainerElement, modalElement, modalOverlayElement,
        backdropProperties, modalEntranceAnimation, animationDuration, animationDelay);
      ModeToggleEntranceAnimation.startToolbarAnimation(toolbarContainerElement, toolbarElement, undefined, animationDelay);
    });
    // the timeout is used to fix a bug where upon clicking the button - the mouse leave and mouse up events do not change back the css correctly
    // as the setter here also prevents mouse events on subcomponents (required to prevent the animation from being stopped)
    setTimeout(() => {
      expandedModalPreviewModeState.setIsModeToggleAnimationInProgressState(true);
    }, ELEMENT_CSS_CHANGE_MILLISECONDS);
  }

  public static exitAnimation(modalExitAnimation: ModalExitAnimation, animationDuration: string, setOptionToDefaultCallback: () => void,
      componentPreviewContainerElement: HTMLElement, backdropProperties: BackdropProperties, modalElement: HTMLElement,
      modalOverlayElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, toolbarPositionToggleElement?: HTMLElement): void {
    ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, TOOLBAR_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
    modalExitAnimation(animationDuration, modalElement, ModeToggleExitAnimation.exitAnimationCallback.bind(this, setOptionToDefaultCallback) as ExitAnimationCallback,
      componentPreviewContainerElement, backdropProperties, toolbarContainerElement, toolbarElement, toolbarPositionToggleElement, modalOverlayElement);
    expandedModalPreviewModeState.setIsModeToggleAnimationInProgressState(true);
  }
}
  