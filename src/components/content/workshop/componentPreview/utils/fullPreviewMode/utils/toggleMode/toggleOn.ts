import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS } from '../../../../../../../../consts/toolbarClasses';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../../../interfaces/workshopEventCallback';
import { POINTER_EVENTS_NONE } from '../../../expandedModalPreviewMode/consts/sharedConsts';
import ComponentPreviewUtils from '../../../componentPreviewUtils';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import ToggleDisplays from '../../toggleDisplays';
import GeneralUtils from './generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleOn {

  private static setToolbarContainerPositionToDefault(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean): void {
    if (isExpandedModalPreviewModeActive) {
      toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
    } else {
      toolbarElement.classList.remove(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
    }
    toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
  }

  private static createWorkshopEventCallback(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE]);
    const workshopEventCallback: WorkshopEventCallback = {
      keyTriggers, func: ToggleDisplays.hideModal.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement) };
    componentPreviewComponent.$emit('full-preview-mode-display-modal', workshopEventCallback);
  }

  private static switchButtonToModalComponent(componentPreviewComponent: ComponentOptions, isExpandedModalPreviewModeActive: boolean): void {
    componentPreviewComponent.temporaryComponent.displayed = !isExpandedModalPreviewModeActive;
    componentPreviewComponent.isFullPreviewModeOn = true;
  }

  private static createButtonForFullPreviewMode(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement): void {
    const subcomponentAndOverlayElementIds = ComponentPreviewUtils.generateSubcomponentAndOverlayIds(componentPreviewComponent.temporaryComponent.component);
    const mouseEvents = ComponentPreviewUtils.generateMouseEvents(subcomponentAndOverlayElementIds,
      componentPreviewComponent.temporaryComponent.component.subcomponents,
      ToggleDisplays.displayModal.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement));
    componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds = subcomponentAndOverlayElementIds;
    componentPreviewComponent.temporaryComponent.mouseEvents = mouseEvents;
  }

  private static setup(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    if (!componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds) {
      ToggleOn.createButtonForFullPreviewMode(componentPreviewComponent, toolbarContainerElement, toolbarElement);
    }
  }

  public static start(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    ToggleOn.setup(componentPreviewComponent, toolbarContainerElement, toolbarElement);
    const switchButtonToModalComponentFunc = ToggleOn.switchButtonToModalComponent.bind(this,
      componentPreviewComponent, isExpandedModalPreviewModeActive)
    if (!isExpandedModalPreviewModeActive) { 
      GeneralUtils.startModalAndBackdropTransitionWithFadeOut(modalElement, temporaryComponentElement, switchButtonToModalComponentFunc);
    } else {
      switchButtonToModalComponentFunc();
      ToggleOn.createWorkshopEventCallback(componentPreviewComponent, toolbarContainerElement, toolbarElement);
    }
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, ToggleOn.setToolbarContainerPositionToDefault)
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }
}
