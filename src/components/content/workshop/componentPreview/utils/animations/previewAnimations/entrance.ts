import { EntranceAnimation } from '../../../../../../../interfaces/animations';
import { OPACITY_INVISIBLE } from '../consts/sharedConsts';
import AnimationUtils from '../utils/animationUtils';
import GeneralUtils from '../utils/generalUtils';
import { animationState } from '../state';

export default class PreviewEntranceAnimation {

  public static start(entranceAnimation: EntranceAnimation, animationDuration: string, componentElement: HTMLElement): void {
    AnimationUtils.cancelAnimationPreview(componentElement);
    componentElement.style.opacity = OPACITY_INVISIBLE;
    animationState.setIsAnimationPreviewInProgressState(true);
    entranceAnimation(animationDuration, componentElement, GeneralUtils.unsetAnimationProperties);
  }
}
