import { POINTER_EVENTS_NONE } from '../../../animations/consts/sharedConsts';
import AnimationUtils from '../../../animations/utils/animationUtils';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleOff {

  public static start(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, 
      toggleFullPreviewModeOptionsCallback: () => void): void {
    AnimationUtils.cancelAnimationPreview(componentPreviewComponent.$refs.baseComponent.$refs.componentPreview);
    componentPreviewComponent.isFullPreviewModeOn = false;
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toggleFullPreviewModeOptionsCallback);
  }
}
