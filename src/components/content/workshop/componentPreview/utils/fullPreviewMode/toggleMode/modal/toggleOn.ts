import { subcomponentAndOverlayElementIdsState } from '../../../../../toolbar/options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { ToggleFullPreviewModeOffCallbacks } from '../../../../../../../../interfaces/toggleFullPreviewModeEvent';
import { POINTER_EVENTS_NONE, SET_METHODS } from '../../../animations/consts/sharedConsts';
import { SubcomponentAndOverlayIds } from '../../../subcomponentAndOverlayIds';
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

  // this gets called everytime we open up a new component and open up the display preview mode (currently modal)
  // generates new temporary button element ids and events depending on the latest subomponentAndOverlayIds number
  // no need to worry about adding new subcomponents when a component has not been switched as they will use
  // the subomponentAndOverlayIds number after that one
  private static createButtonForFullPreviewMode(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      temporaryComponentElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOffCallbacks: ToggleFullPreviewModeOffCallbacks): void {
    const subcomponentAndOverlayElementIds = SubcomponentAndOverlayIds.generate(componentPreviewComponent.temporaryComponent.component);
    const mouseEvents = ComponentPreviewUtils.generateMouseEvents(subcomponentAndOverlayElementIds,
      componentPreviewComponent.temporaryComponent.component.subcomponents,
      ToggleDisplays.displayModal.bind(this, componentPreviewComponent, componentElement, temporaryComponentElement,
        toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOffCallbacks));
    componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds = subcomponentAndOverlayElementIds;
    subcomponentAndOverlayElementIdsState.addSubcomponentAndOverlayElementIdsState(subcomponentAndOverlayElementIds);
    componentPreviewComponent.temporaryComponent.mouseEvents = mouseEvents;
  }

  private static setup(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOffCallbacks: ToggleFullPreviewModeOffCallbacks): void {
    if (!componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds) {
      ToggleOn.createButtonForFullPreviewMode(componentPreviewComponent, componentElement, temporaryComponentElement,
        toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOffCallbacks);
    }
  }

  public static start(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement, toolbarContainerElement: HTMLElement,
      toggleFullPreviewModeOffCallbacks: ToggleFullPreviewModeOffCallbacks, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, temporaryComponentElement: HTMLElement): void {
    ToggleOn.setup(componentPreviewComponent, componentElement, temporaryComponentElement, toolbarContainerElement,
      toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOffCallbacks);
    const prepareFullPreviewModeFunc = ToggleOn.prepareFullPreviewMode.bind(this, componentPreviewComponent, isExpandedModalPreviewModeActive);
    if (!isExpandedModalPreviewModeActive) {
      GeneralUtils.switchComponentsWithFadeOut(componentElement, prepareFullPreviewModeFunc, temporaryComponentElement);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ModalToggleOff.toggleOffCallback.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement,
          isExpandedModalPreviewModeActive, toggleFullPreviewModeOffCallbacks, componentElement, temporaryComponentElement));
    } else {
      prepareFullPreviewModeFunc();
      ToggleDisplays.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ToggleDisplays.closeModalCallback.bind(this, componentPreviewComponent, componentElement, temporaryComponentElement,
          toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOffCallbacks));
    }
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement,
      toggleFullPreviewModeOffCallbacks.toggleFullPreviewModeOptionsCallback, toolbarElement,
      isExpandedModalPreviewModeActive, GeneralUtils.setToolbarContainerPositionToDefault);
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }
}
