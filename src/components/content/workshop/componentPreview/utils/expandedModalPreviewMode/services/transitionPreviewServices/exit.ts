import { ModalExitTransition } from '../../../../../../../../interfaces/modalTransitions';
import { expandedModalPreviewModeState } from '../../expandedModalPreviewModeState';
import TransitionUtils from '../../utils/transitionUtils';

export default class ExitTransitionPreviewService {

  private static EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 200;
  private static RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 400;

  public static exitTransitionPreviewCallback(modalElement: HTMLElement): void {
    const pendingModalTransitionPreviewUnset = window.setTimeout(() => {
      TransitionUtils.cancelModalTransitionPreview(modalElement);
    }, ExitTransitionPreviewService.RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS); 
    expandedModalPreviewModeState.setPendingModalTransitionPreviewUnsetState(pendingModalTransitionPreviewUnset);
  }

  public static start(modalExitTransition: ModalExitTransition, transitionDuration: string, modalElement: HTMLElement): void {
    TransitionUtils.cancelModalTransitionPreview(modalElement);
    expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(true);
    const pendingModalTransitionStart = window.setTimeout(() => { 
      modalExitTransition(transitionDuration, modalElement, ExitTransitionPreviewService.exitTransitionPreviewCallback);
    }, ExitTransitionPreviewService.EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS);
    expandedModalPreviewModeState.setPendingModalTransitionStartState(pendingModalTransitionStart);
  }
}
