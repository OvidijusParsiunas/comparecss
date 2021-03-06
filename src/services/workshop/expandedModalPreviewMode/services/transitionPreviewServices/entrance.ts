
import { ModalEntranceTransition } from '../../../../../interfaces/modalTransitions';
import { expandedModalPreviewModeState } from '../../expandedModalPreviewModeState';
import { OPACITY_INVISIBLE } from '../../utils/sharedConsts';
import TransitionUtils from '../../utils/transitionUtils';
import GeneralUtils from '../../utils/generalUtils';

export default class EntranceTransitionPreviewService {

  public static start(modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, modalElement: HTMLElement): void {
    TransitionUtils.cancelModalTransitionPreview(modalElement);
    modalElement.style.opacity = OPACITY_INVISIBLE;
    expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(true);
    modalEntranceTransition(transitionDuration, modalElement, GeneralUtils.unsetTransitionProperties);
  }
}
