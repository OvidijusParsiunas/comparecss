import { POINTER_EVENTS_NONE } from '../../../animations/consts/sharedConsts';
import AnimationUtils from '../../../animations/utils/animationUtils';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleOff {

  public static start(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void): void {
    AnimationUtils.cancelAnimationPreview(componentPreviewComponent.$refs.baseComponent.$refs.componentPreview);
    componentPreviewComponent.isFullPreviewModeOn = false;
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, GeneralUtils.resetToolbarContainerPosition);
  }
}
