import { transitionTypeToFunctionality } from '../expandedModalPreviewMode/transitionInitializers/transitionTypeToFunctionality';
import { fulPreviewModeState } from './fullPreviewModeState';
import { ComponentOptions } from 'vue';
import { WorkshopEventCallbackReturn } from '@/interfaces/workshopEventCallbackReturn';
import { DOM_EVENT_TRIGGER_KEYS } from '@/consts/domEventTriggerKeys.enum';
import { WorkshopEventCallback } from '@/interfaces/workshopEventCallback';
import { OPTION_MENU_BUTTON_MARKER } from '@/consts/elementClassMarkers';
import { WorkshopEventCallbackUtils } from '../../../toolbar/options/workshopEventCallbackUtils/workshopEventCallbackUtils';
import ToggleTransitions from './toggleTransitions';
import { TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS } from '@/consts/toolbarClasses';

export default class ToggleDisplays {

  public static readonly VIEW_CHANGE_MILLISECONDS = 10;

  // WORK1: needs refactoring
  private static switchToButton(componentPreviewComponent: ComponentOptions): void {
    componentPreviewComponent.temporaryComponent.displayed = true;
  }

  // WORK1: needs refactoring
  public static hideModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    fulPreviewModeState.setIsTransitionInProgress(false);
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        ToggleTransitions.toggleExitTransition(
          transitionTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.exit.type],
          componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.exit.duration,
          ToggleDisplays.switchToButton.bind(this, componentPreviewComponent), componentPreviewComponent.$refs.componentPreviewContainer,
          componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
          componentPreviewComponent.$refs.baseComponent.$refs.componentPreview, componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
          toolbarContainerElement, toolbarElement);
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
      ToggleTransitions.toggleEntranceTransition(
        transitionTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.type],
        componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.duration,
        componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.delay,
        componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
        componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
        componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
        componentPreviewComponent.$refs.componentPreviewContainer,
        toolbarContainerElement, toolbarElement);
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE]);
      const workshopEventCallback: WorkshopEventCallback = {
        keyTriggers, func: ToggleDisplays.hideModal.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement) };
      componentPreviewComponent.$emit('full-preview-mode-display-modal', workshopEventCallback);
      toolbarElement.classList.add(TOOLBAR_ELEMENT_ACTIVE_FULL_PREVIEW_MODE_CLASS);
      fulPreviewModeState.setIsExpandedModalPreviewModeActivated(true);
      // the timeout is used to fix a bug where upon clicking the button - the mouse leave and mouse up events do not change back the css correctly
      setTimeout(() => {
        componentPreviewComponent.temporaryComponent.displayed = false;
      }, ToggleDisplays.VIEW_CHANGE_MILLISECONDS);
    }
    fulPreviewModeState.setIsTransitionInProgress(true);
  }
}
