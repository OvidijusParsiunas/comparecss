import {
  MODE_TOGGLE_FADE_TRANSITION_DURATION_MILLISECONDS, MODE_TOGGLE_FADE_TRANSITION_DURATION_SECONDS,
  OPACITY_INVISIBLE, OPACITY_VISIBLE, POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE,
} from '../../../expandedModalPreviewMode/consts/sharedConsts';
import ExpandedModalModeGeneralUtils from '../../../expandedModalPreviewMode/utils/generalUtils';
import ToggleDisplays from '../../toggleDisplays';

export default class GeneralUtils {

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
      }, ToggleDisplays.VIEW_CHANGE_MILLISECONDS);
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
      }, ToggleDisplays.VIEW_CHANGE_MILLISECONDS);
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
}
