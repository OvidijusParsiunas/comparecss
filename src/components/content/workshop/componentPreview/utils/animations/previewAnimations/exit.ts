import { ExitAnimation } from '../../../../../../../interfaces/animations';
import AnimationUtils from '../utils/animationUtils';
import { animationState } from '../state';

export default class PreviewExitAnimation {

  private static readonly EXIT_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS = 200;
  private static readonly RESET_AFTER_EXIT_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS = 400;

  private static exitAnimationPreviewCallback(componentElement: HTMLElement): void {
    const pendingAnimationPreviewUnset = window.setTimeout(() => {
      AnimationUtils.cancelAnimationPreview(componentElement);
    }, PreviewExitAnimation.RESET_AFTER_EXIT_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS); 
    animationState.setPendingAnimationPreviewUnsetState(pendingAnimationPreviewUnset);
  }

  public static start(exitAnimation: ExitAnimation, animationDuration: string, componentElement: HTMLElement): void {
    AnimationUtils.cancelAnimationPreview(componentElement);
    animationState.setIsAnimationPreviewInProgressState(true);
    const pendingAnimationStart = window.setTimeout(() => { 
      exitAnimation(animationDuration, componentElement, PreviewExitAnimation.exitAnimationPreviewCallback);
    }, PreviewExitAnimation.EXIT_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS);
    animationState.setPendingAnimationStartState(pendingAnimationStart);
  }
}
