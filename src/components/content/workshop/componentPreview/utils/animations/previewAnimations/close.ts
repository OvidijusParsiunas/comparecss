import { CloseAnimation } from '../../../../../../../interfaces/animations';
import AnimationUtils from '../utils/animationUtils';
import { animationState } from '../state';

export default class PreviewCloseAnimation {

  private static readonly RESET_AFTER_CLOSE_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS = 400;

  private static closeAnimationPreviewCallback(componentElement: HTMLElement): void {
    const pendingAnimationPreviewUnset = window.setTimeout(() => {
      AnimationUtils.cancelAnimationPreview(componentElement);
    }, PreviewCloseAnimation.RESET_AFTER_CLOSE_ANIMATION_PREVIEW_TIMEOUT_MILLISECONDS); 
    animationState.setPendingAnimationPreviewUnsetState(pendingAnimationPreviewUnset);
  }

  public static start(closeAnimation: CloseAnimation, animationDuration: string, componentElement: HTMLElement): void {
    AnimationUtils.cancelAnimationPreview(componentElement);
    animationState.setIsAnimationPreviewInProgressState(true);
    setTimeout(closeAnimation.bind(this, animationDuration, componentElement, PreviewCloseAnimation.closeAnimationPreviewCallback));
  }
}
