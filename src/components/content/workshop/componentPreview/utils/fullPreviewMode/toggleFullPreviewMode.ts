import { NEW_COMPONENT_TYPES } from '../../../../../../consts/newComponentTypes.enum';
import ModalToggleOff from './toggleMode/modal/toggleOff';
import AlertToggleOff from './toggleMode/alert/toggleOff';
import ModalToggleOn from './toggleMode/modal/toggleOn';
import AlertToggleOn from './toggleMode/alert/toggleOn';
import { ComponentOptions } from 'vue';

export default class ToggleFullPreviewMode {

  private static TOGGLE_ON_CLASSES = { [NEW_COMPONENT_TYPES.ALERT]: AlertToggleOn, [NEW_COMPONENT_TYPES.MODAL]: ModalToggleOn };
  private static TOGGLE_OFF_CLASSES = { [NEW_COMPONENT_TYPES.ALERT]: AlertToggleOff, [NEW_COMPONENT_TYPES.MODAL]: ModalToggleOff };

  public static toggleOn(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void, temporaryComponentElement: HTMLElement): void {
    const toggleClass = ToggleFullPreviewMode.TOGGLE_ON_CLASSES[componentPreviewComponent.component.type];
    toggleClass.start(componentPreviewComponent, componentElement, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, temporaryComponentElement);
  }

  public static toggleOff(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void, componentElement: HTMLElement,
      temporaryComponentElement: HTMLElement): void {
    const toggleClass = ToggleFullPreviewMode.TOGGLE_OFF_CLASSES[componentPreviewComponent.component.type];
    toggleClass.start(componentPreviewComponent, toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive,
      toggleFullPreviewModeOptionsCallback, componentElement, temporaryComponentElement);
  }
}
