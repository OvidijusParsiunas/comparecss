import { NEW_COMPONENT_STYLES } from "@/consts/newComponentStyles.enum";
import { NEW_COMPONENT_TYPES } from "@/consts/newComponentTypes.enum";
import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from "@/consts/toolbarClasses";
import { TemporaryComponent } from "@/interfaces/temporaryComponent";
import { ComponentOptions } from "vue";
import { componentTypeToStyles } from "../../../newComponent/types/componentTypeToStyles";
import ComponentPreviewUtils from "../componentPreviewUtils";
import { MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, OPACITY_INVISIBLE, OPACITY_VISIBLE, POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE } from "../expandedModalPreviewMode/consts/sharedConsts";
import { expandedModalPreviewModeState } from "../expandedModalPreviewMode/expandedModalPreviewModeState";
import GeneralUtils from "../expandedModalPreviewMode/utils/generalUtils";
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
      }, 10);
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
    componentPreviewComponent.temporaryComponent = null;
  }

  private static switchModalToButton(componentPreviewComponent: ComponentOptions): void {
    const component = componentTypeToStyles[NEW_COMPONENT_TYPES.BUTTON][NEW_COMPONENT_STYLES.DEFAULT].createNewComponent();
    const subcomponentAndOverlayElementIds = ComponentPreviewUtils.generateSubcomponentAndOverlayIds(component);
    const mouseEvents = ComponentPreviewUtils.generateMouseEvents(subcomponentAndOverlayElementIds, component.subcomponents,
      ToggleDisplays.actionsPreviewModeClickEvent.bind(this, componentPreviewComponent));
    componentPreviewComponent.temporaryComponent = { component, subcomponentAndOverlayElementIds, mouseEvents } as TemporaryComponent;
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
      }, 10);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  public static toggleOn(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullModalPreviewModeOptionsCallback: () => void, toggleFullModalPreviewModeToolbarCallback: () => void): void {
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
    if (!isExpandedModalPreviewModeActive) ToggleFullModalPreviewMode.startModalAndBackdropTransitionWithFadeOut(modalElement,
      temporaryComponentElement, ToggleFullModalPreviewMode.switchModalToButton.bind(this, componentPreviewComponent));
    ToggleFullModalPreviewMode.startToolbarTransitionWithFadeOut(toolbarContainerElement, toggleFullModalPreviewModeOptionsCallback,
      toggleFullModalPreviewModeToolbarCallback, ToggleFullModalPreviewMode.setToolbarContainerPositionToDefault);
  }

  public static toggleOff(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      toolbarContainerElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullModalPreviewModeOptionsCallback: () => void, toggleFullModalPreviewModeToolbarCallback: () => void): void {
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
    if (!isExpandedModalPreviewModeActive) ToggleFullModalPreviewMode.startModalAndBackdropTransitionWithFadeOut(modalElement,
      temporaryComponentElement, ToggleFullModalPreviewMode.switchButtonToModal.bind(this, componentPreviewComponent));
    ToggleFullModalPreviewMode.startToolbarTransitionWithFadeOut(toolbarContainerElement, toggleFullModalPreviewModeOptionsCallback,
      toggleFullModalPreviewModeToolbarCallback, ToggleFullModalPreviewMode.resetToolbarContainerPosition);
  }
}
