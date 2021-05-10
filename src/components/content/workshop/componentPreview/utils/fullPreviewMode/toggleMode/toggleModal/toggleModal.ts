import InitiateToggledModalAnimations from '../../../expandedModalPreviewMode/modeToggleAnimations/initiateToggledModalAnimations';
import { WorkshopEventCallbackUtils } from '../../../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import { TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS } from '../../../../../../../../consts/toolbarClasses';
import { WorkshopEventCallbackReturn } from '../../../../../../../../interfaces/workshopEventCallbackReturn';
import { ELEMENT_CSS_CHANGE_MILLISECONDS } from '../../../expandedModalPreviewMode/consts/sharedConsts';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../../consts/domEventTriggerKeys.enum';
import { OPTION_MENU_BUTTON_MARKER } from '../../../../../../../../consts/elementClassMarkers';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';
import Animations from './animations';

export default class ToggleModal {

  private static readonly TRIGGER_BUTTON_MOUSE_EVENTS_DISPLAY_CSS_PROPERTY = 'none';
  private static readonly TRIGGER_BUTTON_MOUSE_EVENTS_TOP_CSS_PROPERTY = '100px';

  // cannot use a class because it is overwritten by the componentPreview component dom changes
  private static setButtonCSsProperties(componentPreviewComponent: ComponentOptions, display: string, top: string): void {
    const component = componentPreviewComponent.$refs.temporaryComponent;
    component.style.display = display;
    component.style.top = top;
  }

  private static switchBetweenModalAndButton(componentPreviewComponent: ComponentOptions, isButton: boolean): void {
    componentPreviewComponent.temporaryComponent.displayed = isButton;
    ToggleModal.setButtonCSsProperties(componentPreviewComponent, '', '')
  }

  public static hideModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    fulPreviewModeState.setIsAnimationInProgress(false);
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        InitiateToggledModalAnimations.startModalExitAnimation(componentPreviewComponent, toolbarContainerElement, toolbarElement,
          Animations.exitAnimation, ToggleModal.switchBetweenModalAndButton.bind(this, componentPreviewComponent, true));
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

  public static displayModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    // cannot use expandedModalPreviewModeState.getIsModeToggleAnimationInProgressState() because it has a timeout
    if (!fulPreviewModeState.getIsAnimationInProgress()) {
      // the following line is a bug fix for the mouse leave and mouse up events not triggering and thus not changing back the button css
      ToggleModal.setButtonCSsProperties(componentPreviewComponent,
        ToggleModal.TRIGGER_BUTTON_MOUSE_EVENTS_DISPLAY_CSS_PROPERTY, ToggleModal.TRIGGER_BUTTON_MOUSE_EVENTS_TOP_CSS_PROPERTY);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ToggleModal.hideModal.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement))
      toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
      fulPreviewModeState.setIsExpandedModalPreviewModeActivated(true);
      // the timeout is the second part of the bug fix to allow the mouse events to be triggered and css to be reset
      setTimeout(() => {
        ToggleModal.switchBetweenModalAndButton(componentPreviewComponent, false);
        InitiateToggledModalAnimations.startModalEntranceAnimation(componentPreviewComponent, toolbarContainerElement, toolbarElement,
          Animations.entranceAnimation);
      }, ELEMENT_CSS_CHANGE_MILLISECONDS);
    }
    fulPreviewModeState.setIsAnimationInProgress(true);
  }
}
