import { ModalEntranceAnimation } from '../../../../../../../interfaces/modalAnimations';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { OPACITY_INVISIBLE } from '../consts/sharedConsts';
import AnimationUtils from '../utils/animationUtils';
import GeneralUtils from '../utils/generalUtils';

export default class PreviewEntranceAnimation {

  public static start(modalEntranceAnimation: ModalEntranceAnimation, animationDuration: string, modalElement: HTMLElement): void {
    AnimationUtils.cancelModalAnimationPreview(modalElement);
    modalElement.style.opacity = OPACITY_INVISIBLE;
    expandedModalPreviewModeState.setIsAnimationPreviewInProgressState(true);
    modalEntranceAnimation(animationDuration, modalElement, GeneralUtils.unsetAnimationProperties);
  }
}
