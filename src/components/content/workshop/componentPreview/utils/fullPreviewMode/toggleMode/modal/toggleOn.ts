import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS } from '../../../../../../../../consts/toolbarClasses';
import { POINTER_EVENTS_NONE, SET_METHODS } from '../../../animations/consts/sharedConsts';
import ComponentPreviewUtils from '../../../componentPreviewUtils';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import ImportComponedModeToggleOff from './toggleOff';
import ToggleDisplays from './toggleModal';
import GeneralUtils from '../generalUtils';
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

  private static prepareFullPreviewMode(componentPreviewComponent: ComponentOptions, isExpandedModalPreviewModeActive: boolean): void {
    componentPreviewComponent.temporaryComponent.displayed = !isExpandedModalPreviewModeActive;
    componentPreviewComponent.isFullPreviewModeOn = true;
  }

  private static createButtonForFullPreviewMode(componentPreviewComponent: ComponentOptions, componentPreviewElement: HTMLElement,
      temporaryComponentElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void): void {
    const subcomponentAndOverlayElementIds = ComponentPreviewUtils.generateSubcomponentAndOverlayIds(componentPreviewComponent.temporaryComponent.component);
    const mouseEvents = ComponentPreviewUtils.generateMouseEvents(subcomponentAndOverlayElementIds,
      componentPreviewComponent.temporaryComponent.component.subcomponents,
      ToggleDisplays.displayModal.bind(this, componentPreviewComponent, componentPreviewElement, temporaryComponentElement,
        toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback));
    componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds = subcomponentAndOverlayElementIds;
    componentPreviewComponent.temporaryComponent.mouseEvents = mouseEvents;
  }

  private static setup(componentPreviewComponent: ComponentOptions, componentPreviewElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    if (!componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds) {
      ToggleOn.createButtonForFullPreviewMode(componentPreviewComponent, componentPreviewElement, temporaryComponentElement,
        toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
    }
  }

  public static start(componentPreviewComponent: ComponentOptions, componentPreviewElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void, temporaryComponentElement: HTMLElement): void {
    ToggleOn.setup(componentPreviewComponent, componentPreviewElement, temporaryComponentElement, toolbarContainerElement,
      toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
    const prepareFullPreviewModeFunc = ToggleOn.prepareFullPreviewMode.bind(this, componentPreviewComponent, isExpandedModalPreviewModeActive)
    if (!isExpandedModalPreviewModeActive) {
      GeneralUtils.switchComponentsWithFadeOut(componentPreviewElement, temporaryComponentElement, prepareFullPreviewModeFunc);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ImportComponedModeToggleOff.toggleOffCallback.bind(this, componentPreviewComponent, componentPreviewElement, temporaryComponentElement,
          toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback));
    } else {
      prepareFullPreviewModeFunc();
      ToggleDisplays.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ToggleDisplays.closeModalCallback.bind(this, componentPreviewComponent, componentPreviewElement, temporaryComponentElement,
          toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback));
    }
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, ToggleOn.setToolbarContainerPositionToDefault)
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }
}
