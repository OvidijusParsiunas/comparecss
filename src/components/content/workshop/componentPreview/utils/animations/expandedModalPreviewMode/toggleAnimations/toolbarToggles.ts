import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from '../../../../../../../../consts/toolbarClasses';
import GeneralUtils from '../../utils/generalUtils';
import { animationState } from '../../state';
import {
  MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS, OPACITY_INVISIBLE,
  MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, OPACITY_VISIBLE,
} from '../../consts/sharedConsts';

export default class ToolbarToggles {

  public static toggleToolbarPosition(toolbarContainerElement: HTMLElement): void {
    GeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
    setTimeout(() => {
      if (animationState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
        toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
        animationState.setExpandedModalModeToolbarContainerPositionState(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.DEFAULT);
      } else {
        toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
        animationState.setExpandedModalModeToolbarContainerPositionState(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
      }
      GeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
  }
}
