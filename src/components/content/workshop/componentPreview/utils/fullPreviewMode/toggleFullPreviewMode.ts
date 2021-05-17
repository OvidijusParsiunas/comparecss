import ImportComponedModeToggleOff from './toggleMode/toggleOff';
import ToggleOn from './toggleMode/toggleOn';
import { ComponentOptions } from 'vue';


export default class ToggleFullPreviewMode {
  
  public static toggleOn(componentPreviewComponent: ComponentOptions, componentPreviewElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    ToggleOn.start(componentPreviewComponent, componentPreviewElement, temporaryComponentElement, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
  }

  public static toggleOff(componentPreviewComponent: ComponentOptions, componentPreviewElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void): void {
    ImportComponedModeToggleOff.start(componentPreviewComponent, componentPreviewElement, temporaryComponentElement, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
  }
}
