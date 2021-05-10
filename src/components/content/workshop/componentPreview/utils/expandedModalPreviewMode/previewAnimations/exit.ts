import { ModalExitAnimation } from '../../../../../../../interfaces/modalAnimations';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import AnimationUtils from '../utils/animationUtils';

export default class PreviewExitAnimation {

  private static readonly EXIT_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS = 200;
  private static readonly RESET_MODAL_AFTER_EXIT_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS = 400;

  private static exitAnimationPreviewCallback(modalElement: HTMLElement): void {
    const pendingModalAnimationPreviewUnset = window.setTimeout(() => {
      AnimationUtils.cancelModalAnimationPreview(modalElement);
    }, PreviewExitAnimation.RESET_MODAL_AFTER_EXIT_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS); 
    expandedModalPreviewModeState.setPendingModalAnimationPreviewUnsetState(pendingModalAnimationPreviewUnset);
  }

  public static start(modalExitAnimation: ModalExitAnimation, animationDuration: string, modalElement: HTMLElement): void {
    AnimationUtils.cancelModalAnimationPreview(modalElement);
    expandedModalPreviewModeState.setIsAnimationPreviewInProgressState(true);
    const pendingModalAnimationStart = window.setTimeout(() => { 
      modalExitAnimation(animationDuration, modalElement, PreviewExitAnimation.exitAnimationPreviewCallback);
    }, PreviewExitAnimation.EXIT_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS);
    expandedModalPreviewModeState.setPendingModalAnimationStartState(pendingModalAnimationStart);
  }
}
