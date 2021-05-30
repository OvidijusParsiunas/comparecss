import { POINTER_EVENTS_NONE, SET_METHODS } from '../../../animations/consts/sharedConsts';
import ToggleDisplaysAlert from './dismissAlert';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleOn {

  public static start(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void): void {
    componentPreviewComponent.isFullPreviewModeOn = true;
    ToggleDisplaysAlert.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
    GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
      ToggleDisplaysAlert.closeAlertCallback.bind(this, componentPreviewComponent, componentElement));
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, GeneralUtils.setToolbarContainerPositionToDefault)
  }
}
