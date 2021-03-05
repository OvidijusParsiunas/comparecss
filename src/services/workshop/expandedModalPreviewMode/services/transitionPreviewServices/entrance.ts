
import { ModalEntranceTransition } from '../../../../../interfaces/modalTransitions';
import { expandedModalPreviewModeState } from '../../expandedModalPreviewModeState';
import { OPACITY_INVISIBLE } from '../../utils/sharedConsts';
import TransitionsUtils from '../../utils/transitionsUtils';

export default class EntranceTransitionPreviewService {

  public static start(modalEntranceTransition: ModalEntranceTransition, transitionDuration: string, modalElement: HTMLElement): void {
    TransitionsUtils.cancelModalTransitionPreview(modalElement);
    modalElement.style.opacity = OPACITY_INVISIBLE;
    expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(true);
    modalEntranceTransition(transitionDuration, modalElement, TransitionsUtils.unsetTransitionProperties);
  }
}
