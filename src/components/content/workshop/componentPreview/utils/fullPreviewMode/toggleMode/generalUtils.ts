import { WorkshopEventCallbackReturn } from '../../../../../../../interfaces/workshopEventCallbackReturn';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '../../../../../../../interfaces/workshopEventCallback';
import ExpandedModalModeGeneralUtils from '../../expandedModalPreviewMode/utils/generalUtils';
import { ComponentOptions } from 'vue';
import {
  MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS,
  OPACITY_INVISIBLE, OPACITY_VISIBLE, POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE,
} from '../../expandedModalPreviewMode/consts/sharedConsts';

export default class GeneralUtils {

  public static readonly VIEW_CHANGE_MILLISECONDS = 10;

  private static startToolbarTransitionWithFadeOut(toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void, toolbarPositionCallback: (toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean) => void): void {
    ExpandedModalModeGeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);
    window.setTimeout(() => {
      toolbarPositionCallback(toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive);
      toggleFullPreviewModeOptionsCallback();
      ExpandedModalModeGeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, POINTER_EVENTS_REMOVE);
      setTimeout(() => {
        ExpandedModalModeGeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, toolbarContainerElement);        
      }, GeneralUtils.VIEW_CHANGE_MILLISECONDS);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  public static startModalAndBackdropTransitionWithFadeOut(modalElement: HTMLElement, temporaryComponentElement: HTMLElement,
      switchComponentCallback: () => void): void {
    ExpandedModalModeGeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, modalElement);
    ExpandedModalModeGeneralUtils.opacityFadeTransition(OPACITY_INVISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, temporaryComponentElement);
    window.setTimeout(() => {
      switchComponentCallback();
      setTimeout(() => {
        ExpandedModalModeGeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, modalElement);
        ExpandedModalModeGeneralUtils.opacityFadeTransition(OPACITY_VISIBLE, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS, temporaryComponentElement);
      }, GeneralUtils.VIEW_CHANGE_MILLISECONDS);
    }, MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS);
  }

  public static updateToolbarStyle(pointerEvents: typeof POINTER_EVENTS_NONE | typeof POINTER_EVENTS_REMOVE,
      toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean,
      toggleFullPreviewModeOptionsCallback: () => void, updateToolbarClassesCallback: (toolbarContainerElement: HTMLElement,
        toolbarElement: HTMLElement, isExpandedModalPreviewModeActive?: boolean) => void): void {
    ExpandedModalModeGeneralUtils.setToolbarContainerPointerEvents(toolbarContainerElement, pointerEvents);
    GeneralUtils.startToolbarTransitionWithFadeOut(toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive,
      toggleFullPreviewModeOptionsCallback, updateToolbarClassesCallback);
  }

  public static createWorkshopEventCallback(componentPreviewComponent: ComponentOptions, workshopEventCallbackFunc: () => WorkshopEventCallbackReturn): void {
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE]);
    const workshopEventCallback: WorkshopEventCallback = { keyTriggers, func: workshopEventCallbackFunc };
    componentPreviewComponent.$emit('full-preview-mode-display-modal', workshopEventCallback);
  }
}