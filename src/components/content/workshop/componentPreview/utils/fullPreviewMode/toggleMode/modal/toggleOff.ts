import { COMPONENT_CARD_MARKER, COMPONENT_LIST_ITEM_MARKER, COMPONENT_PREVIEW_MARKER, OPTION_MENU_BUTTON_MARKER } from '../../../../../../../../consts/elementClassMarkers';
import { WorkshopEventCallbackUtils } from '../../../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import { WorkshopEventCallbackReturn } from '../../../../../../../../interfaces/workshopEventCallbackReturn';
import { POINTER_EVENTS_NONE } from '../../../animations/consts/sharedConsts';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleOff {

  private static switchButtonToModal(componentPreviewComponent: ComponentOptions): void {
    componentPreviewComponent.temporaryComponent.displayed = false;
    componentPreviewComponent.isFullPreviewModeOn = false;
  }

  public static start(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toggleFullPreviewModeOptionsCallback: () => void, 
      toolbarElement: HTMLElement, isExpandedModalPreviewModeActive: boolean, componentElement: HTMLElement, temporaryComponentElement: HTMLElement): void {
    if (!isExpandedModalPreviewModeActive) {
      GeneralUtils.switchComponentsWithFadeOut(componentElement,
        temporaryComponentElement, ToggleOff.switchButtonToModal.bind(this, componentPreviewComponent));
    } else {
      ToggleOff.switchButtonToModal(componentPreviewComponent);
    }
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toggleFullPreviewModeOptionsCallback, toolbarElement,
      isExpandedModalPreviewModeActive, GeneralUtils.resetToolbarContainerPosition);
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }

  public static toggleOffCallback(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void, componentElement: HTMLElement,
      temporaryComponentElement: HTMLElement, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    const buttonElement = WorkshopEventCallbackUtils.getParentElementIfSvg(event.target as HTMLElement);
    if (buttonElement.classList.contains(COMPONENT_LIST_ITEM_MARKER) || buttonElement.classList.contains(COMPONENT_CARD_MARKER)) {
      ToggleOff.start(componentPreviewComponent, toolbarContainerElement, toggleFullPreviewModeOptionsCallback, toolbarElement,
        isExpandedModalPreviewModeActive, componentElement, temporaryComponentElement);
      return { shouldRepeat: false };
    }
    if (buttonElement.classList.contains(COMPONENT_PREVIEW_MARKER) || buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)) {
      return { shouldRepeat: false };
    }
    return { shouldRepeat: true };
  }
}
