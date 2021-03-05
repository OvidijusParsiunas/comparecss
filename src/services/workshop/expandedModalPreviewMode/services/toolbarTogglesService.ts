import { MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, OPACITY_INVISIBLE, OPACITY_VISIBLE } from '../utils/sharedConsts';
import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../../consts/toolbarClasses';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import TransitionsUtils from '../utils/transitionsUtils';

export default class ToolbarTogglesService {

  public static toggleToolbarPosition(toolbarContainerElement: HTMLElement): void {
    TransitionsUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    setTimeout(() => {
      if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
        toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
        expandedModalPreviewModeState.setExpandedModalModeToolbarContainerPositionState(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.DEFAULT);
      } else {
        toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
        expandedModalPreviewModeState.setExpandedModalModeToolbarContainerPositionState(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
      }
      TransitionsUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }
}
