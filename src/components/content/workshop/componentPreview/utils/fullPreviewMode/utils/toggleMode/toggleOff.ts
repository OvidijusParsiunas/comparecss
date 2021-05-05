import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS } from '../../../../../../../../consts/toolbarClasses';
import { expandedModalPreviewModeState } from '../../../expandedModalPreviewMode/expandedModalPreviewModeState';
import { POINTER_EVENTS_NONE } from '../../../expandedModalPreviewMode/consts/sharedConsts';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import GeneralUtils from './generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleOff {

  private static resetToolbarContainerPosition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    toolbarElement.classList.remove(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
    if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
  }

  private static switchButtonToModal(componentPreviewComponent: ComponentOptions): void {
    componentPreviewComponent.isFullPreviewModeOn = false;
  }

  public static start(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    if (!isExpandedModalPreviewModeActive) {
      GeneralUtils.startModalAndBackdropTransitionWithFadeOut(modalElement,
        temporaryComponentElement, ToggleOff.switchButtonToModal.bind(this, componentPreviewComponent));
    } else {
      ToggleOff.switchButtonToModal(componentPreviewComponent);
    }
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, ToggleOff.resetToolbarContainerPosition)
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }
}
