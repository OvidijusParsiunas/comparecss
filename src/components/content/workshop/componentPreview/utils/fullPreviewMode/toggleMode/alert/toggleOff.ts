import { POINTER_EVENTS_NONE } from '../../../animations/consts/sharedConsts';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleOff {

  public static start(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void): void {
    componentPreviewComponent.isFullPreviewModeOn = false;
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, GeneralUtils.resetToolbarContainerPosition)
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }
}
