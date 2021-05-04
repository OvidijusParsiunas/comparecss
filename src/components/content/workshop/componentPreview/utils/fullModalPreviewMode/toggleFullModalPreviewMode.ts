import { DOM_EVENT_TRIGGER_KEYS } from "@/consts/domEventTriggerKeys.enum";
import { NEW_COMPONENT_STYLES } from "@/consts/newComponentStyles.enum";
import { NEW_COMPONENT_TYPES } from "@/consts/newComponentTypes.enum";
import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from "@/consts/toolbarClasses";
import { TemporaryComponent } from "@/interfaces/temporaryComponent";
import { WorkshopEventCallback } from "@/interfaces/workshopEventCallback";
import { ComponentOptions } from "vue";
import { componentTypeToStyles } from "../../../newComponent/types/componentTypeToStyles";
import ComponentPreviewUtils from "../componentPreviewUtils";
import { MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, OPACITY_INVISIBLE, OPACITY_VISIBLE, POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE } from "../expandedModalPreviewMode/consts/sharedConsts";
import { expandedModalPreviewModeState } from "../expandedModalPreviewMode/expandedModalPreviewModeState";
import GeneralUtils from "../expandedModalPreviewMode/utils/generalUtils";
import { fullModalPreviewModeState } from "./fullModalPreviewModeState";
import ToggleDisplays from "./toggleDisplays";

export default class ToggleFullModalPreviewMode {


  private static startToolbarTransitionWithFadeOut(toolbarContainerElement: HTMLElement, toggleFullModalPreviewModeOptionsCallback: () => void,
      toggleFullModalPreviewModeToolbarCallback: () => void, toolbarContainerPositionCallback: (toolbarContainerElement: HTMLElement) => void): void {
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    window.setTimeout(() => {
      toolbarContainerPositionCallback(toolbarContainerElement);
      toggleFullModalPreviewModeOptionsCallback();
      toggleFullModalPreviewModeToolbarCallback();
      GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
      setTimeout(() => {
        GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);        
      }, ToggleDisplays.VIEW_CHANGE_MILLISECONDS);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  private static setToolbarContainerPositionToDefault(toolbarContainerElement: HTMLElement): void {
    toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
  }

  private static resetToolbarContainerPosition(toolbarContainerElement: HTMLElement): void {
    if (expandedModalPreviewModeState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
  }

  private static switchButtonToModal(componentPreviewComponent: ComponentOptions): void {
    componentPreviewComponent.isFullPreviewModeOn = false;
  }

  private static createButtonForModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean): void {
    componentPreviewComponent.temporaryComponent.displayed = !isExpandedModalPreviewModeActive;
    componentPreviewComponent.isFullPreviewModeOn = true;
    if (componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds) return;
    const subcomponentAndOverlayElementIds = ComponentPreviewUtils.generateSubcomponentAndOverlayIds(componentPreviewComponent.temporaryComponent.component);
    const mouseEvents = ComponentPreviewUtils.generateMouseEvents(subcomponentAndOverlayElementIds, componentPreviewComponent.temporaryComponent.component.subcomponents,
      ToggleDisplays.displayModal.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement));
    componentPreviewComponent.temporaryComponent.subcomponentAndOverlayElementIds = subcomponentAndOverlayElementIds;
    componentPreviewComponent.temporaryComponent.mouseEvents = mouseEvents;
  }

  private static startModalAndBackdropTransitionWithFadeOut(modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      switchComponentCallback: () => void): void {
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, modalElement);
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, temporaryComponentElement);
    window.setTimeout(() => {
      switchComponentCallback();
      setTimeout(() => {
        GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, modalElement);
        GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, temporaryComponentElement);
      }, ToggleDisplays.VIEW_CHANGE_MILLISECONDS);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  public static toggleOn(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullModalPreviewModeOptionsCallback: () => void, toggleFullModalPreviewModeToolbarCallback: () => void): void {
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
    if (!isExpandedModalPreviewModeActive) { 
      ToggleFullModalPreviewMode.startModalAndBackdropTransitionWithFadeOut(modalElement, temporaryComponentElement,
        ToggleFullModalPreviewMode.createButtonForModal.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement,
          isExpandedModalPreviewModeActive));
    } else {
      ToggleFullModalPreviewMode.createButtonForModal(componentPreviewComponent, toolbarContainerElement, toolbarElement,
        isExpandedModalPreviewModeActive);
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = {
        keyTriggers, func: ToggleDisplays.hideModal.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement) };
      componentPreviewComponent.$emit('full-preview-mode-display-modal', workshopEventCallback);
      }
    ToggleFullModalPreviewMode.startToolbarTransitionWithFadeOut(toolbarContainerElement, toggleFullModalPreviewModeOptionsCallback,
      toggleFullModalPreviewModeToolbarCallback, ToggleFullModalPreviewMode.setToolbarContainerPositionToDefault);
    fullModalPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }

  public static toggleOff(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullModalPreviewModeOptionsCallback: () => void, toggleFullModalPreviewModeToolbarCallback: () => void): void {
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
    if (!isExpandedModalPreviewModeActive) {
      ToggleFullModalPreviewMode.startModalAndBackdropTransitionWithFadeOut(modalElement,
      temporaryComponentElement, ToggleFullModalPreviewMode.switchButtonToModal.bind(this, componentPreviewComponent));
    } else {
      ToggleFullModalPreviewMode.switchButtonToModal(componentPreviewComponent);
    }        
    ToggleFullModalPreviewMode.startToolbarTransitionWithFadeOut(toolbarContainerElement, toggleFullModalPreviewModeOptionsCallback,
      toggleFullModalPreviewModeToolbarCallback, ToggleFullModalPreviewMode.resetToolbarContainerPosition);
    fullModalPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }
}
