import { expandedModalPreviewModeState } from '../../expandedModalPreviewModeState';
import { ModalExitTransition } from '../../../../../interfaces/modalTransitions';
import TransitionsUtils from '../../utils/transitionsUtils';

export default class ExitTransitionPreviewService {

  private static EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 200;
  private static RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS = 400;

  public static exitTransitionPreviewCallback(modalElement: HTMLElement): void {
    const pendingPropertyResetAfterExitState = window.setTimeout(() => {
      TransitionsUtils.cancelModalTransitionPreview(modalElement);
    }, ExitTransitionPreviewService.RESET_MODAL_AFTER_EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS); 
    expandedModalPreviewModeState.setPendingPropertyResetAfterExitState(pendingPropertyResetAfterExitState);
  }

  public static start(modalEntranceTransition: ModalExitTransition, transitionDuration: string, modalElement: HTMLElement): void {
    TransitionsUtils.cancelModalTransitionPreview(modalElement);
    expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(true);
    const pendingTransitionInit = window.setTimeout(() => { 
      modalEntranceTransition(transitionDuration, modalElement, ExitTransitionPreviewService.exitTransitionPreviewCallback);
    }, ExitTransitionPreviewService.EXIT_TRANSITION_PREVIEW_TIMEOUT_MILLISECONDS);
    expandedModalPreviewModeState.setPendingTransitionInitState(pendingTransitionInit);
  }
}
