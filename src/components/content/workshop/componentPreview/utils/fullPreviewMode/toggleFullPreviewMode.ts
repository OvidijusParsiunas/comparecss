import ToggleOff from './toggleMode/toggleOff';
import ToggleOn from './toggleMode/toggleOn';
import { ComponentOptions } from 'vue';


export default class ToggleFullPreviewMode {
  
  public static toggleOn(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    ToggleOn.start(componentPreviewComponent, modalElement, temporaryComponentElement, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
  }

  public static toggleOff(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    ToggleOff.start(componentPreviewComponent, modalElement, temporaryComponentElement, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
  }
}
