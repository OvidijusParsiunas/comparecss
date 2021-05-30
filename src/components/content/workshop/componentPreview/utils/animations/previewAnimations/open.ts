import { OpenAnimation } from '../../../../../../../interfaces/animations';
import { OPACITY_INVISIBLE } from '../consts/sharedConsts';
import AnimationUtils from '../utils/animationUtils';
import GeneralUtils from '../utils/generalUtils';
import { animationState } from '../state';

export default class PreviewOpenAnimation {

  public static start(openAnimation: OpenAnimation, animationDuration: string, componentElement: HTMLElement): void {
    AnimationUtils.cancelAnimationPreview(componentElement);
    componentElement.style.opacity = OPACITY_INVISIBLE;
    animationState.setIsAnimationPreviewInProgressState(true);
    openAnimation(animationDuration, componentElement, GeneralUtils.unsetAnimationProperties);
  }
}
