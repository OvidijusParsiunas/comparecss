import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import SharedToggleOff from './toggleMode/shared/toggleOff';
import ModalToggleOff from './toggleMode/modal/toggleOff';
import SharedToggleOn from './toggleMode/shared/toggleOn';
import ModalToggleOn from './toggleMode/modal/toggleOn';
import { ComponentOptions } from 'vue';

export default class ToggleFullPreviewMode {

  private static TOGGLE_ON_CLASSES = {
    [NEW_COMPONENT_TYPES.ALERT]: SharedToggleOn, [NEW_COMPONENT_TYPES.CARD]: SharedToggleOn, [NEW_COMPONENT_TYPES.MODAL]: ModalToggleOn };
  private static TOGGLE_OFF_CLASSES = {
    [NEW_COMPONENT_TYPES.ALERT]: SharedToggleOff, [NEW_COMPONENT_TYPES.CARD]: SharedToggleOff, [NEW_COMPONENT_TYPES.MODAL]: ModalToggleOff };

  public static toggleOn(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void, temporaryComponentElement: HTMLElement): void {
    const toggleClass = ToggleFullPreviewMode.TOGGLE_ON_CLASSES[componentPreviewComponent.component.type];
    toggleClass.start(componentPreviewComponent, componentElement, toolbarContainerElement, toggleFullPreviewModeOptionsCallback,
      toolbarElement, isExpandedModalPreviewModeActive, temporaryComponentElement);
  }

  public static toggleOff(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toggleFullPreviewModeOptionsCallback: () => void, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      componentElement: HTMLElement, temporaryComponentElement: HTMLElement): void {
    const toggleClass = ToggleFullPreviewMode.TOGGLE_OFF_CLASSES[componentPreviewComponent.component.type];
    toggleClass.start(componentPreviewComponent, toolbarContainerElement, toggleFullPreviewModeOptionsCallback,
      toolbarElement, isExpandedModalPreviewModeActive, componentElement, temporaryComponentElement);
  }
}
