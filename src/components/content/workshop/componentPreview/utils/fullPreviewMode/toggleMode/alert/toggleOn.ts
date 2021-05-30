import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS } from '../../../../../../../../consts/toolbarClasses';
import { POINTER_EVENTS_NONE, SET_METHODS } from '../../../animations/consts/sharedConsts';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import ToggleDisplaysAlert from './dismissAlert';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleOn {

  // utils
  private static setToolbarContainerPositionToDefault(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean): void {
    if (isExpandedModalPreviewModeActive) {
      toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
    } else {
      toolbarElement.classList.remove(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
    }
    toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
  }

  public static start(componentPreviewComponent: ComponentOptions, componentPreviewElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void): void {
    ToggleDisplaysAlert.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
    GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
      ToggleDisplaysAlert.closeAlertCallback.bind(this, componentPreviewComponent, componentPreviewElement));
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, ToggleOn.setToolbarContainerPositionToDefault)
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }
}
