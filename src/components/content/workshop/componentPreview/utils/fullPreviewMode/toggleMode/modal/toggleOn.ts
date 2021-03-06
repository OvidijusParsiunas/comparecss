import { POINTER_EVENTS_NONE, SET_METHODS } from '../../../animations/consts/sharedConsts';
import ComponentPreviewUtils from '../../../componentPreviewUtils';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import ToggleDisplays from './toggleModal';
import GeneralUtils from '../generalUtils';
import ModalToggleOff from './toggleOff';
import { ComponentOptions } from 'vue';

export default class ToggleOn {

  private static prepareFullPreviewMode(componentPreviewComponent: ComponentOptions, isExpandedModalPreviewModeActive: boolean): void {
    componentPreviewComponent.temporaryComponent.displayed = !isExpandedModalPreviewModeActive;
    componentPreviewComponent.isFullPreviewModeOn = true;
  }

  private static createButtonForFullPreviewMode(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      temporaryComponentElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void): void {
    const subcomponentAndOverlayElementIds = ComponentPreviewUtils.generateSubcomponentAndOverlayIds(componentPreviewComponent.temporaryComponent.component);
    const mouseEvents = ComponentPreviewUtils.generateMouseEvents(subcomponentAndOverlayElementIds,
      componentPreviewComponent.temporaryComponent.component.subcomponents,
      ToggleDisplays.displayModal.bind(this, componentPreviewComponent, componentElement, temporaryComponentElement,
        toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback));
    componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds = subcomponentAndOverlayElementIds;
    componentPreviewComponent.temporaryComponent.mouseEvents = mouseEvents;
  }

  private static setup(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    if (!componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds) {
      ToggleOn.createButtonForFullPreviewMode(componentPreviewComponent, componentElement, temporaryComponentElement,
        toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
    }
  }

  public static start(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toggleFullPreviewModeOptionsCallback: () => void, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, temporaryComponentElement: HTMLElement): void {
    ToggleOn.setup(componentPreviewComponent, componentElement, temporaryComponentElement, toolbarContainerElement,
      toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
    const prepareFullPreviewModeFunc = ToggleOn.prepareFullPreviewMode.bind(this, componentPreviewComponent, isExpandedModalPreviewModeActive);
    if (!isExpandedModalPreviewModeActive) {
      GeneralUtils.switchComponentsWithFadeOut(componentElement, temporaryComponentElement, prepareFullPreviewModeFunc);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ModalToggleOff.toggleOffCallback.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement,
          isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, componentElement, temporaryComponentElement));
    } else {
      prepareFullPreviewModeFunc();
      ToggleDisplays.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ToggleDisplays.closeModalCallback.bind(this, componentPreviewComponent, componentElement, temporaryComponentElement,
          toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback));
    }
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toggleFullPreviewModeOptionsCallback,
      toolbarElement, isExpandedModalPreviewModeActive, GeneralUtils.setToolbarContainerPositionToDefault);
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }
}
