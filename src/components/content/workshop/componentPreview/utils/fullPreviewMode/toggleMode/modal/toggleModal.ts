import { WorkshopEventCallbackUtils } from '../../../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import { WorkshopEventCallbackReturn } from '../../../../../../../../interfaces/workshopEventCallbackReturn';
import ModeToggleCloseAnimation from '../../../animations/expandedModalPreviewMode/toggleAnimations/close';
import ModeToggleOpenAnimation from '../../../animations/expandedModalPreviewMode/toggleAnimations/open';
import { ELEMENT_CSS_CHANGE_MILLISECONDS, SET_METHODS } from '../../../animations/consts/sharedConsts';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../../../../../consts/coreSubcomponentNames.enum';
import { COMPONENT_PREVIEW_CLASSES } from '../../../../../../../../consts/componentPreviewClasses';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../../../consts/domEventTriggerKeys.enum';
import { OPTION_MENU_BUTTON_MARKER } from '../../../../../../../../consts/elementClassMarkers';
import { SubcomponentProperties } from '../../../../../../../../interfaces/workshopComponent';
import { JAVASCRIPT_CLASSES } from '../../../../../../../../consts/javascriptClasses.enum';
import { CloseTriggers } from '../../../../../../../../interfaces/closeTriggers';
import { fulPreviewModeState } from '../../fullPreviewModeState';
import { animationState } from '../../../animations/state';
import GeneralUtils from '../generalUtils';
import ModalToggleOff from './toggleOff';
import { ComponentOptions } from 'vue';

export default class ToggleModal {

  private static readonly TRIGGER_BUTTON_MOUSE_EVENTS_DISPLAY_CSS_PROPERTY = 'none';
  private static readonly TRIGGER_BUTTON_MOUSE_EVENTS_TOP_CSS_PROPERTY = '100px';
  private static readonly MODAL_BUTTON_NAMES = [CORE_SUBCOMPONENTS_NAMES.BUTTON_1_LAYER_3,
    CORE_SUBCOMPONENTS_NAMES.BUTTON_2_LAYER_3, CORE_SUBCOMPONENTS_NAMES.CLOSE];

  public static changeCloseButtonsJsClasses(componentPreviewComponent: ComponentOptions, methodName: SET_METHODS): void {
    ToggleModal.MODAL_BUTTON_NAMES.forEach((buttonName) => {
      const buttonSubcomponentProperties: SubcomponentProperties = componentPreviewComponent.component.subcomponents[buttonName];
      buttonSubcomponentProperties.customFeatures.jsClasses[methodName](JAVASCRIPT_CLASSES.CLOSE_COMPONENT);
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

  private static modalCloseAnimationFinishedCallback(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      temporaryComponentElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void): void {
    GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
      ModalToggleOff.toggleOffCallback.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement,
        isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback, componentElement, temporaryComponentElement));
    ToggleModal.switchBetweenModalAndButton(componentPreviewComponent, true);
  }

  private static closeModal(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      temporaryComponentElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void): WorkshopEventCallbackReturn {
    ModeToggleCloseAnimation.start(componentPreviewComponent,
      ToggleModal.modalCloseAnimationFinishedCallback.bind(this,
        componentPreviewComponent, componentElement, temporaryComponentElement, toolbarContainerElement,
        toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback),
      toolbarContainerElement, toolbarElement);
    fulPreviewModeState.setIsExpandedModalPreviewModeActivated(false);
    ToggleModal.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.REMOVE);
    return { shouldRepeat: false };
  }

  public static closeModalCallback(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      temporaryComponentElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void,
      event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    if (animationState.getIsModalCloseEventPreventedState()) return { shouldRepeat: true };
    fulPreviewModeState.setIsAnimationInProgress(false);
    const closeTriggers: CloseTriggers = componentPreviewComponent.component.subcomponents[CORE_SUBCOMPONENTS_NAMES.BASE]
      .customFeatures.closeTriggers;
    if (event instanceof KeyboardEvent) {
      if ((event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE && closeTriggers.escape)
          || (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER && closeTriggers.enter)) {
        return ToggleModal.closeModal(componentPreviewComponent, componentElement, temporaryComponentElement,
          toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
      }
      return { shouldRepeat: true };
    }
    const buttonElement = WorkshopEventCallbackUtils.getParentElementIfSvg(event.target as HTMLElement);
    // cannot use the JAVASCRIPT_CLASSES.CLOSE_COMPONENT on the backdrop because the user can't click on the actual backdrop element in the full preview
    // mode and the componentPreviewContainer element has classes that are being manually switched which get reset when class: is used
    if ((buttonElement.classList.contains(COMPONENT_PREVIEW_CLASSES.EXPANDED_MODAL_MODE_ACTIVE)
          && !animationState.getIsModeToggleAnimationInProgressState() && closeTriggers.backdrop)
        || (buttonElement.classList.contains(JAVASCRIPT_CLASSES.CLOSE_COMPONENT))) {
      return ToggleModal.closeModal(componentPreviewComponent, componentElement, temporaryComponentElement,
        toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback);
    }
    if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)) {
      ToggleModal.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.REMOVE);
      return { shouldRepeat: false };
    }
    return { shouldRepeat: true };
  }

  public static displayModal(componentPreviewComponent: ComponentOptions, componentElement: HTMLElement,
      temporaryComponentElement: HTMLElement, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement,
      isExpandedModalPreviewModeActive: boolean, toggleFullPreviewModeOptionsCallback: () => void): void {
    // cannot use animationState.getIsModeToggleAnimationInProgressState() because it has a timeout
    if (!fulPreviewModeState.getIsAnimationInProgress()) {
      ToggleModal.changeCloseButtonsJsClasses(componentPreviewComponent, SET_METHODS.ADD);
      // the following line is a bug fix for the mouse leave and mouse up events not being triggered for when the button is switched
      // whilst the mouse is still on it
      ToggleModal.setButtonCssProperties(componentPreviewComponent,
        ToggleModal.TRIGGER_BUTTON_MOUSE_EVENTS_DISPLAY_CSS_PROPERTY, ToggleModal.TRIGGER_BUTTON_MOUSE_EVENTS_TOP_CSS_PROPERTY);
      GeneralUtils.createWorkshopEventCallback(componentPreviewComponent,
        ToggleModal.closeModalCallback.bind(this, componentPreviewComponent, componentElement, temporaryComponentElement,
          toolbarContainerElement, toolbarElement, isExpandedModalPreviewModeActive, toggleFullPreviewModeOptionsCallback));
      fulPreviewModeState.setIsExpandedModalPreviewModeActivated(true);
      // the timeout is the second part of the bug fix to allow the mouse events to be triggered and css to be reset
      setTimeout(() => {
        ToggleModal.switchBetweenModalAndButton(componentPreviewComponent, false);
        ModeToggleOpenAnimation.start(componentPreviewComponent, toolbarContainerElement, toolbarElement);
      }, ELEMENT_CSS_CHANGE_MILLISECONDS);
    }
    fulPreviewModeState.setIsAnimationInProgress(true);
  }
}
