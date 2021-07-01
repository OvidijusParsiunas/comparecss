import { ToggleFullPreviewModeOffCallbacks } from '../../../../../../interfaces/toggleFullPreviewModeEvent';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import GenericToggleOff from './toggleMode/generic/toggleOff';
import GenericToggleOn from './toggleMode/generic/toggleOn';
import ModalToggleOff from './toggleMode/modal/toggleOff';
import ModalToggleOn from './toggleMode/modal/toggleOn';
import { ComponentOptions } from 'vue';

export default class ToggleFullPreviewMode {

  private static readonly TOGGLE_ON_CLASSES = {
    [COMPONENT_TYPES.ALERT]: GenericToggleOn, [COMPONENT_TYPES.CARD]: GenericToggleOn, [COMPONENT_TYPES.MODAL]: ModalToggleOn };
  private static readonly TOGGLE_OFF_CLASSES = {
    [COMPONENT_TYPES.ALERT]: GenericToggleOff, [COMPONENT_TYPES.CARD]: GenericToggleOff, [COMPONENT_TYPES.MODAL]: ModalToggleOff };

  public static toggleOn(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      temporaryComponentElement: HTMLElement, toggleFullPreviewModeOffCallbacks: ToggleFullPreviewModeOffCallbacks): void {
    const toggleClass = ToggleFullPreviewMode.TOGGLE_ON_CLASSES[componentPreviewComponent.component.type];
    toggleClass.start(componentPreviewComponent, componentElement, toolbarContainerElement, toggleFullPreviewModeOffCallbacks,
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
