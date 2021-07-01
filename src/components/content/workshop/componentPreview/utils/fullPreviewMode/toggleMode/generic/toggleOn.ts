import { ToggleFullPreviewModeOffCallbacks } from '../../../../../../../../interfaces/toggleFullPreviewModeEvent';
import { POINTER_EVENTS_NONE, SET_METHODS } from '../../../animations/consts/sharedConsts';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';
import Dismiss from './dismiss';

export default class ToggleOn {

  public static start(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toggleFullPreviewModeOffCallbacks: ToggleFullPreviewModeOffCallbacks): void {
    componentPreviewComponent.isFullPreviewModeOn = true;
    Dismiss.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
    GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
      Dismiss.closeCallback.bind(this, componentPreviewComponent, componentElement, toolbarContainerElement, toggleFullPreviewModeOffCallbacks));
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toggleFullPreviewModeOffCallbacks.toggleFullPreviewModeOptionsCallback);
  }
}
