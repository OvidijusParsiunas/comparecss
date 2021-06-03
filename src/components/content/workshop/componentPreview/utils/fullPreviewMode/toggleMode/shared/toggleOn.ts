import { POINTER_EVENTS_NONE, SET_METHODS } from '../../../animations/consts/sharedConsts';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';
import Dismiss from './dismiss';

export default class ToggleOn {

  public static start(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    componentPreviewComponent.isFullPreviewModeOn = true;
    Dismiss.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
    GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
      Dismiss.closeAlertCallback.bind(this, componentPreviewComponent, componentElement, toolbarContainerElement,
        toggleFullPreviewModeOptionsCallback));
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toggleFullPreviewModeOptionsCallback);
  }
}
