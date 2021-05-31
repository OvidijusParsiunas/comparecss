import { POINTER_EVENTS_NONE, SET_METHODS } from '../../../animations/consts/sharedConsts';
import ToggleDisplaysAlert from './dismissAlert';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleOn {

  public static start(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    componentPreviewComponent.isFullPreviewModeOn = true;
    ToggleDisplaysAlert.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
    GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
      ToggleDisplaysAlert.closeAlertCallback.bind(this, componentPreviewComponent, componentElement, toolbarContainerElement,
        toggleFullPreviewModeOptionsCallback));
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toggleFullPreviewModeOptionsCallback);
  }
}
