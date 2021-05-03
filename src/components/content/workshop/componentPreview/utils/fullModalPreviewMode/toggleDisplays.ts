import ExpandedModalPreviewModeToggleEntranceTransition from '../../utils/expandedModalPreviewMode/modeToggleTransitions/entrance';
import ExpandedModalPreviewModeToggleExitTransition from '../../utils/expandedModalPreviewMode/modeToggleTransitions/exit';
import { transitionTypeToFunctionality } from '../expandedModalPreviewMode/transitionInitializers/transitionTypeToFunctionality';
import { fullModalPreviewModeState } from './fullModalPreviewModeState';
import { ComponentOptions } from 'vue';
import { WorkshopEventCallbackReturn } from '@/interfaces/workshopEventCallbackReturn';
import { DOM_EVENT_TRIGGER_KEYS } from '@/consts/domEventTriggerKeys.enum';
import ImportComponentToggleUtils from '../../../toolbar/options/importComponentToggleUtils/importComponentToggleUtils';
import { WorkshopEventCallback } from '@/interfaces/workshopEventCallback';
import { OPTION_MENU_BUTTON_MARKER } from '@/consts/elementClassMarkers';

export default class ToggleDisplays {

  // WORK1: needs refactoring
  private static switchToButton(componentPreviewComponent: ComponentOptions): void {
    componentPreviewComponent.temporaryComponent.displayed = true;
  }

  // WORK1: needs refactoring
  public static hideModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement,
      toolbarElement: HTMLElement, event: Event | KeyboardEvent): WorkshopEventCallbackReturn {
    fullModalPreviewModeState.setIsTransitionInProgress(false);
    if (event instanceof KeyboardEvent) {
      if (event.key === DOM_EVENT_TRIGGER_KEYS.ESCAPE) {
        
      } else if (event.key === DOM_EVENT_TRIGGER_KEYS.ENTER) {
        ExpandedModalPreviewModeToggleExitTransition.startFullMode(
          transitionTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.exit.type],
          componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.exit.duration,
          ToggleDisplays.switchToButton.bind(this, componentPreviewComponent), componentPreviewComponent.$refs.componentPreviewContainer,
          componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
          componentPreviewComponent.$refs.baseComponent.$refs.componentPreview, componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
          toolbarContainerElement, toolbarElement);
        fullModalPreviewModeState.setIsExpandedModalPreviewModeActivated(false);
        return { shouldRepeat: false };
      }
      return { shouldRepeat: true };
    }
    const buttonElement = ImportComponentToggleUtils.getButtonElement(event.target as HTMLElement);
    if (buttonElement.classList.contains(OPTION_MENU_BUTTON_MARKER)) {
      return { shouldRepeat: false };
    }
    return { shouldRepeat: true };
  }

  // WORK1: needs refactoring
  public static displayModal(componentPreviewComponent: ComponentOptions, toolbarContainerElement: HTMLElement, toolbarElement: HTMLElement): void {
    if (!fullModalPreviewModeState.getIsTransitionInProgress()) {
      ExpandedModalPreviewModeToggleEntranceTransition.startFullMode(
        transitionTypeToFunctionality[componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.type],
        componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.duration,
        componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.transitions.entrance.delay,
        componentPreviewComponent.component.subcomponents[componentPreviewComponent.BASE_SUB_COMPONENT].customFeatures.backdrop,
        componentPreviewComponent.$refs.baseComponent.$refs.componentPreview,
        componentPreviewComponent.$refs.baseComponent.$refs.componentPreviewOverlay,
        componentPreviewComponent.$refs.componentPreviewContainer,
        toolbarContainerElement, toolbarElement); 
      componentPreviewComponent.temporaryComponent.displayed = false;
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP, DOM_EVENT_TRIGGER_KEYS.ENTER, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const workshopEventCallback: WorkshopEventCallback = {
        keyTriggers, func: ToggleDisplays.hideModal.bind(this, componentPreviewComponent, toolbarContainerElement, toolbarElement) };
      componentPreviewComponent.$emit('full-preview-mode-display-modal', workshopEventCallback);
      toolbarElement.classList.add('toolbar-position-during-expanded-full-modal-preview');
      fullModalPreviewModeState.setIsExpandedModalPreviewModeActivated(true);
    }
    fullModalPreviewModeState.setIsTransitionInProgress(true);
  }
}
