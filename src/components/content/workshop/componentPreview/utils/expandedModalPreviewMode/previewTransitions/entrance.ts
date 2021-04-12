import { ModalEntranceTransition } from '../../../../../../../interfaces/modalTransitions';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { OPACITY_INVISIBLE } from '../consts/sharedConsts';
import TransitionUtils from '../utils/transitionUtils';
import GeneralUtils from '../utils/generalUtils';

export default class PreviewEntranceTransition {

  public static start(modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, modalElement: HTMLElement): void {
    TransitionUtils.cancelModalTransitionPreview(modalElement);
    modalElement.style.opacity = OPACITY_INVISIBLE;
    expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(true);
    modalEntranceTransition(transitionDuration, modalElement, GeneralUtils.unsetTransitionProperties);
  }
}