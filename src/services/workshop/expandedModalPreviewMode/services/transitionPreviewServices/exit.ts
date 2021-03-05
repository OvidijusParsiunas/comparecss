import { expandedModalPreviewModeState } from '../../expandedModalPreviewModeState';
import { ModalExitTransition } from '../../../../../interfaces/modalTransitions';
import TransitionsUtils from '../../utils/transitionsUtils';

export default class ExitTransitionPreviewService {

  private static EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 200;
  private static RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 400;

  public static exitTransitionPreviewCallback(modalElement: HTMLElement): void {
    const pendingModalTransitionPreviewUnset = window.setTimeout(() => {
      TransitionsUtils.cancelModalTransitionPreview(modalElement);
    }, ExitTransitionPreviewService.RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS); 
    expandedModalPreviewModeState.setPendingModalTransitionPreviewUnsetState(pendingModalTransitionPreviewUnset);
  }

  public static start(modalExitTransition: ModalExitTransition, transitionDuration: string, modalElement: HTMLElement): void {
    TransitionsUtils.cancelModalTransitionPreview(modalElement);
    expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(true);
    const pendingModalTransitionStart = window.setTimeout(() => { 
      modalExitTransition(transitionDuration, modalElement, ExitTransitionPreviewService.exitTransitionPreviewCallback);
    }, ExitTransitionPreviewService.EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS);
    expandedModalPreviewModeState.setPendingModalTransitionStartState(pendingModalTransitionStart);
  }
}
