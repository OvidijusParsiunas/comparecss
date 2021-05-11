import InitiateToggledModalAnimations from '../../../expandedModalPreviewMode/modeToggleAnimations/initiateToggledModalAnimations';
import { WorkshopEventCallbackUtils } from '../../../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import { ELEMENT_CSS_CHANGE_MILLISECONDS, SET_METHODS } from '../../../expandedModalPreviewMode/consts/sharedConsts';
import { expandedModalPreviewModeState } from '../../../expandedModalPreviewMode/expandedModalPreviewModeState';
import { TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS } from '../../../../../../../../consts/toolbarClasses';
import { WorkshopEventCallbackReturn } from '../../../../../../../../interfaces/workshopEventCallbackReturn';
import ModeToggleEntranceAnimation from '../../../expandedModalPreviewMode/modeToggleAnimations/entrance';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../../consts/coreSubcomponentNames.enum';
import { COMPONENT_PREVIEW_CLASSES } from '../../../../../../../../consts/componentPreviewClasses';
import ModeToggleExitAnimation from '../../../expandedModalPreviewMode/modeToggleAnimations/exit';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../../consts/domEventTriggerKeys.enum';
import { OPTION_MENU_BUTTON_MARKER } from '../../../../../../../../consts/elementClassMarkers';
import { SubcomponentProperties } from '../../../../../../../../interfaces/workshopComponent';
import { JAVASCRIPT_CLASSES } from '../../../../../../../../consts/javascriptClasses.enum';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import GeneralUtils from '../generalUtils';
import { ComponentOptions } from 'vue';

export default class ToggleModal {

  private static readonly TRIGGER_BUTTON_MOUSE_EVENTS_DISPLAY_CSS_PROPERTY = 'none';
  private static readonly TRIGGER_BUTTON_MOUSE_EVENTS_TOP_CSS_PROPERTY = '100px';
  private static readonly MODAL_BUTTON_NAMES = [CORE_SUBCOMPONENTS_NAMES.BUTTON_1, CORE_SUBCOMPONENTS_NAMES.BUTTON_2, CORE_SUBCOMPONENTS_NAMES.CLOSE];

  public static changeCloseButtonsJsClasses(componentPreviewComponent: ComponentOptions, methodName: SET_METHODS): void {
    ToggleModal.MODAL_BUTTON_NAMES.forEach((buttonName) => {
      const buttonSubcomponentProperties: SubcomponentProperties = componentPreviewComponent.component.subcomponents[buttonName];
      buttonSubcomponentProperties.customFeatures.jsClasses[methodName](JAVASCRIPT_CLASSES.CLOSE_MODAL);
    });
  }

  // cannot use a class because it is overwritten by the componentPreview component dom changes
  private static setButtonCssProperties(componentPreviewComponent: ComponentOptions, display: string, top: string): void {
    const component = componentPreviewComponent.$refs.temporaryComponent;
    component.style.display = display;
    component.style.top = top;
  }

  private static switchBetweenModalAndButton(componentPreviewComponent: ComponentOptions, isButton: boolean): void {
    componentPreviewComponent.temporaryComponent.displayed = isButton;
    ToggleModal.setButtonCssProperties(componentPreviewComponent, '', '')
  }

  private static closeModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement): void {
    InitiateToggledModalAnimations.startModalExitAnimation(componentPreviewComponent, toolbarContainerElement, toolbarElement,
      ModeToggleExitAnimation.start, ToggleModal.switchBetweenModalAndButton.bind(this, componentPreviewComponent, true));
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(false);
    ToggleModal.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.REMOVE);
  }

  public static closeModalCallback(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    fulPreviewModeState.setIsAnimationInProgress(false);
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        ToggleModal.closeModal(componentPreviewComponent, toolbarContainerElement, toolbarElement);
        return { shouldRepeat: false };
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        ToggleModal.closeModal(componentPreviewComponent, toolbarContainerElement, toolbarElement);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    }
    const buttonElement = WorkshopEventCallbackUtils.getButtonElement(event.target as HTMLElement);
    // cannot use the JAVASCRIPT_CLASSES.CLOSE_MODAL on the backdrop because the user can't click on the actual backdrop element in the full preview
    // mode and the componentPreviewContainer element has classes that are being manually switched which get reset when class: is used
    if (buttonElement.classList.contains(COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE)
        && !expandedModalPreviewModeState.getIsModeToggleAnimationInProgressState()) {
      ToggleModal.closeModal(componentPreviewComponent, toolbarContainerElement, toolbarElement);
      return { shouldRepeat: false };
    } else if (buttonElement.classList.contains(JAVASCRIPT_CLASSES.CLOSE_MODAL)) {
      ToggleModal.closeModal(componentPreviewComponent, toolbarContainerElement, toolbarElement);
      return { shouldRepeat: false };
    } else if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)) {
      ToggleModal.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.REMOVE);
      return { shouldRepeat: false };
    }
    return { shouldRepeat: true };
  }

  public static displayModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    // cannot use expandedModalPreviewModeState.getIsModeToggleAnimationInProgressState() because it has a timeout
    if (!fulPreviewModeState.getIsAnimationInProgress()) {
      ToggleModal.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
      // the following line is a bug fix for the mouse leave and mouse up events not being triggered for when the button is switched
      // whilst the mouse is still on it
      ToggleModal.setButtonCssProperties(componentPreviewComponent,
        ToggleModal.TRIGGER_BUTTON_MOUSE_EVENTS_DISPLAY_CSS_PROPERTY, ToggleModal.TRIGGER_BUTTON_MOUSE_EVENTS_TOP_CSS_PROPERTY);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ToggleModal.closeModalCallback.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement));
      toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
      fulPreviewModeState.setIsExpandedModalPreviewModeActivated(true);
      // the timeout is the second part of the bug fix to allow the mouse events to be triggered and css to be reset
      setTimeout(() => {
        ToggleModal.switchBetweenModalAndButton(componentPreviewComponent, false);
        InitiateToggledModalAnimations.startModalEntranceAnimation(componentPreviewComponent, toolbarContainerElement, toolbarElement,
          ModeToggleEntranceAnimation.start);
      }, ELEMENT_CSS_CHANGE_MILLISECONDS);
    }
    fulPreviewModeState.setIsAnimationInProgress(true);
  }
}
