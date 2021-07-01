import { WorkshopEventCallbackReturn } from '../../../../../../../interfaces/workshopEventCallbackReturn';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../../interfaces/workshopEventCallback';
import ExpandedModalModeGeneralUtils from '../../animations/utils/generalUtils';
import { animationState } from '../../animations/state';
import { ComponentOptions } from 'vue';
import {
  MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, OPACITY_VISIBLE, OPACITY_INVISIBLE, ELEMENT_CSS_CHANGE_MILLISECONDS, 
  MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS, POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE,
} from '../../animations/consts/sharedConsts';
import {
  EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES, TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS,
 } from '../../../../../../../consts/toolbarClasses';

export default class GeneralUtils {

  public static setToolbarContainerPositionToDefault(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean): void {
    if (isExpandedModalPreviewModeActive) {
      toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
    } else {
      toolbarElement.classList.remove(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
    }
    toolbarContainerElement.classList.remove(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
  }

  public static resetToolbarContainerPosition(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    toolbarElement.classList.remove(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
    if (animationState.getExpandedModalModeToolbarContainerPositionState() === EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM) {
      toolbarContainerElement.classList.add(EXPANDED_MODAL_TOOLBAR_CONTAINER_POSITION_CLASSES.BOTTOM);
    }
  }

  private static startToolbarAnimationWithFadeOut(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void, toolbarPositionCallback?: (toolbarContainerElement: HTMLElement,
        toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean) => void): void {
    ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
    window.setTimeout(() => {
      if (toolbarPositionCallback) toolbarPositionCallback(toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive);
      toggleFullPreviewModeOptionsCallback();
      ExpandedModalModeGeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
      setTimeout(() => {
        ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);        
      }, ELEMENT_CSS_CHANGE_MILLISECONDS);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
  }

  public static switchComponentsWithFadeOut(componentElement: HTMLElement, fadeOutCallback: () => void, temporaryComponentElement?: HTMLElement): void {
    ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS,
      componentElement, temporaryComponentElement);
    window.setTimeout(() => {
      fadeOutCallback();
      setTimeout(() => {
        ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS,
          componentElement, temporaryComponentElement);
      }, ELEMENT_CSS_CHANGE_MILLISECONDS);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
  }

  public static updateToolbarStyle(pointerEvents: typeof POINTER_EVENTS_NONE | typeof POINTER_EVENTS_REMOVE,
      toolbarContainerElement: HTMLElement, toggleFullPreviewModeOptionsCallback: () => void, toolbarElement?: HTMLElement,
      isExpandedModalPreviewModeActive?: boolean, updateToolbarClassesCallback?: (toolbarContainerElement: HTMLElement,
        toolbarElement: HTMLElement, isExpandedModalPreviewModeActive?: boolean) => void): void {
    ExpandedModalModeGeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, pointerEvents);
    GeneralUtils.startToolbarAnimationWithFadeOut(toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive,
      toggleFullPreviewModeOptionsCallback, updateToolbarClassesCallback);
  }

  public static createWorkshopEventCallback(componentPreviewComponent: ComponentOptions, workshopEventCallbackFunc: () => WorkshopEventCallbackReturn): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE]);
    const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: workshopEventCallbackFunc };
    componentPreviewComponent.$emit('full-preview-mode-display-modal', workshopEventCallback);
  }
}
