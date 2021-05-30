import { COMPONENT_CARD_MARKER, COMPONENT_LIST_ITEM_MARKER, COMPONENT_PREVIEW_MARKER, OPTION_MENU_BUTTON_MARKER } from '../../../../../../../../consts/elementClassMarkers';
import { WorkshopEventCallbackUtils } from '../../../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import { WorkshopEventCallbackReturn } from '../../../../../../../../interfaces/workshopEventCallbackReturn';
import { POINTER_EVENTS_NONE } from '../../../animations/consts/sharedConsts';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ImportComponedModeToggleOff {

  private static switchButtonToModal(componentPreviewComponent: ComponentOptions): void {
    componentPreviewComponent.isFullPreviewModeOn = false;
  }

  public static start(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void, componentPreviewElement: HTMLElement,
      temporaryComponentElement: HTMLElement): void {
    if (!isExpandedModalPreviewModeActive) {
      GeneralUtils.switchComponentsWithFadeOut(componentPreviewElement,
        temporaryComponentElement, ImportComponedModeToggleOff.switchButtonToModal.bind(this, componentPreviewComponent));
    } else {
      ImportComponedModeToggleOff.switchButtonToModal(componentPreviewComponent);
    }
    GeneralUtils.updateToolbarStyle(POINTER_EVENTS_NONE, toolbarContainerElement, toolbarElement,
      isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, GeneralUtils.resetToolbarContainerPosition)
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(isExpandedModalPreviewModeActive);
  }

  public static toggleOffCallback(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void, componentPreviewElement: HTMLElement,
      temporaryComponentElement: HTMLElement, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    const buttonElement = WorkshopEventCallbackUtils.getParentElementIfSvg(event.target as HTMLElement);
    if (buttonElement.classList.contains(COMPONENT_LIST_ITEM_MARKER) || buttonElement.classList.contains(COMPONENT_CARD_MARKER)) {
      ImportComponedModeToggleOff.start(componentPreviewComponent, toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive,
        toggleFullPreviewModeOptionsCallback, componentPreviewElement, temporaryComponentElement);
      return { shouldRepeat: false };
    }
    if (buttonElement.classList.contains(COMPONENT_PREVIEW_MARKER) || buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)) {
      return { shouldRepeat: false };
    }
    return { shouldRepeat: true };
  }
}
