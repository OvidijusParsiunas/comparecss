import { NEW_COMPONENT_STYLES } from "@/consts/newComponentStyles.enum";
import { NEW_COMPONENT_TYPES } from "@/consts/newComponentTypes.enum";
import { EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES } from "@/consts/toolbarClasses";
import { ComponentOptions } from "vue";
import { componentTypeToStyles } from "../../../newComponent/types/componentTypeToStyles";
import { MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, OPACITY_INVISIBLE, OPACITY_VISIBLE, POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE } from "../expandedModalPreviewMode/consts/sharedConsts";
import { expandedModalPreviewModeState } from "../expandedModalPreviewMode/expandedModalPreviewModeState";
import GeneralUtils from "../expandedModalPreviewMode/utils/generalUtils";

export default class ToggleFullModalPreviewMode {

  private static startToolbarTransitionWithFadeOut(toolbarContainerElement: HTMLElement, toggleFullModalPreviewModeOptionsCallback: () => void,
      toggleFullModalPreviewModeToolbarCallback: () => void, toolbarContainerPositionCallback: (toolbarContainerElement: HTMLElement) => void): void {
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    window.setTimeout(() => {
      toolbarContainerPositionCallback(toolbarContainerElement);
      toggleFullModalPreviewModeOptionsCallback();
      toggleFullModalPreviewModeToolbarCallback();
      GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
      GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
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
    componentPreviewComponent.$emit('temporarily-switch-component-for-full-modal-preview-mode',
      componentPreviewComponent.temporaryModalComponent);
    componentPreviewComponent.temporaryModalComponent = null;
  }

  private static switchModalToButton(componentPreviewComponent: ComponentOptions): void {
    componentPreviewComponent.temporaryModalComponent = componentPreviewComponent.component;
    componentPreviewComponent.$emit('temporarily-switch-component-for-full-modal-preview-mode',
      componentTypeToStyles[NEW_COMPONENT_TYPES.BUTTON][NEW_COMPONENT_STYLES.DEFAULT].createNewComponent());
  }

  private static startModalAndBackdropTransitionWithFadeOut(modalElement: HTMLElement, switchComponentCallback: () => void): void {
    GeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, modalElement);
    window.setTimeout(() => {
      switchComponentCallback();
      GeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, modalElement);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  public static toggleOn(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement,
      toolbarContainerElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullModalPreviewModeOptionsCallback: () => void, toggleFullModalPreviewModeToolbarCallback: () => void): void {
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
    if (!isExpandedModalPreviewModeActive) ToggleFullModalPreviewMode.startModalAndBackdropTransitionWithFadeOut(modalElement,
      ToggleFullModalPreviewMode.switchModalToButton.bind(this, componentPreviewComponent));
    ToggleFullModalPreviewMode.startToolbarTransitionWithFadeOut(toolbarContainerElement, toggleFullModalPreviewModeOptionsCallback,
      toggleFullModalPreviewModeToolbarCallback, ToggleFullModalPreviewMode.setToolbarContainerPositionToDefault);
  }

  public static toggleOff(componentPreviewComponent: ComponentOptions, modalElement: HTMLElement,
      toolbarContainerElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullModalPreviewModeOptionsCallback: () => void, toggleFullModalPreviewModeToolbarCallback: () => void): void {
    GeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_NONE);
    if (!isExpandedModalPreviewModeActive) ToggleFullModalPreviewMode.startModalAndBackdropTransitionWithFadeOut(modalElement,
      ToggleFullModalPreviewMode.switchButtonToModal.bind(this, componentPreviewComponent));
    ToggleFullModalPreviewMode.startToolbarTransitionWithFadeOut(toolbarContainerElement, toggleFullModalPreviewModeOptionsCallback,
      toggleFullModalPreviewModeToolbarCallback, ToggleFullModalPreviewMode.resetToolbarContainerPosition);
  }
}
