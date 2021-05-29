import { WorkshopEventCallbackReturn } from '../../../../../../../interfaces/workshopEventCallbackReturn';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../../interfaces/workshopEventCallback';
import ExpandedModalModeGeneralUtils from '../../animations/utils/generalUtils';
import { ComponentOptions } from 'vue';
import {
  MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, OPACITY_VISIBLE, OPACITY_INVISIBLE, ELEMENT_CSS_CHANGE_MILLISECONDS, 
  MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS, POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE,
} from '../../animations/consts/sharedConsts';

export default class GeneralUtils {

  private static startToolbarAnimationWithFadeOut(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void, toolbarPositionCallback: (toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean) => void): void {
    ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);
    window.setTimeout(() => {
      toolbarPositionCallback(toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive);
      toggleFullPreviewModeOptionsCallback();
      ExpandedModalModeGeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
      setTimeout(() => {
        ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, toolbarContainerElement);        
      }, ELEMENT_CSS_CHANGE_MILLISECONDS);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
  }

  public static switchComponentsWithFadeOut(modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      switchComponentCallback: () => void): void {
    ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, modalElement);
    ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, temporaryComponentElement);
    window.setTimeout(() => {
      switchComponentCallback();
      setTimeout(() => {
        ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, modalElement);
        ExpandedModalModeGeneralUtils.opacityFadeAnimation(OPACITY_VISIBLE, MODE_TOGGLE_FADE_ANIMATION_DURATION_SECONDS, temporaryComponentElement);
      }, ELEMENT_CSS_CHANGE_MILLISECONDS);
    }, MODE_TOGGLE_FADE_ANIMATION_DURATION_MILLISECONDS);
  }

  public static updateToolbarStyle(pointerEvents: typeof POINTER_EVENTS_NONE | typeof POINTER_EVENTS_REMOVE,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void, updateToolbarClassesCallback: (toolbarContainerElement: HTMLElement,
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
