import InitiateToggledModalTransitions from '../../../expandedModalPreviewMode/modeToggleTransitions/initiateToggledModalTransitions';
import { WorkshopEventCallbackUtils } from '../../../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import { TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS } from '../../../../../../../../consts/toolbarClasses';
import { WorkshopEventCallbackReturn } from '../../../../../../../../interfaces/workshopEventCallbackReturn';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../../consts/domEventTriggerKeys.enum';
import { OPTION_MENU_BUTTON_MARKER } from '../../../../../../../../consts/elementClassMarkers';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import ToggleTransitions from '../../toggleTransitions';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleModal {

  private static switchBetweenModalAndButton(componentPreviewComponent: ComponentOptions, isButton: boolean): void {
    componentPreviewComponent.temporaryComponent.displayed = isButton;
  }

  public static hideModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    fulPreviewModeState.setIsTransitionInProgress(false);
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        InitiateToggledModalTransitions.startExitTransition(componentPreviewComponent, toolbarContainerElement, toolbarElement,
          ToggleTransitions.toggleExitTransition, ToggleModal.switchBetweenModalAndButton.bind(this, componentPreviewComponent, true));
        fulPreviewModeState.setIsExpandedModalPreviewModeActivated(false);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    }
    const buttonElement = WorkshopEventCallbackUtils.getButtonElement(event.target as HTMLElement);
    if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)) {
      return { shouldRepeat: false };
    }
    return { shouldRepeat: true };
  }

  // WORK1: needs refactoring
  public static displayModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    if (!fulPreviewModeState.getIsTransitionInProgress()) {
      InitiateToggledModalTransitions.startEntranceTransition(componentPreviewComponent, toolbarContainerElement, toolbarElement,
        ToggleTransitions.toggleEntranceTransition);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ToggleModal.hideModal.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement))
      toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
      fulPreviewModeState.setIsExpandedModalPreviewModeActivated(true);
      // the timeout is used to fix a bug where upon clicking the button - the mouse leave and mouse up events do not change back the css correctly
      setTimeout(() => {
        ToggleModal.switchBetweenModalAndButton(componentPreviewComponent, false);
      }, GeneralUtils.VIEW_CHANGE_MILLISECONDS);
    }
    fulPreviewModeState.setIsTransitionInProgress(true);
  }
}
