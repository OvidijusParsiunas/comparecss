import { ModalExitTransition } from '../../../../../../../interfaces/modalTransitions';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import TransitionUtils from '../utils/transitionUtils';

export default class PreviewExitTransition {

  private static readonly EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 200;
  private static readonly RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 400;

  private static exitTransitionPreviewCallback(modalElement: HTMLElement): void {
    const pendingModalTransitionPreviewUnset = window.setTimeout(() => {
      TransitionUtils.cancelModalTransitionPreview(modalElement);
    }, PreviewExitTransition.RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS); 
    expandedModalPreviewModeState.setPendingModalTransitionPreviewUnsetState(pendingModalTransitionPreviewUnset);
  }

  public static start(modalExitTransition: ModalExitTransition, transitionDuration: string, modalElement: HTMLElement): void {
    TransitionUtils.cancelModalTransitionPreview(modalElement);
    expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(true);
    const pendingModalTransitionStart = window.setTimeout(() => { 
      modalExitTransition(transitionDuration, modalElement, PreviewExitTransition.exitTransitionPreviewCallback);
    }, PreviewExitTransition.EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS);
    expandedModalPreviewModeState.setPendingModalTransitionStartState(pendingModalTransitionStart);
  }
}
